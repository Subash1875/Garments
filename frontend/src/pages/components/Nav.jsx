import { useEffect, useState } from "react";
import { useLogout } from "../../hooks/AuthHooks/useLogout";

const Nav = () => {
  const user = localStorage.getItem("user");

  const NavItems = [
    {
      title: "Home",
      icon: "fas fa-house",
      link: "",
    },
    {
      title: "Search",
      icon: "fas fa-search",
      link: "search",
    },
    {
      title: "Add Credentials",
      icon: "far fa-address-book",
      link: "add-credentials",
    },
    {
      title: "Your Companies",
      icon: "far fa-building",
      link: `${user}/companies`,
    },
  ];

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  const [Nav, setNav] = useState(
    document.documentElement.clientWidth < 992 ? true : false
  );

  const handleResize = () => {
    if (document.documentElement.clientWidth < 992) {
      setNav(true);
    } else {
      setNav(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    if (Nav) {
      setNav(false);
    } else {
      setNav(true);
    }
  };

  const [logoutPopup, setLogoutPopup] = useState(false);

  const handlePopUp = () => {
    if (logoutPopup) {
      setLogoutPopup(false);
    } else {
      setLogoutPopup(true);
    }
  };
  const cancelPoup = () => {
    setLogoutPopup(false);
  };

  return (
    <>
      <div
        id="mobile-nav-icon"
        className="rounded-circle"
        onClick={handleClick}
      >
        <i className={Nav ? "fas fa-bars" : "fas fa-xmark"} title="Menu"></i>
      </div>

      <nav
        className="position-fixed h-100 border bg-dark px-3 py-3 no-print"
        style={{ left: Nav ? "-250px" : 0 }}
      >
        <a href="/">
          <h3 className="text-white">Garments</h3>
        </a>

        <a href={user && "/add-bill"}>
          <div
            className="mt-5 mb-3 rounded rounded-5 bg-white text-dark d-flex align-items-center cursor"
            style={{ height: "50px" }}
          >
            <i className="fas fa-plus rounded-circle text-white mx-2"></i>
            <span>New Bill</span>
          </div>
        </a>

        <ul
          className="list-unstyled
         d-flex flex-column"
        >
          {NavItems.map((nav, i) => (
            <div className="nav-hover rounded cursor" key={i}>
              <a href={user && `/${nav.link}`}>
                <li className="nav-li d-flex align-items-center">
                  <i className={`${nav.icon} ps-4 pe-3`} title={nav.title}></i>
                  <span>{nav.title}</span>
                </li>
              </a>
            </div>
          ))}
          <div
            className="nav-hover rounded cursor"
            onClick={user && handlePopUp}
          >
            <li className="nav-li d-flex align-items-center">
              <i className="fas fa-right-from-bracket ps-4 pe-3"></i>
              <span>Logout</span>
            </li>
          </div>
          <li className="my-5 text-center">
            <span>Copyright &copy; kevin 2024</span>
          </li>
        </ul>
      </nav>

      <div className={logoutPopup ? "logout-popup" : "logout-popup d-none"}>
        <div className="logout-container border rounded bg-white shadow shadow-lg p-3 pt-4">
          <div className="h5">Log out?</div>
          <p>Are you sure you want to log out?</p>
          <div className="mt-5 text-end">
            <button
              className="btn border mx-2 cancel-btn rounded-4 px-4"
              onClick={cancelPoup}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger rounded-4 px-4"
              onClick={user && handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
