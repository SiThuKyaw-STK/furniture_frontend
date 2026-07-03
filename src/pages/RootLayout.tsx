import { Outlet } from "react-router";

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
