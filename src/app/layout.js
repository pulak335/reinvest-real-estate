import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata = {
  title: "Real Estate Investment",
  description: "Real Estate Investment Management Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-body">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
