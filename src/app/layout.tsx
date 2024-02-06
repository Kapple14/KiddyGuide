import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ThemeRegistry from "@/themes/Themeregistry";
import "@/styles/globals.scss";
import { NavbarLanding } from "@/components/NavbarLanding";

const roboto = Roboto({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tour Guide for Kids",
  description: "Imagine the beauty of adventure with our tour guide for kids.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NavbarLanding />
        <div className="spacer"></div>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeRegistry options={{ key: "mui" }}>
            <>{children}</>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
