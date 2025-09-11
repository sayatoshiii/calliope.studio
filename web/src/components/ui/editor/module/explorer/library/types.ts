import type { HTMLImgAttributes } from 'svelte/elements';
import type { Project } from '../../../../../../utils/editor/project/types';

export interface UIMediaLibraryProps {
  project: Project;
}

export type UIMediaThumbnailProps = Omit<HTMLImgAttributes, 'popover'> & {
  file: File;
};
