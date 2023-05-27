import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "@utils/api";
import { getRootContainer } from "@utils/constants/htmlTools";
import { proposalSchema } from "@utils/constants/schema/project";
import type { Children } from "@utils/types/props";
import { cx } from "class-variance-authority";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "./Button";
import { Divider } from "./Divider";
import { WithScroll } from "./WithScroll";
import { TextInput, MultilineTextInput } from "./TextInput";
import type { z } from "zod";
import { useState } from "react";

type ProposalForm = z.infer<typeof proposalSchema>;
interface NewProposalPopupProps extends Children {
  onOpen?: () => void;
  onClose?: () => void;
  onSubmit?: () => void;
}

export const NewProposalPopup: React.FC<NewProposalPopupProps> = ({
  children,
  onOpen,
  onClose,
  onSubmit,
}) => {
  // === Constants ============================================================

  const container = getRootContainer();

  // === Hooks ================================================================

  const [isOpen, setIsOpen] = useState(false);
  const ctx = api.useContext();

  const { handleSubmit, register, formState, reset } = useForm<ProposalForm>({
    resolver: zodResolver(proposalSchema),
  });

  const { mutate, isLoading: isPosting } =
    api.projects.createProposal.useMutation({
      onSuccess: () => {
        toast.success("Successfully created a new proposal");

        // Close form
        setIsOpen(false);

        // Invalidate project caches
        void ctx.projects.getAll.invalidate();
        void ctx.projects.getAllByCurrentUser.invalidate();

        // Handle any extra functions
        onSubmit?.();
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });

  // === Functions ============================================================

  const handleOnSubmit: SubmitHandler<ProposalForm> = (data): void => {
    if (isPosting) return;
    mutate(data);
  };

  const handleOnClose = () => {
    // Close form
    setIsOpen(false);

    // Clear form
    reset();

    // Handle any extra functions
    onClose?.();
  };

  const handleOnOpen = () => {
    // Open form
    setIsOpen(true);

    // Handle any extra functions
    onOpen?.();
  };

  // === Components ===========================================================

  const FullDivider = () => (
    <div className="mt-4">
      <Divider />
    </div>
  );

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(isOpen) => {
        isOpen ? handleOnOpen() : handleOnClose();
      }}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal container={container}>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-overlayShow" />

        <Dialog.Content
          className={cx(
            "fixed left-[50%] top-[50%] w-[90vw] max-w-[750px] translate-x-[-50%] translate-y-[-50%]",
            "rounded-3xl bg-bg",
            "focus:outline-none data-[state=open]:animate-contentShow",
            "overflow-clip"
          )}
        >
          <div className="px-10 pt-10">
            <Dialog.Title asChild>
              <h1 className="font-bold text-primary text-r-xl">
                Create new proposal
              </h1>
            </Dialog.Title>
            <Dialog.Description asChild>
              <p className="text-r-lg">
                Let others know a little about your project idea.
              </p>
            </Dialog.Description>
          </div>
          <FullDivider />

          <WithScroll height="70vh">
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(handleOnSubmit)}
              className="mt-4 px-10 pb-10"
            >
              <div className="mb-8 flex flex-col gap-y-4">
                <TextInput
                  label="Title"
                  placeholder={proposalSchema.shape.title.description}
                  error={formState.errors.title?.message}
                  {...register("title")}
                />
                <MultilineTextInput
                  hasAdaptiveHeight
                  label="Description"
                  placeholder={proposalSchema.shape.description.description}
                  error={formState.errors.description?.message}
                  {...register("description")}
                />
                {/* <ImageInput label="Image" /> */}
              </div>
              <div className="flex flex-row justify-end">
                <Button
                  variant={{ size: "small" }}
                  type="submit"
                  disabled={isPosting}
                >
                  Create
                </Button>
              </div>
            </form>
          </WithScroll>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
