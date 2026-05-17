# Metsenat Frontend

Next.js 15 (App Router) frontend for the `ThompsonShell/Metsenat` backend API.

## Technologies

- Next.js 15 + TypeScript
- Tailwind CSS
- Axios (interceptor + token refresh)
- React Hook Form + Zod
- Zustand (auth state)

## Cloning and Running the Project

### 1. Clone the repository

```bash
git clone https://github.com/ThompsonShell/Metsenat-Frontend.git
cd Metsenat-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root of the project and add the following variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

> **Note:** The backend (`ThompsonShell/Metsenat`) must be running. Update the backend API URL accordingly.

### 4. Start the dev server

```bash
npm run dev
```

App: `http://localhost:3000`

## Auth Flow

1. Phone number is entered on the `/login` page (`+998XXXXXXXXX`)
2. OTP is sent (`/authentication/send-verification-code/`)
3. Login with OTP (`/authentication/userlogin/`)
4. `access_token` and `refresh_token` are stored in localStorage; `access_token` is also written to a cookie
5. Dashboard route group is protected by an auth guard

## API Integration

- `src/lib/api.ts` — Axios instance and interceptors
  - Request interceptor: adds `Authorization: Bearer <token>`
  - Response interceptor: on 401, refreshes the token via the refresh endpoint; logs out on failure
- `src/services/*` — services organized by endpoint

## Project Structure

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

## Pages

- `/login` — 2-step auth
- `/dashboard` — general statistics
- `/users` — users table with filter/search and pagination
- `/appeals` and `/appeals/[id]` — applications list and editing
- `/sponsors` and `/sponsors/[id]` — sponsor assignments
- `/universities` — universities CRUD
- `/payment-methods` — payment methods list and adding

## Build and Lint

```bash
npm run lint
npm run build
```
