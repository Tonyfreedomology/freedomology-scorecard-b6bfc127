
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FreedomologyLogo = ({ variant = "freedomology" }: { variant?: "freedomology" | "9gauge" }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleImageError = () => {
    console.error("Failed to load logo");
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log("Successfully loaded logo");
  };

  const handleLogoClick = () => {
    console.log("Logo clicked, navigating to landing page");
    navigate("/");
  };

  const logoUrl = variant === "9gauge" 
    ? "https://static.wixstatic.com/media/af616c_8ec2241a2677440ebf9451bbfa6ec4ce~mv2.png"
    : "https://static.wixstatic.com/media/af616c_750d594b45cd42a4bb4f3290aad0fa61~mv2.png";

  if (imageError) {
    return (
      <div 
        onClick={handleLogoClick}
        className="text-xl font-bold text-center mb-8 text-white cursor-pointer hover:opacity-80 transition-opacity"
      >
        {variant === "9gauge" ? "9 Gauge" : "Freedomology"}
      </div>
    );
  }

  return (
    <img 
      src={logoUrl}
      alt={variant === "9gauge" ? "9 Gauge" : "Freedomology"}
      className="h-20 md:h-24 mx-auto mb-8 transform transition-all duration-300 hover:scale-105 cursor-pointer"
      onError={handleImageError}
      onLoad={handleImageLoad}
      onClick={handleLogoClick}
    />
  );
};

