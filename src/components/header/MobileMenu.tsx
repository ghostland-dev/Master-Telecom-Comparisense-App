
import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';

interface MobileMenuProps {
  isOpen: boolean;
  onCloseMenu: () => void;
}

const MobileMenu = ({ isOpen, onCloseMenu }: MobileMenuProps) => {
  const { isSignedIn } = useUser();
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden absolute top-full left-0 right-0 glass animate-fade-in border-b">
      <div className="container py-6 flex flex-col space-y-4">
        <Link 
          to="/forfaits" 
          className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors duration-200"
          onClick={onCloseMenu}
        >
          Forfaits
        </Link>
        <Link 
          to="/operateurs" 
          className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors duration-200"
          onClick={onCloseMenu}
        >
          Opérateurs
        </Link>
        <Link 
          to="/comparer" 
          className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors duration-200"
          onClick={onCloseMenu}
        >
          Comparer
        </Link>
        <Link 
          to="/guides" 
          className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors duration-200"
          onClick={onCloseMenu}
        >
          Guides
        </Link>
        
        {isSignedIn ? (
          <>
            <Link 
              to="/profile" 
              className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors duration-200 flex items-center"
              onClick={onCloseMenu}
            >
              <UserCircle className="mr-2 h-5 w-5" />
              Mon Profil
            </Link>
          </>
        ) : (
          <div className="flex flex-col space-y-2 pt-2">
            <SignInButton mode="modal">
              <Button variant="outline" className="w-full" onClick={onCloseMenu}>
                Connexion
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="w-full" onClick={onCloseMenu}>
                S'inscrire
              </Button>
            </SignUpButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
