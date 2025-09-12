export interface Project {
  timestamp: number;
  media?: Record<string, Media>;
  tracks?: Record<string, Track>;
}

export interface Media {
  file: File;
}

export interface MediaLength {
  time: number;
  size: number;
}

export interface Track {
  type: TrackType;
  position: number;
  clips: Clip[];
}

export enum TrackType {
  VIDEO,
  AUDIO
}

export interface Clip {
  id?: string;
  timestamp?: number;
  duration?: number;
}
