import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Sismac",
    category: { es: "Sitio web", en: "Website" },
    description: {
      es: "Desarrollo integral del sitio institucional del ISMAC desde cero: análisis de requerimientos, diseño responsive, despliegue, SEO y mantenimiento continuo.",
      en: "End-to-end development of ISMAC's institutional website from scratch: requirements analysis, responsive design, deployment, SEO, and ongoing maintenance.",
    },
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP"],
    imageUrl: "/projects/sitio-institucional.png",
    liveUrl: "https://ismac.edu.ec/",
  },
  {
    id: 2,
    title: "Simulador macOS",
    category: { es: "Sitio web", en: "Website" },
    description: {
      es: "Aplicación tipo portafolio para un cliente freelance, con interfaz inspirada en macOS: transiciones, fondo dinámico y navegación tipo escritorio.",
      en: "Portfolio-style app for a freelance client, with a macOS-inspired interface: transitions, a dynamic background, and desktop-like navigation.",
    },
    technologies: ["React", "CSS3"],
    imageUrl: "/projects/sitio-macos.png",
    liveUrl: "https://simulator-mac-os.netlify.app/",
  },
  {
    id: 3,
    title: "MoonStudio",
    category: { es: "Landing page", en: "Landing page" },
    description: {
      es: "Landing page para un estudio creativo, con diseño espacial animado, secciones de servicios y llamados a la acción claros.",
      en: "Landing page for a creative studio, with an animated space-themed design, service sections, and clear calls to action.",
    },
    technologies: ["React", "CSS3"],
    imageUrl: "/projects/sitio-moonstudio.png",
    liveUrl: "https://moonstudioo.netlify.app/",
  },
  {
    id: 4,
    title: "TattoMS",
    category: { es: "Sitio web", en: "Website" },
    description: {
      es: "Sitio web para un estudio de tatuajes, con diseño moderno, responsive y enfocado en mostrar el portafolio de trabajos del estudio.",
      en: "Website for a tattoo studio, with a modern, responsive design focused on showcasing the studio's portfolio of work.",
    },
    technologies: ["React", "Tailwind CSS"],
    imageUrl: "/projects/sitio-tatuajes.png",
    liveUrl: "https://tattooms.netlify.app/",
  },
  {
    id: 5,
    title: "Dashboards SGA",
    category: { es: "Panel web", en: "Web dashboard" },
    description: {
      es: "Vistas de dashboards interactivos con gráficas en React integradas a un backend existente en PHP (CodeIgniter), modernizando la visualización de datos académicos.",
      en: "Interactive dashboard views with React charts integrated into an existing PHP (CodeIgniter) backend, modernizing academic data visualization.",
    },
    technologies: ["React", "Chart.js", "PHP"],
  },
  {
    id: 6,
    title: "Automatización de credenciales",
    category: { es: "Automatización", en: "Automation" },
    description: {
      es: "Sistema de generación automática de credenciales estudiantiles en PDF, reduciendo el tiempo de emisión en más de un 80% durante periodos de matrícula.",
      en: "Automatic student credential generation system in PDF, cutting issuance time by more than 80% during enrollment periods.",
    },
    technologies: ["PHP", "JavaScript"],
  },
  {
    id: 7,
    title: "Rediseño Login y panel SGA",
    category: { es: "Panel web", en: "Web dashboard" },
    description: {
      es: "Mejora integral de experiencia visual y usabilidad del login y panel principal del Sistema de Gestión Académica, con diseño responsive.",
      en: "Full visual and usability overhaul of the login and main dashboard of the Academic Management System, with a responsive design.",
    },
    technologies: ["CSS3", "JavaScript"],
  },
  {
    id: 8,
    title: "Chatbot institucional",
    category: { es: "Chatbot", en: "Chatbot" },
    description: {
      es: "Chatbot personalizado desarrollado desde cero con arquitectura escalable, preparado para futuras integraciones con inteligencia artificial.",
      en: "Custom chatbot built from scratch with a scalable architecture, ready for future AI integrations.",
    },
    technologies: ["JavaScript", "PHP"],
  },
  {
    id: 9,
    title: "Sistema de campeonatos de fútbol",
    category: { es: "Plataforma web", en: "Web platform" },
    description: {
      es: "Plataforma para seguimiento de campeonatos institucionales: fechas, tabla de posiciones, equipos inscritos y galería semanal.",
      en: "Platform for tracking institutional football championships: match dates, standings, registered teams, and a weekly gallery.",
    },
    technologies: ["PHP", "JavaScript", "MySQL"],
  },
  {
    id: 10,
    title: "MoonVideo",
    category: { es: "SaaS", en: "SaaS" },
    description: {
      es: "Sistema SaaS con arquitectura escalable para personalizar reproductores de video embebibles en WordPress, Wix o cualquier sitio web. Proyecto en desarrollo.",
      en: "SaaS system with a scalable architecture for customizing embeddable video players for WordPress, Wix, or any website. Project in progress.",
    },
    technologies: ["React", "Node.js"],
  },
  {
    id: 11,
    title: "Sistema académico multiplataforma",
    category: { es: "Web / mobile", en: "Web / mobile" },
    description: {
      es: "Frontend de un sistema académico web y mobile con calificaciones, notificaciones en tiempo real, temas claro/oscuro y componentes 3D interactivos.",
      en: "Frontend for a web and mobile academic system with grades, real-time notifications, light/dark themes, and interactive 3D components.",
    },
    technologies: ["React", "Three.js", "Motion", "Node.js"],
  },
];
