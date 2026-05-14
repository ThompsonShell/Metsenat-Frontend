'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { UZ_PHONE_REGEX } from '@/lib/auth';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

const phoneSchema = z.object({
  phone_number: z.string().regex(UZ_PHONE_REGEX, '+998XXXXXXXXX formatda kiriting'),
});

const codeSchema = z.object({
  auth_code: z.string().regex(/^\d{4}$/, 'Kod 4 raqamdan iborat bo\'lishi kerak'),
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
      alert('Tasdiqlash kodi yuborildi');
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
    <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Kirish</h2>

      {step === 1 ? (
        <form onSubmit={sendCode} className="space-y-3">
          <label className="block text-sm">Telefon raqam</label>
          <Input {...phoneForm.register('phone_number')} maxLength={13} placeholder="+998901234567" />
          {phoneForm.formState.errors.phone_number && (
            <p className="text-sm text-red-600">{phoneForm.formState.errors.phone_number.message}</p>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Yuborilmoqda...' : 'OTP yuborish'}
          </Button>
        </form>
      ) : (
        <form onSubmit={login} className="space-y-3">
          <p className="text-sm text-gray-600">Kod yuborilgan raqam: {phone}</p>
          <label className="block text-sm">4 xonali kod</label>
          <Input {...codeForm.register('auth_code')} maxLength={4} inputMode="numeric" />
          {codeForm.formState.errors.auth_code && (
            <p className="text-sm text-red-600">{codeForm.formState.errors.auth_code.message}</p>
          )}
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={() => setStep(1)} className="w-full">
              Orqaga
            </Button>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Kutilmoqda...' : 'Kirish'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
