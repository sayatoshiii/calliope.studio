export interface EditorTimelineProps {
  tracks?: Record<string, EditorTimelineTrack>;
  zoom?: number;
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
