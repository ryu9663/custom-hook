import {
  UseQueryOptions,
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

export type QueryParam<_QueryName extends QueryName> = Parameters<
  ServiceType[_QueryName]
>[0];

const useQuery = <TQueryName extends QueryName, TQueryParam, TData>(
  query: {
    name: TQueryName;
    param?: TQueryParam;
  },

  options?: Omit<
    UseQueryOptions<QueryResult<TQueryName>, Error, TData>,
    "queryKey" | "queryFn"
  >
) => {
  const customOption = {
    ...options,
  } as Omit<
    UseQueryOptions<QueryResult<TQueryName>, Error, TData>,
    "queryKey" | "queryFn"
  >;

  const queryFn = Service[query.name] as (params?: unknown) => Promise<any>;

  return createQuery(
    Object.values(query),
    ({ queryKey: [, param] }) => queryFn(param),
    customOption
  );
};

export default useQuery;
