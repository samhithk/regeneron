import { ClinicalConcept } from "@prisma/client";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import axios from "axios";
import { BASE_API_URL } from "../config";
import { ClinicalConceptPut } from "../../validation";

async function fetchClinicalConcept(id: number) {
  const response = await axios.get(`${BASE_API_URL}/clinical-concepts/${id}`);
  return response.data as ClinicalConcept;
}

export function useClinicalConcept(
  id: number,
  options?: UseQueryOptions<ClinicalConcept, Error>
) {
  return useQuery<ClinicalConcept, Error>(
    ["clinical-concepts", id],
    async () => await fetchClinicalConcept(id),
    options
  );
}

async function fetchChildren(id: number) {
  const response = await axios.get(
    `${BASE_API_URL}/clinical-concepts/${id}/children`
  );
  return response.data.children as ClinicalConcept[];
}

export function useClinicalConceptChildren(
  id: number,
  options?: UseQueryOptions<ClinicalConcept[], Error>
) {
  return useQuery<ClinicalConcept[], Error>(
    ["clinical-concepts", id, "children"],
    async () => await fetchChildren(id),
    options
  );
}

async function updateClinicalConcept(data: ClinicalConceptPut) {
  const response = await axios.put(`${BASE_API_URL}/clinical-concepts`, data);
  return response.data;
}

export function useUpdateClinicalConcept() {
  const queryClient = useQueryClient();

  return useMutation<ClinicalConcept, unknown, ClinicalConceptPut>(
    (params) => updateClinicalConcept(params),
    {
      onSettled: () => {
        queryClient.invalidateQueries("clinical-concepts");
      },
    }
  );
}
