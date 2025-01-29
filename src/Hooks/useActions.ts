export const useActions = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Texto copiado al portapapeles");
    });
  };

  const shareToWhatsApp = (text: string) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return {
    copyToClipboard,
    shareToWhatsApp,
  };
};
