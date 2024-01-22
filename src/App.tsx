import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "./recoil/authAtom";
import TicketBooking from "./screens/user/ticketBooking";

const App = () => {
  const auth = useRecoilValue(authAtom);
  const Signin = lazy(() => import("./screens/signin"));
  const Summary = lazy(() => import("./screens/user/summary"));
  const LoanApplication = lazy(() => import("./screens/user/loanApplicatiion"));
  const AdminDashboard = lazy(() => import("./screens/admin/AdminDashboard"));
  return (
    <RouterProvider
      router={createBrowserRouter(createRoutesFromElements(
        <Route>
               {
                 auth?.role === "ROLE_ADMIN" ? (  
                    <Route path="/" element={<Outlet/>}>
                      <Route index element={<Suspense><AdminDashboard /></Suspense>} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>               
                  ): auth?.role === "ROLE_USER" ? (             
                    <Route path="/" element={<Outlet/>}>
                      <Route index element={<Suspense><Summary /></Suspense>} />
                      <Route path="/loan-application" element={<Suspense><LoanApplication /></Suspense>}>
                        <Route path=":loanId" element={<Suspense><LoanApplication /></Suspense>} />
                      </Route>
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                  ): (
                    <Route path="/" element={<Outlet/>}>
                      <Route index element={<Suspense><TicketBooking /></Suspense>} />
                      {/* <Route index element={<Suspense><Signin /></Suspense>} /> */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                  )}         
        </Route>
      ))}
    />
  );
};

export default App;
