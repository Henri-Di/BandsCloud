import { FiCloud } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="container-logo-page">
      <h1 className="text-logo-page flex items-center justify-center gap-3">
        <FiCloud className="icon-logo-header" />
        <span>BandsCloud</span>
      </h1>
    </header>
  );
}
