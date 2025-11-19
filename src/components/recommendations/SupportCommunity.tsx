import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Heart, Send, Trash2, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type CommunityMessage = {
  id: string;
  message: string;
  is_anonymous: boolean;
  created_at: string;
  user_id: string;
};

type MessageInsert = {
  user_id: string;
  message: string;
  is_anonymous: boolean;
};

const SupportCommunity = () => {
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from('community_messages' as any)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error && data) {
      setMessages(data as unknown as CommunityMessage[]);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    setIsLoading(true);
    const messageData: MessageInsert = {
      user_id: user.id,
      message: newMessage,
      is_anonymous: isAnonymous
    };
    const { error } = await supabase
      .from('community_messages' as any)
      .insert(messageData);

    if (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje",
        variant: "destructive",
      });
    } else {
      toast({
        title: "¡Mensaje enviado!",
        description: "Tu mensaje de apoyo ha sido compartido con la comunidad",
      });
      setNewMessage("");
      loadMessages();
    }
    setIsLoading(false);
  };

  const handleDeleteMessage = async (id: string, messageUserId: string) => {
    if (messageUserId !== user?.id) {
      toast({
        title: "No autorizado",
        description: "Solo puedes eliminar tus propios mensajes",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('community_messages' as any)
      .delete()
      .eq('id', id);

    if (!error) {
      setMessages(messages.filter(m => m.id !== id));
      toast({
        title: "Mensaje eliminado",
        description: "Tu mensaje ha sido eliminado correctamente",
      });
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">
          Inicia sesión para participar en la comunidad de apoyo
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
        <h3 className="text-3xl font-bold mb-2">Comunidad de Apoyo</h3>
        <p className="text-muted-foreground">
          Un espacio seguro para compartir pensamientos positivos y apoyo mutuo
        </p>
      </div>

      {/* Info Card */}
      <Card className="p-6 gradient-card">
        <div className="flex items-start gap-4">
          <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold mb-2">Normas de la comunidad</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Sé amable y respetuoso con todos los miembros</li>
              <li>• Comparte mensajes de apoyo y positividad</li>
              <li>• Respeta la privacidad y el anonimato de otros</li>
              <li>• No compartas información personal sensible</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Post New Message */}
      <Card className="p-6">
        <h4 className="text-xl font-bold mb-4">Comparte un mensaje de apoyo</h4>
        <div className="space-y-4">
          <Textarea
            placeholder="Escribe algo positivo o un mensaje de aliento para la comunidad..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={4}
            maxLength={500}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
              />
              <Label htmlFor="anonymous" className="cursor-pointer">
                Publicar de forma anónima
              </Label>
            </div>
            <span className="text-xs text-muted-foreground">
              {newMessage.length}/500
            </span>
          </div>
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !newMessage.trim()}
            className="w-full"
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar Mensaje
          </Button>
        </div>
      </Card>

      {/* Messages Feed */}
      <div className="space-y-3">
        <h4 className="text-xl font-bold">Mensajes de la comunidad</h4>
        {messages.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h4 className="text-xl font-bold mb-2">No hay mensajes todavía</h4>
            <p className="text-muted-foreground">
              Sé el primero en compartir un mensaje de apoyo con la comunidad
            </p>
          </Card>
        ) : (
          messages.map((msg) => (
            <Card key={msg.id} className="p-4 hover:shadow-card transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">
                      {msg.is_anonymous ? "Usuario Anónimo" : "Miembro de la comunidad"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.created_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{msg.message}</p>
                </div>
                {msg.user_id === user?.id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteMessage(msg.id, msg.user_id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SupportCommunity;
