
import { Smartphone, Mail, Heart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const Footer = () => {
  return (
    <footer className="bg-background pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-4">
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="h-6 w-6 text-primary" />
              <span className="font-semibold text-xl tracking-tight">CompareSense</span>
            </div>
            <p className="text-foreground/70 mb-6 max-w-xs">
              Nous vous aidons à trouver le forfait téléphonique idéal avec des comparaisons transparentes et impartiales.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@comparesense.com</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-medium mb-4">Entreprise</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" />
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" />
                  Carrières
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" />
                  Partenaires
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" />
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-medium mb-4">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" />
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" />
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="font-medium mb-4">Abonnez-vous à notre newsletter</h4>
            <p className="text-foreground/70 text-sm mb-4">
              Recevez les dernières mises à jour, offres et promotions directement dans votre boîte de réception.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Votre adresse email" 
                className="bg-secondary/50 border-secondary" 
              />
              <Button>S'abonner</Button>
            </div>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CompareSense. Tous droits réservés.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors duration-200">Conditions</a>
            <a href="#" className="hover:text-primary transition-colors duration-200">Confidentialité</a>
            <a href="#" className="hover:text-primary transition-colors duration-200">Cookies</a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-foreground/40">
          <p className="flex items-center justify-center">
            Conçu avec <Heart className="h-3 w-3 mx-1 text-primary" /> pour des comparaisons transparentes
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
