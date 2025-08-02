import { useState } from "react";
import { useLogin } from "../../hooks/AuthHooks/useLogin";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { msg, loading, login } = useLogin();

  const handlForm = async (e) => {
    e.preventDefault();
    await login(name, password);
    setName("");
    setPassword("");
  };

  return (
    <>
      <div className="d-flex flex-column">
        <div className="conatiner-fluid mt-5">
          <p className="h3 text-center">Login</p>
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
                </div>
                <div className="text-center">
                  <button type="submt" className="btn btn-primary my-3">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-100 text-center mt-5">
          <span className="px-3">Create a account...</span>
          <a href="/signup" className="text-primary">
            Signup
          </a>
        </div>
      </div>
      {loading && <div id="loading"></div>}
    </>
  );
};

export default Login;
