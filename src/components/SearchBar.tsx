import { FiSearch, FiX } from "react-icons/fi";
import { TextInput } from "./TextInput";

type SearchBarProps = Omit<
  React.ComponentPropsWithRef<typeof TextInput>,
  "prefixIcon" | "suffixIcon"
> & { clearInput?: () => void };

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  clearInput,
  ...rest
}) => {
  return (
    <TextInput
      placeholder={placeholder ?? "Search"}
      prefixIcon={<FiSearch size={24} strokeWidth={3} />}
      suffixIcon={
        <button onClick={() => clearInput?.()}>
          <FiX size={24} strokeWidth={3} />
        </button>
      }
      {...rest}
    />
  );
};
