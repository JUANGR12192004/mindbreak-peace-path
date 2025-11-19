import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const articles = [
  {
    id: 1,
    title: "Gestión del estrés en la vida diaria",
    author: "Dra. María González",
    category: "Ansiedad",
    duration: "5 min lectura",
    summary: "Aprende técnicas prácticas para manejar el estrés cotidiano y mejorar tu bienestar mental.",
    content: `
      El estrés es una respuesta natural del cuerpo ante situaciones desafiantes. Sin embargo, cuando se vuelve crónico, puede afectar significativamente nuestra salud mental y física.
      
      **Técnicas de gestión del estrés:**
      
      1. **Respiración profunda:** Practica respiraciones lentas y profundas durante 5 minutos al día. Inhala contando hasta 4, mantén por 4 segundos y exhala contando hasta 6.
      
      2. **Establece límites:** Aprende a decir "no" cuando sea necesario. Tu tiempo y energía son recursos valiosos.
      
      3. **Organización:** Crea listas de tareas priorizadas. Divide proyectos grandes en pasos pequeños y manejables.
      
      4. **Desconexión digital:** Establece horarios libres de pantallas, especialmente antes de dormir.
      
      5. **Actividad física:** Incluso 20 minutos de caminata pueden reducir significativamente los niveles de cortisol.
      
      **Recuerda:** La gestión del estrés es una habilidad que se desarrolla con práctica constante. Sé paciente contigo mismo.
    `,
    externalUrl: "https://www.nimh.nih.gov/health/publications/stress"
  },
  {
    id: 2,
    title: "Mindfulness: Vivir el presente",
    author: "Dr. Carlos Ruiz",
    category: "Meditación",
    duration: "7 min lectura",
    summary: "Descubre cómo la práctica del mindfulness puede transformar tu relación con el presente.",
    content: `
      El mindfulness o atención plena es la práctica de estar completamente presente en el momento actual, sin juzgar.
      
      **¿Por qué practicar mindfulness?**
      
      - Reduce la ansiedad y el estrés
      - Mejora la concentración y claridad mental
      - Aumenta la autoconciencia
      - Desarrolla la compasión hacia uno mismo y los demás
      
      **Ejercicio básico de mindfulness:**
      
      1. Encuentra un lugar tranquilo y siéntate cómodamente
      2. Cierra los ojos y enfócate en tu respiración
      3. Cuando tu mente divague (lo hará), simplemente nota el pensamiento y vuelve suavemente a tu respiración
      4. Practica esto durante 5-10 minutos diariamente
      
      **Mindfulness en la vida diaria:**
      
      - Come conscientemente, saboreando cada bocado
      - Camina prestando atención a cada paso
      - Escucha activamente en las conversaciones
      - Observa tus pensamientos sin engancharte con ellos
      
      La clave es la práctica constante, no la perfección.
    `,
    externalUrl: "https://www.mindful.org/meditation/mindfulness-getting-started/"
  },
  {
    id: 3,
    title: "Construyendo hábitos saludables",
    author: "Lic. Ana Martínez",
    category: "Autocuidado",
    duration: "6 min lectura",
    summary: "Estrategias efectivas para desarrollar y mantener hábitos que mejoren tu bienestar.",
    content: `
      Los hábitos saludables son la base de una vida equilibrada y feliz. Aquí te mostramos cómo construirlos efectivamente.
      
      **Principios para formar hábitos:**
      
      1. **Empieza pequeño:** No intentes cambiar todo a la vez. Elige un hábito y hazlo tan fácil que sea imposible decir que no.
      
      2. **Ancla el hábito:** Vincula el nuevo hábito a uno existente. Por ejemplo: "Después de cepillarme los dientes, meditaré 2 minutos."
      
      3. **Hazlo obvio:** Deja pistas visuales. Si quieres leer más, pon el libro en tu almohada.
      
      4. **Celebra las pequeñas victorias:** Cada vez que completes el hábito, reconócelo mentalmente. El cerebro necesita estas recompensas.
      
      **Hábitos esenciales para el bienestar:**
      
      - **Sueño consistente:** Acuéstate y levántate a la misma hora
      - **Hidratación:** Bebe agua al despertar
      - **Movimiento:** 20 minutos de actividad física diaria
      - **Gratitud:** Escribe 3 cosas por las que estés agradecido cada noche
      - **Conexión social:** Contacta al menos a una persona importante para ti
      
      Recuerda: Se necesitan alrededor de 66 días para que un hábito se automatice. La constancia es más importante que la intensidad.
    `,
    externalUrl: "https://jamesclear.com/habit-stacking"
  },
  {
    id: 4,
    title: "Entendiendo y manejando la ansiedad",
    author: "Dr. Roberto Sánchez",
    category: "Ansiedad",
    duration: "8 min lectura",
    summary: "Una guía completa para comprender la ansiedad y desarrollar herramientas para manejarla.",
    content: `
      La ansiedad es una de las experiencias humanas más comunes, pero cuando se vuelve abrumadora, puede interferir con nuestra vida diaria.
      
      **¿Qué es la ansiedad?**
      
      La ansiedad es la respuesta natural del cuerpo ante el peligro o estrés. Se convierte en un problema cuando:
      - Es desproporcionada a la situación
      - Persiste sin una causa clara
      - Interfiere con tus actividades diarias
      
      **Síntomas comunes:**
      
      - Físicos: taquicardia, sudoración, tensión muscular, problemas digestivos
      - Mentales: preocupación excesiva, pensamientos catastróficos, dificultad para concentrarse
      - Conductuales: evitación, inquietud, dificultad para dormir
      
      **Estrategias de manejo:**
      
      1. **Técnica 5-4-3-2-1:** Identifica 5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que hueles y 1 que saboreas. Esto te ancla al presente.
      
      2. **Respiración diafragmática:** Coloca una mano en tu pecho y otra en tu abdomen. Respira de manera que solo se mueva la mano del abdomen.
      
      3. **Cuestiona tus pensamientos:** Pregúntate: "¿Es este pensamiento basado en hechos o en miedo?" "¿Qué evidencia tengo?"
      
      4. **Exposición gradual:** Enfrenta tus miedos de manera controlada y progresiva.
      
      5. **Rutina de cuidado personal:** Prioriza el sueño, la nutrición y el ejercicio.
      
      **Cuándo buscar ayuda profesional:**
      
      Si la ansiedad interfiere significativamente con tu vida, busca ayuda de un profesional de salud mental. La terapia cognitivo-conductual (TCC) ha demostrado ser altamente efectiva.
      
      Recuerda: Pedir ayuda es un signo de fortaleza, no de debilidad.
    `,
    externalUrl: "https://adaa.org/understanding-anxiety"
  }
];

const TherapeuticReading = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-2">Biblioteca Terapéutica</h3>
        <p className="text-muted-foreground">
          Artículos basados en evidencia para tu bienestar emocional
        </p>
      </div>

      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="p-6 hover:shadow-card transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.duration}
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-2">{article.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Por {article.author}
                </p>
                <p className="text-muted-foreground mb-4">{article.summary}</p>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default" size="sm">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Leer ahora
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{article.title}</DialogTitle>
                        <p className="text-sm text-muted-foreground">
                          Por {article.author} • {article.duration}
                        </p>
                      </DialogHeader>
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          {article.content.split('\n').map((paragraph, idx) => {
                            if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                              return (
                                <h3 key={idx} className="font-bold text-lg mt-4 mb-2">
                                  {paragraph.replace(/\*\*/g, '')}
                                </h3>
                              );
                            }
                            if (paragraph.trim().startsWith('-')) {
                              return (
                                <li key={idx} className="ml-4 mb-1">
                                  {paragraph.replace(/^-\s*/, '')}
                                </li>
                              );
                            }
                            if (paragraph.trim().match(/^\d+\./)) {
                              return (
                                <li key={idx} className="ml-4 mb-1 list-decimal">
                                  {paragraph.replace(/^\d+\.\s*/, '')}
                                </li>
                              );
                            }
                            return paragraph.trim() ? (
                              <p key={idx} className="mb-3">
                                {paragraph}
                              </p>
                            ) : null;
                          })}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(article.externalUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Fuente
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TherapeuticReading;
