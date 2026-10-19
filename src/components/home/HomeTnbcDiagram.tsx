const outline = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/tnbc-cell-outline.webp";
const cytoplasm = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/tnbc-cell-cytoplasm.webp";
const nucleus = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/tnbc-cell-nucleus.webp";
const markers = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/tnbc-cell-markers.webp";
const negativeUpper = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/tnbc-cell-negative-upper.webp";
const negativeMiddle = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/tnbc-cell-negative-middle.webp";
const negativeLower = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/tnbc-cell-negative-lower.webp";

const layers = [
  { name: "outline", src: outline },
  { name: "cytoplasm", src: cytoplasm },
  { name: "nucleus", src: nucleus },
  { name: "markers", src: markers },
  { name: "negative-upper", src: negativeUpper },
  { name: "negative-middle", src: negativeMiddle },
  { name: "negative-lower", src: negativeLower },
] as const;

export function HomeTnbcDiagram() {
  return (
    <figure
      className="tnbc-diagram"
      role="img"
      aria-label="Conceptual cell illustration with illustrative symbols labelled ER negative, PR negative and HER2 negative."
    >
      <div className="tnbc-diagram__art">
        {layers.map(({ name, src }) => (
          <img
            key={name}
            src={src}
            className="tnbc-diagram__layer"
            data-tnbc-layer={name}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width="1000"
            height="1000"
            decoding="async"
            draggable={false}
          />
        ))}
      </div>
      <div className="story-receptors" aria-hidden="true">
        <span>
          ER <b>−</b>
        </span>
        <span>
          PR <b>−</b>
        </span>
        <span>
          HER2 <b>−</b>
        </span>
      </div>
    </figure>
  );
}
