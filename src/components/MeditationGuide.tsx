import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useState } from "react";

const MeditationGuide = () => {
  const [activePlayer, setActivePlayer] = useState<string | null>(null);

  const meditations = [
    { id: "1", title: "Meditación para la ansiedad", videoId: "ZToicYcHIOU", duration: "10 min" },
    { id: "2", title: "Respiración consciente", videoId: "db6xBherHfA", duration: "5 min" },
    { id: "3", title: "Meditación guiada para dormir", videoId: "1vx8iUvfyCY", duration: "20 min" },
  ];

  return (
    <section id="meditacion" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Guías de Meditación</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practica la atención plena con nuestras sesiones guiadas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {meditations.map((meditation) => (
            <Card key={meditation.id} className="overflow-hidden gradient-card">
              {activePlayer === meditation.id ? (
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${meditation.videoId}?autoplay=1`}
                  title={meditation.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  className="relative h-48 bg-muted cursor-pointer group"
                  onClick={() => setActivePlayer(meditation.id)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${meditation.videoId}/maxresdefault.jpg`}
                    alt={meditation.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="font-bold mb-2">{meditation.title}</h3>
                <p className="text-sm text-muted-foreground">{meditation.duration}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeditationGuide;
