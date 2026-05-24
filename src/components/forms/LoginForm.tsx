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

/** Zod schema for the phone-number step. */
const phoneSchema = z.object({
  phone_number: z.string().regex(UZ_PHONE_REGEX, 'Enter in +998XXXXXXXXX format'),
});

/** Zod schema for the OTP verification step. */
const codeSchema = z.object({
  auth_code: z.string().regex(/^\d{4}$/, 'Code must be exactly 4 digits'),
});

/**
 * Two-step login form.
 *
 * **Step 1** – collects the user's Uzbek phone number and requests an OTP.
 * **Step 2** – collects the 4-digit OTP, exchanges it for JWT tokens, and
 *              redirects to `/dashboard` on success.
 */
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
      alert('Failed to send verification code. Please try again.');
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
      alert('Login failed. Please check the code and try again.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-lg">
          <span className="text-xl font-bold">M</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Metsenat</h1>
        <p className="mt-1 text-sm text-gray-500">Admin panel</p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-card border border-gray-100">
        {step === 1 ? (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Sign in</h2>
              <p className="mt-1 text-sm text-gray-500">Enter your phone number</p>
            </div>
            <form onSubmit={sendCode} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Phone number
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
                {loading ? 'Sending...' : 'Send code'}
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Enter code</h2>
              <p className="mt-1 text-sm text-gray-500">
                A code was sent to <span className="font-medium text-brand">{phone}</span>
              </p>
            </div>
            <form onSubmit={login} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  4-digit code
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
                  Back
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Verifying...' : 'Sign in'}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
