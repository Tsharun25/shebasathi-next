import "./globals.css";

export const metadata = {
  title: "ShebaSathi",
  description: "Patient Care Service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}