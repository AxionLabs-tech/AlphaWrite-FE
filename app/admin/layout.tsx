export const metadata = {
  title: "Admin Panel | AlphaWrite",
  description: "Admin dashboard for AlphaWrite",
  openGraph: {
    title: "Admin Panel | AlphaWrite",
    description: "Admin dashboard for AlphaWrite",
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
