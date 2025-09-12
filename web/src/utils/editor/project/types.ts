import type { EditorTimelineTrack } from '../../../components/ui/editor/timeline/types';

export interface Project {
  media?: Record<string, Media>;
  tracks?: Record<string, EditorTimelineTrack>;
}

export interface Media {
  file: File;
}

export interface MediaLength {
  time: number;
  size: number;
}
