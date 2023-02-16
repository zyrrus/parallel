import { type NextPage } from "next";
import Image from "next/image";
import Grid from "../../public/grid.svg";

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
    <div className="absolute top-0 right-0 left-0 min-h-screen bg-radial">
      <div className="relative z-0">
        <Image
          src={Grid}
          alt=""
          className="absolute inset-0 -z-10"
          //   className="bg-grid absolute inset-0 z-10 object-cover"
        />
        <h1 className="text-5xl font-bold text-primary">
          Collaborate with experts.
          <br />
          Educate the world.
        </h1>
      </div>
    </div>
  );
}
