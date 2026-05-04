import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SitesSaaS - Sites profissionais para seu comércio',
  description: 'Crie sites profissionais em minutos para seu comércio ou empresa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
