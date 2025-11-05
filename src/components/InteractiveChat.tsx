import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Sparkles, Mic } from "lucide-react";
import { useState } from "react";

const InteractiveChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      text: "Hola, soy tu asistente de bienestar. Estoy aquí para escucharte y ayudarte. ¿Cómo te sientes hoy?"
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, { type: "user", text: message }]);
    setMessage("");
    
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: "assistant",
        text: "Gracias por compartir. Es completamente normal sentirse así. ¿Te gustaría que te sugiera algunas técnicas de relajación?"
      }]);
    }, 1000);
  };

  return (
    <section id="chat" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
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
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.type === "user"
                        ? "gradient-hero text-primary-foreground"
                        : "gradient-card border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Mic className="w-5 h-5" />
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Escribe tu mensaje aquí..."
                  className="flex-1"
                />
                <Button variant="hero" size="icon" onClick={handleSend}>
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
              <h4 className="font-bold mb-2">Sugerencias útiles</h4>
              <p className="text-sm text-muted-foreground">
                Técnicas y recursos personalizados
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
