import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<>
      <Header />
      {children}
      <BottomNav/>
</>
);
}
