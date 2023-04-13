import { requireAuth } from "@components/HOC/requireAuth";
import { type NextPage } from "next";

const Profile: NextPage = () => {
  return <></>;
};

export default Profile;

// Automatically redirect to /profile/username
export const getServerSideProps = requireAuth((_ctx, session) => {
  const redirectUrl = session.user.username
    ? `/profile/${session.user.username}`
    : "/";

  return {
    redirect: {
      destination: redirectUrl,
      permanent: false,
    },
  };
});
