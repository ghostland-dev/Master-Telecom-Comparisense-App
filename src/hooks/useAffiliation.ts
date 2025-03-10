
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useToast } from '@/hooks/use-toast';

export function useAffiliation() {
  const { user, isSignedIn } = useUser();
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  
  // Check URL for referral code when component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    
    if (ref) {
      setReferralCode(ref);
      localStorage.setItem('referralCode', ref);
      
      toast({
        title: "Code de parrainage détecté",
        description: "Vous êtes arrivé via un lien de parrainage",
      });
    } else {
      // Check localStorage for previously stored referral code
      const storedRef = localStorage.getItem('referralCode');
      if (storedRef) {
        setReferralCode(storedRef);
      }
    }
  }, [toast]);
  
  // Track referral conversion when user signs up
  useEffect(() => {
    const recordReferral = async () => {
      const storedRef = localStorage.getItem('referralCode');
      
      if (isSignedIn && user && storedRef) {
        // In a real implementation, you would send this to your backend
        console.log(`User ${user.id} was referred by ${storedRef}`);
        
        // Clear the referral code from localStorage after recording it
        // localStorage.removeItem('referralCode');
        
        toast({
          title: "Parrainage réussi!",
          description: "Votre inscription a été créditée au parrain.",
        });
      }
    };
    
    recordReferral();
  }, [isSignedIn, user, toast]);
  
  return {
    referralCode,
    isReferred: !!referralCode,
    clearReferralCode: () => {
      localStorage.removeItem('referralCode');
      setReferralCode(null);
    }
  };
}
