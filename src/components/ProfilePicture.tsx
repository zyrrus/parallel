import * as Avatar from "@radix-ui/react-avatar";

interface ProfilePictureProps {
  name: string | undefined | null;
  username: string | undefined | null;
  image: string | undefined | null;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  name,
  image,
}) => {
  // TODO: on hover, show "Name @username" tool tip
  // TODO: on click, navigate to profile
  return (
    <Avatar.Root className="flex min-w-max select-none items-center justify-center overflow-hidden rounded-full bg-quaternary p-2 align-middle shadow-solid-medium">
      <Avatar.Image
        className="h-10 w-10 rounded-[inherit] object-cover"
        src={image ?? undefined}
        alt={name ?? "User avatar"}
      />
      <Avatar.Fallback
        className="leading-1 flex h-10 w-10 items-center justify-center rounded-[inherit] bg-tertiary font-medium"
        delayMs={600}
      >
        {name?.charAt(0)}
      </Avatar.Fallback>
    </Avatar.Root>
  );
};
