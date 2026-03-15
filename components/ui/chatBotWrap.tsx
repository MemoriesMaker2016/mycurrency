import SupportChatbot from "@/components/ui/chatbot";
import { useAuthStore } from "@/zustandStore/login";

export default function ChatbotWrapper() {
  const user = useAuthStore((s) => s.user);
  return user ? <SupportChatbot /> : null;
}
