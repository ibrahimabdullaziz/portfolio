# Ibrahim Abdullaziz | Full Stack Software Engineer

A premium, modern portfolio website showcasing my expertise in building high-performance web applications and real-time systems.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4.0
- **Animations:** Framer Motion (useMotionValue, whileInView, staggered reveals)
- **Components:** Shadcn UI + Lucide Icons
- **Smooth Scrolling:** Lenis
- **Type Safety:** TypeScript
- **Transitions:** next-view-transitions

## Key Features

- **Dynamic Typography:** Custom typewriter introduction cycling through key professional roles.
- **Interactive UI:** 3D magnetic hover effects on project cards using spring-physics based motion.
- **Cinematic Experience:** Advanced blur-reveal scroll animations for section headings and content.
- **Infinite Marquees:** Bi-directional scrolling technology tapes with explicit skill labeling.
- **Megatron AI Chat:** Integrated AI assistant (Gemini-powered) for real-time visitor interaction.
- **Accessibility Optimized:** High contrast ratios, skip-to-content support, and full keyboard navigation focus indicators.
- **Privacy First:** Self-hosted Umami Analytics integration.

## Getting Started

1. **Clone & Install:**

   ```bash
   git clone https://github.com/ibrahimabdullaziz/portfolio.git
   npm install
   ```

2. **Environment Setup:**
   Create a `.env.local` file with:

   ```env
   TELEGRAM_BOT_TOKEN="your_token"
   TELEGRAM_CHAT_ID="your_chat_id"
   GEMINI_API_KEY="your_api_key"
   NEXT_PUBLIC_UMAMI_SRC="your_url"
   NEXT_PUBLIC_UMAMI_ID="your_id"
   ```

3. **Run Dev:**
   ```bash
   npm run dev
   ```

## Configuration

Customize the site via `src/config/`:

- `Hero.tsx`: Site owner name, titles, and social connections.
- `Projects.tsx`: Showcase case studies and project metadata.
- `Footer.tsx`: Navigation structure and legal info.
