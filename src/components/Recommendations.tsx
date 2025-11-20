import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Book, Music, Heart, Users, Bike } from "lucide-react";
import TherapeuticReading from "./recommendations/TherapeuticReading";
import RelaxingMusic from "./recommendations/RelaxingMusic";
import SelfCareRoutines from "./recommendations/SelfCareRoutines";
import SupportCommunity from "./recommendations/SupportCommunity";
import OutdoorExercises from "./recommendations/OutdoorExercises";

const Recommendations = () => {
  const recommendations = [
    {
      icon: Book,
      title: "Lectura terapéutica",
      description: "Artículos y libros sobre bienestar mental",
      component: TherapeuticReading,
    },
    {
      icon: Music,
      title: "Música relajante",
      description: "Playlists para calmar la mente",
      component: RelaxingMusic,
    },
    {
      icon: Heart,
      title: "Rutinas de autocuidado",
      description: "Hábitos diarios para tu bienestar",
      component: SelfCareRoutines,
    },
    {
      icon: Users,
      title: "Comunidad de apoyo",
      description: "Comparte experiencias y recibe apoyo",
      component: SupportCommunity,
    },
    {
      icon: Bike,
      title: "Ejercicios al aire libre",
      description: "Actividades físicas para tu salud mental",
      component: OutdoorExercises,
    },
  ];

  return (
    <section id="recomendaciones" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Recomendaciones</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recursos útiles para tu bienestar emocional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {recommendations.map((rec, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="p-6 cursor-pointer hover:shadow-lg transition-all gradient-card group">
                  <rec.icon className="w-12 h-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">{rec.title}</h3>
                  <p className="text-muted-foreground">{rec.description}</p>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{rec.title}</DialogTitle>
                </DialogHeader>
                <rec.component />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
