import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

interface AuthProps {
  onLogin: () => void;
}

const Auth = ({ onLogin }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "خطا",
        description: "رمز عبور و تکرار آن مطابقت ندارند",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    toast({
      title: isLogin ? "خوش آمدید!" : "ثبت‌نام موفق",
      description: isLogin ? "با موفقیت وارد شدید" : "حساب کاربری شما ایجاد شد",
    });

    onLogin();
    navigate("/products");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">فروشگاه</h1>
          <p className="text-muted-foreground">
            {isLogin ? "به حساب کاربری خود وارد شوید" : "یک حساب کاربری جدید بسازید"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="border-2 border-foreground bg-card p-6 shadow-md">
          {/* Tab Switcher */}
          <div className="flex mb-6 border-2 border-foreground">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                isLogin ? "bg-foreground text-background" : "bg-background text-foreground"
              }`}
            >
              ورود
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-center font-medium transition-colors border-r-2 border-foreground ${
                !isLogin ? "bg-foreground text-background" : "bg-background text-foreground"
              }`}
            >
              ثبت‌نام
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">نام و نام خانوادگی</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="علی احمدی"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pr-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pr-10"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pr-10 pl-10"
                  dir="ltr"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pr-10"
                    dir="ltr"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "در حال پردازش..." : isLogin ? "ورود" : "ثبت‌نام"}
            </Button>
          </form>

          {isLogin && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              رمز عبور خود را فراموش کرده‌اید؟
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
