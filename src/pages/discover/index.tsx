import { DiscoverLayout } from "@components/layouts";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

const Discover: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ query }) => {
  return <DiscoverLayout />;
};

export default Discover;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query;
  // Call a backend endpoint and return that list
  return { props: { query } };
}
