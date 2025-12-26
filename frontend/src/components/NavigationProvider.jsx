import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "../../utils/navigation";

const NavigationProvider = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null; // no UI
};

export default NavigationProvider;
