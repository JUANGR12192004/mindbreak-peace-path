import { Brain, Menu, LogOut, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = async () => {
    if (user) {
      await signOut();
    } else {
      navigate("/auth");
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MindBreak
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" onClick={(e) => handleNavClick(e, "#inicio")} className="text-foreground hover:text-primary transition-smooth">
              Inicio
            </a>
            <a href="#estado-animo" onClick={(e) => handleNavClick(e, "#estado-animo")} className="text-foreground hover:text-primary transition-smooth">
              Mi Estado
            </a>
            <a href="#meditacion" onClick={(e) => handleNavClick(e, "#meditacion")} className="text-foreground hover:text-primary transition-smooth">
              Meditación
            </a>
            <a href="#recomendaciones" onClick={(e) => handleNavClick(e, "#recomendaciones")} className="text-foreground hover:text-primary transition-smooth">
              Recomendaciones
            </a>
            <a href="#chat" onClick={(e) => handleNavClick(e, "#chat")} className="text-foreground hover:text-primary transition-smooth">
              Chat
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            )}
            <Button variant="hero" size="lg" onClick={handleAuthAction}>
              {user ? (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4 border-t border-border">
            <a href="#inicio" onClick={(e) => handleNavClick(e, "#inicio")} className="text-foreground hover:text-primary transition-smooth">
              Inicio
            </a>
            <a href="#estado-animo" onClick={(e) => handleNavClick(e, "#estado-animo")} className="text-foreground hover:text-primary transition-smooth">
              Mi Estado
            </a>
            <a href="#meditacion" onClick={(e) => handleNavClick(e, "#meditacion")} className="text-foreground hover:text-primary transition-smooth">
              Meditación
            </a>
            <a href="#recomendaciones" onClick={(e) => handleNavClick(e, "#recomendaciones")} className="text-foreground hover:text-primary transition-smooth">
              Recomendaciones
            </a>
            <a href="#chat" onClick={(e) => handleNavClick(e, "#chat")} className="text-foreground hover:text-primary transition-smooth">
              Chat
            </a>
            {user && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            )}
            <Button variant="hero" size="lg" className="w-full" onClick={handleAuthAction}>
              {user ? (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
