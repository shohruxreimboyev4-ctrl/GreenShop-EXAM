import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Modals from "../../components/modals/modal";
import { Provider } from "react-redux";
import { store } from "../../redux/redux";
import { Toaster } from "react-hot-toast";

const ProviderConfig = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Modals />
          <Toaster />
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default ProviderConfig;
