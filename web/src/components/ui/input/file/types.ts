import type { Snippet } from 'svelte';

export interface InputFileProps {
  hovered?: Snippet<[files?: DataTransferItemList]>;
  children?: Snippet<[]>;

  onDrop?: (file: File[]) => void;
}
