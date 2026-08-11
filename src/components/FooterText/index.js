// Styles
import { FooterText } from './style';

export function TextFooter() {
 
  const currentYear = new Date().getFullYear();
 
  return (
    <FooterText>MyPoint © {currentYear} - Todos os Direitos Reservados.</FooterText>
  );
}