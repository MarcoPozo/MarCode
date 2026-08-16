import { FiHome } from "react-icons/fi";
import { useLanguage } from "../../context/language-context";
import { Button } from "../../components/Button/Button";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import DashedGrid from "../../components/DashedGrid/DashedGrid";
import "./NotFound.css";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="section-view not-found">
      <DashedGrid shimmer={false} />
      <div className="container not-found__content">
        <span className="not-found__code" aria-hidden="true">
          404
        </span>

        <SectionHeading
          as="h1"
          eyebrow={t.notFound.eyebrow}
          title={t.notFound.title}
          description={t.notFound.description}
        />

        <Button as="link" to="/" variant="primary" icon={<FiHome />} iconPosition="left">
          {t.notFound.backHome}
        </Button>
      </div>
    </section>
  );
}
