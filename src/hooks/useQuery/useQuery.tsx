import type {
  UseQueryOptions,
  UseQueryResult as OriginalUseQueryResult,
} from "@tanstack/react-query";
import { Service } from "../../generated/services/Service";
import { ApiErrorWithBody } from "../../type";
import { ApiError } from "../../generated";
import { useQuery as createQuery } from "@tanstack/react-query";

type ServiceType = typeof Service;
type QueryName = Extract<
  keyof ServiceType,
  | "findPets"
  | "addPet"
  | "findPetById"
  | "deletePet"
  | "getInventory"
  | "getOrderById"
>;
export type QueryResult<_QueryName extends QueryName> = Awaited<
  ReturnType<ServiceType[_QueryName]>
>;

export type UseQueryResult<
  TQueryName extends QueryName,
  TError = ApiErrorWithBody<ApiError>
> = OriginalUseQueryResult<QueryResult<TQueryName>, TError>;

export type QueryParam<_QueryName extends QueryName> = Parameters<
  ServiceType[_QueryName]
>[0];

type Error = ApiErrorWithBody<ApiError>;

export const useQuery = <
  TQueryName extends QueryName,
  TData = QueryResult<TQueryName>
>(
  query: {
    name: TQueryName;
    param?: QueryParam<TQueryName>;
  },

  options?: Omit<
    UseQueryOptions<QueryResult<TQueryName>, Error, TData>,
    "queryKey" | "queryFn"
  >
): OriginalUseQueryResult<TData, Error> => {
  const customOption: typeof options = {
    ...options,
  };

  const queryFn = Service[query.name] as (params?: unknown) => Promise<any>;

  return createQuery(
    Object.values(query),
    ({ queryKey: [, param] }) => queryFn(param),
    customOption
  );
};
