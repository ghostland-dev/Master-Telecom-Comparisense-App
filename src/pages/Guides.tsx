
 
import Footer from '@/components/Footer';
import Header from '@/components/header';

const guides = [
  {
    id: 1,
    title: "Comment choisir le bon forfait mobile ?",
    excerpt: "Découvrez les critères essentiels pour sélectionner un forfait adapté à vos besoins et à votre budget.",
    image: "/placeholder.svg",
    date: "12 Juin 2023"
  },
  {
    id: 2,
    title: "5G vs 4G : Quelles différences ?",
    excerpt: "Comprendre les avantages et inconvénients des réseaux 5G par rapport à la 4G pour faire un choix éclairé.",
    image: "/placeholder.svg",
    date: "3 Mai 2023"
  },
  {
    id: 3,
    title: "Forfaits sans engagement vs avec engagement",
    excerpt: "Analysez les avantages et inconvénients des deux types de forfaits pour prendre la meilleure décision.",
    image: "/placeholder.svg",
    date: "27 Avril 2023"
  },
  {
    id: 4,
    title: "Optimiser sa consommation de données mobiles",
    excerpt: "Astuces pratiques pour réduire votre consommation de données et éviter les suppléments.",
    image: "/placeholder.svg",
    date: "15 Mars 2023"
  }
];

const Guides = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-16 px-6 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fade-up">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Guides et conseils</h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Consultez nos guides et conseils pour vous aider à faire les meilleurs choix pour vos forfaits téléphoniques.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-up">
              {guides.map((guide) => (
                <div key={guide.id} className="bg-card text-card-foreground rounded-lg overflow-hidden shadow">
                  <div className="aspect-video bg-muted">
                    <img 
                      src={guide.image} 
                      alt={guide.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-foreground/70 mb-2">{guide.date}</div>
                    <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                    <p className="text-foreground/70 mb-4">{guide.excerpt}</p>
                    <a 
                      href="#" 
                      className="text-primary font-medium hover:underline inline-flex items-center"
                    >
                      Lire plus
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-4 h-4 ml-1"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </a>
                  </div>
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

export default Guides;
