import type { Metadata } from 'next';
import './globals.css';
import { ReactLenis } from 'lenis/react';

export const metadata: Metadata = {
  title: 'NexusAI — Chat Creator de Landing Pages',
  description: 'Converse com a IA e tenha sua landing page profissional pronta em minutos.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
