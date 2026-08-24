export type Language = "es" | "en";

export interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
  langToggle: {
    ariaLabel: string;
  };
  themeToggle: {
    ariaLabel: string;
  };
  hero: {
    eyebrow: string;
    description: string;
    ctaProjects: string;
    ctaContact: string;
  };
  about: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    text: string;
    stats: {
      experience: string;
      delivered: string;
      technologies: string;
    };
  };
  skills: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    categories: {
      frontend: string;
      backend: string;
      databases: string;
      tools: string;
    };
  };
  projects: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    viewMore: string;
    visitAriaLabel: (title: string) => string;
  };
  projectsPage: {
    back: string;
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
  };
  contact: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    text: string;
    location: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      sending: string;
      sent: string;
      submit: string;
    };
    status: {
      success: string;
      error: string;
    };
  };
  footer: {
    tagline: string;
    location: string;
    copyright: (year: number) => string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    backHome: string;
  };
  loader: {
    label: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      skills: "Habilidades",
      projects: "Proyectos",
      contact: "Contacto",
    },
    langToggle: {
      ariaLabel: "Cambiar idioma",
    },
    themeToggle: {
      ariaLabel: "Cambiar tema",
    },
    hero: {
      eyebrow: "Full Stack Developer",
      description:
        "Desarrollador con más de 3 años de experiencia construyendo productos digitales, con un enfoque especial en frontend y experiencias de usuario modernas.",
      ctaProjects: "Ver proyectos",
      ctaContact: "Contactarme",
    },
    about: {
      eyebrow: "Sobre mí",
      titlePrefix: "Convierto ideas en productos digitales ",
      titleHighlight: "reales",
      text: "Más de 3 años construyendo soluciones web, entre proyectos institucionales y freelance. Me enfoco en frontend sin perder de vista el backend, cuidando cada detalle hasta que el producto se sienta realmente pulido. Disfruto resolver problemas reales con código limpio y aprender algo nuevo en cada proyecto.",
      stats: {
        experience: "Años de experiencia",
        delivered: "Proyectos entregados",
        technologies: "Tecnologías dominadas",
      },
    },
    skills: {
      eyebrow: "Habilidades",
      titlePrefix: "Tecnologías con las que ",
      titleHighlight: "trabajo",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        databases: "Bases de datos",
        tools: "Herramientas y diseño",
      },
    },
    projects: {
      eyebrow: "Proyectos",
      titlePrefix: "Algunos trabajos que he ",
      titleHighlight: "construido",
      viewMore: "Ver más",
      visitAriaLabel: (title) => `Visitar ${title}`,
    },
    projectsPage: {
      back: "Volver al inicio",
      eyebrow: "Proyectos",
      titlePrefix: "Todos los ",
      titleHighlight: "proyectos",
      description:
        "Un repaso completo por los proyectos institucionales y freelance en los que he trabajado.",
    },
    contact: {
      eyebrow: "Contacto",
      titlePrefix: "Hablemos de tu próximo ",
      titleHighlight: "proyecto",
      text: "¿Tienes una idea, una oportunidad laboral o simplemente quieres saludar? Escríbeme, con gusto te respondo.",
      location: "De Quito Papá",
      form: {
        nameLabel: "Nombre",
        namePlaceholder: "Tu nombre",
        emailLabel: "Email",
        emailPlaceholder: "tu@email.com",
        messageLabel: "Mensaje",
        messagePlaceholder: "Cuéntame en qué puedo ayudarte",
        sending: "Enviando...",
        sent: "¡Enviado!",
        submit: "Enviar mensaje",
      },
      status: {
        success: "¡Mensaje enviado! Te responderé pronto.",
        error:
          "Hubo un error al enviar. Intenta de nuevo o escríbeme directo a marco10011111@gmail.com.",
      },
    },
    footer: {
      tagline: "Full Stack Developer construyendo experiencias digitales con propósito.",
      location: "Quito, Ecuador",
      copyright: (year) => `© ${year} Marco Pozo. Todos los derechos reservados.`,
    },
    notFound: {
      eyebrow: "Error 404",
      title: "Esta página no existe",
      description:
        "El enlace que seguiste puede estar roto o la página se movió de lugar.",
      backHome: "Volver al inicio",
    },
    loader: {
      label: "Cargando",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    langToggle: {
      ariaLabel: "Switch language",
    },
    themeToggle: {
      ariaLabel: "Switch theme",
    },
    hero: {
      eyebrow: "Full Stack Developer",
      description:
        "Developer with over 3 years of experience building digital products, with a special focus on frontend and modern user experiences.",
      ctaProjects: "View projects",
      ctaContact: "Get in touch",
    },
    about: {
      eyebrow: "About me",
      titlePrefix: "I turn ideas into ",
      titleHighlight: "real products",
      text: "Over 3 years building web solutions, across institutional and freelance projects. I focus on frontend without losing sight of the backend, polishing every detail until the product feels genuinely refined. I enjoy solving real problems with clean code and learning something new on every project.",
      stats: {
        experience: "Years of experience",
        delivered: "Projects delivered",
        technologies: "Technologies mastered",
      },
    },
    skills: {
      eyebrow: "Skills",
      titlePrefix: "Technologies I ",
      titleHighlight: "work with",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        databases: "Databases",
        tools: "Tools & design",
      },
    },
    projects: {
      eyebrow: "Projects",
      titlePrefix: "Some work I've ",
      titleHighlight: "built",
      viewMore: "View more",
      visitAriaLabel: (title) => `Visit ${title}`,
    },
    projectsPage: {
      back: "Back to home",
      eyebrow: "Projects",
      titlePrefix: "All ",
      titleHighlight: "projects",
      description:
        "A full rundown of the institutional and freelance projects I've worked on.",
    },
    contact: {
      eyebrow: "Contact",
      titlePrefix: "Let's talk about your next ",
      titleHighlight: "project",
      text: "Got an idea, a job opportunity, or just want to say hi? Write to me, I'll gladly reply.",
      location: "From Quito, Ecuador",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "you@email.com",
        messageLabel: "Message",
        messagePlaceholder: "Tell me how I can help",
        sending: "Sending...",
        sent: "Sent!",
        submit: "Send message",
      },
      status: {
        success: "Message sent! I'll get back to you soon.",
        error:
          "There was an error sending it. Try again or email me directly at marco10011111@gmail.com.",
      },
    },
    footer: {
      tagline: "Full Stack Developer building digital experiences with purpose.",
      location: "Quito, Ecuador",
      copyright: (year) => `© ${year} Marco Pozo. All rights reserved.`,
    },
    notFound: {
      eyebrow: "Error 404",
      title: "This page doesn't exist",
      description: "The link you followed might be broken, or the page has moved.",
      backHome: "Back to home",
    },
    loader: {
      label: "Loading",
    },
  },
};
