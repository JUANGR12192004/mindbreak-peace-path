import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Brain } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Fondo calmante" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 gradient-calm" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-accent/10 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-bounce">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Tu bienestar es nuestra prioridad</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Tu espacio de
            <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              paz y bienestar
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            MindBreak te acompaña en tu viaje hacia una mejor salud mental. 
            Encuentra apoyo, recomendaciones personalizadas y técnicas de meditación 
            en un solo lugar.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8">
              <Heart className="w-5 h-5" />
              Comenzar mi viaje
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              <Brain className="w-5 h-5" />
              Conocer más
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl gradient-card shadow-card">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Apoyo disponible</div>
            </div>
            <div className="p-6 rounded-2xl gradient-card shadow-card">
              <div className="text-3xl font-bold text-secondary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Confidencial</div>
            </div>
            <div className="p-6 rounded-2xl gradient-card shadow-card">
              <div className="text-3xl font-bold text-accent mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Recursos gratis</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
