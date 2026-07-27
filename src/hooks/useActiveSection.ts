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
      // Sections carry a lot of top/bottom padding, so checking right at the
      // fold is too fragile against smooth-scroll landing precision. Check a
      // point further into the viewport instead, well past that dead zone.
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
