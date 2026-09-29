import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GameScout — Find your next game",
  description:
    "A playful game discovery engine for difficulty, player count, genre, platforms and review sources.",
  applicationName: "GameScout"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
