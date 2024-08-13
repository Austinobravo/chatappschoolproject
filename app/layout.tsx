import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ClientSessionProvider from "@/lib/clientSessionProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({subsets:['greek'], weight: ['100', '300', '400', '500', '700', '900']})


export const metadata: Metadata = {
  title: "An intranet chatapp presented as a school project",
  description: "An intranet/internet school project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          <ClientSessionProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </ClientSessionProvider>

        </ThemeProvider>
        <Toaster/>
        </body>
    </html>
  );
}
