import React from "react";
import { usePortfolio } from "@/lib/portfolio-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus, ChevronUp, ChevronDown } from "lucide-react";
import { NavigationLink } from "@/types";

const NavigationEditor: React.FC = () => {
  const { state, dispatch } = usePortfolio();
  const { portfolioData } = state;

  // Initialize navigation if it doesn't exist
  const navigation = portfolioData.navigation || {
    links: [
      { label: "Portfolio", url: "/builder" },
      { label: "Contact", url: "/contact" },
    ]
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...navigation.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };

    dispatch({
      type: "UPDATE_NAVIGATION",
      payload: {
        ...navigation,
        links: updatedLinks
      }
    });
  };

  const addLink = () => {
    dispatch({
      type: "UPDATE_NAVIGATION",
      payload: {
        ...navigation,
        links: [...navigation.links, { label: "New Link", url: "#" }]
      }
    });
  };

  const removeLink = (index: number) => {
    const updatedLinks = navigation.links.filter((_, i) => i !== index);
    
    dispatch({
      type: "UPDATE_NAVIGATION",
      payload: {
        ...navigation,
        links: updatedLinks
      }
    });
  };

  const moveLink = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || 
        (direction === "down" && index === navigation.links.length - 1)) {
      return;
    }

    const updatedLinks = [...navigation.links];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    
    [updatedLinks[index], updatedLinks[newIndex]] = [updatedLinks[newIndex], updatedLinks[index]];
    
    dispatch({
      type: "UPDATE_NAVIGATION",
      payload: {
        ...navigation,
        links: updatedLinks
      }
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium">Navigation Links</h3>
      
      {navigation.links.map((link, index) => (
        <div key={index} className="space-y-2 border p-3 rounded-md">
          <div className="flex justify-between">
            <Label htmlFor={`link-${index}-label`}>Link Text</Label>
            <div className="flex space-x-1">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => moveLink(index, "up")}
                disabled={index === 0}
                className="h-6 w-6"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => moveLink(index, "down")}
                disabled={index === navigation.links.length - 1}
                className="h-6 w-6"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => removeLink(index)}
                className="h-6 w-6 text-destructive"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Input
            id={`link-${index}-label`}
            value={link.label}
            onChange={(e) => handleLinkChange(index, "label", e.target.value)}
            className="mt-1"
          />
          
          <Label htmlFor={`link-${index}-url`}>URL</Label>
          <Input
            id={`link-${index}-url`}
            value={link.url}
            onChange={(e) => handleLinkChange(index, "url", e.target.value)}
            className="mt-1"
          />
        </div>
      ))}
      
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={addLink} 
        className="w-full mt-2"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Navigation Link
      </Button>
    </div>
  );
};

export default NavigationEditor;
