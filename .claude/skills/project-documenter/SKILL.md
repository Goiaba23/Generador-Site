---
name: project-documenter
description: Use this skill to document the current state of the project, identify all implemented features, track progress, and generate comprehensive project reports. Use when the user asks "what are we doing", "what is the current state", "show progress", or wants to understand everything implemented so far.
---

# Project Documenter Skill

## Purpose
Automatically analyze the codebase and generate a comprehensive snapshot of:
- All implemented features
- Current progress status
- Blockers and pending items
- Technical decisions made
- Next steps

## When to Use
- User asks "What did we do so far?"
- User asks "What is the current state of the project?"
- User asks "Show me everything implemented"
- Need to generate progress reports
- Before deploying to document what's going live

## Workflow

### 1. Scan Project Structure
```bash
# List all source files
find src -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | head -50

# Check key configuration files
cat package.json | jq '{name, version, dependencies, scripts}'
cat prisma/schema.prisma
cat tsconfig.json
```

### 2. Identify Implemented Features
Search for key patterns:
- Authentication: NextAuth, login, session
- Database: Prisma, models, migrations
- API Routes: `/api/` directories
- UI Components: components directory
- Libraries: GSAP, framer-motion, etc.

### 3. Check Build & Deploy Status
```bash
# Check if build passes
npm run build 2>&1 | tail -20

# Check deployment status
vercel ls
vercel env ls production
```

### 4. Generate Report
Create a structured report with sections:
- **Goal**: What we're building
- **Constraints**: Technical requirements
- **Progress**: Done, In Progress, Blocked
- **Key Decisions**: Architecture choices
- **Next Steps**: Immediate actions needed

## Output Format

```markdown
# Project Status Report
Generated: [timestamp]

## Goal
[What we're building]

## Progress
### ✅ Done
- Feature 1
- Feature 2

### 🚧 In Progress  
- Feature 3

### ❌ Blocked
- Feature 4 (waiting for X)

## Technical Stack
- Framework: Next.js 14.x
- Database: PostgreSQL (Neon)
- Auth: NextAuth.js
- Styling: Inline styles

## Deployment
- URL: https://...
- Build Status: ✅ Passing
- Env Vars: Configured

## Next Steps
1. Action 1
2. Action 2
```

## Examples

**User asks**: "What did we do so far?"
**Action**: Run this skill to scan project, identify all changes, and generate a comprehensive summary.

**User asks**: "Document everything we implemented"
**Action**: Generate a detailed report with all features, technical decisions, and current state.

## Guidelines
- Always read actual files (don't rely on memory)
- Verify build status before reporting
- Check deployed URL to confirm features are live
- Include both technical and business logic features
- Note any blockers or missing configurations
