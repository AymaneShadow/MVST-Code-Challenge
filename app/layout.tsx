import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import StyledJsxRegistry from "./registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Custom GitHub Repositories With Search Functionality",
  description: "Made by Aymane Chaoui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="gs">
      <body className={inter.className}>
        <Providers>
          <StyledJsxRegistry>{children}</StyledJsxRegistry>
        </Providers>
      </body>
    </html>
  );
}
