
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
            <span className="text-sm font-medium">Find Your Perfect Phone Plan</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Compare. Choose. <span className="text-primary">Save.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          Discover the best phone plans tailored to your needs. Transparent comparisons help you make the right choice.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg" 
            className="hover-effect rounded-full text-base px-6"
            onClick={scrollToPlans}
          >
            Compare Plans
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="hover-effect rounded-full text-base px-6"
          >
            View Providers
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
          <h3 className="font-medium text-lg mb-2">Best Coverage</h3>
          <p className="text-foreground/70 text-sm">Compare network coverage across all major providers</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Percent className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-medium text-lg mb-2">Save Money</h3>
          <p className="text-foreground/70 text-sm">Find the most affordable plans that match your needs</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-medium text-lg mb-2">Tailored Plans</h3>
          <p className="text-foreground/70 text-sm">Get personalized recommendations based on your usage</p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <button 
          onClick={scrollToPlans} 
          className="flex flex-col items-center text-foreground/60 hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
