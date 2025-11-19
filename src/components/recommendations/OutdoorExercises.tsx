import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, MapPin, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";

const exercises = [
  {
    id: 1,
    title: "Caminata consciente",
    duration: "20-30 min",
    intensity: "Baja",
    benefits: ["Reduce estrés", "Mejora ánimo", "Claridad mental"],
    steps: [
      "Encuentra un parque o área verde cerca de ti",
      "Camina a un ritmo cómodo, prestando atención a tu respiración",
      "Observa tu entorno: árboles, sonidos, el aire en tu piel",
      "Si tu mente divaga, vuelve suavemente a tus sentidos",
      "Termina con 5 respiraciones profundas"
    ],
    mapUrl: "https://www.google.com/maps/search/parques+cerca+de+mi"
  },
  {
    id: 2,
    title: "Yoga al aire libre",
    duration: "30-45 min",
    intensity: "Baja-Media",
    benefits: ["Flexibilidad", "Balance", "Conexión mente-cuerpo"],
    steps: [
      "Busca un espacio tranquilo en un parque o jardín",
      "Lleva una esterilla o toalla",
      "Comienza con respiraciones profundas (5 min)",
      "Realiza posturas suaves: saludo al sol, guerrero, árbol",
      "Termina con una relajación final (shavasana) de 10 minutos"
    ],
    mapUrl: "https://www.google.com/maps/search/parques+para+yoga"
  },
  {
    id: 3,
    title: "Trote suave",
    duration: "25-40 min",
    intensity: "Media",
    benefits: ["Libera endorfinas", "Salud cardiovascular", "Energía"],
    steps: [
      "Calienta con 5 minutos de caminata rápida",
      "Comienza a trotar a un ritmo donde puedas mantener una conversación",
      "Alterna entre trotar 3 min y caminar 1 min si es necesario",
      "Mantén la postura erguida y respiración rítmica",
      "Enfría con 5 minutos de caminata lenta y estiramientos"
    ],
    mapUrl: "https://www.google.com/maps/search/rutas+para+correr+cerca+de+mi"
  },
  {
    id: 4,
    title: "Ciclismo recreativo",
    duration: "40-60 min",
    intensity: "Media",
    benefits: ["Bajo impacto", "Resistencia", "Exploración"],
    steps: [
      "Verifica que tu bicicleta esté en buen estado",
      "Planea una ruta segura con ciclovías si es posible",
      "Comienza pedaleando suavemente los primeros 10 minutos",
      "Mantén un ritmo constante y disfruta del paisaje",
      "Hidrátate regularmente durante el recorrido"
    ],
    mapUrl: "https://www.google.com/maps/search/ciclovias+cerca+de+mi"
  },
  {
    id: 5,
    title: "Ejercicios en el parque",
    duration: "30 min",
    intensity: "Media-Alta",
    benefits: ["Fuerza", "Resistencia", "Funcional"],
    steps: [
      "Encuentra un parque con barras o bancos",
      "Circuito 1: 10 sentadillas, 10 flexiones, 10 abdominales",
      "Descansa 1 minuto y repite el circuito 4 veces",
      "Circuito 2: Usa barras para dominadas o fondos (lo que puedas)",
      "Termina con estiramientos de todo el cuerpo"
    ],
    mapUrl: "https://www.google.com/maps/search/parques+con+barras+ejercicio"
  },
  {
    id: 6,
    title: "Meditación en la naturaleza",
    duration: "15-20 min",
    intensity: "Muy baja",
    benefits: ["Paz mental", "Conexión natural", "Mindfulness"],
    steps: [
      "Encuentra un lugar tranquilo en un área natural",
      "Siéntate cómodamente en el suelo o en un banco",
      "Cierra los ojos y enfócate en los sonidos naturales",
      "Siente el aire, el sol, la temperatura en tu piel",
      "Practica gratitud por la naturaleza que te rodea"
    ],
    mapUrl: "https://www.google.com/maps/search/areas+naturales+tranquilas"
  }
];

const OutdoorExercises = () => {
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);

  const handleToggleExpand = (id: number) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "Muy baja":
      case "Baja":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950";
      case "Baja-Media":
      case "Media":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-950";
      case "Media-Alta":
        return "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-950";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-2">Ejercicios al Aire Libre</h3>
        <p className="text-muted-foreground">
          Actividades físicas que conectan tu cuerpo y mente con la naturaleza
        </p>
      </div>

      {/* Weather Simulation Card */}
      <Card className="p-6 gradient-card">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold mb-1">Condiciones actuales</h4>
            <p className="text-sm text-muted-foreground">
              Día soleado, temperatura agradable - ¡Perfecto para salir!
            </p>
          </div>
          <Sun className="w-12 h-12 text-yellow-500" />
        </div>
      </Card>

      {/* Exercises Grid */}
      <div className="grid gap-4">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="overflow-hidden transition-all hover:shadow-card">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">{exercise.title}</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {exercise.duration}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getIntensityColor(exercise.intensity)}`}>
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      {exercise.intensity}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exercise.benefits.map((benefit, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleToggleExpand(exercise.id)}
                >
                  {expandedExercise === exercise.id ? "Ocultar pasos" : "Ver pasos detallados"}
                </Button>

                {expandedExercise === exercise.id && (
                  <div className="pt-4 border-t border-border animate-in slide-in-from-top">
                    <h5 className="font-bold mb-3">Pasos a seguir:</h5>
                    <ol className="space-y-2">
                      {exercise.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => window.open(exercise.mapUrl, '_blank')}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Encontrar ubicaciones cercanas
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tips Card */}
      <Card className="p-6 bg-muted/50">
        <h4 className="font-bold mb-3 flex items-center gap-2">
          <Sun className="w-5 h-5 text-primary" />
          Consejos para ejercicio al aire libre
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Usa protector solar y ropa adecuada</li>
          <li>• Mantente hidratado antes, durante y después del ejercicio</li>
          <li>• Escucha a tu cuerpo y no te sobreesfuerces</li>
          <li>• Considera las horas de menor exposición solar (antes de 10am o después de 4pm)</li>
          <li>• Lleva un teléfono para emergencias</li>
        </ul>
      </Card>
    </div>
  );
};

export default OutdoorExercises;
