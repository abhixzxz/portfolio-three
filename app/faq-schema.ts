// FAQ Schema for SEO - Can be added to any page for rich snippets
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Abhiraj K?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhiraj K is a highly skilled Full Stack Developer based in Kochi, Kerala, specializing in React.js, Next.js, Node.js, PostgreSQL, and modern web technologies. He is recognized as one of the best software engineers in Kerala, with expertise in building scalable web applications and immersive digital experiences."
      }
    },
    {
      "@type": "Question",
      name: "What services does Abhiraj K offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhiraj K offers comprehensive full-stack development services including: React.js and Next.js frontend development, Node.js backend development, MERN stack applications, responsive web design, progressive web apps (PWA), custom web application development, API development and integration, database design with PostgreSQL, and 3D web experiences using Three.js."
      }
    },
    {
      "@type": "Question",
      name: "Where is Abhiraj K located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhiraj K is based in Kochi, Kerala, India. He serves clients locally in Kerala and internationally as a freelance full-stack developer, offering remote development services worldwide."
      }
    },
    {
      "@type": "Question",
      name: "What technologies does Abhiraj K specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhiraj K specializes in modern web technologies including React.js, Next.js, Node.js, JavaScript, TypeScript, PostgreSQL, MongoDB, Express.js, Three.js, Framer Motion, GSAP, Tailwind CSS, and various other cutting-edge web development tools and frameworks."
      }
    },
    {
      "@type": "Question",
      name: "How can I hire Abhiraj K for a project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can hire Abhiraj K by visiting the contact page at https://www.abhirajk.online/contact-me and filling out the contact form. You can also connect through LinkedIn, GitHub, or Instagram. He is available for freelance projects, full-time opportunities, and technical consultations."
      }
    },
    {
      "@type": "Question",
      name: "What makes Abhiraj K one of the best software engineers in Kochi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhiraj K stands out as one of the best software engineers in Kochi due to his expertise in modern web technologies, focus on performance optimization, ability to create smooth animations and immersive user experiences, strong problem-solving skills, and commitment to writing clean, maintainable code. His portfolio showcases innovative projects using React, Next.js, Three.js, and other cutting-edge technologies."
      }
    },
    {
      "@type": "Question",
      name: "Does Abhiraj K work on freelance projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Abhiraj K is available for freelance projects. He works with clients in Kerala, across India, and internationally, providing full-stack development services for web applications, custom software solutions, and digital experiences."
      }
    },
    {
      "@type": "Question",
      name: "What type of projects has Abhiraj K worked on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abhiraj K has worked on various full-stack web applications including e-commerce platforms, portfolio websites, interactive 3D web experiences, progressive web apps, real-time applications, and custom business solutions. You can view his complete project portfolio at https://www.abhirajk.online/projects"
      }
    }
  ]
};

// How to use: Add this to any page component
// <script
//   type="application/ld+json"
//   dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
// />
