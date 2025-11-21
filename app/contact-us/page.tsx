import React from "react";
import ContactUsGraphics from "./components/ContactUsGraphics";

export const metadata = {
  metadataBase: new URL("https://www.abhirajk.online"),
  title: "Contact Us | Abhiraj K",
  description:
    "Get in touch with Abhiraj K for collaborations, web development projects, or technical discussions.",
  alternates: {
    canonical: "https://www.abhirajk.online/contact-us",
  },
  openGraph: {
    title: "Contact Us | Abhiraj K",
    description:
      "Reach out to Full Stack Developer Abhiraj K through the contact page.",
    url: "https://www.abhirajk.online/contact-us",
    images: [
      {
        url: "/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact Page Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Abhiraj K",
    description:
      "Contact full-stack developer Abhiraj K for projects and opportunities.",
    images: ["/og-contact.png"],
  },
};

const ContactUs = () => {
  return (
    <div>
      <ContactUsGraphics />
    </div>
  );
};

export default ContactUs;
