import { render } from "@testing-library/react";
import Toast from "../component/Toast";

function useToast() {
  return {
    showToast: (type: boolean, string: string, time: number) => {
      render(<Toast type={type} string={string} time={time} />);
    },
  };
}

export default useToast;
