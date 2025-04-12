
import { useRef } from 'react';
 
import Hero from '@/components/Hero';
import PlanComparison from '@/components/PlanComparison';
import FeaturedPlan from '@/components/FeaturedPlan';
import Footer from '@/components/Footer';
import { phonePlans } from '@/data/plans';
import Header from '@/components/header';

const Index = () => {
  const plansRef = useRef<HTMLDivElement>(null);
  
  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const featuredPlans = phonePlans.filter(plan => plan.isFeatured);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main>
        <Hero scrollToPlans={scrollToPlans} />
        
        <section className="py-20 px-6 bg-background" ref={plansRef}>
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Forfaits en vedette</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Comparez nos meilleures sélections de forfaits téléphoniques offrant le meilleur rapport qualité-prix.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {featuredPlans.map((plan) => (
                <div key={plan.id} className="animate-scale-in">
                  <FeaturedPlan plan={plan} />
                </div>
              ))}
            </div>
            
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comparer tous les forfaits</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Trouvez le forfait téléphonique parfait pour vos besoins avec notre outil de comparaison complet.
              </p>
            </div>
            
            <div className="animate-fade-up">
              <PlanComparison plans={phonePlans} />
            </div>
          </div>
        </section>
        
        <section className="py-20 px-6 animated-gradient">
          <div className="container mx-auto">
            <div className="glass border border-border/50 rounded-2xl p-8 md:p-12 text-center animate-scale-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à trouver votre forfait idéal ?</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
                Notre outil de comparaison vous permet de trouver facilement le forfait téléphonique parfait au meilleur prix.
              </p>
              <button 
                onClick={scrollToPlans}
                className="bg-primary text-primary-foreground py-3 px-8 rounded-full font-medium hover-effect"
              >
                Comparer les forfaits maintenant
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
