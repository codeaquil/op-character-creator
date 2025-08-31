import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OP Character Creator",
  description: "Generate a fictional character based on the One Piece world!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-crayola-gold min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

// Local Variables:
// jinx-local-words: "antialiased geist"
// End:
