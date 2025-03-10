
import { Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <Smartphone className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
      <span className="font-semibold text-xl tracking-tight">CompareSense</span>
    </Link>
  );
};

export default Logo;
