import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import moodIcon from "@/assets/mood-icon.jpg";

const moods = [
  { icon: Smile, label: "Excelente", color: "text-accent", bgColor: "bg-accent/10", context: "Me siento muy bien hoy. Quiero mantener este estado positivo." },
  { icon: Heart, label: "Bien", color: "text-primary", bgColor: "bg-primary/10", context: "Estoy en un buen estado de ánimo." },
  { icon: Meh, label: "Normal", color: "text-secondary", bgColor: "bg-secondary/10", context: "Me siento neutral hoy." },
  { icon: Frown, label: "Bajo", color: "text-muted-foreground", bgColor: "bg-muted", context: "No me siento muy bien hoy. Necesito apoyo." },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSaveMood = async () => {
    if (selectedMood === null) return;
    
    if (!user) {
      toast({ title: "Inicia sesión", description: "Debes iniciar sesión para continuar", variant: "destructive" });
      navigate("/auth");
      return;
    }

    await supabase.from('mood_entries').insert({ user_id: user.id, mood: moods[selectedMood].label });
    toast({ title: "¡Estado guardado!", description: "Redirigiendo al chat..." });
    
    setTimeout(() => {
      const chatSection = document.getElementById('chat');
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth' });
        window.dispatchEvent(new CustomEvent('moodSelected', { 
          detail: { mood: moods[selectedMood].label, context: moods[selectedMood].context }
        }));
      }
    }, 500);
  };

  return (
    <section id="estado-animo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Seguimiento emocional</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">¿Cómo te sientes hoy?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Registra tu estado y habla con nuestro asistente para recibir apoyo personalizado.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="p-8 shadow-card gradient-card">
              <h3 className="text-2xl font-bold mb-6">Selecciona tu estado</h3>
              <div className="grid grid-cols-2 gap-4">
                {moods.map((mood, index) => {
                  const Icon = mood.icon;
                  return (
                    <button key={index} onClick={() => setSelectedMood(index)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        selectedMood === index ? `${mood.bgColor} border-current ${mood.color} scale-105 shadow-card` : "border-border hover:border-primary/50 hover:shadow-soft"
                      }`}>
                      <Icon className={`w-12 h-12 mx-auto mb-3 ${selectedMood === index ? mood.color : "text-muted-foreground"}`} />
                      <div className={`font-semibold ${selectedMood === index ? mood.color : "text-foreground"}`}>{mood.label}</div>
                    </button>
                  );
                })}
              </div>
              {selectedMood !== null && (
                <Button variant="hero" className="w-full mt-6" size="lg" onClick={handleSaveMood}>Hablar con el asistente</Button>
              )}
            </Card>
            <Card className="p-6 shadow-soft">
              <img src={moodIcon} alt="Estado de ánimo" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-3">¿Por qué es importante?</h3>
              <p className="text-muted-foreground mb-4">Reconocer tus emociones es el primer paso para el bienestar mental.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodTracker;
