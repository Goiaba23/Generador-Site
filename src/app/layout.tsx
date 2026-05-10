import type { Metadata } from 'next';
import './globals.css';
import { ReactLenis } from 'lenis/react';

export const metadata: Metadata = {
  title: 'NexusAI — Assistente Pessoal Multi-IA',
  description: 'Seu assistente pessoal com 10 superpoderes: YouTube, web scraping, DALL-E, FLUX, pesquisa de design, criação de sites e muito mais.',
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
