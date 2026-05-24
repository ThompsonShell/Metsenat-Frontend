import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Root index page.
 *
 * Reads the access-token cookie set by `saveTokens` and redirects the user
 * to `/dashboard` when authenticated, or to `/login` otherwise.
 * This avoids rendering any UI at the root path.
 */
export default async function HomePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (accessToken) {
    redirect('/dashboard');
  }

  redirect('/login');
}
