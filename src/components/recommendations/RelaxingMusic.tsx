import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Play } from "lucide-react";
import { useState } from "react";

const playlists = [
  {
    id: 1,
    title: "Meditación Profunda",
    description: "Música ambiental para sesiones de meditación",
    videoId: "lFcSrYw-ARY",
    duration: "3 horas",
    mood: "Calma"
  },
  {
    id: 2,
    title: "Estudio y Concentración",
    description: "Lo-fi beats para enfocarte en tus tareas",
    videoId: "jfKfPfyJRdk",
    duration: "Live 24/7",
    mood: "Foco"
  },
  {
    id: 3,
    title: "Sueño Reparador",
    description: "Sonidos de la naturaleza para dormir mejor",
    videoId: "cKhYw90r0jE",
    duration: "8 horas",
    mood: "Descanso"
  },
  {
    id: 4,
    title: "Ansiedad y Estrés",
    description: "Frecuencias relajantes para calmar la mente",
    videoId: "1ZYbU82GVz4",
    duration: "2 horas",
    mood: "Alivio"
  },
  {
    id: 5,
    title: "Piano Relajante",
    description: "Melodías suaves de piano para descansar",
    videoId: "uDiFkJ8t43E",
    duration: "4 horas",
    mood: "Paz"
  },
  {
    id: 6,
    title: "Sonidos del Océano",
    description: "Olas del mar para relajación profunda",
    videoId: "bn9F19Hi1Lk",
    duration: "10 horas",
    mood: "Tranquilidad"
  }
];

const RelaxingMusic = () => {
  const [activePlayer, setActivePlayer] = useState<number | null>(null);

  const handlePlay = (id: number) => {
    setActivePlayer(activePlayer === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-2">Música Relajante</h3>
        <p className="text-muted-foreground">
          Playlists cuidadosamente seleccionadas para diferentes estados de ánimo
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="overflow-hidden">
            <div className="aspect-video relative bg-muted">
              {activePlayer === playlist.id ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${playlist.videoId}?autoplay=1`}
                  title={playlist.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => handlePlay(playlist.id)}
                    className="rounded-full w-16 h-16"
                  >
                    <Play className="w-8 h-8" />
                  </Button>
                  <img
                    src={`https://img.youtube.com/vi/${playlist.videoId}/maxresdefault.jpg`}
                    alt={playlist.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded">
                  {playlist.mood}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Music className="w-3 h-3" />
                  {playlist.duration}
                </span>
              </div>
              <h4 className="text-xl font-bold mb-2">{playlist.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {playlist.description}
              </p>
              <Button
                variant={activePlayer === playlist.id ? "outline" : "default"}
                className="w-full"
                onClick={() => handlePlay(playlist.id)}
              >
                {activePlayer === playlist.id ? "Cerrar reproductor" : "Reproducir"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelaxingMusic;
