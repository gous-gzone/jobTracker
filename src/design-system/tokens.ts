/**
 * KodNest Premium Build System - Design Tokens
 * Calm, Intentional, Coherent, Confident
 */

export const colors = {
  background: '#F7F6F3',
  text: {
    primary: '#111111',
    secondary: '#666666',
    muted: '#999999',
  },
  accent: {
    primary: '#8B0000',
    hover: '#A00000',
  },
  success: {
    base: '#4A7C59',
    muted: '#6B8E7A',
  },
  warning: {
    base: '#B8860B',
    muted: '#D4A017',
  },
  border: {
    default: '#E0E0E0',
    focus: '#8B0000',
  },
  white: '#FFFFFF',
} as const

export const typography = {
  fontFamily: {
    heading: "'Georgia', 'Times New Roman', serif",
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  fontSize: {
    h1: '48px',
    h2: '36px',
    h3: '28px',
    h4: '24px',
    body: '17px',
    small: '14px',
  },
  lineHeight: {
    heading: '1.2',
    body: '1.7',
    tight: '1.4',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  maxWidth: {
    text: '720px',
  },
} as const

export const spacing = {
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '40px',
  xl: '64px',
} as const

export const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
} as const

export const transitions = {
  default: '150ms ease-in-out',
  slow: '200ms ease-in-out',
} as const

export const shadows = {
  none: 'none',
  subtle: '0 1px 2px rgba(0, 0, 0, 0.04)',
} as const
