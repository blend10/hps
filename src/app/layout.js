import Header from "@/components/general/Header";
import "./globals.css";
import Footer from "@/components/general/Footer";

export const metadata = {
  title: "HPS",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
