import { Route, Routes } from "react-router-dom";
import { Account } from "../Pages/Account/Account";
import { Auth } from "../Pages/Auth/Auth";
import { Cart } from "../Pages/Cart/Cart";
import { Index } from "../Pages/Index/Index";
import { MyStore } from "../Pages/MyStore/MyStore";
import { Page404 } from "../Pages/Page404/Page404";
import Reports_Clients from "../Pages/Reports/Reports_Clients";
import { Reports_Documents } from "../Pages/Reports/Reports_Documents";
import Reports_Products from "../Pages/Reports/Reports_Products";
export const RouterData = {
  index: "/",
  auth: "/auth",
  store: "/store",
  cart: "/cart",
  account: "/account",
  r_Clients: "/reports/clients",
  r_Products: "/reports/products",
  r_Ducuments: "/reports/documents",
  page404: "*",
};

export const Router = ({ childrem }: any) => {
  return (
    <>
      <Routes>
        <Route path={RouterData.index} element={<Index />} />
        <Route path={RouterData.auth} element={<Auth />} />
        <Route path={RouterData.store} element={<MyStore />} />
        <Route path={RouterData.cart} element={<Cart />} />
        <Route path={RouterData.account} element={<Account />} />
        <Route path={RouterData.r_Clients} element={<Reports_Clients />} />
        <Route path={RouterData.r_Products} element={<Reports_Products />} />
        <Route path={RouterData.r_Ducuments} element={<Reports_Documents />} />
        <Route path={RouterData.page404} element={<Page404 />} />
      </Routes>
    </>
  );
};
