
import Header from '@/components/header';
import Footer from '@/components/Footer';
import PlanComparison from '@/components/PlanComparison';
import { phonePlans } from '@/data/plans';

const Plans = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 px-6 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-up">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Forfaits téléphoniques</h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Découvrez et comparez tous nos forfaits téléphoniques pour trouver celui qui correspond le mieux à vos besoins.
              </p>
            </div>
            
            <div className="animate-fade-up">
              <PlanComparison plans={phonePlans} />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Plans;
