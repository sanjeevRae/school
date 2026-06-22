import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Lock } from "lucide-react";
import { toast } from "sonner";
import { signInAdmin, useAdminAuthState } from "../../lib/firebase/adminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAdminAuthState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/admin", { replace: true });
    }
  }, [authLoading, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInAdmin(email, password);
      toast.success("Welcome to the Admin Panel!");
      navigate("/admin", { replace: true });
    } catch (error: any) {
      toast.error(error?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 bg-slate-100 rounded-full w-fit mb-3">
            <GraduationCap className="h-8 w-8 text-slate-600" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Sign in with your Firebase admin account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading || authLoading}>
              <Lock className="h-4 w-4 mr-2" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
            <p className="font-medium">Use a Firebase Authentication admin account.</p>
            <p>Ensure your Firestore rules allow writes for authenticated admins.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
