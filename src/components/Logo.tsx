import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
        <Leaf className="w-6 h-6 text-primary-foreground" />
      </div>
      <span className="text-2xl font-heading font-bold text-foreground">
        Slim<span className="text-primary">Vita</span>
      </span>
    </Link>
  );
};

export default Logo;
