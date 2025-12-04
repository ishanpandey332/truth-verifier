import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Brain, CheckCircle, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "1. Upload or Paste Content",
      description: "Simply paste text, upload a file, or select an image you want to analyze. Our platform supports various formats.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Brain,
      title: "2. AI Analysis",
      description: "Our advanced AI models process your content using state-of-the-art machine learning algorithms to detect patterns and anomalies.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: CheckCircle,
      title: "3. Get Results",
      description: "Receive instant, detailed results with confidence scores and explanations about the authenticity of your content.",
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our AI-powered detection process is simple, fast, and accurate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-2 border-border/50 h-full">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{step.description}</CardDescription>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50 hover-lift">
            <CardHeader>
              <CardTitle className="text-2xl">The Technology Behind TruthGuard AI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                TruthGuard AI leverages cutting-edge artificial intelligence and machine learning models trained on vast datasets of authentic and synthetic content. Our system uses:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Natural Language Processing (NLP)</strong> - Advanced algorithms analyze text patterns, sentiment, and linguistic structures to detect AI-generated content and misinformation</li>
                <li><strong>Computer Vision</strong> - Deep neural networks examine pixel-level details, artifacts, and inconsistencies in images to identify AI-generated or manipulated visuals</li>
                <li><strong>Deep Learning</strong> - Multi-layered neural networks trained on millions of samples to recognize subtle patterns invisible to the human eye</li>
                <li><strong>Multi-modal Analysis</strong> - Comprehensive evaluation combining text, image, and metadata analysis for higher accuracy</li>
                <li><strong>Behavioral Pattern Recognition</strong> - Identifies suspicious patterns in content creation and distribution typical of fake news campaigns</li>
              </ul>
              <p className="text-muted-foreground">
                Our models are continuously updated and retrained with the latest data to stay ahead of evolving AI generation techniques. We collaborate with leading research institutions and maintain a database of over 100 million verified samples to ensure the highest accuracy in detection.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-card to-card/50 hover-lift">
            <CardHeader>
              <CardTitle className="text-2xl">Why Trust Matters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                In an era where AI can generate realistic text, images, and even videos, distinguishing real from fake has never been more critical. Misinformation can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Influence public opinion and decision-making</li>
                <li>Damage reputations and spread false narratives</li>
                <li>Undermine trust in legitimate information sources</li>
                <li>Create confusion and social division</li>
              </ul>
              <p className="text-muted-foreground">
                TruthGuard AI empowers individuals, journalists, researchers, and organizations to verify content authenticity and make informed decisions based on trustworthy information.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-success/20 bg-gradient-to-br from-card to-card/50 hover-lift">
            <CardHeader>
              <CardTitle className="text-2xl">Real-World Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <h4 className="font-semibold mb-2 text-primary">Journalism</h4>
                  <p className="text-sm text-muted-foreground">Verify sources and fact-check information before publication</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <h4 className="font-semibold mb-2 text-primary">Education</h4>
                  <p className="text-sm text-muted-foreground">Detect AI-generated essays and ensure academic integrity</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <h4 className="font-semibold mb-2 text-primary">Social Media</h4>
                  <p className="text-sm text-muted-foreground">Identify fake news and misleading content before sharing</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <h4 className="font-semibold mb-2 text-primary">Business</h4>
                  <p className="text-sm text-muted-foreground">Protect brand reputation by monitoring for fake content</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
