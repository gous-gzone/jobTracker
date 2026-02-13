# KodNest Premium Build System

A premium SaaS design system built with calm, intentional, coherent, and confident design principles.

## Design Philosophy

- **Calm**: No flashy animations or loud colors
- **Intentional**: Every element serves a purpose
- **Coherent**: Consistent patterns throughout
- **Confident**: Clear hierarchy and generous spacing

## Design Tokens

### Colors
- Background: `#F7F6F3` (off-white)
- Primary Text: `#111111`
- Accent: `#8B0000` (deep red)
- Success: `#4A7C59` (muted green)
- Warning: `#B8860B` (muted amber)

### Typography
- Headings: Serif font (Georgia, Times New Roman)
- Body: Clean sans-serif, 17px, line-height 1.7
- Max text width: 720px

### Spacing
Consistent scale: `8px`, `16px`, `24px`, `40px`, `64px`

### Transitions
- Default: `150ms ease-in-out`
- Slow: `200ms ease-in-out`

## Layout Structure

Every page follows this structure:
1. **Top Bar**: Project name, progress indicator, status badge
2. **Context Header**: Large serif headline with subtext
3. **Main Content**: Primary Workspace (70%) + Secondary Panel (30%)
4. **Proof Footer**: Checklist with proof inputs

## Components

- `Button` - Primary and secondary variants
- `Badge` - Status indicators (Not Started, In Progress, Shipped)
- `Card` - Subtle border, balanced padding
- `Input` - Clean borders, clear focus state
- `Textarea` - For longer text input
- `Checkbox` - For checklist items

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
  components/     # Base UI components
  layout/         # Layout components (TopBar, ContextHeader, etc.)
  design-system/  # Design tokens and global styles
```
