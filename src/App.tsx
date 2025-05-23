import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30 * 60,
        // 30 mins
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>This is home page</>,

      children: [
        {
          index: true,
          element: <>This is landing page</>,
        },
        {
          path: "/products",
          element: <>This is products page</>,
        },

        {
          path: "/products/:id",
          element: <>this is specific product page</>,
        },

      ],
    },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    // {
    //   path: "/register",
    //   element: <RegisterPage />,
    // },
  ]);


  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
