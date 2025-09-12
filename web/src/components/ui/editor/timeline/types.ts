import type { Project } from '../../../../utils/editor/project/types';

export interface EditorTimelineProps {
  project: Project;
  zoom?: number;
  marker: number;
}

export interface EditorTimelineTrack {
  type: EditorTimelineTrackType;
  position: number;
}

export enum EditorTimelineTrackType {
  VIDEO,
  AUDIO
}

export interface EditorTimelineClip {
  timestamp?: number;
  duration?: number;

  start_time?: number;
  end_time?: number;
}
