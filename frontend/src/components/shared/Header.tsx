import { FiCloud } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="bg-[#6600cc] text-white py-6 px-4 shadow-md">
      <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl font-bold">
        <FiCloud className="text-white" size={28} />
        <span>BandsCloud</span>
      </div>
    </header>
  );
}
