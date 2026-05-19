import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useDashboardContext } from "../hooks/useDashboardContext";
import { useState } from "react";

const LogoutCnotainer = () => {
  const { user, logoutUser } = useDashboardContext();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        {user.avatar ? (
          <img
            src={`http://localhost:5100/uploads/${user?.avatar}`}
            alt="avatar"
            className="img"
          />
        ) : (
          <FaUserCircle />
        )}

        <span>
          {user?.name} <FaCaretDown />{" "}
        </span>
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutCnotainer;
