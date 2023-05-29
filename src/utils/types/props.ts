import type { ProjectLifecycle } from "@prisma/client";

export interface Children {
  children?: React.ReactNode;
}
export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

export interface MultilineInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  error?: string;
  hasAdaptiveHeight?: boolean;
}

export interface ProjectCardDetails {
  id: string;
  title: string;
  description: string;
  state: ProjectLifecycle;
  createdAt: Date;
  bannerImageUrl: string | null;
}
