import { useState } from "react";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DetectionResult {
  verdict: "real" | "fake";
  confidence: number;
  reasoning: string;
}

const NewsDetector = () => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some news content to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("detect-fake-news", {
        body: { text },
      });

      if (error) throw error;

      setResult(data);
      toast({
        title: "Analysis Complete",
        description: "News content has been analyzed successfully.",
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze the content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setText(content);
      toast({
        title: "File Loaded",
        description: "Content has been loaded successfully.",
      });
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Fake News Detector
            </h2>
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer hover-lift" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </span>
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".txt,.doc,.docx"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          <Textarea
            placeholder="Paste your news article here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] bg-secondary/50 border-border"
          />

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !text.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-lift"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze News"}
          </Button>
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
                  <span className="font-semibold">Likely Real</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-semibold">Likely Fake</span>
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

export default NewsDetector;
