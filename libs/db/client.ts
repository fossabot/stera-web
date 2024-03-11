import { type CookieOptions, createBrowserClient, createServerClient } from '@supabase/ssr'
import { VAR_DB_KEY, VAR_DB_URL } from '../common/commonVar'
import { cookies } from 'next/headers'

export function createDBBrowserClient() {
  return createBrowserClient(
    VAR_DB_URL!,
    VAR_DB_KEY!
  )
}

export function createDBServerClient() {
  const cookieStore = cookies()

  return createServerClient(
    VAR_DB_URL!,
    VAR_DB_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}