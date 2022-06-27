import axios from "axios";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BASE_API_URL } from "../../api";
import { AppLayout } from "../../components";
import { Page } from "../../types";

const Upload: Page = () => {
  const onDrop = useCallback(async (files: File[]) => {
    const formData = new FormData();
    formData.append("file", files[0]);

    await axios.post(`${BASE_API_URL}/clinical-concepts/upload`, formData, {});
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-50">
      <div
        className="mb-20 rounded-lg border-2 border-dashed border-gray-300 bg-white p-20 text-sm font-medium text-gray-600 shadow-sm"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>{"Drag 'n' drop some files here, or click to select files"}</p>
        )}
      </div>
    </div>
  );
};

Upload.Layout = AppLayout;

export default Upload;
