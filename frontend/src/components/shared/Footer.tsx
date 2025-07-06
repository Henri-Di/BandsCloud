// src/components/ui/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[#6600cc] text-white text-center py-6 px-4 mt-auto shadow-inner">
      <p className="text-sm sm:text-base">
        &copy; {new Date().getFullYear()} BandsCloud. Todos os direitos reservados.
      </p>
    </footer>
  );
}
