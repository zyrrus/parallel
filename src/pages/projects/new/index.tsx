import { MainLayout } from "@components/layouts";
import type { NextPage } from "next";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@utils/api";
import { proposalSchema } from "@utils/constants/schema/project";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@components/Button";
import { TextInput, MultilineTextInput } from "@components/TextInput";
import { z } from "zod";
import { ImageInput } from "@components/ImageInput";

type ProposalForm = z.infer<typeof proposalSchema>;

const CreateNewProposal: NextPage = () => {
  // === Hooks ================================================================

  const ctx = api.useContext();

  const { handleSubmit, register, formState, reset } = useForm<ProposalForm>({
    resolver: zodResolver(proposalSchema),
  });

  const { mutate, isLoading: isPosting } =
    api.projects.createProposal.useMutation({
      onSuccess: () => {
        toast.success("Successfully created a new proposal");

        // Invalidate project caches
        void ctx.projects.getAll.invalidate();
        void ctx.projects.getAllByCurrentUser.invalidate();

        reset();
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

  return (
    <MainLayout>
      <div className="mx-11 max-w-4xl">
        <div className="mb-6 mt-8">
          <h1 className="font-bold text-primary text-r-5xl">
            Create a new proposal
          </h1>
          <p>
            Have a cool project idea, but need some expertise or an extra set of
            hands? Write up a description of your idea so that others can
            contribute.
            <br />
            Here are a few things that you might want to include.
          </p>
          <ul className="my-2 ml-4 list-disc">
            <li className="ml-4">What is the project?</li>
            <li className="ml-4">What do you need help with?</li>
            <li className="ml-4">
              What kind of people are you looking for? (animators, professors,
              anyone, ...)
            </li>
            <li className="ml-4">How can people contribute?</li>
          </ul>
        </div>
        {/* New proposal form */}
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(handleOnSubmit)}
          className="pb-10"
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
      </div>
    </MainLayout>
  );
};

export default CreateNewProposal;
