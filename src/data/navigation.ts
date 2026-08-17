import { FiCode, FiFolder, FiHome, FiMessageCircle, FiUser } from "react-icons/fi";

export const navSections = [
  { key: "home", id: "hero", icon: FiHome },
  { key: "about", id: "about", icon: FiUser },
  { key: "skills", id: "skills", icon: FiCode },
  { key: "projects", id: "projects", icon: FiFolder },
  { key: "contact", id: "contact", icon: FiMessageCircle },
] as const;
