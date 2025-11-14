import '../../styles/globals.css';


export const metadata = {
  title: 'Dropify',
  description: 'Smart traffic management and relief system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
            <main className="flex align-middle justify-center h-screen">
              {children}
            </main>
      </body>
    </html>
  );
}