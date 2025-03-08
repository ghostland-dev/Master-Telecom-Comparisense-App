
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SaveComparisonDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const SaveComparisonDialog = ({ open, onClose, onSave }: SaveComparisonDialogProps) => {
  const [comparisonName, setComparisonName] = useState("");
  
  const handleSave = () => {
    if (comparisonName.trim() === "") return;
    onSave(comparisonName);
    setComparisonName("");
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sauvegarder la comparaison</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              value={comparisonName}
              onChange={(e) => setComparisonName(e.target.value)}
              className="col-span-3"
              placeholder="Ma comparaison"
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave} disabled={comparisonName.trim() === ""}>Sauvegarder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveComparisonDialog;
