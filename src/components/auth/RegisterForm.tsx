'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(`Signup failed: ${error.message}`);
      setLoading(false);
      return;
    }

    const userId = data?.user?.id;

    if (!userId) {
      setErrorMsg('Signup succeeded but no user ID returned.');
      setLoading(false);
      return;
    }

    // Manually insert user into profiles table
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({ id: userId });

    if (insertError) {
      setErrorMsg('Profile insert failed: ' + insertError.message);
      setLoading(false);
      return;
    }

    // Success
    router.push('/');
    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
}
