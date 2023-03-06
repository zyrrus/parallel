import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <IoClose
        size="2rem"
        className="absolute top-0 left-0 m-4 rounded-full hover:bg-fg/10 focus-visible:outline focus-visible:outline-8 focus-visible:outline-offset-2 focus-visible:outline-fg"
        onClick={handleBack}
      />
      {children}
    </div>
  );
};

export default AuthLayout;
