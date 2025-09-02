import Header from "@/components/shared/header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col-reverse flex-1 lg:flex-row">
      <Header />
      <main className="px-space-200 py-space-300 md:px-space-500 md:py-space-400">
        {children}
      </main>
    </div>
  );
}
