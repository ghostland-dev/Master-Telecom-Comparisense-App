
import { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserCircle, Copy, Users, Share2 } from "lucide-react";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { toast } = useToast();
  const [affiliateCode] = useState(user?.id?.substring(0, 8) || "");
  
  const referralLink = `${window.location.origin}?ref=${affiliateCode}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié!",
      description: "Le lien a été copié dans le presse-papier."
    });
  };

  if (!user) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Veuillez vous connecter</h1>
        <p>Vous devez être connecté pour accéder à votre profil.</p>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle className="h-6 w-6" />
              Informations Personnelles
            </CardTitle>
            <CardDescription>Gérez vos informations de compte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input id="name" value={user.fullName || ""} readOnly className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.primaryEmailAddress?.emailAddress || ""} readOnly className="mt-1" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive" onClick={() => signOut()}>
              Se déconnecter
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Programme d'Affiliation
            </CardTitle>
            <CardDescription>Partagez et gagnez des récompenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="affiliateCode">Votre code d'affiliation</Label>
              <div className="flex mt-1">
                <Input id="affiliateCode" value={affiliateCode} readOnly />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => copyToClipboard(affiliateCode)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="referralLink">Lien de parrainage</Label>
              <div className="flex mt-1">
                <Input id="referralLink" value={referralLink} readOnly />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => copyToClipboard(referralLink)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="pt-4">
              <Button className="w-full" onClick={() => copyToClipboard(referralLink)}>
                <Share2 className="mr-2 h-4 w-4" />
                Partager votre lien
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Gagnez des points chaque fois que quelqu'un s'inscrit avec votre code!
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Historique des parrainages</CardTitle>
            <CardDescription>Suivez vos parrainages et récompenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Vous n'avez pas encore de parrainages. Partagez votre lien pour commencer!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
