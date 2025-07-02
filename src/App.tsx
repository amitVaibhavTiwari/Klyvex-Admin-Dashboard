import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material/styles";
import { useGlobalContext } from "./lib/GlobalContext";
import { theme as lightTheme } from "../theme/LightTheme";
import { theme as darkTheme } from "../theme/DarkTheme";
import AdminLayout from "./components/AppLayout/AppLayout";
import Error from "./components/Error/Error";
import CustomersPage from "./pages/Customers/Index";
import SettingsPage from "./pages/Settings/Index";
import OrdersPage from "./pages/Orders/Index";
import AppProvider from "./components/AppProvider/AppProvider";
import StaffPage from "./pages/Staff";
import ProductsPage from "./pages/Products";
import AddProductPage from "./pages/AddProduct";
import LoginPage from "./pages/Login";
import LandingPage from "./pages/Landing";
import AnalyticsPage from "./pages/Analytics";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30 * 60, // half hr
      },
    },
  });

  const { theme } = useGlobalContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AdminLayout />,
      errorElement: <Error />,

      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "/analytics",
          element: <AnalyticsPage />,
        },
        {
          path: "/customers",
          element: <CustomersPage />,
        },
        {
          path: "/orders",
          element: <OrdersPage />,
        },
        {
          path: "/settings",
          element: <SettingsPage />,
        },
        {
          path: "/staff",
          element: <StaffPage />,
        },
        {
          path: "/add-product",
          element: <AddProductPage />,
        },
        {
          path: "/products",
          element: <ProductsPage />,
        },

        {
          path: "/products/:id",
          element: <>this is specific product page</>,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme == "dark" ? darkTheme : lightTheme}>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
