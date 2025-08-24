
"use client";
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full bg-card p-8 border-2 border-border">
        <h1 className="font-black text-4xl mb-8 text-center">Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-border mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-border mb-4"
            required
          />
          <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 border-2 border-border hover:bg-background hover:text-foreground">
            Log In
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
