export function fullscreen(window: Window): Window {
  const frame = window.screen().frame();
  window.setFrame(frame);
  return window;
}
