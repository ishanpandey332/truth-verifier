import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ComingSoonProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ComingSoon = ({ icon: Icon, title, description }: ComingSoonProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-12 bg-card border-border text-center">
        <div className="space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">{title}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">{description}</p>
          </div>
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
            Coming Soon
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComingSoon;
