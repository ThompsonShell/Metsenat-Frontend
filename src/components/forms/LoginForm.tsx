'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowLeft, Phone, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { UZ_PHONE_REGEX } from '@/lib/auth';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

const phoneSchema = z.object({
  phone_number: z.string().regex(UZ_PHONE_REGEX, '+998XXXXXXXXX formatda kiriting'),
});

const codeSchema = z.object({
  auth_code: z.string().regex(/^\d{4}$/, "Kod 4 raqamdan iborat bo'lishi kerak"),
});

export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const setTokens = useAuthStore((state) => state.setTokens);

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone_number: '+998' },
  });

  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
  });

  const sendCode = phoneForm.handleSubmit(async (values) => {
    try {
      setLoading(true);
      await authService.sendVerificationCode(values.phone_number);
      setPhone(values.phone_number);
      setStep(2);
    } catch {
      alert('Kod yuborishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  });

  const login = codeForm.handleSubmit(async (values) => {
    try {
      setLoading(true);
      const tokens = await authService.userLogin(phone, values.auth_code);
      setTokens(tokens.access_token, tokens.refresh_token);
      router.replace('/dashboard');
    } catch {
      alert('Login xatoligi. Kodni qayta tekshiring');
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-lg">
          <span className="text-xl font-bold">M</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Metsenat</h1>
        <p className="mt-1 text-sm text-gray-500">Admin panel</p>
      </div>

      {/* Card */}
      <div className="rounded-2xl bg-white p-8 shadow-card border border-gray-100">
        {step === 1 ? (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Tizimga kirish</h2>
              <p className="mt-1 text-sm text-gray-500">Telefon raqamingizni kiriting</p>
            </div>
            <form onSubmit={sendCode} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Telefon raqam
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    {...phoneForm.register('phone_number')}
                    maxLength={13}
                    placeholder="+998901234567"
                    className="pl-9"
                  />
                </div>
                {phoneForm.formState.errors.phone_number && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {phoneForm.formState.errors.phone_number.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Yuborilmoqda...' : 'Kodni yuborish'}
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Kodni kiriting</h2>
              <p className="mt-1 text-sm text-gray-500">
                <span className="font-medium text-brand">{phone}</span> raqamiga kod yuborildi
              </p>
            </div>
            <form onSubmit={login} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  4 xonali kod
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    {...codeForm.register('auth_code')}
                    maxLength={4}
                    inputMode="numeric"
                    placeholder="0000"
                    className="pl-9 tracking-widest text-center text-lg"
                  />
                </div>
                {codeForm.formState.errors.auth_code && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {codeForm.formState.errors.auth_code.message}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5"
                >
                  <ArrowLeft size={15} />
                  Orqaga
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Kutilmoqda...' : 'Kirish'}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
