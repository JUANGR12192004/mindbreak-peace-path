import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Heart, Coffee, Moon, Smile } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type PredefinedRoutine = {
  id: string;
  title: string;
  description: string;
  icon: any;
};

type UserRoutineProgress = {
  routine_id: string;
  completed: boolean;
  completed_at: string | null;
};

// Rutinas predefinidas de autocuidado
const PREDEFINED_ROUTINES: PredefinedRoutine[] = [
  {
    id: "morning-meditation",
    title: "Meditación matutina",
    description: "Dedica 10 minutos cada mañana a meditar y establecer intenciones positivas",
    icon: Coffee,
  },
  {
    id: "gratitude-journal",
    title: "Diario de gratitud",
    description: "Escribe 3 cosas por las que estás agradecido cada día",
    icon: Heart,
  },
  {
    id: "evening-reflection",
    title: "Reflexión nocturna",
    description: "Reflexiona sobre tu día y celebra tus logros antes de dormir",
    icon: Moon,
  },
  {
    id: "self-compassion",
    title: "Práctica de autocompasión",
    description: "Trata tus pensamientos negativos con amabilidad y comprensión",
    icon: Smile,
  },
  {
    id: "breathing-exercise",
    title: "Ejercicio de respiración",
    description: "Practica respiración profunda durante 5 minutos para reducir el estrés",
    icon: Heart,
  },
  {
    id: "positive-affirmations",
    title: "Afirmaciones positivas",
    description: "Lee o repite afirmaciones positivas para fortalecer tu autoestima",
    icon: Smile,
  },
];

const SelfCareRoutines = () => {
  const [userProgress, setUserProgress] = useState<Record<string, UserRoutineProgress>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserProgress();
    }
  }, [user]);

  const loadUserProgress = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('self_care_routines')
      .select('*')
      .eq('user_id', user.id);

    if (!error && data) {
      const progressMap: Record<string, UserRoutineProgress> = {};
      data.forEach((item: any) => {
        progressMap[item.routine_id] = {
          routine_id: item.routine_id,
          completed: item.completed,
          completed_at: item.completed_at,
        };
      });
      setUserProgress(progressMap);
    }
  };

  const handleToggleComplete = async (routineId: string) => {
    if (!user) return;

    setIsLoading(true);
    const currentProgress = userProgress[routineId];
    const newCompletedState = !currentProgress?.completed;

    if (!currentProgress) {
      // Insertar nuevo progreso
      const { error } = await supabase
        .from('self_care_routines')
        .insert({
          user_id: user.id,
          routine_id: routineId,
          completed: newCompletedState,
        });

      if (!error) {
        await loadUserProgress();
        toast({
          title: "¡Completado!",
          description: "Excelente trabajo, sigue así 🎉",
        });
      }
    } else {
      // Actualizar progreso existente
      const { error } = await supabase
        .from('self_care_routines')
        .update({ completed: newCompletedState })
        .eq('user_id', user.id)
        .eq('routine_id', routineId);

      if (!error) {
        await loadUserProgress();
        toast({
          title: newCompletedState ? "¡Completado!" : "Marcado como pendiente",
          description: newCompletedState ? "Excelente trabajo, sigue así 🎉" : "Rutina desmarcada",
        });
      }
    }
    setIsLoading(false);
  };

  const completedCount = Object.values(userProgress).filter(p => p.completed).length;
  const totalCount = PREDEFINED_ROUTINES.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">
          Inicia sesión para seguir tus rutinas de autocuidado
        </p>
        <Button onClick={() => window.location.href = '/auth'}>
          Iniciar Sesión
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-2">Rutinas de Autocuidado</h3>
        <p className="text-muted-foreground">
          Sigue estas rutinas diarias para mejorar tu bienestar emocional
        </p>
      </div>

      {/* Progress Card */}
      <Card className="p-6 gradient-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-lg">Tu Progreso</h4>
            <p className="text-sm text-muted-foreground">
              {completedCount} de {totalCount} completadas hoy
            </p>
          </div>
          <div className="text-3xl font-bold text-primary">
            {Math.round(progressPercentage)}%
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-primary rounded-full h-3 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </Card>

      {/* Predefined Routines List */}
      <div className="space-y-4">
        {PREDEFINED_ROUTINES.map((routine) => {
          const isCompleted = userProgress[routine.id]?.completed || false;
          const IconComponent = routine.icon;
          
          return (
            <Card key={routine.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={() => handleToggleComplete(routine.id)}
                  disabled={isLoading}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className={`w-5 h-5 ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h4 className={`font-bold ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                      {routine.title}
                    </h4>
                  </div>
                  <p className={`text-sm ${isCompleted ? 'text-muted-foreground' : ''}`}>
                    {routine.description}
                  </p>
                </div>
                {isCompleted && (
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Motivational message */}
      {completedCount === totalCount && totalCount > 0 && (
        <Card className="p-6 bg-primary/10 border-primary/20">
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h4 className="font-bold text-lg mb-2">¡Felicitaciones! 🎉</h4>
            <p className="text-muted-foreground">
              Has completado todas tus rutinas de autocuidado hoy. ¡Excelente trabajo!
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SelfCareRoutines;
