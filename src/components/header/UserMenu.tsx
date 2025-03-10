
import { Link } from 'react-router-dom';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="hidden md:flex items-center space-x-4">
      {isSignedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <UserButton afterSignOutUrl="/" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer">
                Mon Profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer">
                Programme d'Affiliation
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/comparer" className="cursor-pointer">
                Mes Comparaisons
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <SignInButton mode="modal">
            <Button variant="ghost">Connexion</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="hover-effect rounded-full">S'inscrire</Button>
          </SignUpButton>
        </>
      )}
    </div>
  );
};

export default UserMenu;
