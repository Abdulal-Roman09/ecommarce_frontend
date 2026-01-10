import Navbar from "@/components/modules/commonLayout/Home/navbar/Navbar";
import { ReactNode } from "react";

export default function HomePageLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
