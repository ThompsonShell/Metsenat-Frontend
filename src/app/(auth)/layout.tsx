/**
 * Layout for unauthenticated (auth) pages such as `/login`.
 * Centres its children both horizontally and vertically with a page-background colour.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-page p-4">
      {children}
    </div>
  );
}
