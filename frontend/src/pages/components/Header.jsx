import { useAuthContext } from "../../hooks/AuthHooks/useAuthContext";

const Header = () => {
  const { user } = useAuthContext();

  return (
    <>
      <header className="navbar mx-4 border-bottom mt-3 no-print">
        <p className="h3" style={{ maxWidth: "450px" }}>
          Dashboard
        </p>
        <a
          href={user && `/${user}`}
          className="ms-auto rounded rounded-5 d-flex align-items-center border py-2 px-3 cursor"
        >
          <i className="far fa-user px-2"></i>
          <span className="px-2">{user ? user : "user"}</span>
        </a>
      </header>
    </>
  );
};

export default Header;
