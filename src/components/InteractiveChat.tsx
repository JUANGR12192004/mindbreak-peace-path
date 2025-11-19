import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Sparkles, Mic, LogOut, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/utils/streamChat";
import { supabase } from "@/integrations/supabase/client";

type Message = { role: "user" | "assistant"; content: string };

const InteractiveChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      loadMessages();
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleMoodSelected = (event: any) => {
      const { mood, context } = event.detail;
      setMessage(`Hola, me siento ${mood.toLowerCase()}. ${context}`);
    };
    
    window.addEventListener('moodSelected', handleMoodSelected);
    return () => window.removeEventListener('moodSelected', handleMoodSelected);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMessages = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .limit(50);

    if (!error && data) {
      const loadedMessages = data.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      }));
      setMessages(loadedMessages);
    }
  };

  const saveMessage = async (role: "user" | "assistant", content: string) => {
    if (!user) return;
    
    await supabase.from('chat_messages').insert({
      user_id: user.id,
      role,
      content
    });
  };

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: message };
    setMessages(prev => [...prev, userMsg]);
    setMessage("");
    setIsLoading(true);

    await saveMessage("user", userMsg.content);

    let assistantContent = "";
    const upsertAssistant = (nextChunk: string) => {
      assistantContent += nextChunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => 
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: async () => {
          setIsLoading(false);
          await saveMessage("assistant", assistantContent);
        },
        onError: (error) => {
          setIsLoading(false);
          toast({
            title: "Error",
            description: error,
            variant: "destructive",
          });
        }
      });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje",
        variant: "destructive",
      });
    }
  };

  const handleVoiceInput = () => {
    toast({
      title: "Entrada por voz",
      description: "La funcionalidad de voz estará disponible próximamente.",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <section id="chat" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar sesión
              </Button>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Espacio seguro</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Chat Interactivo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un espacio confidencial donde puedes expresar tus sentimientos y recibir
              apoyo inmediato. Disponible 24/7.
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="shadow-card overflow-hidden">
            {/* Chat Header */}
            <div className="gradient-hero p-6 text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Asistente de Bienestar</h3>
                  <p className="text-sm opacity-90">Siempre disponible para ti</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto bg-background">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>Escribe un mensaje para comenzar...</p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === "user"
                        ? "gradient-hero text-primary-foreground"
                        : "gradient-card border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handleVoiceInput}>
                  <Mic className="w-5 h-5" />
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Escribe tu mensaje aquí..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  variant="hero" 
                  size="icon" 
                  onClick={handleSend}
                  disabled={isLoading || !message.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Tus conversaciones son completamente confidenciales
              </p>
            </div>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="p-6 text-center gradient-card">
              <MessageCircle className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h4 className="font-bold mb-2">Respuestas empáticas</h4>
              <p className="text-sm text-muted-foreground">
                Apoyo emocional cuando lo necesitas
              </p>
            </Card>
            <Card className="p-6 text-center gradient-card">
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-secondary" />
              <h4 className="font-bold mb-2">IA real integrada</h4>
              <p className="text-sm text-muted-foreground">
                Respuestas inteligentes personalizadas
              </p>
            </Card>
            <Card className="p-6 text-center gradient-card">
              <Mic className="w-8 h-8 mx-auto mb-3 text-accent" />
              <h4 className="font-bold mb-2">Entrada por voz</h4>
              <p className="text-sm text-muted-foreground">
                Expresa tus sentimientos hablando
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveChat;
