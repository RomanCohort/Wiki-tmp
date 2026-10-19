import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FooterEasterEgg } from "./FooterEasterEgg";
import { FooterSponsors } from "./FooterSponsors";
import {
  FOOTER_CLINICAL_HOSPITAL_NAME,
  FOOTER_EMAIL,
  FOOTER_EMAIL_DOMAIN,
  FOOTER_EMAIL_LOCAL,
  FOOTER_INSTITUTION_LINES,
  FOOTER_LICENSE_LABEL,
  FOOTER_LICENSE_URL,
  FOOTER_MARK_CANCER_CENTER,
  FOOTER_MARK_CLINICAL,
  FOOTER_MARK_TEACHING,
  FOOTER_MARK_UNIVERSITY,
  FOOTER_SOCIAL_LINKS,
  type FooterMark,
} from "../data/footer";
import { useRouteModule } from "../hooks/useRouteModule";
import { stringToSlug } from "../utils";

/** One institution; its marks carry the name, so the group is announced once. */
function MarkRow({
  kind,
  label,
  marks,
}: {
  kind: string;
  label: string;
  marks: ReadonlyArray<FooterMark>;
}) {
  return (
    <li
      className="circure-footer__mark-row"
      data-mark={kind}
      role="img"
      aria-label={label}
    >
      {marks.map((mark) => (
        <img
          key={mark.src}
          src={mark.src}
          alt=""
          width={mark.width}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      ))}
    </li>
  );
}

/** Shared closing panel; a hidden photograph waits beyond its end. */
export function Footer() {
  const teamYear = import.meta.env.VITE_TEAM_YEAR;
  const teamName = import.meta.env.VITE_TEAM_NAME;
  const teamSlug = stringToSlug(teamName);
  const { pathname } = useLocation();
  const module = useRouteModule();
  const footerRef = useRef<HTMLElement>(null);

  // Fixed story and reader controls should not cover the closing content.
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    let frame = 0;
    const syncVisibility = () => {
      frame = 0;
      const rect = footer.getBoundingClientRect();
      document.documentElement.toggleAttribute(
        "data-footer-visible",
        rect.top < window.innerHeight && rect.bottom > 0,
      );
    };
    const scheduleSync = () => {
      if (!frame) frame = window.requestAnimationFrame(syncVisibility);
    };
    const observer = new IntersectionObserver(scheduleSync);
    observer.observe(footer);
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    syncVisibility();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.cancelAnimationFrame(frame);
      document.documentElement.removeAttribute("data-footer-visible");
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={[
        "circure-footer",
        module.home ? "is-home-page" : module.className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Site footer"
    >
      <div className="circure-footer__panel">
        <div className="circure-footer__inner">
          {/* The university above; its clinical college beside two departments. */}
          <ul className="circure-footer__marks">
            <MarkRow
              kind="university"
              label="Jilin University"
              marks={FOOTER_MARK_UNIVERSITY}
            />
          </ul>
          <ul className="circure-footer__marks circure-footer__marks--row">
            <MarkRow
              kind="clinical"
              label={FOOTER_CLINICAL_HOSPITAL_NAME}
              marks={FOOTER_MARK_CLINICAL}
            />
            <MarkRow
              kind="teaching"
              label={FOOTER_MARK_TEACHING.alt}
              marks={[FOOTER_MARK_TEACHING]}
            />
            <MarkRow
              kind="cancer"
              label={FOOTER_MARK_CANCER_CENTER.alt}
              marks={[FOOTER_MARK_CANCER_CENTER]}
            />
          </ul>

          <div className="circure-footer__contact">
            <nav
              className="circure-footer__social-links"
              aria-label="Official team channels"
            >
              {FOOTER_SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`circure-footer__social-link circure-footer__social-link--${link.id}`}
                  title={link.alt}
                  aria-label={link.alt}
                >
                  <img
                    src={link.icon}
                    alt={link.name}
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </a>
              ))}
            </nav>
            <address>
              <a href={"mailto:" + FOOTER_EMAIL}>
                <span>{FOOTER_EMAIL_LOCAL}</span>@{FOOTER_EMAIL_DOMAIN}
              </a>
              {FOOTER_INSTITUTION_LINES.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>

          <FooterSponsors />

          <nav
            className="circure-footer__navigation"
            aria-label="Footer navigation"
          >
            <Link to="/description">Description</Link>
            <Link to="/roster">Roster</Link>
            <Link to="/attributions">Attributions</Link>
          </nav>
          <div className="circure-footer__colophon">
            <p>
              © {teamYear} — Content on this site is licensed under a{" "}
              <a href={FOOTER_LICENSE_URL} rel="license">
                {FOOTER_LICENSE_LABEL}
              </a>
              .
            </p>
            <p>
              The repository used to create this website is available at{" "}
              <a href={"https://gitlab.igem.org/" + teamYear + "/" + teamSlug}>
                gitlab.igem.org/{teamYear}/{teamSlug}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <FooterEasterEgg key={pathname} />
    </footer>
  );
}
