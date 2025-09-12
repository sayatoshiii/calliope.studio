import type { Project } from '../../../../utils/editor/project/types';

export interface EditorTimelineProps {
  project: Project;
  zoom?: number;
  marker: number;
}
