// Shared contact details. Public values only: no secrets belong in src/.
export const EMAIL = 'mazen.hossny.121@gmail.com';
export const WHATSAPP_NUMBER = '201152879755';

// Builds a wa.me link. Pass text to prefill the chat with a summary.
export function whatsappLink(text) {
  const base = 'https://wa.me/' + WHATSAPP_NUMBER;
  return text ? base + '?text=' + encodeURIComponent(text) : base;
}
