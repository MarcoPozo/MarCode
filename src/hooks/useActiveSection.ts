import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const ids = idsKey.split(",").filter(Boolean);

    const computeActiveId = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
      if (atBottom) return ids[ids.length - 1];

      const navbarHeight =
        document.querySelector<HTMLElement>(".navbar")?.offsetHeight ?? 0;
      // Las secciones tienen mucho padding arriba/abajo, así que revisar
      // justo en el borde es demasiado frágil ante la precisión del
      // smooth-scroll. Se revisa un punto más adentro del viewport, bien
      // pasada esa zona muerta.
      const activationLine = window.scrollY + navbarHeight + window.innerHeight * 0.3;

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= activationLine) {
          current = id;
        }
      }
      return current;
    };

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActiveId(computeActiveId());
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [idsKey]);

  return activeId;
}
