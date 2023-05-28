import type { ProjectLifecycle } from "@prisma/client";

export interface Children {
  children?: React.ReactNode;
}

export interface ProjectCardDetails {
  id: string;
  title: string;
  description: string;
  state: ProjectLifecycle;
  createdAt: Date;
  bannerImageUrl: string | null;
}
