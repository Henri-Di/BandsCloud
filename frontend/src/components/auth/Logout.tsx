import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      type="button"
      className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl border border-red-600 text-red-500 text-base font-medium hover:bg-red-700/10 transition-all shadow-sm whitespace-nowrap"
      aria-label="Sair da conta"
    >
      <FiLogOut size={20} />
      Sair
    </button>
  );
};

export default LogoutButton;
