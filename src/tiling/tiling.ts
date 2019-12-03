enum FrameOrientation {
  Horizontal,
  Vertical,
}

interface FrameNode {
  kind: 'FrameNode';
  orientation: FrameOrientation;
  frame: Rectangle;
  left: TileNode;
  right: TileNode;
}

interface WindowNode {
  kind: 'Window';
  frame: Rectangle;
  value: Window;
}

type TileNode = FrameNode | WindowNode;
