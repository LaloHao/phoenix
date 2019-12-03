import { center } from './window';
import { fullscreen } from './window/fullscreen';

const HYPER = ['ctrl', 'alt', 'cmd'] as Phoenix.ModifierKey[];

new Key('c', HYPER, () => {
  const window = Window.focused();

  if (!window) return;

  center(window);
});

new Key('f', HYPER, () => {
  const window = Window.focused();

  fullscreen(window);
});
