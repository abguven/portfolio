import { Meta } from "@once-ui-system/core";
import { baseURL, gallery as contact } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: contact.title,
    description: contact.description,
    baseURL: baseURL,
    path: contact.path,
    image: `/api/og/generate?title=${encodeURIComponent(contact.title)}`,
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
