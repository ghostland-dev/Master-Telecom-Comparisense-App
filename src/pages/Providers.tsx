
 
import Footer from '@/components/Footer';
import Header from '@/components/header';
import { providers } from '@/data/plans';

const Providers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 px-6 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-up">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Opérateurs téléphoniques</h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Découvrez les différents opérateurs disponibles et leurs offres spécifiques.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-up">
              {providers.map((provider) => (
                <div key={provider.name} className="bg-card text-card-foreground rounded-lg shadow p-6 flex flex-col items-center">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                    <img src={provider.logo} alt={provider.name} className="w-16 h-16" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{provider.name}</h3>
                  <p className="text-center text-foreground/70">
                    Forfaits et services proposés par {provider.name}.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Providers;
