import type { NextPage } from "next";
import Image from "next/image";
import { Button } from "@components/Button";
import { Divider } from "@components/Divider";
import { signIn } from "next-auth/react";
import { HomeLayout } from "@components/layouts";

const Home: NextPage = () => {
  const SpacedDivider = () => <Divider className="container my-24" />;

  return (
    <HomeLayout>
      <Hero />
      <SpacedDivider />
      <About />
      {/* <SpacedDivider />
      <Premium /> */}
      <SpacedDivider />
    </HomeLayout>
  );
};

export default Home;

// === Sections =====================================================

const Hero: React.FC = () => {
  return (
    <section className="custom-home-bg">
      <div className="container">
        <h1 className="font-bold leading-tight text-primary drop-shadow-blur text-r-5xl">
          Collaborate with experts.
          <br />
          Create educational content.
        </h1>
        <h3 className="mb-16 mt-6 font-bold drop-shadow-blur text-r-3xl">
          Get connected with Parallel
        </h3>
        <Button
          onClick={() =>
            void signIn(undefined, {
              callbackUrl: "/projects",
              redirect: false,
            })
          }
        >
          Get Started
        </Button>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section className="container">
      <h2 className="mb-5 text-center font-bold text-primary text-r-4xl">
        About Parallel
      </h2>
      <p className="mx-auto mb-24 max-w-6xl text-center text-r-lg">
        Parallel's mission is to address the disparity between the number of
        educators who can produce high-quality educational content and the
        number of content creators who have the expertise to tackle complex
        subject matter. We connect content creators with educators, enabling
        them to collaborate and produce exceptional educational content. Users
        can assemble teams, work together on projects, and then publish a final
        piece to platforms like YouTube.
      </p>
      <div className="grid grid-cols-1 gap-x-24 gap-y-9 md:grid-cols-[1fr_2fr_1fr] md:items-center">
        <div className="md:col-start-2">
          <h3 className="mb-3 font-bold text-r-2xl">For Educators</h3>
          <p className="text-r-lg">
            Parallel provides educators with a platform to share their expertise
            with a wider audience by collaborating with content creators. By
            working together, educators can produce engaging and informative
            videos that are accessible to students everywhere, without investing
            too much time in video production.
          </p>
        </div>
        <Image
          priority
          src="/images/about-educators.svg"
          height={200}
          width={200}
          alt="for educators"
          className="w-24 justify-self-start md:w-auto"
        />
        <Image
          priority
          src="/images/about-creators.svg"
          height={200}
          width={200}
          alt="for content creators"
          className="w-24 justify-self-end md:w-auto"
        />
        <div className="md:col-start-2">
          <h3 className="mb-3 font-bold text-r-2xl">For Content Creators</h3>
          <p className="text-r-lg">
            Parallel empowers content creators to produce high-quality
            educational content that they may not have had the expertise to
            tackle on their own. By collaborating with educators, creators can
            explore new topics and create more comprehensive videos that engage
            and inform their audience.
          </p>
        </div>
      </div>
    </section>
  );
};

const Premium: React.FC = () => {
  return (
    <section className="container text-center">
      <h2 className="font-bold text-primary text-r-4xl">Parallel Premium</h2>
      <p className="my-5 text-r-lg">
        Using Parallel is completely free, but you can enjoy exclusive features
        and support the platform with our premium version.
      </p>
      <a
        href="#"
        className="font-semibold text-tertiary text-r-lg hover:text-tertiary-600"
      >
        Learn more about Premium
      </a>
    </section>
  );
};
