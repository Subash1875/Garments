import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/AuthHooks/useAuthContext";

const UserCompanies = () => {
  const { user } = useAuthContext();
  const [userCompanies, setUserCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/user/user-companies`,
        { headers: { authorization: localStorage.getItem("token") } }
      );
      setUserCompanies(response.data.companies);
    } catch (err) {
      console.log(
        err.response?.data?.msg || "an error occured. please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const CompaniesDom = () => {
    if (userCompanies) {
      return userCompanies.map((company, i) => (
        <div className="border-bottom px-2 my-2 companies" key={i}>
          <a
            href={`/${user}/${company.company.CompanyName}`}
            className="d-flex flex-column"
          >
            <p className="h3 hover-color">{company.company.CompanyName}</p>
            <br />
            <p>{company.company.Address}</p>
          </a>
        </div>
      ));
    }
  };

  return (
    <>
      <div className="mx-4 mt-4">
        <div className="d-flex">
          <span className="h5">Companies</span>
          <a href="/add-companies" className="ms-auto">
            <button className="btn btn-secondary">Add Companies</button>
          </a>
        </div>
        <div className="mt-4">
          {userCompanies.length > 0 ? (
            CompaniesDom()
          ) : (
            <p className="h5">No companies found</p>
          )}
        </div>
      </div>
      {loading && <div id="loading"></div>}
    </>
  );
};

export default UserCompanies;
