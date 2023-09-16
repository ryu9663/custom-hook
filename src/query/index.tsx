import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import axios from "axios";
const errorHandler = ({
  error,
  shouldBeHandledLocally = false,
}: {
  error: unknown;
  shouldBeHandledLocally?: boolean;
}) => {
  if (shouldBeHandledLocally) {
    return;
  }

  if (axios.isAxiosError(error)) {
    if (error.response) {
      // 서버 응답을 받은 경우

      alert("서버에 문제가 생겼습니다.");
    } else {
      // 요청을 보냈으나 서버 응답을 받지 못한 경우 or 요청에 문제가 있는 경우
      alert(error.message);
    }
  } else if (error instanceof Error) {
    alert(error.message);
  } else {
    alert("알 수 없는 문제가 생겼습니다.");
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    // onError: (error) => errorHandler({ error }),
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) =>
      errorHandler({
        error,
        shouldBeHandledLocally: !!mutation.options.onError,
      }),
  }),
});
