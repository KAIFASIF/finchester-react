import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet
  // Navigate,
} from "react-router-dom";

// import { useRecoilValue } from "recoil";
// import { authAtom } from "./recoil/authAtom";
import Signin from "./screens/signin";
import Summary from "./screens/user/summary";



// import Delete from "./screens/Delete";


// const RoleWrapper = ({ role }: any) => {
//   const auth = useRecoilValue(authAtom);
//   const userRoles = [auth?.role];
//   return userRoles?.includes(role) ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/signin" replace />
//   );
// };

const Root = () => {
  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
   
      {/* <Route element={<RoleWrapper role="ROLE_USER" />}>
      </Route> */}
   
      {/* <Route path="/loan-application/:loanId" element={<LoanApplicatiion />} /> 
      <Route path="/loan-application" element={<LoanApplicatiion />} />  */}
      
  {/* <Route path="/delete" element={<Delete />} />  */}
      <Route path="/Signin" element={<Signin />} />
      <Route path="/" element={<Summary />} />
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
