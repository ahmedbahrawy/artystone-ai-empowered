import React from 'react';
import { cn } from "@/lib/utils";
import { Container } from './container';
import { tokens } from '@/design-system/foundations/tokens';

export type BackgroundPattern = 'dots' | 'grid' | 'none';
export type BackgroundGradient = 'primary' | 'secondary' | 'accent' | 'none';

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  backgroundPattern?: BackgroundPattern;
  backgroundGradient?: BackgroundGradient;
  fullHeight?: boolean;
  withContainer?: boolean;
  containerClassName?: string;
  paddingY?: keyof typeof tokens.spacing | 'none';
}

export function SectionContainer({
  children,
  className,
  id,
  backgroundPattern = 'none',
  backgroundGradient = 'none',
  fullHeight = false,
  withContainer = true,
  containerClassName,
  paddingY = '16',
  ...props
}: SectionContainerProps) {
  // Background pattern classes
  const patternClasses = {
    dots: "bg-dot-gray-900/[0.02] dark:bg-dot-white/[0.02]",
    grid: "bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02]",
    none: ""
  };

  // Background gradient classes
  const gradientClasses = {
    primary: "bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50",
    secondary: "bg-gradient-to-b from-secondary-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50",
    accent: "bg-gradient-to-b from-purple-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50",
    none: ""
  };

  // Padding classes
  const paddingClasses = paddingY === 'none' 
    ? '' 
    : `py-${paddingY}`;

  const content = withContainer ? (
    <Container className={cn(paddingClasses, containerClassName)}>
      {children}
    </Container>
  ) : children;

  return (
    <section
      id={id}
      className={cn(
        "relative",
        gradientClasses[backgroundGradient],
        fullHeight && "min-h-[80vh] flex items-center",
        className
      )}
      {...props}
    >
      {content}
      
      {backgroundPattern !== 'none' && (
        <div className={cn("absolute inset-0 -z-10", patternClasses[backgroundPattern])} />
      )}
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  className,
  ...props
}: {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'center' | 'left' | 'right';
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const alignClasses = {
    center: "text-center mx-auto",
    left: "text-left",
    right: "text-right ml-auto"
  };

  return (
    <div 
      className={cn(
        "max-w-3xl mb-12",
        alignClasses[align],
        className
      )}
      {...props}
    >
      {subtitle && (
        <p className="text-sm font-medium uppercase tracking-wider text-primary mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

export function SectionGrid({
  children,
  columns = 3,
  gap = 8,
  className,
  ...props
}: {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 4 | 6 | 8 | 10 | 12;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const columnsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  const gapClasses = {
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12"
  };

  return (
    <div 
      className={cn(
        "grid",
        columnsClasses[columns],
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 