'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Zap, Eye, EyeOff, Globe, Mail, Lock, Check } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // AuthContext handles redirecting to /dashboard on success
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Left Panel - Login Form */}
      <div className="flex flex-col w-full lg:w-[60%] p-8 md:p-16 lg:p-24 relative">
        <div className="flex items-center gap-2 mb-12">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
        </div>

        <div className="max-w-md w-full mx-auto lg:mx-0">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Login</h1>
          <p className="text-gray-500 mb-8">See your growth and get consulting support!</p>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-white px-4 text-sm text-gray-400">or Sign in with Email</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email*</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mail@website.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-gray-900 placeholder:text-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password*</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 character"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-gray-900 placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${rememberMe ? 'bg-indigo-600 border-indigo-600' : 'border-gray-200 group-hover:border-indigo-400'}`} onClick={() => setRememberMe(!rememberMe)}>
                  {rememberMe && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="text-sm font-medium text-gray-700">Remember me</span>
              </label>
              <button type="button" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Forget password?
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Not registered yet?{' '}
            <button className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
              Create an Account
            </button>
          </p>
        </div>

        <div className="mt-auto pt-12">
          <p className="text-xs text-gray-400 font-medium">©2020 Felix All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex w-[40%] bg-indigo-600 relative overflow-hidden items-center justify-center p-12">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 transform translate-x-1/2 -translate-y-1/2 rotate-45 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-700 opacity-30 transform -translate-x-1/4 translate-y-1/4 rounded-[4rem]"></div>
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl"></div>

        {/* Floating UI Elements */}
        <div className="relative z-10 w-full max-w-md scale-110">
          {/* Main Chart Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[2.5rem] shadow-2xl transform -rotate-2">
            <div className="flex items-center justify-between mb-8">
              <span className="text-4xl font-bold text-white tracking-tight">$ 162,751</span>
              <div className="bg-green-400/20 px-3 py-1 rounded-full text-green-300 text-xs font-bold">
                +12.5%
              </div>
            </div>
            {/* Simple Sine-like Curve via SVG */}
            <svg viewBox="0 0 400 100" className="w-full h-24 text-indigo-200">
              <path
                d="M0 80 Q 50 20, 100 60 T 200 40 T 300 70 T 400 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M0 80 Q 50 20, 100 60 T 200 40 T 300 70 T 400 30 V 100 H 0 Z"
                fill="url(#gradient)"
                opacity="0.2"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex justify-between mt-4 text-[10px] text-white/50 font-bold tracking-widest uppercase">
              <span>Apr</span>
              <span>May</span>
              <span className="text-white">Jun</span>
              <span>Jul</span>
              <span>Aug</span>
            </div>
          </div>

          {/* Social Icons Float */}
          <div className="absolute -top-16 right-0 bg-white p-3 rounded-2xl shadow-xl transform rotate-12 scale-90">
            <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="text-white w-6 h-6" />
            </div>
          </div>

          <div className="absolute top-1/2 -left-12 bg-white p-4 rounded-full shadow-2xl transform -translate-y-1/2 hover:scale-110 transition-transform">
            <div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </div>
          </div>

          <div className="absolute -bottom-12 right-1/4 bg-white p-3 rounded-full shadow-2xl">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
              <Mail className="text-white w-5 h-5" />
            </div>
          </div>

          {/* User Rewards Card */}
          <div className="absolute -top-12 -right-12 bg-white p-6 rounded-[2rem] shadow-2xl transform rotate-6 max-w-[180px]">
            <div className="text-center">
              <p className="text-xs font-bold text-gray-400 mb-4 tracking-wider uppercase">Rewards</p>
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent -rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Points</p>
              <p className="text-xl font-black text-indigo-900">172,832</p>
            </div>
          </div>
        </div>

        {/* Promotional Text Footer */}
        <div className="absolute bottom-20 left-12 right-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Turn your ideas into reality.</h2>
          <p className="text-indigo-100/70 text-sm font-medium leading-relaxed max-w-xs mx-auto mb-8">
            Consistent quality and experience across all platforms and devices.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-1 bg-white rounded-full"></div>
            <div className="w-2 h-1 bg-white/30 rounded-full"></div>
            <div className="w-2 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
