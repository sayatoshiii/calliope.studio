import type { Snippet } from 'svelte';

export interface InputProps {
  label?: string;
  description?: string;

  placeholder?: string;
  id?: string;
}

export interface InputTextProps extends InputProps {
  type?: string;
  maxlength?: number;

  value?: string;
  onChange?: (newValue: string, event: Event) => void;

  inputContainer?: Snippet;
}
