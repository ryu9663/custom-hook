import {
  UseQueryOptions,
  UseQueryResult,
  useQuery as createQuery,
} from "@tanstack/react-query";
import { Service } from "../../generated/services/Service";

type ServiceType = typeof Service;
type QueryName = Extract<
  keyof ServiceType,
  "findPets" | "addPet" | "findPetById" | "deletePet" | "getInventory"
>;
export type QueryResult<_QueryName extends QueryName> = Awaited<
  ReturnType<ServiceType[_QueryName]>
>;

const useQuery = <TQueryName extends QueryName, TQueryParam, TResponseType>(
  query: {
    name: TQueryName;
    param?: TQueryParam;
  },

  options?: Omit<UseQueryOptions<TResponseType>, "queryKey" | "queryFn">
): UseQueryResult => {
  const customOption = {
    ...options,
  } as Omit<UseQueryOptions<TResponseType>, "queryKey" | "queryFn">;

  const queryFn = Service[query.name] as (params?: unknown) => Promise<any>;

  return createQuery(
    Object.values(query),
    ({ queryKey: [, param] }) => queryFn(param),
    customOption
  );
};

export default useQuery;
