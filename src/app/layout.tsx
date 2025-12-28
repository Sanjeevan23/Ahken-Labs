//app/services/layout.tsx
import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Ahken Labs',
  description: 'Ahken Labs website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {/* Header overlay (fixed) */}
        <Header />

        {/* page content (hero is expected to be first child so it sits under header) */}
        <main>{children}</main>
      </body>
    </html>
  );
}
