import UserCreateForm from "../components/forms/UserCreateForm/UserCreateForm";
import Navbar from "../components/shared/NavbarHome";
import Footer from "../components/shared/Footer";
import { Helmet } from 'react-helmet-async';
import "../styles/OverView.css";

export default function CreateUserPage() {
  return (
    <>
      <Helmet>
        <title>Criar Conta | BandsCloud</title>
        <meta name="description" content="Cadastre-se para entrar na comunidade musical do BandsCloud." />
      </Helmet>
      <Navbar />

      <div className="min-h-screen bg-gray-950 from-gray-900 via-gray-950 to-gray-900 px-4 sm:px-6 lg:px-8 relative z-10
                      pt-16 sm:pt-24 md:pt-32 lg:pt-40
                      pb-8 sm:pb-12 md:pb-16 lg:pb-20"
      >
        <UserCreateForm />
      </div>
      <Footer />
    </>
  );
}
