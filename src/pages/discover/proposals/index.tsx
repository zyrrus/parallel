import type { NextPage } from "next";
import { DiscoverLayout } from "@components/layouts";
import { typo } from "@styles/typography";

const Proposals: NextPage = () => {
  return (
    <DiscoverLayout>
      <h2 className={typo({ tag: "h2" })}>Proposals</h2>
    </DiscoverLayout>
  );
};

export default Proposals;
