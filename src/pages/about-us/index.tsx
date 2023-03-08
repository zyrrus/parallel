import Layout from "@components/layouts/Layout";
import Text from "@components/Text";
import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <Layout layout="home">
      <Text tag="h1">About</Text>
    </Layout>
  );
};

export default About;
