import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const userRoles = [
  { value: "admin", label: "Administrator" },
  { value: "pm", label: "Project Manager" },
  { value: "operator", label: "Data Entry Operator" },
  { value: "technician", label: "Technician" }
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard after successful login
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl gradient-primary shadow-glow mb-4">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">PO Manager</h1>
          <p className="text-muted-foreground">Equipment & Service Management System</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-card border-0 gradient-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">تسجيل الدخول</CardTitle>
            <CardDescription>
              أدخل بياناتك للوصول إلى النظام
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="أدخل البريد الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-background/60 border-border/60"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-background/60 border-border/60"
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-foreground font-medium">
                  الدور الوظيفي
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger className="pl-10 h-12 bg-background/60 border-border/60">
                      <SelectValue placeholder="اختر الدور الوظيفي" />
                    </SelectTrigger>
                    <SelectContent>
                      {userRoles.map((roleOption) => (
                        <SelectItem key={roleOption.value} value={roleOption.value}>
                          {roleOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full h-12 gradient-primary shadow-glow text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-2">بيانات تجريبية:</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>البريد: admin@company.com</p>
                  <p>كلمة المرور: admin123</p>
                  <p>الدور: Administrator</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© 2024 PO Manager System. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </div>
  );
}