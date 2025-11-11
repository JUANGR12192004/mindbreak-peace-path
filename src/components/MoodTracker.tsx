import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import moodIcon from "@/assets/mood-icon.jpg";

const moods = [
  { icon: Smile, label: "Excelente", color: "text-accent", bgColor: "bg-accent/10" },
  { icon: Heart, label: "Bien", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Meh, label: "Normal", color: "text-secondary", bgColor: "bg-secondary/10" },
  { icon: Frown, label: "Bajo", color: "text-muted-foreground", bgColor: "bg-muted" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSaveMood = async () => {
    if (selectedMood === null) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para guardar tu estado de ánimo",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from('mood_entries').insert({
      user_id: user.id,
      mood: moods[selectedMood].label
    });

    if (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar tu estado",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "¡Estado guardado!",
      description: `Tu estado "${moods[selectedMood].label}" ha sido registrado exitosamente.`,
    });
  };

  return (
    <section id="estado-animo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Seguimiento emocional</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Cómo te sientes hoy?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Registra tu estado de ánimo para obtener recomendaciones personalizadas
              y llevar un seguimiento de tu bienestar emocional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Mood Selection */}
            <Card className="p-8 shadow-card gradient-card">
              <h3 className="text-2xl font-bold mb-6">Selecciona tu estado</h3>
              <div className="grid grid-cols-2 gap-4">
                {moods.map((mood, index) => {
                  const Icon = mood.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedMood(index)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        selectedMood === index
                          ? `${mood.bgColor} border-current ${mood.color} scale-105 shadow-card`
                          : "border-border hover:border-primary/50 hover:shadow-soft"
                      }`}
                    >
                      <Icon className={`w-12 h-12 mx-auto mb-3 ${selectedMood === index ? mood.color : "text-muted-foreground"}`} />
                      <div className={`font-semibold ${selectedMood === index ? mood.color : "text-foreground"}`}>
                        {mood.label}
                      </div>
                    </button>
                  );
                })}
              </div>
              {selectedMood !== null && (
                <Button variant="hero" className="w-full mt-6" size="lg" onClick={handleSaveMood}>
                  Guardar mi estado
                </Button>
              )}
            </Card>

            {/* Visual/Info */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-card">
                <img 
                  src={moodIcon} 
                  alt="Estado de ánimo" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <Card className="p-6 gradient-card">
                <h4 className="font-bold text-lg mb-3">¿Por qué es importante?</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Identifica patrones en tu estado de ánimo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
                    <span>Recibe recomendaciones personalizadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    <span>Celebra tus días positivos</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodTracker;
