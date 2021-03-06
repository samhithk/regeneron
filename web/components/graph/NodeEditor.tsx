import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useClinicalConcept, useUpdateClinicalConcept } from "../../api";
import { ClinicalConceptPut, ClinicalConceptPutForm } from "../../validation";
import { TagsInput } from "../forms";
import { GraphContext } from "./GraphContext";

interface NodeEditorProps {
  rootId: number;
}

export const NodeEditor: FC<NodeEditorProps> = ({ rootId }) => {
  const { selectedConcept: inital, setSelectedConcept } =
    useContext(GraphContext);
  const { data: selectedConcept } = useClinicalConcept(inital?.id || rootId, {
    initialData: inital,
  });
  const { mutate, isLoading: saveLoading } = useUpdateClinicalConcept();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
    control,
  } = useForm<ClinicalConceptPut>({
    resolver: zodResolver(ClinicalConceptPutForm),
    defaultValues: {
      id: selectedConcept?.id,
      displayName: selectedConcept?.displayName || "",
      description: selectedConcept?.description || "",
      alternateNames: selectedConcept?.alternateNames || [],
      parentIds: (selectedConcept?.parentIds as number[]) || [],
      childIds: (selectedConcept?.childIds as number[]) || [],
    },
  });

  useEffect(() => {
    reset({
      id: selectedConcept?.id,
      displayName: selectedConcept?.displayName || "",
      description: selectedConcept?.description || "",
      alternateNames: selectedConcept?.alternateNames || [],
      parentIds: (selectedConcept?.parentIds as number[]) || [],
      childIds: (selectedConcept?.childIds as number[]) || [],
    });
  }, [reset, selectedConcept]);

  const onSubmit = async (data: ClinicalConceptPut) => {
    mutate({
      ...data,
    });
  };

  return (
    <div className="transaition w-80 divide-gray-200 border-r border-gray-200">
      <div className="flex items-center justify-between px-4 pt-4">
        <label className="text-sm text-gray-600">
          ID : {selectedConcept?.id}
        </label>
        <button
          onClick={() => {
            setSelectedConcept(undefined);
            // reset({
            //   displayName: "",
            //   description: "",
            //   alternateNames: [],
            //   parentIds: [],
            //   childIds: [],
            // });
          }}
          className="rounded px-2 transition hover:bg-gray-200"
        >
          <i className="bi-plus-lg"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
        <section className="flex flex-col">
          <label className="text-sm text-gray-600">Name</label>
          <input
            {...register("displayName")}
            className="none mt-1.5 rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none"
          />
        </section>
        <section className="flex flex-col">
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            {...register("description")}
            className="none mt-1.5 rounded border border-gray-200 px-2 py-1 text-sm focus:outline-none"
          />
        </section>
        <Controller
          control={control}
          name="alternateNames"
          render={({ field: { value, onChange } }) => {
            return (
              <section className="flex flex-col space-y-2">
                <label className="text-sm text-gray-600">Alternate Names</label>
                <TagsInput tags={value} onChange={onChange} />
              </section>
            );
          }}
        />
        <Controller
          control={control}
          name="parentIds"
          render={({ field: { value, onChange, onBlur } }) => {
            return (
              <section className="flex flex-col space-y-2">
                <label className="text-sm text-gray-600">Parent IDs</label>
                <TagsInput
                  type="number"
                  tags={value.map((el) => `${el}`)}
                  onChange={(val) => onChange(val.map((el) => +el))}
                />
              </section>
            );
          }}
        />

        <Controller
          control={control}
          name="childIds"
          render={({ field: { value, onChange } }) => {
            return (
              <section className="flex flex-col space-y-2">
                <label className="text-sm text-gray-600">Child IDs</label>
                <TagsInput
                  type="number"
                  tags={value.map((el) => `${el}`)}
                  onChange={(val) => onChange(val.map((el) => +el))}
                />
              </section>
            );
          }}
        />
        <button
          type="submit"
          disabled={!isDirty}
          className={`${
            !isDirty ? "cursor-not-allowed bg-opacity-70" : "hover:bg-gray-700"
          } w-full rounded-md bg-gray-900 py-2 px-4 text-sm font-medium text-white transition`}
        >
          {saveLoading ? (
            <div className="animate-spin">
              <i className="bi-arrow-repeat"></i>
            </div>
          ) : (
            <span className="py-2">Save</span>
          )}
        </button>
      </form>
    </div>
  );
};
