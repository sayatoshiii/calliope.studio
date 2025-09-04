import type { HTMLButtonAttributes } from 'svelte/elements';
import type { MuseUIColour, MuseUISize } from '../../types';

export type InputButtonProps = Omit<HTMLButtonAttributes, 'popover'> & {
  colour?: MuseUIColour;
  size?: MuseUISize;
};
