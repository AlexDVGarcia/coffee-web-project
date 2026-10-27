import type { Metadata } from "next";
import { Bowlby_One, Instrument_Sans } from "next/font/google";
import { N8nChat } from "./_components/N8nChat";
import { ReservationProvider } from "./_components/Reservation";
import { SiteFooter } from "./_components/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  axes: ["wdth"],
});

const bowlbyOne = Bowlby_One({
  variable: "--font-bowlby-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "ADVG Coffee Co | Café especial no Centro de Itapecerica da Serra",
    template: "%s | ADVG Coffee Co",
  },
  description:
    "Cafeteria de bairro no Centro de Itapecerica da Serra: cafés especiais, doces feitos todo dia, lanches leves, microfone aberto às sextas e degustação aos sábados.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${instrumentSans.variable} ${bowlbyOne.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ReservationProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ReservationProvider>
        <N8nChat />
      </body>
    </html>
  );
}
