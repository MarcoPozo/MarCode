import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Sitio web institucional",
    description:
      "Desarrollo integral del sitio institucional desde cero: análisis de requerimientos, diseño responsive, despliegue, SEO y mantenimiento continuo.",
    technologies: ["PHP", "JavaScript", "CSS3", "SEO"],
  },
  {
    id: 2,
    title: "Dashboards SGA",
    description:
      "Vistas de dashboards interactivos con gráficas en React integradas a un backend existente en PHP (CodeIgniter), modernizando la visualización de datos académicos.",
    technologies: ["React", "Chart.js", "PHP"],
  },
  {
    id: 3,
    title: "Automatización de credenciales",
    description:
      "Sistema de generación automática de credenciales estudiantiles en PDF, reduciendo el tiempo de emisión en más de un 80% durante periodos de matrícula.",
    technologies: ["PHP", "JavaScript"],
  },
  {
    id: 4,
    title: "Rediseño Login y panel SGA",
    description:
      "Mejora integral de experiencia visual y usabilidad del login y panel principal del Sistema de Gestión Académica, con diseño responsive.",
    technologies: ["CSS3", "JavaScript"],
  },
  {
    id: 5,
    title: "Chatbot institucional",
    description:
      "Chatbot personalizado desarrollado desde cero con arquitectura escalable, preparado para futuras integraciones con inteligencia artificial.",
    technologies: ["JavaScript", "PHP"],
  },
  {
    id: 6,
    title: "Sistema de campeonatos de fútbol",
    description:
      "Plataforma para seguimiento de campeonatos institucionales: fechas, tabla de posiciones, equipos inscritos y galería semanal.",
    technologies: ["PHP", "JavaScript", "MySQL"],
  },
  {
    id: 7,
    title: "MoonVideo",
    description:
      "Sistema SaaS con arquitectura escalable para personalizar reproductores de video embebibles en WordPress, Wix o cualquier sitio web. Proyecto en desarrollo.",
    technologies: ["React", "Node.js"],
  },
  {
    id: 8,
    title: "Sistema académico multiplataforma",
    description:
      "Frontend de un sistema académico web y mobile con calificaciones, notificaciones en tiempo real, temas claro/oscuro y componentes 3D interactivos.",
    technologies: ["React", "Three.js", "Motion", "Node.js"],
  },
  {
    id: 9,
    title: "Portafolio interactivo estilo macOS",
    description:
      "Aplicación tipo portafolio para un cliente freelance, con interfaz inspirada en macOS: transiciones, fondo dinámico y navegación tipo escritorio.",
    technologies: ["React", "CSS3"],
  },
];
