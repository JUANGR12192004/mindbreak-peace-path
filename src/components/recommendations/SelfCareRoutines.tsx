import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type Routine = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
};

type RoutineInsert = {
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
};

type RoutineUpdate = {
  completed: boolean;
};

const SelfCareRoutines = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadRoutines();
    }
  }, [user]);

  const loadRoutines = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('self_care_routines' as any)
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRoutines(data as unknown as Routine[]);
    }
  };

  const handleAddRoutine = async () => {
    if (!newTitle.trim() || !user) return;

    setIsLoading(true);
    const routineData: RoutineInsert = {
      user_id: user.id,
      title: newTitle,
      description: newDescription || null,
      completed: false
    };
    const { error } = await supabase
      .from('self_care_routines' as any)
      .insert(routineData);

    if (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar la rutina",
        variant: "destructive",
      });
    } else {
      toast({
        title: "¡Rutina agregada!",
        description: "Tu nueva rutina ha sido creada exitosamente",
      });
      setNewTitle("");
      setNewDescription("");
      loadRoutines();
    }
    setIsLoading(false);
  };

  const handleToggleComplete = async (id: string, currentState: boolean) => {
    const updateData: RoutineUpdate = { completed: !currentState };
    const { error } = await supabase
      .from('self_care_routines' as any)
      .update(updateData)
      .eq('id', id);

    if (!error) {
      setRoutines(routines.map(r => 
        r.id === id ? { ...r, completed: !currentState } : r
      ));
      toast({
        title: !currentState ? "¡Completado!" : "Marcado como pendiente",
        description: !currentState ? "Excelente trabajo, sigue así" : "Rutina desmarcada",
      });
    }
  };

  const handleDeleteRoutine = async (id: string) => {
    const { error } = await supabase
      .from('self_care_routines' as any)
      .delete()
      .eq('id', id);

    if (!error) {
      setRoutines(routines.filter(r => r.id !== id));
      toast({
        title: "Rutina eliminada",
        description: "La rutina ha sido eliminada correctamente",
      });
    }
  };

  const completedCount = routines.filter(r => r.completed).length;
  const totalCount = routines.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">
          Inicia sesión para gestionar tus rutinas de autocuidado
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
          Crea y gestiona tus actividades diarias de bienestar
        </p>
      </div>

      {/* Progress Card */}
      {totalCount > 0 && (
        <Card className="p-6 gradient-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Tu progreso hoy</span>
            <span className="text-2xl font-bold">
              {completedCount}/{totalCount}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {progressPercentage === 100 
              ? "¡Felicitaciones! Completaste todas tus rutinas"
              : `${Math.round(progressPercentage)}% completado`
            }
          </p>
        </Card>
      )}

      {/* Add New Routine */}
      <Card className="p-6">
        <h4 className="text-xl font-bold mb-4">Agregar nueva rutina</h4>
        <div className="space-y-4">
          <Input
            placeholder="Título de la rutina (ej: Meditación matutina)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddRoutine()}
          />
          <Textarea
            placeholder="Descripción opcional (ej: 10 minutos de meditación al despertar)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={2}
          />
          <Button 
            onClick={handleAddRoutine} 
            disabled={isLoading || !newTitle.trim()}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Rutina
          </Button>
        </div>
      </Card>

      {/* Routines List */}
      <div className="space-y-3">
        {routines.length === 0 ? (
          <Card className="p-12 text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h4 className="text-xl font-bold mb-2">No hay rutinas todavía</h4>
            <p className="text-muted-foreground">
              Comienza agregando tu primera rutina de autocuidado arriba
            </p>
          </Card>
        ) : (
          routines.map((routine) => (
            <Card 
              key={routine.id} 
              className={`p-4 transition-all ${
                routine.completed ? 'bg-muted/50' : 'hover:shadow-card'
              }`}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={routine.completed}
                  onCheckedChange={() => handleToggleComplete(routine.id, routine.completed)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h5 className={`font-semibold mb-1 ${
                    routine.completed ? 'line-through text-muted-foreground' : ''
                  }`}>
                    {routine.title}
                  </h5>
                  {routine.description && (
                    <p className={`text-sm ${
                      routine.completed ? 'text-muted-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {routine.description}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteRoutine(routine.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SelfCareRoutines;
