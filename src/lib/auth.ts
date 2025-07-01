'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from './types';

export async function createServerSupabaseClient() {
  return createServerComponentClient<Database>({
    cookies,
  });
}

export async function getSession() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Session error:', error.message);
    return null;
  }

  return session;
}
