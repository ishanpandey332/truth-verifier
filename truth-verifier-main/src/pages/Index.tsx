import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Video } from "lucide-react";
import NewsDetector from "@/components/NewsDetector";
import TextDetector from "@/components/TextDetector";
import ImageDetector from "@/components/ImageDetector";
import ComingSoon from "@/components/ComingSoon";

export default function Index() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-in fade-in-50 duration-500">
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                TruthGuard AI
              </h1>
            </div>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Advanced AI-powered detection for fake news, AI-generated content, and synthetic media
            </p>
          </div>

          {/* Detection Tabs */}
          <Tabs defaultValue="news" className="w-full animate-in fade-in-50 duration-500" style={{ animationDelay: '100ms' }}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-card/50 p-2">
              <TabsTrigger value="news" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent">
                Fake News
              </TabsTrigger>
              <TabsTrigger value="text" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent">
                AI Text
              </TabsTrigger>
              <TabsTrigger value="image" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent">
                AI Image
              </TabsTrigger>
              <TabsTrigger value="video" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent">
                Video
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="news" className="space-y-4">
                <NewsDetector />
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <TextDetector />
              </TabsContent>

              <TabsContent value="image" className="space-y-4">
                <ImageDetector />
              </TabsContent>

              <TabsContent value="video" className="space-y-4">
                <ComingSoon 
                  icon={Video}
                  title="Video Detection Coming Soon"
                  description="Our advanced video analysis system is currently in development. Soon you'll be able to detect deepfakes and AI-generated videos."
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
