import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Sismac",
    category: "Sitio web",
    description:
      "Desarrollo integral del sitio institucional del ISMAC desde cero: análisis de requerimientos, diseño responsive, despliegue, SEO y mantenimiento continuo.",
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP"],
    imageUrl: "/projects/sitio-institucional.png",
    liveUrl: "https://ismac.edu.ec/",
  },
  {
    id: 2,
    title: "Simulador macOS",
    category: "Sitio web",
    description:
      "Aplicación tipo portafolio para un cliente freelance, con interfaz inspirada en macOS: transiciones, fondo dinámico y navegación tipo escritorio.",
    technologies: ["React", "CSS3"],
    imageUrl: "/projects/sitio-macos.png",
    liveUrl: "https://simulator-mac-os.netlify.app/",
  },
  {
    id: 3,
    title: "MoonStudio",
    category: "Landing page",
    description:
      "Landing page para un estudio creativo, con diseño espacial animado, secciones de servicios y llamados a la acción claros.",
    technologies: ["React", "CSS3"],
    imageUrl: "/projects/sitio-moonstudio.png",
    liveUrl: "https://moonstudioo.netlify.app/",
  },
  {
    id: 4,
    title: "TattoMS",
    category: "Sitio web",
    description:
      "Sitio web para un estudio de tatuajes, con diseño moderno, responsive y enfocado en mostrar el portafolio de trabajos del estudio.",
    technologies: ["React", "Tailwind CSS"],
    imageUrl: "/projects/sitio-tatuajes.png",
    liveUrl: "https://tattooms.netlify.app/",
  },
  {
    id: 5,
    title: "Dashboards SGA",
    category: "Panel web",
    description:
      "Vistas de dashboards interactivos con gráficas en React integradas a un backend existente en PHP (CodeIgniter), modernizando la visualización de datos académicos.",
    technologies: ["React", "Chart.js", "PHP"],
  },
  {
    id: 6,
    title: "Automatización de credenciales",
    category: "Automatización",
    description:
      "Sistema de generación automática de credenciales estudiantiles en PDF, reduciendo el tiempo de emisión en más de un 80% durante periodos de matrícula.",
    technologies: ["PHP", "JavaScript"],
  },
  {
    id: 7,
    title: "Rediseño Login y panel SGA",
    category: "Panel web",
    description:
      "Mejora integral de experiencia visual y usabilidad del login y panel principal del Sistema de Gestión Académica, con diseño responsive.",
    technologies: ["CSS3", "JavaScript"],
  },
  {
    id: 8,
    title: "Chatbot institucional",
    category: "Chatbot",
    description:
      "Chatbot personalizado desarrollado desde cero con arquitectura escalable, preparado para futuras integraciones con inteligencia artificial.",
    technologies: ["JavaScript", "PHP"],
  },
  {
    id: 9,
    title: "Sistema de campeonatos de fútbol",
    category: "Plataforma web",
    description:
      "Plataforma para seguimiento de campeonatos institucionales: fechas, tabla de posiciones, equipos inscritos y galería semanal.",
    technologies: ["PHP", "JavaScript", "MySQL"],
  },
  {
    id: 10,
    title: "MoonVideo",
    category: "SaaS",
    description:
      "Sistema SaaS con arquitectura escalable para personalizar reproductores de video embebibles en WordPress, Wix o cualquier sitio web. Proyecto en desarrollo.",
    technologies: ["React", "Node.js"],
  },
  {
    id: 11,
    title: "Sistema académico multiplataforma",
    category: "Web / mobile",
    description:
      "Frontend de un sistema académico web y mobile con calificaciones, notificaciones en tiempo real, temas claro/oscuro y componentes 3D interactivos.",
    technologies: ["React", "Three.js", "Motion", "Node.js"],
  },
];
