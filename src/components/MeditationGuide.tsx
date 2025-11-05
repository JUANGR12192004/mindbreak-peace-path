import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, Sparkles, Volume2 } from "lucide-react";
import meditationIcon from "@/assets/meditation-icon.jpg";

const meditations = [
  {
    title: "Respiración consciente",
    duration: "5 min",
    description: "Técnica básica para reducir el estrés y la ansiedad",
    level: "Principiante"
  },
  {
    title: "Escaneo corporal",
    duration: "10 min",
    description: "Conecta con tu cuerpo y libera la tensión",
    level: "Intermedio"
  },
  {
    title: "Meditación guiada",
    duration: "15 min",
    description: "Profundiza tu práctica con visualización",
    level: "Avanzado"
  },
  {
    title: "Sueño reparador",
    duration: "20 min",
    description: "Prepara tu mente para un descanso profundo",
    level: "Todos"
  }
];

const MeditationGuide = () => {
  return (
    <section id="meditacion" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Encuentra tu calma</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Guías de Meditación
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practica técnicas de meditación guiadas diseñadas para reducir el estrés,
              mejorar tu concentración y encontrar paz interior.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Featured Session */}
            <Card className="p-8 gradient-card shadow-card">
              <div className="mb-6">
                <img 
                  src={meditationIcon} 
                  alt="Meditación" 
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                  Destacado
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  10 minutos
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Sesión de Relajación Profunda
              </h3>
              <p className="text-muted-foreground mb-6">
                Una experiencia inmersiva de meditación diseñada para liberar tensiones
                y encontrar tu centro de paz interior.
              </p>
              <div className="flex gap-3">
                <Button variant="hero" size="lg" className="flex-1">
                  <Play className="w-5 h-5" />
                  Comenzar
                </Button>
                <Button variant="outline" size="lg">
                  <Volume2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>

            {/* Meditation List */}
            <div className="space-y-4">
              {meditations.map((meditation, index) => (
                <Card key={index} className="p-6 gradient-card hover:shadow-card transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-lg">{meditation.title}</h4>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {meditation.level}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {meditation.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {meditation.duration}
                      </div>
                    </div>
                    <Button variant="calm" size="icon">
                      <Play className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center gradient-card">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold mb-2">Reduce el estrés</h4>
              <p className="text-sm text-muted-foreground">
                Disminuye los niveles de cortisol y encuentra calma
              </p>
            </Card>
            <Card className="p-6 text-center gradient-card">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-bold mb-2">Mejora el sueño</h4>
              <p className="text-sm text-muted-foreground">
                Practica antes de dormir para un descanso profundo
              </p>
            </Card>
            <Card className="p-6 text-center gradient-card">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-bold mb-2">Mayor concentración</h4>
              <p className="text-sm text-muted-foreground">
                Entrena tu mente para enfocarte en el presente
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeditationGuide;
