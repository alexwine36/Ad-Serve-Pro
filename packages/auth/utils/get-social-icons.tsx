import { FaApple, FaGithub, FaGoogle } from 'react-icons/fa';

export const getSocialIcon = (providerId: string) => {
  switch (providerId) {
    case 'google':
      return <FaGoogle />;
    case 'github':
      return <FaGithub />;
    case 'apple':
      return <FaApple />;
    default:
      return null;
  }
};
