export enum EditorModulePosition {
  TOP_LEFT = 'left',
  TOP_RIGHT = 'right'
}

export enum EditorModuleType {
  FILE_EXPLORER,
  INSPECTOR
}

export interface EditorModuleProps {
  position: EditorModulePosition;
  module: EditorModuleType;
}
