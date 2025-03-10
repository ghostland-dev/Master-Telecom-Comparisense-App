
import { useState, useEffect } from "react";
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
import { UserCircle, Copy, Users, Share2, Award } from "lucide-react";
import { useAffiliation } from "@/hooks/useAffiliation";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { toast } = useToast();
  const { getUserAffiliateCode, isReferred, referralCode } = useAffiliation();
  const [affiliateCode] = useState(getUserAffiliateCode() || "");
  const [stats, setStats] = useState({
    totalReferrals: 0,
    pendingRewards: 0,
    claimedRewards: 0
  });
  
  const referralLink = `${window.location.origin}?ref=${affiliateCode}`;

  // Load affiliate stats (placeholder for demo)
  useEffect(() => {
    if (user) {
      // In a real implementation, you would fetch this from your backend
      setStats({
        totalReferrals: 0,
        pendingRewards: 0,
        claimedRewards: 0
      });
    }
  }, [user]);

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
            {isReferred && (
              <div className="pt-2">
                <p className="text-sm text-muted-foreground flex items-center">
                  <Award className="h-4 w-4 mr-2 text-primary" />
                  Vous avez été parrainé par: <span className="font-medium ml-1">{referralCode}</span>
                </p>
              </div>
            )}
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
            <CardTitle>Statistiques d'affiliation</CardTitle>
            <CardDescription>Suivez vos parrainages et récompenses</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.totalReferrals === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Vous n'avez pas encore de parrainages. Partagez votre lien pour commencer!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{stats.totalReferrals}</p>
                  <p className="text-sm text-muted-foreground">Parrainages</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{stats.pendingRewards}</p>
                  <p className="text-sm text-muted-foreground">Points en attente</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{stats.claimedRewards}</p>
                  <p className="text-sm text-muted-foreground">Points réclamés</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
