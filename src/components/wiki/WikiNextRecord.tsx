import { memo } from "react";
import { Link } from "react-router-dom";
import "./WikiNextRecord.css";

interface WikiNextRecordProps {
  path: string;
  label: string;
  title: string;
  description?: string;
  reveal?: boolean;
}

export const WikiNextRecord = memo(function WikiNextRecord({
  path,
  label,
  title,
  description,
  reveal = true,
}: WikiNextRecordProps) {
  return (
    <section
      className="wiki-next wiki-next--record"
      data-wiki-reveal={reveal ? "" : undefined}
    >
      <div className="wiki-next__inner">
        <div className="wiki-next__copy">
          <h2>{title}</h2>
          <p>
            {description ? (
              description
            ) : (
              <>
                Continue to <strong>{label}</strong>.
              </>
            )}
          </p>
        </div>

        <Link
          className="wiki-next__action"
          to={path}
          aria-label={`Continue to ${label}`}
        >
          <span>Next page</span>
          <strong
            className={label.length > 14 ? "wiki-next__label--long" : undefined}
          >
            {label}
          </strong>
          <b aria-hidden="true">↗</b>
        </Link>
      </div>
    </section>
  );
});
