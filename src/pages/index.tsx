import { type NextPage } from "next";
import Image from "next/image";
import Button from "@components/Button";
import Divider from "@components/Divider";
import Text from "@components/Text";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Premium />
      <Divider />
      <CTA />
    </>
  );
};

export default Home;

// === Sections =====================================================

const Hero: React.FC = () => {
  return (
    <section className="custom-home-bg">
      <div className="container">
        <Text tag="h1" className="leading-tight text-primary drop-shadow-blur">
          Collaborate with experts.
          <br />
          Educate the world.
        </Text>
        <Text size="h3" weight="bold" className="mt-6 mb-16 drop-shadow-blur">
          Get connected with Parallel
        </Text>
        <Button>Get Started</Button>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section className="container">
      <Text tag="h2" className="mb-5 text-center text-primary">
        About Parallel
      </Text>
      <Text className="mx-auto mb-24 max-w-6xl text-center">
        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
        mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
        tellus.
      </Text>
      <div className="grid grid-cols-[1fr_2fr_1fr] grid-rows-2 items-center gap-x-24 gap-y-9">
        <AboutRow
          title="For Educators"
          imgUrl="/images/about-educators.svg"
          altText="for educators"
          row="1"
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris.
        </AboutRow>
        <AboutRow
          title="For Content Creators"
          imgUrl="/images/about-creators.svg"
          altText="for content creators"
          row="2"
          iconOnRight
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris.
        </AboutRow>
      </div>
    </section>
  );
};

interface AboutRowProps {
  title: string;
  children: string;
  imgUrl: string;
  altText: string;
  row: number | `${number}`;
  iconOnRight?: boolean;
}

const AboutRow: React.FC<AboutRowProps> = ({
  title,
  children,
  imgUrl,
  altText,
  row,
  iconOnRight = false,
}) => {
  return (
    <>
      <Image
        priority
        src={imgUrl}
        height={200}
        width={200}
        alt={altText}
        className={`row-start-${row} ${
          iconOnRight
            ? "col-start-3 justify-self-start"
            : "col-start-1 justify-self-end"
        }`}
      />
      <div className="col-start-2">
        <Text tag="h3" styleLike="h4" className="mb-3">
          {title}
        </Text>
        <Text>{children}</Text>
      </div>
    </>
  );
};

const Premium: React.FC = () => {
  return (
    <section className="container text-center">
      <Text tag="h2" className="text-primary">
        Parallel Premium
      </Text>
      <Text className="my-5">
        Using Parallel is completely free, but you can enjoy exclusive features
        and support the platform with our premium version.
      </Text>
      <a
        href="#"
        className="font-semibold text-tertiary hover:text-tertiary-600"
      >
        <Text>Learn more about Premium</Text>
      </a>
    </section>
  );
};

const CTA: React.FC = () => {
  return (
    <section className="text-center">
      <Button>Sign Up Now</Button>
    </section>
  );
};
