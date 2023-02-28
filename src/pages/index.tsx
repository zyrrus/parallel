import { type NextPage } from "next";
import Button from "@components/Button";

const Home: NextPage = () => {
  return (
    <div className="relative ">
      <Hero />
      <div className="container pt-[100vh]">Hello</div>
    </div>
  );
};

export default Home;

function Hero() {
  return (
    <section className="custom-home-bg">
      <div className="container">
        <h1 className="text-5xl font-bold leading-tight text-primary drop-shadow-blur">
          Collaborate with experts.
          <br />
          Educate the world.
        </h1>
        <p className="mt-6 mb-16 text-3xl font-bold drop-shadow-blur">
          Get connected with Parallel
        </p>
        <Button>Get Started</Button>
      </div>
    </section>
  );
}
