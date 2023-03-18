import type { NextPage } from "next";
import { MainLayout } from "@components/layouts";
import { typo } from "@styles/typography";

const Projects: NextPage = () => {
  return (
    <MainLayout>
      <h1 className={typo({ tag: "h1" })}>Projects</h1>
    </MainLayout>
  );
};

export default Projects;
