import type { HTMLAttributes, HTMLImgAttributes } from 'svelte/elements';
import type { Project } from '../../../../../../utils/editor/project/types';

export interface UIMediaLibraryProps {
  project: Project;
}

export type UIMediaFileProps = Omit<HTMLAttributes<HTMLDivElement>, 'popover'> & {
  project: Project;
  id: string;
  file: File;
};

export type UIMediaThumbnailProps = Omit<HTMLImgAttributes, 'popover'> & {
  file: File;
};
