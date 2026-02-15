/**
 * App layout component
 * Provides consistent layout structure with header and main content area
 */

import { ReactNode } from 'react';
import { Header } from './Header';
import './AppLayout.css';

export interface AppLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
  totalPoints?: number;
  currentLevel?: number;
}

export function AppLayout({
  children,
  showHeader = true,
  headerTitle,
  totalPoints,
  currentLevel,
}: AppLayoutProps) {
  return (
    <div className="app-layout">
      {showHeader && (
        <Header
          title={headerTitle}
          totalPoints={totalPoints}
          currentLevel={currentLevel}
        />
      )}
      <main className="app-layout__main">{children}</main>
    </div>
  );
}
