import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function Card({ className, title, children, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-lg bg-white p-6 shadow-sm', className)}
      {...props}
    >
      {title && (
        <h2 className="mb-4 text-xl font-semibold text-gray-900">{title}</h2>
      )}
      {children}
    </div>
  );
}