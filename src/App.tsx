import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from '@mui/material/styles';
import Landing from "./pages/landing";
import HomePage from "./pages/home";
import { useGlobalContext } from "./lib/GlobalContext";
import { theme as lightTheme } from '../theme/LightTheme'
import { theme as darkTheme } from '../theme/DarkTheme'

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30 * 60,
        // 30 mins
      },
    },
  });

  const { theme } = useGlobalContext()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,

      children: [
        {
          index: true,
          element: <Landing />,
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
      <ThemeProvider theme={theme == "dark" ? darkTheme : lightTheme}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider >
    </QueryClientProvider>
  );
};

export default App;
