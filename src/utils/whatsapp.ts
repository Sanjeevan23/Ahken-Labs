import { siteInfo } from '@/api/footerData';

export const openWhatsApp = (message = 'Hi there...') => {
  const phone = siteInfo.phone.replace(/\s+/g, '').replace('+', '');
  const encodedMessage = encodeURIComponent(message);

  const url = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(url, '_blank');
};
