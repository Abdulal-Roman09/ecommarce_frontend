import { ReactNode } from "react";

export default function HomePageLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      HomePageLayout
      {children}
    </div>
  );
}