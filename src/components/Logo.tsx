import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

interface LogoProps {
  variant?: "light" | "dark";
}

const Logo = ({ variant = "dark" }: LogoProps) => {
  const textColor = variant === "light" ? "text-white" : "text-foreground";
  const accentColor = variant === "light" ? "text-green-300" : "text-primary";

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
        <Leaf className="w-6 h-6 text-primary-foreground" />
      </div>
      <span className={`text-2xl font-heading font-bold ${textColor}`}>
        Slim<span className={accentColor}>Vita</span>
      </span>
    </Link>
  );
};

export default Logo;
