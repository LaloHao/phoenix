import { extendObservable, observable, autorun, computed, action } from 'mobx';
// import { center } from './center';

export function halfWidth(window: Window): Window {
  const frame: Rectangle = window.screen().frame();
  frame.width = frame.width / 2;
  window.setFrame(frame);
  return window;
}

export function halfHeight(window: Window): Window {
  const frame: Rectangle = window.screen().frame();
  frame.height = frame.height / 2;
  window.setFrame(frame);
  return window;
}

function scale(sx: number, sy: number): (frame: Rectangle) => Rectangle;
function scale(frame: Rectangle, sx: number, sy: number): Rectangle;
function scale(...args: any[]) {
  if (args.length === 2) {
    return function(frame: Rectangle) {
      return scale(frame, args[0], args[1]);
    }
  }

  const [base, sx, sy] = args;

  const frame = Object.assign({}, base);
  const { width, height } = frame;
  frame.width = sx * width;
  frame.height = sy * height;
  return frame;
}

function translate(tx: number, ty: number): (frame: Rectangle) => Rectangle;
function translate(frame: Rectangle, tx: number, ty: number): Rectangle;
function translate(...args: any[]) {
  if (args.length === 2) {
    return function(frame: Rectangle) {
      return translate(frame, args[0], args[1]);
    }
  }

  const [base, tx, ty] = args;

  const frame = Object.assign({}, base);
  const { x, y } = frame;
  frame.x = tx + x;
  frame.y = ty + y;
  return frame;
}

export const compose = <T extends any[], R>(
  fn1: (...args: T) => R,
  ...fns: Array<(a: R) => R>
) => {
  const piped = fns.reduce(
    (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
    value => value
  );
  return (...args: T) => piped(fn1(...args));
};

export function leftHalf(window: Window): Window {
  const frame = compose(
    scale(0.5, 1),
    (f) => translate(f.width, 0)(f),
  )(window.screen().frame());
  console.log(frame);

  return window.setFrame(frame) && window;
}

declare global {
  interface Space {
    /**
     * Returns the screen to which the space belongs to.
     */
    screen(): Screen;
    frames: { [s: string]: any };
    split(): void;
  }
}

extendObservable(Space.prototype, {
  frames: {
    frames: [
      { active: 1, ...Space.active().screen().frame() },
    ],
    parent: null,
    hash: null,
  },
});

type LayoutDirection = 'horizontal' | 'vertical';

const split = (frame: Rectangle) => {
  const frameA = scale(frame, 0.5, 1);
  const frameB = translate(frameA, frameA.x, 0);
  return [frameA, frameB];
}

const vsplit = (frame: Rectangle) => {
  const frameA = scale(frame, 1, 0.5);
  const frameB = translate(frameA, 0, frameA.y);
  return [frameA, frameB];
}

const merge = (frameA: Rectangle, frameB: Rectangle) => {
  const frame = {
    x: Math.min(frameA.x, frameB.x),
    y: Math.min(frameA.y, frameB.y),
    width: frameA.width + frameB.width,
    height: frameA.height + frameB.height,
  }
  return frame;
}

class LayoutNode {
  @observable direction: LayoutDirection = 'horizontal';
  @observable parent?: Layout;
  @observable frame: Screen;
  nodes: LayoutNode[] = observable<LayoutNode>([]);

  constructor(frame: Rectangle, parent?: LayoutNode) {
    this.frame = frame;
    this.parent = parent;
  }
}

class Layout {
  space: Space;
  nodes: LayoutNode;

  @computed get screen(): Screen {
    return this.space.screen();
  }

  @computed get frame(): Rectangle {
    return this.screen.frame();
  }

  @computed get windows(): Window[] {
    return this.screen.windows().filter(w => w.title() !== '');
  }

  constructor(space: Space) {
    this.space = space;
    this.hydrate();
  }

  @action.bound hydrate() {
    this.nodes = new LayoutNode(this.frame, null);
  }

  sync() {
    autorun(
      () => {
        let frame = Space.active().screen().frame();
        if (this.windows.length === 0) {
          // handle root frame size
        } else if (this.windows.length === 1) {
          this.windows[0].setFrame(frame);
        } else {
          frame = this.windows[this.windows.length - 2].frame();
          frame = scale(frame, 0.5, 1);
          this.windows[this.windows.length - 2].setFrame(frame);

          frame = translate(frame, frame.width, 0);
          this.windows[this.windows.length - 1].setFrame(frame);
        }
      }
    );
  }
}

// class FrameNode {
//   @observable frame: Rectangle;
//   @observable root: FrameNode;
//   frames = observable<FrameNode>([]);
//   @observable layout: Layout = 'horizontal';

//   constructor(frame?: Rectangle, parent?: FrameNode, root?: FrameNode) {
//     this.parent = parent;
//     this.frame = frame;
//   }
// }

Space.prototype.split = function() {
  // const active = this.frames.frames.find(f => f.active);
  // const frames = this.frames.frames.filter(f => )
  // const frame1 = scale(0.5, 1);
  // const frame2 = scale(0.5, 1);
  // this.frames.push()
  const window = Window.focused();
  const frame = scale(window.frame(), 0.5, 1);
  window.setFrame(frame);
  // center(window);
}

new Event('spaceDidChange', () => {
  const space = Space.active();
  space.frames.hash = space.hash();
});

(globalThis as any).leftHalf = leftHalf;
(globalThis as any).translate = translate;
(globalThis as any).scale = scale;
(globalThis as any).compose = compose;
(globalThis as any).layout = new Layout();
