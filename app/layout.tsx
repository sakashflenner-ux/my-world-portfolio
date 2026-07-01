import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "我的世界｜段泽华",
  description: "段泽华的个人网站：运营、电商、法律与持续生长的好奇心。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
