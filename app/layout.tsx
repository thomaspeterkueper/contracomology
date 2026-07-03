import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Contracomology',
  description: 'Mehrsprachige Publikations- und Lernfassade ueber dem KUEPER Knowledge Graph.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
