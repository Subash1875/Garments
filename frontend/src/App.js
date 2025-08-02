import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./static/css/style.css";
import Nav from "./pages/components/Nav";
import Header from "./pages/components/Header";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Signup from "./pages/Authentication/Signup";
import Login from "./pages/Authentication/Login";
import UserCompanies from "./pages/UserCompanies";
import AddCredentials from "./pages/AddPages/AddCredentials";
import AddCompanies from "./pages/AddPages/AddCompanies";
import User from "./pages/User";
import AddBill from "./pages/AddPages/AddBill";
import BillDetails from "./pages/BillDetails";
import SingleCompany from "./pages/SingleCompany";

function App() {
  const user = localStorage.getItem("user");

  return (
    <>
      <Nav />
      <main>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user ? <Index /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/search"
              element={user ? <Search /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/add-credentials"
              element={user ? <AddCredentials /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/:user/companies"
              element={user ? <UserCompanies /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/add-companies"
              element={user ? <AddCompanies /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/:user"
              element={user ? <User /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/add-bill"
              element={user ? <AddBill /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/bill/:_id"
              element={user ? <BillDetails /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/:user/:companyName"
              element={user ? <SingleCompany /> : <Navigate to={"/login"} />}
            />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={<p className="h4 mt-4 text-center">No pages found..</p>}
            />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
