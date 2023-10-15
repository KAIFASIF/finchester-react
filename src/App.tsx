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
// import Summary from "./screens/user/summary";
import { useRecoilValue } from "recoil";
import { authAtom } from "./recoil/authAtom";
import Signin from "./screens/signin";
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
        {/* <Route path="/" element={<Summary />} />
        <Route path="/loan-application" element={<LoanApplication />} />
        <Route path="/loan-application/:loanId" element={<LoanApplication />} /> */}
      </Route>
      <Route path="/" element={<Signin />} />
      {/* <Route path="/delete" element={<Delete />} /> */}
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
