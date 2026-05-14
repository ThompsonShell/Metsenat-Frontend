# Metsenat Frontend

`ThompsonShell/Metsenat` backend API uchun Next.js 15 (App Router) frontend.

## Texnologiyalar

- Next.js 15 + TypeScript
- Tailwind CSS
- Axios (interceptor + token refresh)
- React Hook Form + Zod
- Zustand (auth state)

## Loyihani clone qilish va ishga tushirish

### 1. Repozitoriyani clone qiling

```bash
git clone https://github.com/ThompsonShell/Metsenat-Frontend.git
cd Metsenat-Frontend
```

### 2. Dependencylarni o'rnating

```bash
npm install
```

### 3. Environment variables sozlang

Loyihaning root qismida `.env.local` fayl yarating va quyidagi o'zgaruvchini qo'shing:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

> **Eslatma:** Backend (`ThompsonShell/Metsenat`) ishlaб turgan bo'lishi kerak. Backend API URL ni shunga mos ravishda o'zgartiring.

### 4. Dev serverni ishga tushiring

```bash
npm run dev
```

App: `http://localhost:3000`

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
