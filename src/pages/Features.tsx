import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Image, Video, Shield, Zap, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Fake News Detection",
      description: "Advanced AI algorithms analyze news articles and headlines to detect misinformation and fake news with high accuracy.",
      color: "from-blue-500 to-cyan-500",
      link: "/?tab=news",
    },
    {
      icon: MessageSquare,
      title: "AI Text Detection",
      description: "Distinguish between human-written and AI-generated text using cutting-edge natural language processing.",
      color: "from-purple-500 to-pink-500",
      link: "/?tab=text",
    },
    {
      icon: Image,
      title: "AI Image Detection",
      description: "Identify AI-generated images and deepfakes with advanced computer vision technology.",
      color: "from-green-500 to-teal-500",
      link: "/?tab=image",
    },
    {
      icon: Video,
      title: "Video Analysis (Coming Soon)",
      description: "Comprehensive deepfake video detection capabilities are currently in development.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Real-Time Protection",
      description: "Get instant results and protect yourself from misinformation in real-time.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Powered by state-of-the-art AI models for quick and accurate detection.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Access our detection tools from anywhere, anytime, on any device.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data is secure and private. We don't store your analyzed content.",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Powerful Features
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Advanced AI-powered detection tools to help you identify fake news, AI-generated content, and misinformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover-lift group"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">{feature.description}</CardDescription>
                {feature.link && (
                  <Button 
                    variant="glow" 
                    className="w-full" 
                    onClick={() => navigate(feature.link)}
                  >
                    Try Now
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
