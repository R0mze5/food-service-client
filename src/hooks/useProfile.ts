import { useQuery } from "@apollo/client";
import { GetProfile } from "api-types";
import { GET_PROFILE } from "apollo/schemas";

export function useProfile() {
  return useQuery<GetProfile>(GET_PROFILE);
}
