import { Brain, Heart, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MindBreak
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Tu compañero de bienestar mental, disponible cuando lo necesites.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-smooth">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Guías</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Comunidad</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-smooth">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Contacto</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Privacidad</a></li>
              <li><a href="#" className="hover:text-primary transition-smooth">Términos</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <div className="space-y-3">
              <a href="mailto:hola@mindbreak.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth">
                <Mail className="w-4 h-4" />
                hola@mindbreak.com
              </a>
              <p className="text-sm text-muted-foreground">
                Estamos aquí para ayudarte
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 MindBreak. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>Hecho con amor para tu bienestar</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
