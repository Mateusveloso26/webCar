import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import logoImg from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

export function Header() {
  const {signed, loadingAuth} = useContext(AuthContext)
  

  return (
    <div className="w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4">
      <header className="flex w-full max-w-7xl items-center justify-between px-4 mx-auto">
        <Link to="/">
          <img src={logoImg} alt="logo do projeto" />
        </Link>

        {!loadingAuth && signed && (
          <Link to="/dashboard">
            <FaRegUserCircle size={30} color="#000" />
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link to="/login">
            <FiLogIn size={24} color="#000" />
          </Link>
        )}
      </header>
    </div>
  );
}
