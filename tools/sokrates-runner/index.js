#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { spawn } = require('child_process');

const jarUrl =
  process.env.SOKRATES_JAR_URL ||
  'https://d2bb1mtyn3kglb.cloudfront.net/builds/sokrates-LATEST.jar';
const cacheDir = path.join(__dirname, '.cache');
const jarPath = path.join(cacheDir, 'sokrates.jar');

const downloadJar = (url, destination) =>
  new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    const handleError = (err) => {
      fs.rmSync(destination, { force: true });
      reject(err);
    };

    https
      .get(url, (response) => {
        if (
          response.statusCode &&
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          response.destroy();
          downloadJar(response.headers.location, destination)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (response.statusCode !== 200) {
          handleError(
            new Error(
              `Failed to download Sokrates jar (HTTP ${response.statusCode}) from ${url}`
            )
          );
          return;
        }

        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      })
      .on('error', handleError);
  });

const ensureJar = async () => {
  if (fs.existsSync(jarPath)) {
    return;
  }

  fs.mkdirSync(cacheDir, { recursive: true });
  process.stdout.write('Downloading Sokrates CLI jar...\n');
  await downloadJar(jarUrl, jarPath);
};

const runJar = (args) =>
  new Promise((resolve, reject) => {
    const child = spawn('java', ['-jar', jarPath, ...args], {
      stdio: 'inherit',
    });

    child.on('error', (err) => {
      reject(
        err.code === 'ENOENT'
          ? new Error(
              'Java runtime not found. Install Java (JRE/JDK) and ensure the "java" command is on your PATH.'
            )
          : err
      );
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Sokrates exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });

const main = async () => {
  const projectRoot = process.cwd();
  const configPath = path.join(projectRoot, 'sokrates.config.json');
  const outputDir = path.join(projectRoot, 'sokrates-report');

  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Config file not found at ${configPath}. Create it before running the report.`
    );
  }

  await ensureJar();

  // Fresh git history improves coupling and contributor reports.
  await runJar(['extractGitHistory', '-analysisRoot', projectRoot]);

  await runJar([
    'generateReports',
    '-confFile',
    configPath,
    '-outputFolder',
    outputDir,
    '-internalGraphviz',
  ]);
};

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
