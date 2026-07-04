import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Contracomology',
  description: 'Analytisches Framework zur Beschreibung von Zeitstrukturen in Musik und Literatur. Entwickelt von Thomas Peter Küper.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
