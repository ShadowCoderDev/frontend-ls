import { Link, useLocation, useNavigate } from "react-router-dom";
import { Package, ShoppingBag, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Layout = ({ children, isLoggedIn, onLogout }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/products", label: "محصولات", icon: ShoppingBag },
    { path: "/orders", label: "سفارشات", icon: Package },
    { path: "/profile", label: "پروفایل", icon: User },
  ];

  const handleLogout = () => {
    onLogout();
    navigate("/auth");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="absolute top-4 left-4">
          <ThemeToggle />
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/products" className="text-xl font-bold tracking-tight">
              فروشگاه
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    className="gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              <CartDrawer />
              <ThemeToggle />
              <Button variant="ghost" onClick={handleLogout} className="gap-2 text-destructive">
                <LogOut className="h-4 w-4" />
                خروج
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle />
              <CartDrawer />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t-2 border-foreground bg-background">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start gap-2 text-destructive"
              >
                <LogOut className="h-4 w-4" />
                خروج
              </Button>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
