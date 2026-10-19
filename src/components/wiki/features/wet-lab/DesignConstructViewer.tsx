import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import {
  constructCategoryByKey,
  constructElements,
  constructMeta,
  constructSites,
  type ConstructElement,
} from "../../../../data/wet-lab/designConstruct";
import {
  buildSequenceRows,
  constructMap,
  findSelectable,
  formatBp,
  partRegistrySlug,
  stripMarkup,
  type MapLabelItem,
  type SelectedConstruct,
  type SequenceMetrics,
  type SequenceRow,
} from "./constructGeometry";
import "../../../../styles/features/design-panels.css";

/**
 * Interactive construct architecture of `pCirCure-circMEV`.
 *
 * A React port of the team's standalone `construct-architecture.html`: the same
 * SnapGene-style circular map, the same element-function panel and the same
 * sequence browser, so the page carries the delivered interaction rather than a
 * screenshot of it. Geometry lives in `constructGeometry.ts`, annotations in
 * `data/wet-lab/designConstruct.ts`; this file owns only state and markup.
 *
 * The colour-coded element glyphs keep the delivered BioRender-style palette
 * because the category is real information — a CTL epitope has to be
 * distinguishable from a linker at a glance — while the panel chrome around
 * them uses the Wet Lab palette rather than the delivery's neutral greys.
 */

/**
 * Bases per sequence row. Fixed rather than fitted: fifty bases to a line is the
 * convention sequence editors use, and a fixed count means two preparations are
 * comparable line by line. The strand is then sized so that exactly fifty bases
 * fill the panel (see `measure()`), instead of the row length following the
 * window width.
 */
export const SEQUENCE_BASES_PER_ROW = 50;

const STRAND_MIN_PX = 9;
const STRAND_MAX_PX = 13.5;

export function DesignConstructViewer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(() => findSelectable(selectedId), [selectedId]);

  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [metrics, setMetrics] = useState<SequenceMetrics | null>(null);
  const metricsRef = useRef<SequenceMetrics | null>(null);
  const scrollRequestRef = useRef(false);

  metricsRef.current = metrics;

  /* Size the strand so fifty bases fill the row, then measure one base's advance
     from the live typography: only the browser knows the resolved font metrics,
     and every feature bar, cut mark and tick coordinate depends on them. */
  useLayoutEffect(() => {
    const root = rootRef.current;
    const box = scrollRef.current;
    const probe = measureRef.current;
    if (!root || !box || !probe) return;

    const measure = () => {
      // The scroll box's padding and scrollbar are not usable row width.
      const available = Math.max(0, box.clientWidth - 26);

      const readProbe = () => {
        const rect = probe.getBoundingClientRect();
        const computed = window.getComputedStyle(probe);
        const fontSize = Number.parseFloat(computed.fontSize) || 12.5;
        const advance = rect.width / 100 || 12;
        return {
          rect,
          fontSize,
          advance,
          // Advance per pixel of font size. Both the glyph advance and the
          // em-based tracking scale with it, so one correction pass converges
          // exactly — and it stays right if the tracking or the mono face changes.
          ratio: advance / fontSize,
          letterSpacing: Number.parseFloat(computed.letterSpacing) || 0,
        };
      };

      const before = readProbe();
      const strandSize = Math.min(
        STRAND_MAX_PX,
        Math.max(
          STRAND_MIN_PX,
          available / (SEQUENCE_BASES_PER_ROW * before.ratio),
        ),
      );

      let reading = before;
      if (Math.abs(strandSize - before.fontSize) > 0.05) {
        // Write, then re-read: the probe reports the metrics of the new size.
        root.style.setProperty(
          "--cc-strand-size",
          `${strandSize.toFixed(2)}px`,
        );
        reading = readProbe();
      }

      const { advance, letterSpacing } = reading;
      const lineHeight = reading.rect.height;

      setMetrics((previous) =>
        previous &&
        previous.advance === advance &&
        previous.basesPerRow === SEQUENCE_BASES_PER_ROW &&
        previous.lineHeight === lineHeight &&
        previous.letterSpacing === letterSpacing
          ? previous
          : {
              advance,
              basesPerRow: SEQUENCE_BASES_PER_ROW,
              lineHeight,
              letterSpacing,
            },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const rows = useMemo(
    () => (metrics ? buildSequenceRows(metrics) : []),
    [metrics],
  );

  const select = useCallback((id: string, scroll: boolean) => {
    scrollRequestRef.current = scroll;
    setSelectedId((previous) => (previous === id ? null : id));
  }, []);

  /* A click on the map brings the sequence to the matching row; a click inside
     the sequence must not, because the reader is already looking at it. */
  useEffect(() => {
    const requested = scrollRequestRef.current;
    scrollRequestRef.current = false;
    const box = scrollRef.current;
    if (!selected || !requested || !box || !metricsRef.current) return;

    for (const row of box.querySelectorAll<HTMLElement>(".cc-row")) {
      if (Number(row.dataset.end) >= selected.start) {
        box.scrollTo({
          top: Math.max(0, row.offsetTop - 10),
          behavior: "smooth",
        });
        return;
      }
    }
  }, [selected]);

  const handleSequenceClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const chip = target.closest<HTMLElement>(".cc-schip");
    if (chip?.dataset.id) {
      select(chip.dataset.id, false);
      return;
    }
    const bar = target.closest<HTMLElement>(".cc-fbar");
    if (bar?.dataset.id) select(bar.dataset.id, false);
  };

  return (
    <div className="design-construct" ref={rootRef}>
      <div className="cc-grid">
        <section className="cc-panel">
          <div className="cc-phead">
            <span>Plasmid map</span>
            <span className="cc-meta">
              {constructMeta.name} · {formatBp(constructMeta.length)} bp ·{" "}
              {constructMeta.topology}
            </span>
          </div>
          <div className="cc-mapwrap">
            <ConstructMapSvg selectedId={selectedId} onSelect={select} />
          </div>
        </section>

        <div className="cc-right">
          <section className="cc-panel cc-info">
            <div className="cc-phead">
              <span>Element function</span>
              <span className="cc-meta">
                {selected ? "click again to clear" : "select an element"}
              </span>
            </div>
            <div className="cc-info-body">
              <div className="cc-info-top">
                <span className="cc-info-name">
                  {selected ? (
                    <Markup html={selected.name} />
                  ) : (
                    constructMeta.name
                  )}
                </span>
                {selected ? (
                  <span
                    className="cc-chip"
                    style={
                      { "--chip-fill": selected.chipFill } as CSSProperties
                    }
                  >
                    {selected.chipLabel}
                  </span>
                ) : null}
                {selected?.partBba ? (
                  <a
                    className="cc-bba"
                    href={`https://registry.igem.org/parts/${partRegistrySlug(
                      selected.partBba,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {selected.partBba}
                  </a>
                ) : null}
                <span className="cc-coord">
                  {selected
                    ? selected.coordinates
                    : `${formatBp(constructMeta.length)} bp · ${
                        constructMeta.topology
                      } · ${constructElements.length} elements · ${
                        constructSites.length
                      } unique cutters`}
                </span>
              </div>
              {selected ? (
                <Markup
                  as="p"
                  className="cc-info-desc"
                  html={selected.description}
                />
              ) : (
                <p className="cc-info-desc">
                  Select an element on the map or in the sequence to read what
                  it does in the construct.
                </p>
              )}
            </div>
          </section>

          <section className="cc-panel cc-seqpanel">
            <div className="cc-phead">
              <span>Sequence</span>
              <span className="cc-meta">
                {formatBp(constructMeta.length)} bp · scroll to browse
              </span>
            </div>
            <div
              className="cc-seqscroll"
              ref={scrollRef}
              onClick={handleSequenceClick}
            >
              <span
                ref={measureRef}
                className="cc-strand cc-meas"
                aria-hidden="true"
              >
                {"A".repeat(100)}
              </span>
              {metrics
                ? rows.map((row) => (
                    <SequenceRowView
                      key={row.start}
                      row={row}
                      metrics={metrics}
                      selected={selected}
                      selectedId={selectedId}
                    />
                  ))
                : null}
            </div>
          </section>
        </div>
      </div>

      <p className="cc-caption">
        Figure 6. Construct architecture of pCirCure-circMEV. Element colours
        denote functional class, and elements carrying a BBa number are
        registered in the iGEM Registry.
      </p>
    </div>
  );
}

/**
 * Native tooltip for one element. React requires `<title>` to receive a single
 * string, so the coordinates are interpolated rather than passed as siblings.
 */
function elementTitle(element: ConstructElement): string {
  return `${stripMarkup(element.name)} (${formatBp(element.start)}..${formatBp(
    element.end,
  )})`;
}

/**
 * The delivered annotations carry a small, fixed vocabulary of inline markup —
 * `<em>` for gene and intron names, `<span class="cc-aa">` for peptide runs,
 * `<sup>` in one description. They are build-time constants authored by the
 * team, never user input, so they are rendered as markup rather than escaped.
 */
function Markup({
  as: Tag = "span",
  html,
  className,
}: {
  as?: "span" | "p";
  html: string;
  className?: string;
}) {
  return (
    <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function ConstructMapSvg({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string, scroll: boolean) => void;
}) {
  const selected = useMemo(() => findSelectable(selectedId), [selectedId]);

  const handleClick = (event: MouseEvent<SVGGElement>) => {
    const group = (event.target as Element).closest<SVGGElement>(".cc-g");
    const id = group?.dataset.id;
    if (id) onSelect(id, true);
  };

  const renderLabel = (item: MapLabelItem) => {
    if (item.kind === "site") {
      const { site, cutmark, label } = item.geometry;
      return (
        <g
          className={`cc-g cc-gsite${selectedId === site.id ? " is-on" : ""}`}
          data-id={site.id}
          key={site.id}
          onClick={handleClick}
        >
          <line
            className="cc-cutmark"
            x1={cutmark.x1}
            y1={cutmark.y1}
            x2={cutmark.x2}
            y2={cutmark.y2}
          />
          <polyline className="cc-lead" points={label.lead} />
          <text
            className="cc-slbl"
            x={label.textX}
            y={label.textY}
            textAnchor={label.anchor}
          >
            {site.name}
            <tspan className="cc-spos"> ({formatBp(site.cut)})</tspan>
          </text>
        </g>
      );
    }

    const { element, fill, stroke, tag, hit, tick, label } = item.geometry;
    return (
      <g
        className={`cc-g${selectedId === element.id ? " is-on" : ""}`}
        data-id={element.id}
        key={element.id}
        onClick={handleClick}
      >
        {tick ? (
          <line
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={stroke}
            strokeWidth={1.6}
          />
        ) : null}
        {label ? <polyline className="cc-lead" points={label.lead} /> : null}
        <path
          className="cc-tag"
          d={tag}
          fill={fill}
          stroke={stroke}
          strokeLinejoin="round"
        />
        <path className="cc-hit" d={hit}>
          <title>{elementTitle(element)}</title>
        </path>
        {label ? (
          <text
            className="cc-lbl"
            x={label.textX}
            y={label.textY}
            textAnchor={label.anchor}
          >
            {stripMarkup(element.shortLabel)}
          </text>
        ) : null}
      </g>
    );
  };

  return (
    <svg
      className="cc-svg"
      viewBox={constructMap.viewBox}
      role="img"
      aria-label="Circular map of pCirCure-circMEV with annotated elements and unique restriction sites"
    >
      <defs>
        {constructMap.inlineElements.map((geometry) => (
          <path
            id={`ccarc-${geometry.element.id}`}
            key={geometry.element.id}
            d={geometry.arc}
            fill="none"
          />
        ))}
      </defs>

      <g>
        {selected?.wedge ? (
          <>
            <path className="cc-wedge" d={selected.wedge.body} />
            {selected.wedge.edges.map((edge, index) => (
              <line
                className="cc-wedge-edge"
                key={index}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
              />
            ))}
          </>
        ) : null}
      </g>

      <circle
        className="cc-ring"
        cx={constructMap.centreX}
        cy={constructMap.centreY}
        r={constructMap.ringRadius}
      />
      {constructMap.kbTicks.map((tick) => (
        <line
          className="cc-rtick"
          key={`kb-${tick.x1}-${tick.y1}`}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
        />
      ))}
      <line
        className="cc-rtick"
        x1={constructMap.topTick.x1}
        y1={constructMap.topTick.y1}
        x2={constructMap.topTick.x2}
        y2={constructMap.topTick.y2}
        stroke="#8f99a6"
        strokeWidth={1.4}
      />
      <text
        className="cc-cname"
        x={constructMap.centreX}
        y={constructMap.centreY - 4}
      >
        {constructMap.centreName}
      </text>
      <text
        className="cc-clen"
        x={constructMap.centreX}
        y={constructMap.centreY + 13}
      >
        {constructMap.centreLength}
      </text>

      {constructMap.inlineElements.map((geometry) => {
        const { element, fill, stroke, tag, hit } = geometry;
        return (
          <g
            className={`cc-g${selectedId === element.id ? " is-on" : ""}`}
            data-id={element.id}
            key={element.id}
            onClick={handleClick}
          >
            <path
              className="cc-tag"
              d={tag}
              fill={fill}
              stroke={stroke}
              strokeLinejoin="round"
            />
            <path className="cc-hit" d={hit}>
              <title>{elementTitle(element)}</title>
            </path>
            <text className="cc-inlbl" dominantBaseline="central">
              <textPath
                href={`#ccarc-${element.id}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {stripMarkup(element.shortLabel)}
              </textPath>
            </text>
          </g>
        );
      })}

      {constructMap.rightLabels.map(renderLabel)}
      {constructMap.leftLabels.map(renderLabel)}

      {constructMap.kbLabels.map((label) => (
        <text
          className="cc-rnum"
          key={`kbn-${label.value}`}
          x={label.x}
          y={label.y}
        >
          {label.value}
        </text>
      ))}
    </svg>
  );
}

function SequenceRowView({
  row,
  metrics,
  selected,
  selectedId,
}: {
  row: SequenceRow;
  metrics: SequenceMetrics;
  selected: SelectedConstruct | null;
  selectedId: string | null;
}) {
  const overlaps =
    selected && !(selected.end < row.start || selected.start > row.end);
  const highlight = overlaps
    ? {
        left:
          (Math.max(selected.start, row.start) - row.start) * metrics.advance,
        width:
          (Math.min(selected.end, row.end) -
            Math.max(selected.start, row.start) +
            1) *
          metrics.advance,
      }
    : null;
  const category = selected ? constructCategoryByKey[selected.category] : null;

  return (
    <div
      className="cc-row"
      data-start={row.start}
      data-end={row.end}
      style={{ "--cc-site-lane": `${row.siteLane}px` } as CSSProperties}
    >
      {row.siteLane ? (
        <div className="cc-slane">
          {row.chips.map((chip) => (
            <div
              className={`cc-schip${selectedId === chip.id ? " is-on" : ""}`}
              data-id={chip.id}
              key={chip.id}
              style={
                { "--chip-left": `${chip.left.toFixed(2)}px` } as CSSProperties
              }
            >
              {chip.name}
            </div>
          ))}
        </div>
      ) : null}

      <div className="cc-hl">
        {highlight ? (
          <i
            style={
              {
                "--hl-left": `${highlight.left.toFixed(2)}px`,
                "--hl-width": `${highlight.width.toFixed(2)}px`,
                "--hl-fill": `${category?.fill}66`,
                "--hl-ring": category?.stroke,
              } as CSSProperties
            }
          />
        ) : null}
      </div>

      <div className="cc-strand">{row.sense}</div>
      <div className="cc-strand cc-anti">{row.antisense}</div>

      {row.cuts.length ? (
        <div
          className="cc-cuts"
          style={
            {
              "--cc-cuts-height": `${(metrics.lineHeight * 2).toFixed(1)}px`,
            } as CSSProperties
          }
        >
          {row.cuts.map((cut, index) => (
            <i
              key={index}
              style={
                {
                  "--cut-left": `${cut.left.toFixed(2)}px`,
                  "--cut-top": cut.top,
                  ...(cut.width === null
                    ? {}
                    : { "--cut-width": `${cut.width.toFixed(2)}px` }),
                  "--cut-height": cut.height,
                } as CSSProperties
              }
            />
          ))}
        </div>
      ) : null}

      <div
        className="cc-feats"
        style={
          { "--cc-feats-height": `${row.featuresHeight}px` } as CSSProperties
        }
      >
        {row.bars.map((bar) => (
          <div
            className={`cc-fbar${selectedId === bar.id ? " is-on" : ""}`}
            data-id={bar.id}
            key={bar.id}
            title={bar.title}
            style={
              {
                "--bar-left": `${bar.left.toFixed(2)}px`,
                "--bar-width": `${bar.width.toFixed(2)}px`,
                "--bar-top": `${bar.top}px`,
                "--bar-fill": bar.fill,
                "--bar-stroke": bar.stroke,
                "--bar-clip": bar.clip ?? "none",
              } as CSSProperties
            }
          >
            <span>{bar.label}</span>
          </div>
        ))}
      </div>

      <div
        className="cc-ruler"
        style={
          {
            "--cc-tick-pitch": `${row.tickPitch.toFixed(2)}px`,
            "--cc-tick-phase": `${row.tickPhase.toFixed(2)}px`,
          } as CSSProperties
        }
      >
        {/* One painted strip for the decade marks; only the labels are elements. */}
        <span className="cc-ruler-ticks" aria-hidden="true" />
        <i style={{ "--tick-left": "0px" } as CSSProperties} />
        {row.ruler.map((mark) => (
          <b
            key={mark.label}
            style={
              { "--tick-left": `${mark.left.toFixed(2)}px` } as CSSProperties
            }
          >
            {mark.label}
          </b>
        ))}
      </div>
    </div>
  );
}
