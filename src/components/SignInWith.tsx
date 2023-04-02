import Image from "next/image";

const ProviderDetails: Record<
  string,
  { bgcolor?: string; fgcolor?: string; image?: string }
> = {
  google: {
    bgcolor: "bg-white",
    fgcolor: "text-black",
  },
  github: {
    bgcolor: "bg-[#171515]",
    fgcolor: "text-white",
  },
  twitter: {
    bgcolor: "bg-white",
    fgcolor: "text-black",
  },
  facebook: {
    bgcolor: "bg-[#1877F2]",
    fgcolor: "text-white",
  },
  apple: {
    bgcolor: "bg-black",
    fgcolor: "text-white",
  },
};

interface SignInWithProps {
  id: string;
  label: string;
  onClick: () => void;
}

export const SignInWith: React.FC<SignInWithProps> = ({
  id,
  label,
  onClick,
}) => {
  const providerDetails = ProviderDetails[id];

  return (
    <button
      onClick={onClick}
      className={`flex flex-row flex-nowrap items-center gap-x-1 rounded-full pr-4 shadow-solid-medium transition-all
      hover:opacity-75 hover:shadow-solid-medium-lowered active:opacity-50 active:shadow-solid-lowest
      ${providerDetails?.bgcolor ?? "bg-bg"} 
      ${providerDetails?.fgcolor ?? "text-fg"}`}
    >
      <Image
        src={providerDetails?.image ?? `/images/${id}.svg`}
        alt={`sign up with ${label}`}
        width={50}
        height={50}
        className="rounded-full"
      />

      <span className="text-r-xl">Sign in with {label}</span>
    </button>
  );
};
