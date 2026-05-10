---
version: alpha
name: NexusAI
description: Design system for NexusAI — a personal multi-AI assistant chat platform
colors:
  primary: "#6366f1"
  primary-container: "#e0e7ff"
  on-primary: "#ffffff"
  secondary: "#8b5cf6"
  secondary-container: "#ede9fe"
  tertiary: "#06b6d4"
  tertiary-container: "#cffafe"
  surface: "#ffffff"
  surface-dim: "#f8fafc"
  surface-container: "#f1f5f9"
  surface-container-high: "#e2e8f0"
  on-surface: "#0f172a"
  on-surface-variant: "#475569"
  outline: "#cbd5e1"
  outline-variant: "#e2e8f0"
  error: "#ef4444"
  on-error: "#ffffff"
  error-container: "#fef2f2"
  background: "#0f172a"
  on-background: "#f8fafc"
  neutral: "#64748b"
  neutral-variant: "#94a3b8"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.03em
  heading-1:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  heading-2:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.01em
  heading-3:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-large:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-small:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  code:
    fontFamily: "JetBrains Mono, Fira Code, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
layout:
  spacing-unit: 4px
  spacing-scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128]
  max-width: 1200px
  content-padding: 16px
  grid-columns: 12
  grid-gap: 16px
  section-gap: 64px
  border-radius:
    sm: 4px
    md: 8px
    lg: 12px
    xl: 16px
    full: 9999px
elevation:
  level-0: "none"
  level-1: "0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.1)"
  level-2: "0 2px 4px rgba(15, 23, 42, 0.06), 0 4px 6px rgba(15, 23, 42, 0.1)"
  level-3: "0 4px 8px rgba(15, 23, 42, 0.08), 0 8px 16px rgba(15, 23, 42, 0.1)"
  level-4: "0 8px 16px rgba(15, 23, 42, 0.08), 0 16px 24px rgba(15, 23, 42, 0.12)"
  level-5: "0 16px 24px rgba(15, 23, 42, 0.1), 0 24px 48px rgba(15, 23, 42, 0.16)"
shapes:
  card: 12px
  button: 8px
  input: 8px
  chip: 9999px
  modal: 16px
  sheet: 0px
components:
  chat-message-user:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{shapes.card}"
    padding: 12px 16px
    maxWidth: 80%
  chat-message-ai:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{shapes.card}"
    padding: 12px 16px
    maxWidth: 80%
  chat-input:
    backgroundColor: "{colors.surface-dim}"
    textColor: "{colors.on-surface}"
    borderColor: "{colors.outline}"
    rounded: "{shapes.input}"
    padding: 12px 16px
    fontSize: "{typography.body.fontSize}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{shapes.button}"
    padding: 10px 20px
    fontSize: "{typography.body.fontSize}"
    fontWeight: 600
  button-secondary:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{shapes.button}"
    padding: 10px 20px
    fontSize: "{typography.body.fontSize}"
    fontWeight: 500
  card-capability:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.outline-variant}"
    rounded: "{shapes.card}"
    padding: 20px
    shadow: "{elevation.level-1}"
  card-tool-result:
    backgroundColor: "{colors.surface-dim}"
    borderColor: "{colors.outline-variant}"
    rounded: "{shapes.card}"
    padding: 16px
  badge:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.primary}"
    rounded: "{shapes.chip}"
    padding: 2px 10px
    fontSize: "{typography.body-small.fontSize}"
    fontWeight: 500
  input-outlined:
    borderColor: "{colors.outline}"
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{shapes.input}"
    padding: 12px 16px
  divider:
    height: 1px
    color: "{colors.outline-variant}"
  skeleton:
    backgroundColor: "{colors.surface-container-high}"
    rounded: "{shapes.input}"
---
# NexusAI Design System

A personal multi-AI assistant chat platform with premium glassmorphism aesthetic and dark theme foundation.

## Overview

NexusAI is a personal AI assistant that orchestrates multiple AI services (Gemini, OpenAI, Replicate, YouTube, Firecrawl, etc.) through a conversational chat interface. The design system reflects a modern, premium SaaS aesthetic with a dark theme foundation, glassmorphism elements, and vibrant accent colors.

**Brand Personality:** Intelligent, premium, approachable, cutting-edge
**Target Audience:** Developers, designers, entrepreneurs, and power users
**Emotional Response:** Trust, delight, sophistication, empowerment

## Colors

### Primary Palette
The indigo-violet gradient direction creates a premium AI brand feel. The `#6366f1` primary represents intelligence and trust, while the `#8b5cf6` secondary adds a creative, imaginative dimension.

- **Primary (#6366f1)**: Used for CTAs, active states, key UI elements, user messages
- **Secondary (#8b5cf6)**: Used for secondary actions, hover states, decorative gradients
- **Tertiary (#06b6d4)**: Used for info highlights, tool notifications, accent borders

### Semantic Colors
- **Error (#ef4444)**: Reserved exclusively for destructive actions and system errors
- **Success (#22c55e)**: For completion states, online indicators
- **Warning (#f59e0b)**: For rate limits, degraded states

### Surface & Background
The dark background (#0f172a) creates a terminal-like, sophisticated canvas. The layered surface system uses varying opacities of slate to create depth through light rather than shadow.

## Typography

Inter serves as the primary typeface for its exceptional readability across all weights and sizes. It pairs naturally with JetBrains Mono for code blocks and technical output.

**Display (48px/700)**: Reserved for the wordmark and empty states
**H1 (32px/700)**: Modal titles, welcome screens, section headers  
**H2 (24px/600)**: Feature titles, tool result headers
**H3 (20px/600)**: Card titles, capability names

Body text at 14px is the workhorse size throughout the interface. The generous 1.5 line-height ensures readability even in dense chat contexts.

## Layout & Spacing

A 4px base unit drives all spacing decisions, creating rhythm through multiples. The 12-column grid provides flexibility while the 1200px max-width keeps content readable on large screens.

**Content Density:** Medium — spacious enough for readability, compact enough for information density
**Section Rhythm:** Alternating 64px gaps create clear visual hierarchy without excessive scrolling

## Elevation & Depth

Depth is achieved primarily through color layering rather than shadows. The surface color system (surface → surface-dim → surface-container → surface-container-high) creates a stacked-card effect where each layer appears physically closer.

Shadows are reserved for floating elements (modals, tooltips, dropdowns) and follow a 5-step elevation system.

## Shapes

The 12px card radius is the defining shape of the system. It's generous enough to feel premium but restrained enough to feel professional. Buttons and inputs use 8px — slightly tighter for interactive elements. Chips and badges use full rounding for a pill-like appearance.

## Components

### Chat Messages
User messages use the primary indigo as a filled bubble against the dark background. AI messages use the surface-container color, creating clear visual separation without harsh borders. The 80% max-width prevents line-length issues on wide screens.

### Capability Cards
These serve as the visual entry point to the assistant's features. Each card features an icon, title, and description with a neutral border and subtle shadow. On hover, the border transitions to primary.

### Tool Results
When the assistant executes a tool (YouTube search, web scrape, image generation), results appear in inset cards with the surface-dim background — visually receding to indicate they're supporting content to the main conversation.

## Do's and Don'ts

**Do:**
- Use the primary color sparingly for maximum impact — it should feel like an accent, not a flood
- Maintain the dark background for the main interface; reserve white for sub-interfaces
- Let glassmorphism effects appear in premium moments (modals, AI thinking state, tool execution)
- Use Inter for all UI text; reserve JetBrains Mono exclusively for code output

**Don't:**
- Don't mix shadow levels — one card should use one elevation throughout
- Don't use the primary color for non-interactive decorative elements
- Don't exceed 80% message width — it breaks the chat metaphor
- Don't add borders to user messages — rely on color alone for bubble identification

## Animations

- **Page load**: Content fades in with a subtle upward drift (300ms, ease-out)
- **Message entry**: AI messages scale in from 0.98 to 1 while fading (200ms)
- **Tool execution**: Skeleton shimmer while waiting, then content fades in
- **Hover**: Interactive elements lift by 2px with a subtle shadow increase (150ms)
- **Modal**: Backdrop fades (200ms), content scales from 0.95 to 1 (250ms cubic-bezier)
- **Theme transition**: All color and background transitions animate at 200ms ease
