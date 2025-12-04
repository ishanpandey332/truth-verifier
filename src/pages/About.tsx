import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github } from "lucide-react";
import { Shield, Target, Users, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            About TruthGuard AI
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Empowering truth in the age of artificial intelligence
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-2 border-border/50">
            <CardHeader>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                In an era where AI-generated content and misinformation are becoming increasingly sophisticated, TruthGuard AI stands as a beacon of truth and authenticity. Our mission is to empower individuals, organizations, and communities with the tools they need to distinguish fact from fiction.
              </p>
              <p>
                We believe that access to accurate information is a fundamental right. By leveraging cutting-edge artificial intelligence technology, we're creating a safer, more trustworthy digital ecosystem for everyone.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-border/50 text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  A world where truth prevails and misinformation has no place
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-border/50 text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Our Team</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AI researchers, developers, and truth advocates working together
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-border/50 text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Transparency, accuracy, privacy, and accessibility for all
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-2xl">Why TruthGuard AI?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The rise of generative AI has brought incredible opportunities, but also significant challenges. Deepfakes, AI-generated misinformation, and synthetic content can deceive even the most discerning eyes. TruthGuard AI was created to address these challenges head-on.
              </p>
              <p className="text-muted-foreground">
                Our platform combines multiple AI detection technologies to provide comprehensive, reliable results. Whether you're a journalist verifying sources, an educator checking student work, or simply someone who wants to ensure the authenticity of online content, TruthGuard AI is here to help.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-card to-card/50 hover-lift">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-6 w-6 text-accent" />
                <CardTitle className="text-2xl">Meet Our Creators</CardTitle>
              </div>
              <CardDescription>The minds behind TruthGuard AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Creator Card 1 - Placeholder */}
                <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border/50 hover:border-primary/50 transition-all hover-lift">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">?</span>
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">Creator Name</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">Role / Position</p>
                  <div className="flex justify-center gap-3">
                    <button className="p-2 rounded-full bg-background/50 hover:bg-primary/20 transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-full bg-background/50 hover:bg-primary/20 transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-full bg-background/50 hover:bg-primary/20 transition-colors">
                      <Github className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Creator Card 2 - Placeholder */}
                <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border/50 hover:border-primary/50 transition-all hover-lift">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-primary mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">?</span>
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">Creator Name</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">Role / Position</p>
                  <div className="flex justify-center gap-3">
                    <button className="p-2 rounded-full bg-background/50 hover:bg-primary/20 transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-full bg-background/50 hover:bg-primary/20 transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-full bg-background/50 hover:bg-primary/20 transition-colors">
                      <Github className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Creator Card 3 - Placeholder */}
                <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-border/50 hover:border-primary/50 transition-all hover-lift">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-success mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">?</span>
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">Creator Name</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">Role / Position</p>
                  <div className="flex justify-center gap-3">
                    <button className="p-2 rounded-full bg-background/50 hover:bg-primary/20 transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-full bg-background/50 hover:bg-primary/20 transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-full bg-background/50 hover:bg-primary/20 transition-colors">
                      <Github className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6 italic">
                You can customize these cards with your own information, photos, and social links.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
