import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  FiMail,
  FiUser,
  FiFileText,
  FiShield,
  FiCheckCircle,
  FiUser as FiUserIcon,
  FiShield as FiShieldIcon,
  FiFileText as FiFileTextIcon,
} from 'react-icons/fi';

import InputField from './InputField';
import PasswordField from './PasswordField';
import PhotoUploader from './PhotoUploader';
import SocialLinks from './SocialLinks';
import RoleSelector from './RoleSelector';
import SubmitButton from './SubmitButton';
import "../../../styles/OverView.css";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
  bio?: string;
  photo?: FileList;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  roleSelection?: string;
}

interface PreviewPanelProps {
  photoPreview?: string | null;
  watchName?: string;
  watchBio?: string;
  watchRole?: string;
  className?: string;
}

const getRoleLabel = (role?: string) => {
  if (!role) return '';
  switch (role) {
    case 'ROLE_ARTIST':
      return 'Artista';
    case 'ROLE_VENUE':
      return 'Estabelecimento';
    case 'ROLE_FAN':
      return 'Fã';
    default:
      return role;
  }
};

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  photoPreview,
  watchName,
  watchBio,
  watchRole,
  className,
}) => {
  return (
<aside
  aria-label="Pré-visualização do perfil"
  className={`bg-gradient-to-br from-purple-900 via-[#2a2540] to-[#1a1830] rounded-3xl
              shadow-[0_0_60px_0_rgba(128,0,255,0.3)] border border-purple-700 p-8
              flex flex-col overflow-y-auto max-h-[80vh]
              scrollbar-custom shadow-scroll-both
              transition-all duration-300 animate-fade-in-up
              ${className || ''}`}
>

      <h3 className="text-2xl font-bold text-purple-300 mb-8 text-center tracking-wide">
        Pré-visualização do Perfil
      </h3>

      {photoPreview ? (
        <div
          className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-10 border-4 border-purple-600 shadow-md"
        >
          <img
            src={photoPreview}
            alt="Foto de perfil preview"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-36 h-36 rounded-full bg-purple-900/40 mx-auto mb-10 flex items-center justify-center text-purple-600 text-xl font-semibold select-none shadow-inner">
          Sem foto
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
          <FiUserIcon size={20} />
          <span className="tracking-wide uppercase text-sm">Nome</span>
        </div>
        <p className="text-white text-lg font-medium min-h-[28px]">
          {watchName || 'Nome não informado'}
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
          <FiShieldIcon size={20} />
          <span className="tracking-wide uppercase text-sm">Tipo de Perfil</span>
        </div>
        <p className="text-purple-300 italic font-semibold min-h-[24px]">
          {getRoleLabel(watchRole) || 'Tipo de perfil não selecionado'}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
          <FiFileTextIcon size={20} />
          <span className="tracking-wide uppercase text-sm">Biografia</span>
        </div>
        <p className="text-gray-300 whitespace-pre-wrap min-h-[72px] leading-relaxed font-light">
          {watchBio || 'Biografia não informada'}
        </p>
      </div>
    </aside>
  );
};

const UserCreateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: 'onTouched' });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const watchPassword = watch('password', '');
  const watchPhoto = watch('photo');
  const watchName = watch('name');
  const watchBio = watch('bio');
  const watchRole = watch('roleSelection');

  useEffect(() => {
    if (watchPhoto && watchPhoto.length > 0) {
      const file = watchPhoto[0];
      const objectUrl = URL.createObjectURL(file);
      setPhotoPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPhotoPreview(null);
    }
  }, [watchPhoto]);

  function passwordStrength(password: string): number {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }

  function strengthColor(strength: number) {
    switch (strength) {
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-400';
      case 3:
        return 'bg-green-400';
      case 4:
        return 'bg-green-600';
      default:
        return 'bg-gray-700';
    }
  }

  function strengthLabel(strength: number): string {
    switch (strength) {
      case 1:
        return 'Fraca';
      case 2:
        return 'Média';
      case 3:
        return 'Boa';
      case 4:
        return 'Muito boa';
      default:
        return 'Sem senha';
    }
  }

  const onSubmit = async (data: FormData) => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const formData = new FormData();

      formData.append('email', data.email);
      formData.append('password', data.password);

      if (data.name) formData.append('name', data.name);
      if (data.bio) formData.append('bio', data.bio);
      if (data.instagram) formData.append('instagram', data.instagram);
      if (data.facebook) formData.append('facebook', data.facebook);
      if (data.twitter) formData.append('twitter', data.twitter);

      if (data.roleSelection) {
        formData.append('roles', JSON.stringify([data.roleSelection]));
      }

      if (data.photo && data.photo.length > 0) {
        formData.append('photo', data.photo[0]);
      }

      const response = await fetch('http://localhost:8081/api/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Erro ao criar usuário');
      }

      setSuccessMessage('Conta criada com sucesso!');
      reset();
      setPhotoPreview(null);
    } catch (error: any) {
      setErrorMessage(error.message || 'Erro inesperado');
    }
  };

  return (
    <main
      className="min-h-screen bg-gray-950 from-gray-900 via-gray-950 to-gray-900
                 px-4 sm:px-8 lg:px-16
                 flex flex-col md:flex-row gap-10 max-w-7xl mx-auto items-start justify-center py-16"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-2/3 max-w-xl
                   bg-gradient-to-b from-[#0c0a14] via-[#1a172a] to-[#1f1c3b]
                   text-white rounded-3xl shadow-2xl border border-purple-700
                   p-10 space-y-10 transition-all duration-300
                   flex flex-col"
        noValidate
        aria-label="Formulário de criação de perfil"
      >
        <h2 className="text-4xl font-extrabold text-center text-purple-400 tracking-wide mb-6 select-none">
          Criar Perfil 🎧
        </h2>

        {successMessage && (
          <div
            className="px-6 py-4 border-l-4 border-green-500 bg-green-600/20 text-green-300
                       flex items-center gap-4 rounded-md shadow-lg select-none"
            role="alert"
          >
            <FiCheckCircle className="text-green-400 animate-pulse" size={28} />
            <p className="text-lg font-semibold">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div
            className="px-6 py-4 border-l-4 border-red-600 bg-red-700/20 text-red-300
                       flex items-center gap-4 rounded-md shadow-lg select-none"
            role="alert"
          >
            <FiShield className="text-red-400 animate-pulse" size={28} />
            <p className="text-lg font-semibold">{errorMessage}</p>
          </div>
        )}

        {errors.root && (
          <div
            className="px-6 py-4 border-l-4 border-red-600 bg-red-700/20 text-red-300
                       flex items-center gap-4 rounded-md shadow-lg select-none"
            role="alert"
          >
            <FiShield className="text-red-400 animate-pulse" size={28} />
            <p className="text-lg font-semibold">{errors.root.message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-2">
            <InputField
              id="email"
              label="Email"
              icon={<FiMail />}
              required
              register={register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Formato de email inválido',
                },
              })}
              error={errors.email?.message}
              placeholder="exemplo@exemplo.com"
              type="email"
            />
          </div>

          <PasswordField
            id="password"
            label="Senha"
            register={register('password', {
              required: 'Senha é obrigatória',
              minLength: {
                value: 8,
                message: 'Senha deve ter no mínimo 8 caracteres',
              },
              validate: (value) =>
                /[A-Z]/.test(value) || 'Deve conter ao menos uma letra maiúscula',
            })}
            error={errors.password?.message}
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            placeholder="Sua senha segura"
            infoTooltip="Mínimo 8 caracteres, com letras maiúsculas, números e símbolos"
          />

          {watchPassword && (
            <div
              className="flex items-center gap-3 mt-2 select-none"
              aria-label="Força da senha"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={4}
              aria-valuenow={passwordStrength(watchPassword)}
            >
              <div
                className={`flex-1 h-3 rounded-full bg-purple-800 overflow-hidden shadow-inner transition-colors duration-500`}
              >
                <div
                  className={`h-3 rounded-full transition-all duration-700 ease-in-out ${strengthColor(
                    passwordStrength(watchPassword)
                  )}`}
                  style={{ width: `${(passwordStrength(watchPassword) / 4) * 100}%` }}
                />
              </div>
              <span
                className={`text-sm font-semibold select-text ${
                  passwordStrength(watchPassword) <= 1
                    ? 'text-red-400'
                    : passwordStrength(watchPassword) === 2
                    ? 'text-yellow-300'
                    : 'text-green-400'
                }`}
              >
                {strengthLabel(passwordStrength(watchPassword))}
              </span>
            </div>
          )}

          <PasswordField
            id="confirmPassword"
            label="Confirmar Senha"
            register={register('confirmPassword', {
              required: 'Confirmação de senha é obrigatória',
              validate: (value) =>
                value === watchPassword || 'As senhas não coincidem',
            })}
            error={errors.confirmPassword?.message}
            show={showConfirmPassword}
            toggle={() => setShowConfirmPassword(!showConfirmPassword)}
            placeholder="Repita a senha"
          />

          <div className="col-span-2">
            <InputField
              id="name"
              label="Nome"
              icon={<FiUser />}
              register={register('name')}
              placeholder="Seu nome ou nome artístico"
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="bio"
              className="text-sm font-semibold flex items-center gap-2 text-purple-300 mb-1 select-none"
              title="Opcional"
            >
              <FiFileText /> Bio
            </label>
            <textarea
              id="bio"
              {...register('bio')}
              className="input-base resize-y min-h-[100px] bg-[#2f2d4a] placeholder-purple-400
                         text-white rounded-lg border border-purple-700
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         shadow-md transition-colors duration-300
                         scrollbar-custom"
              placeholder="Conte algo sobre você ou seu estabelecimento"
              aria-label="Biografia"
            />
          </div>

          <PhotoUploader
            photoPreview={photoPreview || undefined}
            register={register('photo')}
            photoName={watchPhoto?.[0]?.name}
          />

          <SocialLinks register={register} />

          <div className="col-span-2">
            <Controller
              control={control}
              name="roleSelection"
              rules={{ required: 'Selecione um tipo de perfil' }}
              render={({ field }) => <RoleSelector field={field} />}
            />
            {errors.roleSelection && (
              <p
                className="mt-2 text-xs text-red-400 font-medium select-text"
                role="alert"
              >
                {errors.roleSelection.message}
              </p>
            )}
          </div>
        </div>

        <SubmitButton isSubmitting={isSubmitting} />
      </form>

      <PreviewPanel
        photoPreview={photoPreview}
        watchName={watchName}
        watchBio={watchBio}
        watchRole={watchRole}
        className="w-full md:w-1/3 sticky top-16 self-start
                   bg-gradient-to-b from-[#0e0c1a] via-[#1f1c2f] to-[#1c1a2b]
                   border border-purple-700 rounded-3xl
                   shadow-[0_0_60px_0_rgba(128,0,255,0.3)]
                   animate-fade-in-up transition-all duration-300"
      />
    </main>
  );
};

export default UserCreateForm;
