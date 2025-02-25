import React from 'react';
import { cn } from "@/lib/utils";
import { Container } from './container';

interface HeroContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  backgroundPattern?: boolean;
  backgroundGradient?: boolean;
  fullHeight?: boolean;
}

export function HeroContainer({
  children,
  className,
  backgroundPattern = true,
  backgroundGradient = true,
  fullHeight = true,
  ...props
}: HeroContainerProps) {
  return (
    <div
      className={cn(
        "relative",
        backgroundGradient && "bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50",
        fullHeight && "min-h-[80vh] flex items-center",
        className
      )}
      {...props}
    >
      <Container className="py-12 md:py-20 w-full">
        {children}
      </Container>
      
      {backgroundPattern && (
        <div className="absolute inset-0 -z-10 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02]" />
      )}
    </div>
  );
}

export function HeroGrid({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function HeroContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "space-y-6 max-w-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function HeroMedia({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative w-full h-full lg:min-h-[600px] rounded-2xl overflow-hidden shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 