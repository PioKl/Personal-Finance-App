import Header from "@/components/shared/header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col-reverse lg:flex-row">
      <Header />
      <main className="">{children}</main>
    </div>
  );
}
