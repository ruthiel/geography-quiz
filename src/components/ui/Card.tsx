/**
 * Card container component for content grouping
 */

import { ReactNode, HTMLAttributes } from 'react';
import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  children: ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'medium',
  children,
  className = '',
  ...props
}: CardProps) {
  const classes = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
