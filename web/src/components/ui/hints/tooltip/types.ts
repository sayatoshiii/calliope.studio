import type { Snippet } from 'svelte';

export enum TooltipPosition {
  BOTTOM = 'bottom',
  BOTTOM_LEFT = 'bottomLeft',
  BOTTOM_RIGHT = 'bottomRight'
}

export interface TooltipProps {
  position?: TooltipPosition;
  message: Snippet<[]>;
  children: Snippet<[]>;
}
