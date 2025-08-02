import { useState } from "react";
import { useSignup } from "../../hooks/AuthHooks/useSignup";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { msg, loading, signup } = useSignup();

  const handlForm = async (e) => {
    e.preventDefault();
    await signup(name, password, password2);
    setName("");
    setPassword("");
    setPassword2("");
  };

  return (
    <>
      <div className="d-flex flex-column">
        <div className="conatiner-fluid mt-5">
          <p className="h3 text-center">Signup</p>
          <div className="row d-flex justify-content-center">
            <div className="col-10 col-md-8 col-lg-6 col-xl-4">
              <form className="mt-3" onSubmit={handlForm}>
                <div>
                  <label className="error-label">{msg}</label>
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                </div>
                <div>
                  <div className="form-floating my-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="form-floating my-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password2"
                      placeholder="Password again.."
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                    <label htmlFor="password2">Password again...</label>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submt" className="btn btn-primary my-3">
                    Signup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-100 text-center mt-5">
          <span className="px-3">already have an account...</span>
          <a href="/login" className="text-primary">
            Login
          </a>
        </div>
      </div>
      {loading && <div id="loading"></div>}
    </>
  );
};

export default Signup;
