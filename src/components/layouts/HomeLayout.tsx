import HomeFooter from "@components/HomeFooter";
import HomeHeader from "@components/HomeHeader";

interface Props {
  children: React.ReactNode;
}

const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <HomeHeader />
      {children}
      <HomeFooter />
    </>
  );
};

export default HomeLayout;
