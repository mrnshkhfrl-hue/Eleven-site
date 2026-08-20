# Eleven Style Lab

Role & Task: Build a complete, production-ready interactive MVP Landing Page for a premium barbershop "ELEVEN". You must output a fully functional React application (Next.js/Vite style) using Tailwind CSS, Framer Motion, and Lucide React.

1. STRICT DESIGN SYSTEM (iOS Liquid Glass & Premium Monochrome):

Colors: STRICTLY Black & White / Dark Grayscale. Background is deep black (#050505). Text is white and slate. DO NOT use any yellow, gold, or orange. The brand is strictly monochrome.

Effects: Use iOS 26 Liquid Glass style (bg-white/5, backdrop-blur-xl, border-white/10) for all cards, modals, and sticky bars.

2. CONTENT & DATA (Hardcode these states):

Barbers: Diyor Valiyev, Fayoz Rakhmonov, Izzat Zokirov, Jaxongir Azizov, Munis Burxanov, Samir Axmedov, Sanjar, Shax Adilov.

ELEVEN Price: Мужская стрижка (120 000 с), Стрижка+Борода (150 000 с), Детская стрижка (100 000 с), Тонирование (60 000 с), Черная маска (60 000 с).

TOP BARBER Price: Стрижка (150 000 с), Стрижка+Борода (200 000 с).

BOBUR VAFAEV (VIP): Стрижка у Бобура (500 000 с), Образ жениха 100$ (1 300 000 с).

3. PAGE SECTIONS (Render in this order):

Hero: Full screen. Dark aesthetic placeholder image/video background. Massive text: "ТВОЯ ТЕРРИТОРИЯ. ТВОЙ СТИЛЬ." and a glass button "Забронировать кресло".

The Vibe (About): Section with text "БОЛЬШЕ, ЧЕМ СТРИЖКА" and a description of premium atmosphere (PS5, specialty coffee).

Lookbook: Masonry grid of 4 aesthetic barber placeholder images (use Unsplash).

Price Tabs: iOS-style pill tabs to switch between "ELEVEN", "TOP BARBER", and "BOBUR VAFAEV".

Barbers Scroll: Horizontal native scroll (overflow-x-auto snap-x snap-mandatory scrollbar-hide) of barber cards.

4. SMART INTERACTIVITY & LOGIC (CRITICAL):

Multi-Select Cart: Users can select MULTIPLE services.

Sticky Bottom Bar: When >= 1 service is selected, a glass floating bar appears at the bottom showing Total Price, Total Time, and a "Записаться" button.

Booking Modal (Smart CRM):

Phone input MUST have a fixed +998 prefix on the left inside the input container. The input field itself should accept only 9 digits.

The form has a Barber Select dropdown. SMART LOGIC: If any selected service belongs to the "BOBUR VAFAEV" category, the Barber Select MUST automatically lock (disabled) and set its value to "Bobur Vafaev".

Build the complete, polished UI. Ensure all state (multi-select, modals, smart select locking) works perfectly.
bot token @secret:TELEGRAM_BOT_TOKEN 
мой юзер айди в тг 7949519588 еще что от тг нужно и сделай сайт имбовым

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://eleven-site.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ec674dd3-7474-43a6-82bb-cfe8baf2d7cd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
