import { typo } from "@styles/typography";
import { cva } from "class-variance-authority";
import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const input = cva([
  typo({ tag: "p" }),
  "w-full rounded border-[6px] py-2 px-3 md:py-3 md:px-4 leading-tight border-fg placeholder-fg/50 bg-fg/20",
  "focus:outline-none",
]);

interface ImageInputProps {
  label: string;
  placeholderImage?: string;
  onChange?: (file: File) => void;
  currentImage?: string;
  aspectRatio?: number;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  label,
  placeholderImage,
  onChange,
  currentImage,
  aspectRatio,
}) => {
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (currentImage) {
      setPreview(currentImage);
    } else {
      setPreview(undefined);
    }
  }, [currentImage]);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      if (onChange) onChange(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col">
      <label
        className={typo({ size: "base", className: "mb-1 block text-fg" })}
      >
        {label}
      </label>
      <div className="relative h-32 w-full overflow-clip rounded border-[6px] border-fg bg-fg/20">
        {preview ? (
          <div className={"h-full w-full"}>
            <img src={preview} alt="Selected image" className="object-cover" />
          </div>
        ) : (
          <div
            className={"flex h-full w-full items-center justify-center"}
            onClick={handleImageClick}
          >
            {placeholderImage ? (
              <Image
                src={placeholderImage}
                alt="Placeholder image"
                className="object-cover"
                width={300}
                height={225}
              />
            ) : (
              <span className={typo({ tag: "p", className: "text-fg/50" })}>
                Click to add image
              </span>
            )}
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={handleFileInputChange}
          ref={fileInputRef}
        />
      </div>
    </div>
  );
};
