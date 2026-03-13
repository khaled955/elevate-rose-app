import { Metadata } from "next";
import { PageProps } from "../../../../../../.next/types/app/layout";
import ContactWrapper from "./_components/contact.wrapper";

// metad data
export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "إيليفيت | روز — تواصل معنا" : "Elevate | Rose — Contact Us",
    description: isAr
      ? "تواصل معنا لأي استفسار أو طلب خاص — نحن هنا لخدمتك"
      : "Get in touch with us for any inquiry or special order — we are here to serve you",
  };
}
export default function ContactPage() {
  return <ContactWrapper />;
}
