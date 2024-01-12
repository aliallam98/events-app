export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full flex items-center justify-center bg-primary/5">
      {children}
    </section>
  );
}
