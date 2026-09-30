import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = { children: ReactNode; variant?: 'primary' | 'secondary'; className?: string };

export function AnchorButton({ children, variant = 'primary', className = '', ...props }: Props & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={`button button--${variant} ${className}`} {...props}>{children}</a>;
}

export function RouteButton({ children, to, variant = 'primary' }: Props & { to: string }) {
  return <Link className={`button button--${variant}`} to={to}>{children}</Link>;
}

export function Button({ children, variant = 'primary', className = '', ...props }: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`button button--${variant} ${className}`} {...props}>{children}</button>;
}
