import React from 'react';
import { FiImage, FiUpload } from 'react-icons/fi';

interface PhotoUploaderProps {
  photoPreview?: string;
  register: any;
  photoName?: string;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photoPreview,
  register,
  photoName,
}) => (
  <div className="col-span-2">
    <label
      htmlFor="photo"
      className="text-sm font-semibold flex items-center gap-2 text-purple-200"
    >
      <FiImage /> Foto de Perfil
    </label>
    <label
      htmlFor="photo"
      className="inline-flex items-center px-5 py-3 bg-purple-700 hover:bg-purple-800 rounded-lg cursor-pointer text-sm font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 select-none"
    >
      <FiUpload className="mr-2" />
      Selecionar Foto
      <input
        id="photo"
        type="file"
        accept="image/*"
        {...register}
        className="hidden"
      />
    </label>
    {photoPreview && (
      <div className="mt-4 flex items-center gap-4">
        <img
          src={photoPreview}
          alt="Prévia da foto selecionada"
          className="w-20 h-20 rounded-full border-4 border-purple-500 shadow-lg object-cover transition-transform hover:scale-105"
        />
        <p className="text-gray-400 text-sm">{photoName}</p>
      </div>
    )}
  </div>
);

export default PhotoUploader;
