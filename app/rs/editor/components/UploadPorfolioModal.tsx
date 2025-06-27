'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { usePortfolio } from "@/lib/portfolio-context";
import { PortfolioData } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface UploadPortfolioModalProps {
  open: boolean;
  onClose: () => void;
}

const UploadPortfolioModal: React.FC<UploadPortfolioModalProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const { dispatch } = usePortfolio();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const text = await file.text();
      const portfolioData = JSON.parse(text) as PortfolioData;
      
      // Validate the imported data (basic validation)
      if (!portfolioData.personalInfo || !portfolioData.themeSettings) {
        throw new Error("Invalid portfolio data format");
      }
      
      dispatch({ type: "IMPORT_PORTFOLIO", payload: portfolioData });
      
      toast({
        title: "Portfolio uploaded successfully",
        description: "Your portfolio data has been imported.",
        duration: 3000,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error uploading portfolio",
        description: "The file format is invalid. Please upload a valid portfolio JSON file.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Portfolio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="portfolio-file">Portfolio JSON File</Label>
            <Input
              id="portfolio-file"
              type="file"
              accept=".json"
              onChange={handleFileChange}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Upload a JSON file containing your portfolio data. This will replace your current portfolio.
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!file}>
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPortfolioModal;
