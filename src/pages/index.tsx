import { type NextPage } from "next";
import Image from "next/image";
import Grid from "../../public/grid.svg";
import Button from "../components/Button";

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
    <div className="absolute top-0 right-0 left-0">
      <div className="custom-radial-bg relative z-0 flex items-center">
        <Image
          src={Grid}
          alt="background grid"
          className="absolute inset-0 -z-10"
        />
        <div className="container">
          <h1 className="text-5xl font-bold leading-tight text-primary">
            Collaborate with experts.
            <br />
            Educate the world.
          </h1>
          <p className="mt-6 mb-16 text-3xl font-bold">
            Get connected with Parallel
          </p>
          <Button />
        </div>
      </div>
    </div>
  );
}
