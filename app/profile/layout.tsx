import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "sonner";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
        <AuthProvider>
          <Toaster position="top-right" richColors />
          {children} {/* Only render the profile page */}
        </AuthProvider>
  
  );
}