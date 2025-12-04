import '@testing-library/jest-dom'
// Polyfill ResizeObserver pour jsdom
class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (typeof global.ResizeObserver === 'undefined') {
  global.ResizeObserver = RO
}