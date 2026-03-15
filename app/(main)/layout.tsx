import Header from "@/components/header";
import { RateTicker } from "@/components/rate-ticker";
import Footer from "@/components/footer";
import SupportChatbot from "@/components/ui/chatbot";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Header />
      <RateTicker />
      {children}
      <Footer />
      <SupportChatbot />
    </>
  );
}