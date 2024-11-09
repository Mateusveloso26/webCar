import { ReactNode } from "react";
export function Container({ children }: { children: ReactNode }) {
  return <div className="w-full min-h-screen max-w-7xl mx-auto px-4 py-4">{children}</div>;
}
