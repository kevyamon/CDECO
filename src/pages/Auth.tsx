import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Route d'authentification unifiée : redirige vers le formulaire de connexion principal
 */
const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth-membre", { replace: true });
  }, [navigate]);

  return null;
};

export default Auth;
