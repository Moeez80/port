import { useState } from "react";
import AdminLogin from "@/components/AdminLogin";
import AdminPanel from "@/components/AdminPanel";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return <AdminPanel onLogout={() => setIsLoggedIn(false)} />;
}
