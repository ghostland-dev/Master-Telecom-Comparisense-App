
import { Link } from 'react-router-dom';

const DesktopNav = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link 
        to="/forfaits" 
        className="text-foreground/80 hover:text-primary transition-colors duration-200"
      >
        Forfaits
      </Link>
      <Link 
        to="/operateurs" 
        className="text-foreground/80 hover:text-primary transition-colors duration-200"
      >
        Opérateurs
      </Link>
      <Link 
        to="/comparer" 
        className="text-foreground/80 hover:text-primary transition-colors duration-200"
      >
        Comparer
      </Link>
      <Link 
        to="/guides" 
        className="text-foreground/80 hover:text-primary transition-colors duration-200"
      >
        Guides
      </Link>
    </nav>
  );
};

export default DesktopNav;
