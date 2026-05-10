import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "../../globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "SEFS | 循環型養殖システム — Mother Vegetable",
  description:
    "SEFS は Mother Vegetable が提供する循環型養殖システムです。太陽光発電・スーパーウッド・高速栽培LED・AI水質管理を組み合わせ、家庭から中小企業まで持続可能な食料生産を始められる仕組みを実現します。",
  openGraph: {
    title: "SEFS | 循環型養殖システム — Mother Vegetable",
    description:
      "家庭や他業種の企業でも、簡単に魚の養殖が始められる。食の未来を支える、持続可能な循環型システム。",
    images: ["/Images/sefs/sefs-hero.jpg"],
  },
};

export default function SefsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJp.variable}>
      <head>
        <link rel="icon" href="/Images/favicon.png" />
      </head>
      <body
        className="bg-white text-gray-900 antialiased"
        style={{ fontFamily: "var(--font-noto-sans-jp), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
