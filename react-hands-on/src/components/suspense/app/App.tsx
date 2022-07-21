import React, { Suspense } from "react";
import { useState } from "react";
import Agreements from "../Agreements";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const App = () => {
  const [agree, setAgree] = useState(false);
  if (!agree) return <Agreements onAgree={() => setAgree(true)} />;
  return (
    <ErrorBoundary>
      <Suspense fallback={<ClimbingBoxLoader />}>
        <Main />
      </Suspense>
    </ErrorBoundary>
  );
};

const Main = React.lazy(() => import("./Main"));

export default App;
