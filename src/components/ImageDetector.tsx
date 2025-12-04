import { useState } from "react";
import { Upload, Image as ImageIcon, AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DetectionResult {
  verdict: "real" | "ai";
  confidence: number;
  reasoning: string;
}

const ImageDetector = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setImageUrl(url);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imageUrl) {
      toast({
        title: "No Image",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("detect-ai-image", {
        body: { imageUrl },
      });

      if (error) throw error;

      setResult(data);
      toast({
        title: "Analysis Complete",
        description: "Image has been analyzed successfully.",
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <ImageIcon className="h-6 w-6 text-primary" />
              AI Image Detector
            </h2>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            {imageUrl ? (
              <div className="space-y-4">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="max-h-[400px] mx-auto rounded-lg"
                />
                <label htmlFor="image-reupload">
                  <Button variant="outline" className="cursor-pointer hover-lift" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Different Image
                    </span>
                  </Button>
                  <input
                    id="image-reupload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            ) : (
              <label htmlFor="image-upload" className="cursor-pointer block">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Click to upload an image</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {imageUrl && (
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-lift"
            >
              {isAnalyzing ? "Analyzing..." : "Detect AI Generation"}
            </Button>
          )}
        </div>
      </Card>

      {result && (
        <Card className="p-6 bg-card border-border animate-in fade-in-50 duration-500">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Detection Result</h3>
              {result.verdict === "real" ? (
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Real Image</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-semibold">AI Generated</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Confidence Score</span>
                <span className="font-semibold">{result.confidence}%</span>
              </div>
              <Progress 
                value={result.confidence} 
                className={result.verdict === "real" ? "bg-success/20" : "bg-destructive/20"}
              />
            </div>

            <div className="p-4 rounded-lg bg-secondary/50">
              <h4 className="font-semibold text-foreground mb-2">Analysis Reasoning</h4>
              <p className="text-sm text-muted-foreground">{result.reasoning}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImageDetector;
