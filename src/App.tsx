import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

// import LoanApplication from "./screens/user/loanApplicatiion";
// import Signin from "./screens/signin";

import { useRecoilValue } from "recoil";
import { authAtom } from "./recoil/authAtom";
import Signin from "./screens/signin";
// import Summary from "./screens/signin/user/summary";

// import Delete from "./screens/Delete";


const RoleWrapper = ({ role }: any) => {
  const auth = useRecoilValue(authAtom);
  const userRoles = [auth?.role];
  return userRoles?.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
};

const Root = () => {
  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
   
      <Route element={<RoleWrapper role="ROLE_USER" />}>
        {/* <Route path="/loan-application/:loanId" element={<LoanApplication />} />  */}
      </Route>
   
      
  {/* <Route path="/delete" element={<Delete />} />  */}
      <Route path="/signin" element={<Signin />} />
      {/* <Route path="/" element={<Summary />} /> */}
    </Route>
  )
);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
