
// Utility function to format WhatsApp-style text
export const formatWhatsAppText = (text: string): string => {
  if (!text) return '';
  
  let formattedText = text;
  
  // Convert *text* to <strong>text</strong> for bold
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
  
  // Convert _text_ to <em>text</em> for italic
  formattedText = formattedText.replace(/_(.*?)_/g, '<em>$1</em>');
  
  // Convert ~text~ to <del>text</del> for strikethrough
  formattedText = formattedText.replace(/~(.*?)~/g, '<del>$1</del>');
  
  // Remove common decorative symbols that add clutter
  formattedText = formattedText.replace(/💎/g, '');
  formattedText = formattedText.replace(/🔶/g, '');
  formattedText = formattedText.replace(/⭐/g, '');
  formattedText = formattedText.replace(/👑/g, '');
  
  // Clean up multiple spaces
  formattedText = formattedText.replace(/\s+/g, ' ');
  
  // Clean up leading/trailing spaces
  formattedText = formattedText.trim();
  
  return formattedText;
};

// React component helper for rendering formatted text
export const FormattedText: React.FC<{ text: string; className?: string }> = ({ 
  text, 
  className = '' 
}) => {
  const formattedText = formatWhatsAppText(text);
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: formattedText }}
    />
  );
};
