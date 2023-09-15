import { Suspense } from "react";
import "./App.css";
import QueryTest from "./component/QueryTest";

import useToast from "./hooks/useToast";

function App() {
  return (
    <>
      <Suspense fallback={<span>loading...</span>}>
        <QueryTest />
      </Suspense>
    </>
  );
}

export default App;
