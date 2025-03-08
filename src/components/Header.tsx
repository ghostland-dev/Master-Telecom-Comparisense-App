
import { useState, useEffect } from 'react';
import { Menu, X, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ease-in-out',
        isScrolled ? 'glass border-b' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2 group">
            <Smartphone className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
            <span className="font-semibold text-xl tracking-tight">CompareSense</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#plans" 
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Plans
            </a>
            <a 
              href="#providers" 
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Providers
            </a>
            <a 
              href="#compare" 
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Compare
            </a>
            <a 
              href="#guides" 
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Guides
            </a>
          </nav>

          <div className="hidden md:block">
            <Button 
              className="hover-effect rounded-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass animate-fade-in border-b">
          <div className="container py-6 flex flex-col space-y-4">
            <a 
              href="#plans" 
              className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors duration-200"
              onClick={toggleMenu}
            >
              Plans
            </a>
            <a 
              href="#providers" 
              className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors duration-200"
              onClick={toggleMenu}
            >
              Providers
            </a>
            <a 
              href="#compare" 
              className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors duration-200"
              onClick={toggleMenu}
            >
              Compare
            </a>
            <a 
              href="#guides" 
              className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors duration-200"
              onClick={toggleMenu}
            >
              Guides
            </a>
            <Button 
              className="hover-effect mt-2 rounded-full"
              onClick={toggleMenu}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
