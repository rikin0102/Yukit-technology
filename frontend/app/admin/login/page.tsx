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
    <div className="flex-1 flex items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0D9488]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 z-10">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FF7A00]/30 bg-[#FF7A00]/10 text-[#FF7A00] mx-auto shadow-md">
            <Cpu className="h-6 w-6 stroke-[1.5]" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-wider text-slate-850 uppercase">Console Access</h2>
            <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-bold">Yukti Technologies Internal Network</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                System Username
              </label>
              <input
                id="username"
                type="text"
                {...register('username')}
                placeholder="admin"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-800 focus:border-[#0D9488] focus:outline-none focus:ring-1 focus:ring-[#0D9488] transition-all"
              />
              {errors.username && (
                <p className="text-[10px] text-red-650 mt-1 flex items-center font-bold">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5 relative">
              <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Passphrase
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-10 py-3 text-xs text-slate-800 focus:border-[#0D9488] focus:outline-none focus:ring-1 focus:ring-[#0D9488] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-650 mt-1 flex items-center font-bold">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF7A00] text-white hover:bg-[#E06C00] shadow-md shadow-amber-500/20 font-black tracking-widest uppercase text-xs py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Authorizing...</span>
                </>
              ) : (
                <span>Establish Credentials</span>
              )}
            </button>

            {/* Global Errors */}
            {errorMsg && (
              <div className="p-3 border border-red-200 bg-red-50 text-red-600 text-[10px] flex items-center space-x-2 rounded-xl font-bold">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}
          </form>
        </div>

        {/* Note info */}
        <p className="text-[9px] text-center text-slate-450 leading-relaxed max-w-xs mx-auto font-bold">
          Authorization required. Session logs are archived and compliance auditable. For credentials consult setup documentation.
        </p>
      </div>
    </div>
  );
}
