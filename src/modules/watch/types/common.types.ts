export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type Position = 'top' | 'bottom' | 'left' | 'right';
export type Orientation = 'horizontal' | 'vertical';

export interface Dimensions {
  width: number;
  height: number;
}

export interface Position2D {
  x: number;
  y: number;
}

export interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  error: string;
  warning: string;
  success: string;
}