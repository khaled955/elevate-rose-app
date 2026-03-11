import { LayoutProps } from "@/lib/types/common";
import LayoutWrapper from "./_components/layout-wrapper";
export default function DashboardLayout({ children }: LayoutProps) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
