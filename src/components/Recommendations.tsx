import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Music, Coffee, Sparkles, Users, Sun } from "lucide-react";

const activities = [
  {
    icon: BookOpen,
    title: "Lectura terapéutica",
    description: "Artículos y libros sobre bienestar emocional",
    color: "primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Music,
    title: "Música relajante",
    description: "Playlists diseñadas para calmar tu mente",
    color: "secondary",
    bgColor: "bg-secondary/10"
  },
  {
    icon: Coffee,
    title: "Rutinas de autocuidado",
    description: "Actividades diarias para tu bienestar",
    color: "accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: Users,
    title: "Comunidad de apoyo",
    description: "Conecta con personas que te entienden",
    color: "primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Sun,
    title: "Ejercicios al aire libre",
    description: "Actividades físicas que mejoran tu ánimo",
    color: "accent",
    bgColor: "bg-accent/10"
  }
];

const Recommendations = () => {
  return (
    <section id="recomendaciones" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Personalizado para ti</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Recomendaciones de Bienestar
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre actividades y recursos diseñados según tus necesidades
              y preferencias para mejorar tu salud mental.
            </p>
          </div>

          {/* Daily Recommendation */}
          <Card className="p-8 md:p-12 mb-12 gradient-hero text-primary-foreground shadow-card">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
              <div>
                <span className="text-sm font-medium opacity-90">Recomendación del día</span>
                <h3 className="text-3xl font-bold mt-2">Práctica de Gratitud</h3>
              </div>
              <Sun className="w-12 h-12 opacity-90" />
            </div>
            <p className="text-lg opacity-90 mb-6 max-w-2xl">
              Toma 5 minutos para escribir tres cosas por las que estás agradecido hoy.
              Esta simple práctica puede aumentar significativamente tu bienestar emocional.
            </p>
            <Button variant="secondary" size="lg">
              Comenzar ahora
            </Button>
          </Card>

          {/* Activities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 gradient-card hover:shadow-card transition-all cursor-pointer group"
                >
                  <div className={`w-14 h-14 rounded-2xl ${activity.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce`}>
                    <Icon className={`w-7 h-7 text-${activity.color}`} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {activity.description}
                  </p>
                  <Button variant="ghost" className="w-full justify-start px-0">
                    Explorar →
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Personalization CTA */}
          <Card className="p-8 md:p-12 gradient-card shadow-card text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-3">
              Obtén recomendaciones más personalizadas
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Completa un breve cuestionario sobre tus intereses y necesidades
              para recibir sugerencias adaptadas específicamente para ti.
            </p>
            <Button variant="hero" size="lg">
              Personalizar mi experiencia
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
