export interface EditorTimelineProps {
  tracks?: Record<string, EditorTimelineTrack>;
  view?: {
    zoom?: number;
    position?: number;
  };
  marker?: {
    position?: number;
  };
}

export interface EditorTimelineTrack {
  type: EditorTimelineTrackType;
  position?: number;
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
