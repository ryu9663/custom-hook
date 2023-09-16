import {
  UseMutationOptions,
  UseMutationResult,
  useMutation as createMutation,
} from "@tanstack/react-query";

import { Service } from "../../generated/services/Service";

type ServiceType = typeof Service;

export type MutationName = Extract<keyof ServiceType, "placeOrder">;

export type MutationResult<_MutationName extends MutationName> = Awaited<
  ReturnType<ServiceType[_MutationName]>
>;

export type MutationParams<_MutationName extends MutationName> = Parameters<
  ServiceType[_MutationName]
>[0];

export const useMutation = <_MutationName extends MutationName>(
  mutation: _MutationName,
  options: Omit<
    UseMutationOptions<
      MutationResult<_MutationName>,
      Error,
      MutationParams<_MutationName>
    >,
    "mutationFn"
  > = {}
) => {
  const customOptions = {
    ...options,
  };

  return createMutation(
    Service[mutation] as (param?: unknown) => Promise<unknown>,
    customOptions as object
  ) as UseMutationResult<
    MutationResult<_MutationName>,
    Error,
    MutationParams<_MutationName>,
    unknown
  >;
};
