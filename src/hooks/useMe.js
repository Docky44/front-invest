import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../graphql/me";

export function useMe() {
  const { data, loading, error } = useQuery(ME_QUERY);
  return {
    me: data?.me ?? null,
    loading,
    error,
  };
}
