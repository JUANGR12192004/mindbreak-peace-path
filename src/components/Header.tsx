import { Brain, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <a href="#inicio" className="text-foreground hover:text-primary transition-smooth">
              Inicio
            </a>
            <a href="#estado-animo" className="text-foreground hover:text-primary transition-smooth">
              Mi Estado
            </a>
            <a href="#meditacion" className="text-foreground hover:text-primary transition-smooth">
              Meditación
            </a>
            <a href="#recomendaciones" className="text-foreground hover:text-primary transition-smooth">
              Recomendaciones
            </a>
            <a href="#chat" className="text-foreground hover:text-primary transition-smooth">
              Chat
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="lg">
              Comenzar Ahora
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
            <a href="#inicio" className="text-foreground hover:text-primary transition-smooth">
              Inicio
            </a>
            <a href="#estado-animo" className="text-foreground hover:text-primary transition-smooth">
              Mi Estado
            </a>
            <a href="#meditacion" className="text-foreground hover:text-primary transition-smooth">
              Meditación
            </a>
            <a href="#recomendaciones" className="text-foreground hover:text-primary transition-smooth">
              Recomendaciones
            </a>
            <a href="#chat" className="text-foreground hover:text-primary transition-smooth">
              Chat
            </a>
            <Button variant="hero" size="lg" className="w-full">
              Comenzar Ahora
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
