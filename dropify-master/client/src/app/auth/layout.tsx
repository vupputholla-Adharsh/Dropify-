import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg sm:max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
