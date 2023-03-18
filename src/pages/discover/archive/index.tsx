import type { NextPage } from "next";
import { DiscoverLayout } from "@components/layouts";
import { typo } from "@styles/typography";

const Archive: NextPage = () => {
  return (
    <DiscoverLayout>
      <h2 className={typo({ tag: "h2" })}>Archive</h2>
    </DiscoverLayout>
  );
};

export default Archive;
