import { useEffect, useState } from "react";
import MissionSection from "./MissionSection";
import ValuesSection from "./ValuesSection";
import ContributionSection from "./ContributionSection";
import SponsorshipSection from "./SponsorshipSection";
import NavbarHome from "../components/shared/NavbarHome";
import Footer from "../components/shared/Footer";
import { FiArrowUp } from "react-icons/fi";

export default function About() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);

      // Verificar quais seções estão visíveis
      const sections = ["perfil", "musicas", "albuns", "eventos"];
      const newVisibleSections: Record<string, boolean> = {};

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Ativa animação se topo da seção está dentro da janela visível
        newVisibleSections[id] = rect.top < window.innerHeight * 0.85;
      });

      setVisibleSections((prev) => ({ ...prev, ...newVisibleSections }));
    };

    window.addEventListener("scroll", handleScroll);
    // Também chama uma vez para animação inicial
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Classe para animação: fade + slide para cima
  const getSectionClass = (id: string) =>
    visibleSections[id]
      ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
      : "opacity-0 translate-y-12";

  return (
    <div className="bg-gray-950 text-white min-h-screen pt-16 relative">
      <NavbarHome />

      {/* Seção: Missão */}
      <div id="perfil" className={getSectionClass("perfil")}>
        <MissionSection />
      </div>

      {/* Seção: Valores */}
      <div id="musicas" className={getSectionClass("musicas")}>
        <ValuesSection />
      </div>

      {/* Seção: Contribuição */}
      <div id="albuns" className={getSectionClass("albuns")}>
        <ContributionSection />
      </div>

      {/* Seção: Patrocínios */}
      <div id="eventos" className={getSectionClass("eventos")}>
        <SponsorshipSection />
      </div>

      <Footer />

      {/* Botão flutuante de voltar ao topo */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          className="
            fixed bottom-6 right-6 
            bg-violet-600 hover:bg-violet-700 
            text-white p-3 rounded-full shadow-lg 
            transition duration-300 
            z-50
            animate-pulse
            hover:animate-none
            hover:scale-110
            focus:outline-none
            focus:ring-2
            focus:ring-violet-400
          "
        >
          <FiArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
