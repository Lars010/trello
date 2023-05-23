import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-primary">
      {children}
    </div>
  );
}

export default Layout;
