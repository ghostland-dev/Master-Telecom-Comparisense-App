
import { ChevronDown, Smartphone, Signal, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroProps {
  scrollToPlans: () => void;
}

const Hero = ({ scrollToPlans }: HeroProps) => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden animated-gradient">
      <div className="absolute inset-0 bg-grid-white/20 pattern-opacity-20"></div>
      
      {/* Centered content */}
      <div className="container mx-auto px-6 flex flex-col items-center text-center z-10">
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary mb-6">
            <Smartphone className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Trouvez votre forfait idéal</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Comparez. Choisissez. <span className="text-primary">Économisez.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          Découvrez les meilleurs forfaits téléphoniques adaptés à vos besoins. Des comparaisons transparentes pour vous aider à faire le bon choix.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg" 
            className="hover-effect rounded-full text-base px-6"
            onClick={scrollToPlans}
          >
            Comparer les forfaits
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="hover-effect rounded-full text-base px-6"
          >
            Voir les opérateurs
          </Button>
        </div>
      </div>
      
      {/* Benefits section */}
      <div className={cn(
        "w-full max-w-4xl mx-auto glass rounded-2xl p-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6",
        "animate-fade-up border border-border/50 z-10"
      )} style={{ animationDelay: '0.5s' }}>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Signal className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-medium text-lg mb-2">Meilleure couverture</h3>
          <p className="text-foreground/70 text-sm">Comparez la couverture réseau de tous les principaux opérateurs</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Percent className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-medium text-lg mb-2">Économisez</h3>
          <p className="text-foreground/70 text-sm">Trouvez les forfaits les plus abordables qui correspondent à vos besoins</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-medium text-lg mb-2">Forfaits personnalisés</h3>
          <p className="text-foreground/70 text-sm">Obtenez des recommandations personnalisées selon votre utilisation</p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <button 
          onClick={scrollToPlans} 
          className="flex flex-col items-center text-foreground/60 hover:text-primary transition-colors"
          aria-label="Défiler vers le bas"
        >
          <span className="text-sm mb-2">Défiler pour explorer</span>
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
