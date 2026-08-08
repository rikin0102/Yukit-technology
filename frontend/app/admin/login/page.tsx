'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Cpu, AlertTriangle, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  password: z.string().min(5, { message: 'Password must be at least 5 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const user = await login(data.username, data.password);
      if (user.role === 'VIEWER') {
        throw new Error('Access Denied. Internal staff roles only.');
      }
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.message || 
        err.message || 
        'Authorization failed. Please verify credentials.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#050507] px-4 py-12 relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgba(197,168,128,0.02)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[rgba(80,60,110,0.02)] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 z-10">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[rgba(197,168,128,0.25)] bg-[rgba(197,168,128,0.06)] text-primary mx-auto animate-float">
            <Cpu className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-wider text-gold-gradient uppercase">Console Access</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Yukti Technologies Internal Network</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-panel rounded-xl p-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-[10px] font-bold uppercase tracking-widest text-muted">
                System Username
              </label>
              <input
                id="username"
                type="text"
                {...register('username')}
                placeholder="admin"
                className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] px-4 py-3 text-xs text-foreground focus:border-primary focus:outline-none transition-colors"
              />
              {errors.username && (
                <p className="text-[10px] text-red-400 mt-1 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5 relative">
              <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-muted">
                Passphrase
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="••••••••"
                  className="w-full rounded border border-[rgba(197,168,128,0.15)] bg-[rgba(255,255,255,0.02)] pl-4 pr-10 py-3 text-xs text-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-400 mt-1 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-gradient text-background font-bold tracking-wider uppercase text-xs py-3.5 rounded hover:shadow-[0_0_15px_rgba(197,168,128,0.3)] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-background" />
                  <span>Authorizing...</span>
                </>
              ) : (
                <span>Establish Credentials</span>
              )}
            </button>

            {/* Global Errors */}
            {errorMsg && (
              <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] flex items-center space-x-2 rounded">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </form>
        </div>

        {/* Note info */}
        <p className="text-[10px] text-center text-muted leading-relaxed max-w-xs mx-auto">
          Authorization required. Session logs are archived compliance auditable. For credentials consult seed configurations (admin/AdminPassword123).
        </p>
      </div>
    </div>
  );
}
