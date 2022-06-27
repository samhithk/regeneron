import { FC, useState } from "react";

export interface TagsInputProps {
  tags: string[];
  type?: "text" | "number";
  onChange?: (value: string[]) => void | Promise<void>;
  placeHolder?: string;
  onBlur?: () => void;
}

export const TagsInput: FC<TagsInputProps> = ({
  type = "text",
  placeHolder,
  onChange,
  tags = [],
  onBlur,
}) => {
  const [input, setInput] = useState<string>("");

  return (
    <div className="w-full space-y-4">
      {tags?.length > 0 && (
        <div className="flex flex-wrap items-center">
          {tags.map((tag, i) => (
            <div
              className="mr-2 mt-0.5 flex items-center space-x-1 whitespace-nowrap rounded-full bg-gray-300 px-2 py-1 text-xs"
              key={tag}
            >
              <p>{tag}</p>
              <i
                onClick={() => {
                  const newTags = [...tags];
                  newTags.splice(i, 1);
                  onBlur?.();
                  onChange?.(newTags);
                }}
                className="bi-x-lg cursor-pointer"
                role="button"
              ></i>
            </div>
          ))}
        </div>
      )}
      <input
        min={1}
        type={type}
        placeholder={placeHolder}
        value={input}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input !== "") {
            e.preventDefault();
            const newTags = [...new Set([...tags, input])];
            onChange?.(newTags);
            onBlur?.();
            setInput("");
          }
        }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="w-full rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none"
      />
    </div>
  );
};
