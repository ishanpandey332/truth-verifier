import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Shield, LogOut, Settings, User, Menu, X, History, Clock } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import truthguardLogo from "@/assets/truthguard-logo.png";

export default function Navigation() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/50">
                <img src={truthguardLogo} alt="TruthGuard AI" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wide">
                TruthGuard AI
              </span>
            </Link>

            {/* History Dropdown next to logo */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden lg:flex items-center gap-2 hover-lift">
                    <History className="h-4 w-4" />
                    <span className="hidden xl:inline">History</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80 bg-card/95 backdrop-blur-lg border-2 border-border/50">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Recent Detections
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2 p-2">
                      <div className="p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/50 transition-colors cursor-pointer animate-slide-up hover-lift">
                        <p className="text-xs text-muted-foreground mb-1">Fake News Detection</p>
                        <p className="text-sm font-medium truncate">Analyzed article about...</p>
                        <p className="text-xs text-accent mt-1">2 hours ago</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/50 transition-colors cursor-pointer animate-slide-up hover-lift" style={{ animationDelay: '0.1s' }}>
                        <p className="text-xs text-muted-foreground mb-1">AI Text Detection</p>
                        <p className="text-sm font-medium truncate">Checked essay content...</p>
                        <p className="text-xs text-accent mt-1">5 hours ago</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/50 transition-colors cursor-pointer animate-slide-up hover-lift" style={{ animationDelay: '0.2s' }}>
                        <p className="text-xs text-muted-foreground mb-1">AI Image Detection</p>
                        <p className="text-sm font-medium truncate">Verified photo authenticity...</p>
                        <p className="text-xs text-accent mt-1">1 day ago</p>
                      </div>
                      <p className="text-center text-xs text-muted-foreground py-4">More history coming soon...</p>
                    </div>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/features"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">All Features</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Explore all detection capabilities
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>FAQs</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/faqs"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Frequently Asked Questions</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Get answers to common questions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/how-it-works" className={navigationMenuTriggerStyle()}>
                    How It Works
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/about" className={navigationMenuTriggerStyle()}>
                    About
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="hidden md:flex lg:hidden items-center gap-2 hover-lift">
                      <History className="h-4 w-4" />
                      History
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 bg-card/95 backdrop-blur-lg border-2 border-border/50">
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Recent Detections
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2 p-2">
                        <div className="p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/50 transition-colors cursor-pointer animate-slide-up hover-lift">
                          <p className="text-xs text-muted-foreground mb-1">Fake News Detection</p>
                          <p className="text-sm font-medium truncate">Analyzed article about...</p>
                          <p className="text-xs text-accent mt-1">2 hours ago</p>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/50 transition-colors cursor-pointer animate-slide-up hover-lift" style={{ animationDelay: '0.1s' }}>
                          <p className="text-xs text-muted-foreground mb-1">AI Text Detection</p>
                          <p className="text-sm font-medium truncate">Checked essay content...</p>
                          <p className="text-xs text-accent mt-1">5 hours ago</p>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/50 transition-colors cursor-pointer animate-slide-up hover-lift" style={{ animationDelay: '0.2s' }}>
                          <p className="text-xs text-muted-foreground mb-1">AI Image Detection</p>
                          <p className="text-sm font-medium truncate">Verified photo authenticity...</p>
                          <p className="text-xs text-accent mt-1">1 day ago</p>
                        </div>
                        <p className="text-center text-xs text-muted-foreground py-4">More history coming soon...</p>
                      </div>
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover-lift">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                          {profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-lg border-2 border-border/50">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                          {profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{profile?.full_name || "User"}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer hover-lift">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer hover-lift">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/auth")}
                  className="hidden md:inline-flex hover-lift"
                >
                  Login
                </Button>
                <Button
                  variant="glow"
                  onClick={() => navigate("/auth")}
                  className="hidden md:inline-flex hover-lift"
                >
                  Sign Up
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    to="/features"
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Features
                  </Link>
                  <Link
                    to="/faqs"
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    FAQs
                  </Link>
                  <Link
                    to="/how-it-works"
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    How It Works
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                  {!user && (
                    <>
                      <Button
                        onClick={() => {
                          navigate("/auth");
                          setMobileOpen(false);
                        }}
                        variant="outline"
                        className="w-full hover-lift"
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => {
                          navigate("/auth");
                          setMobileOpen(false);
                        }}
                        variant="glow"
                        className="w-full hover-lift"
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
