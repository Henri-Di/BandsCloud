import React from 'react';
import { FiInstagram, FiFacebook, FiTwitter, FiLink } from 'react-icons/fi';

interface SocialLinksProps {
  register: any;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ register }) => (
  <div className="col-span-2">
    <label className="text-sm font-semibold flex items-center gap-2 text-purple-200 mb-2">
      <FiLink /> Redes Sociais (opcional)
    </label>
    <div className="flex flex-col gap-3 md:flex-row md:gap-6">
      <div className="flex items-center gap-2 flex-1">
        <FiInstagram className="text-pink-500" size={22} />
        <input
          placeholder="Instagram"
          {...register('instagram')}
          className="input-base"
          aria-label="Instagram"
        />
      </div>
      <div className="flex items-center gap-2 flex-1">
        <FiFacebook className="text-blue-600" size={22} />
        <input
          placeholder="Facebook"
          {...register('facebook')}
          className="input-base"
          aria-label="Facebook"
        />
      </div>
      <div className="flex items-center gap-2 flex-1">
        <FiTwitter className="text-sky-400" size={22} />
        <input
          placeholder="Twitter"
          {...register('twitter')}
          className="input-base"
          aria-label="Twitter"
        />
      </div>
    </div>
  </div>
);

export default SocialLinks;
