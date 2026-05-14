# Metsenat Frontend

`ThompsonShell/Metsenat` backend API uchun Next.js 14 (App Router) frontend.

## Texnologiyalar

- Next.js 15 + TypeScript
- Tailwind CSS
- Axios (interceptor + token refresh)
- React Hook Form + Zod
- Zustand (auth state)

## Ishga tushirish

```bash
npm install
npm run dev
```

App: `http://localhost:3000`

## Environment variables

Loyihaning root qismida `.env.local` yarating:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## Auth oqimi

1. `/login` sahifasida telefon raqam kiritiladi (`+998XXXXXXXXX`)
2. OTP yuboriladi (`/authentication/send-verification-code/`)
3. OTP bilan login (`/authentication/userlogin/`)
4. `access_token` va `refresh_token` localStorage ga saqlanadi, `access_token` cookie ga ham yoziladi
5. Dashboard route group auth guard bilan himoyalangan

## API integratsiya

- `src/lib/api.ts` — Axios instance va interceptors
  - Request interceptor: `Authorization: Bearer <token>` qo'shadi
  - Response interceptor: 401 bo'lsa refresh endpoint orqali tokenni yangilaydi, muvaffaqiyatsiz bo'lsa logout qiladi
- `src/services/*` — endpointlar bo'yicha servislar

## Loyiha strukturasi

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   └── login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── users/page.tsx
│   │   ├── appeals/page.tsx
│   │   ├── appeals/[id]/page.tsx
│   │   ├── sponsors/page.tsx
│   │   ├── sponsors/[id]/page.tsx
│   │   ├── universities/page.tsx
│   │   └── payment-methods/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── forms/
│   ├── layout/
│   └── ui/
├── hooks/
├── lib/
├── services/
├── store/
└── types/
```

## Sahifalar

- `/login` — 2-qadamli auth
- `/dashboard` — umumiy statistikalar
- `/users` — userlar jadvali, filter/search, pagination
- `/appeals` va `/appeals/[id]` — arizalar ro'yxati va tahrirlash
- `/sponsors` va `/sponsors/[id]` — sponsor biriktirishlar
- `/universities` — universitetlar CRUD
- `/payment-methods` — to'lov usullari ro'yxati va qo'shish

## Build va lint

```bash
npm run lint
npm run build
```
