import { Suspense, useState } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import SleekLoadingIndicator from "../../components/basic/SkeletonLoader";
import { SomethingWentWrong } from "../../components/Svg/SomethingWentWrong";
import { AuthProvider } from "../hooks/useAuth";

const AuthLayout = ({ isLoading = true }) => {
  const outlet = useOutlet();

  const { userPromise } = useLoaderData();

  return (
    <Suspense
      fallback={<SleekLoadingIndicator isLoading={isLoading} count={20} />}
    >
      <Await
        resolve={userPromise}
        errorElement={<SomethingWentWrong />}
        children={(user) => (
          <AuthProvider userData={user}>{outlet}</AuthProvider>
        )}
      />
    </Suspense>
  );
};

export default AuthLayout;
