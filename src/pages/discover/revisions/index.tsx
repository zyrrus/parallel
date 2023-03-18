import type { NextPage } from "next";
import { DiscoverLayout } from "@components/layouts";
import { typo } from "@styles/typography";

const Revisions: NextPage = () => {
  return (
    <DiscoverLayout>
      <h2 className={typo({ tag: "h2" })}>Revisions</h2>
    </DiscoverLayout>
  );
};

export default Revisions;
