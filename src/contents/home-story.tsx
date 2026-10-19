import {
  useEffect,
  useId,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { PaintedReveal } from "../components/home/PaintedReveal";
import { CircRnaArtwork } from "../components/home/CircRnaArtwork";
import { HomeRnaSequence } from "../components/home/HomeRnaSequence";
import { WardInfusionTube } from "../components/home/WardInfusionTube";
import originalManifest from "../assets/home/story/manifest.json";
const mapCloudWest = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/map-detail-baked-cloud-west.webp";
const mapCloudEast = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/map-detail-baked-cloud-east.webp";
const mapWaveWestOne = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/map-detail-baked-wave-west-1.webp";
const mapWaveWestTwo = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/map-detail-baked-wave-west-2.webp";
const mapWaveEastFour = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/map-detail-baked-wave-east-4.webp";
import supplements from "../assets/home/supplements/manifest.json";
const projectAdvantages = "https://static.igem.wiki/teams/6056/wiki/files/pages/home/project-advantages.avif";
const patientConcerned =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/home/patient-teary-20261004-467cbc4b5db7.webp";
const clinicianConcerned =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/home/clinician-concerned.avif";
const clinicianEllipsis =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/home/clinician-ellipsis.avif";
const patientQuestion =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/home/patient-question.avif";
import { useHomeStoryAnimation } from "../hooks/useHomeStoryAnimation";
import { HomeAntigenSwitch } from "../components/home/HomeAntigenSwitch";
import { HomeMoleculeGallery } from "../components/home/HomeMoleculeGallery";
import { HomeTnbcDiagram } from "../components/home/HomeTnbcDiagram";
import { HomeFinale } from "../components/home/HomeFinale";
import { HomeHopeArtwork } from "../components/home/HomeHopeArtwork";
import { HomeExploreLinks } from "../components/home/HomeExploreLinks";
const mapDataNoteUrl =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/home/map-data-note.avif";
const mapLatestUrl =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/home/map-latest-20261004-02da5d799cd2.webp";
const mapCloudNorthwestUrl =
  "https://static.igem.wiki/teams/6056/wiki/files/pages/home/map-cloud-northwest-7a14ee146da5.webp";
import "../styles/home-story.css";
import "../styles/home-tnbc-map.css";
import "../styles/home-reading.css";
import "../styles/home-supplements.css";
import "../styles/home-clinical-transition.css";
import "../styles/home-composition.css";
import "../styles/home-clinical-mobile.css";

const manifest = { ...originalManifest, ...supplements };

const imageUrls: Record<string, string> = {
  "../assets/home/story/scene-1-layer-1.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-1-layer-1.webp",
  "../assets/home/story/scene-1-layer-2.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-1-layer-2.webp",
  "../assets/home/story/scene-1-layer-3.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-1-layer-3.webp",
  "../assets/home/story/scene-1-layer-4.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-1-layer-4.webp",
  "../assets/home/story/scene-1-layer-5.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-1-layer-5.webp",
  "../assets/home/story/scene-2-layer-1.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-2-layer-1.webp",
  "../assets/home/story/scene-2-layer-2.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-2-layer-2.webp",
  "../assets/home/story/scene-2-layer-3.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-2-layer-3.webp",
  "../assets/home/story/scene-2-layer-4.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-2-layer-4.webp",
  "../assets/home/story/scene-2-layer-5.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-2-layer-5.webp",
  "../assets/home/story/scene-2-layer-6.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-2-layer-6.webp",
  "../assets/home/story/scene-3-layer-1.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-3-layer-1.webp",
  "../assets/home/story/scene-3-layer-2.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-3-layer-2.webp",
  "../assets/home/story/scene-3-layer-3.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-3-layer-3.webp",
  "../assets/home/story/scene-4-layer-1.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-4-layer-1.webp",
  "../assets/home/story/scene-4-layer-2.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-4-layer-2.webp",
  "../assets/home/story/scene-4-layer-3.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-4-layer-3.webp",
  "../assets/home/story/scene-4-layer-4.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-4-layer-4.webp",
  "../assets/home/story/scene-4-layer-5.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-4-layer-5.webp",
  "../assets/home/story/scene-4-layer-6.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-4-layer-6.webp",
  "../assets/home/story/scene-4-layer-7.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-4-layer-7.webp",
  "../assets/home/story/scene-4-layer-8.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-4-layer-8.webp",
  "../assets/home/story/scene-5-layer-1.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-5-layer-1.webp",
  "../assets/home/story/scene-5-layer-2.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-5-layer-2.webp",
  "../assets/home/story/scene-5-layer-3.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-5-layer-3.webp",
  "../assets/home/story/scene-6-layer-1.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-6-layer-1.webp",
  "../assets/home/story/scene-6-layer-2.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-6-layer-2.webp",
  "../assets/home/story/scene-6-layer-3.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-6-layer-3.webp",
  "../assets/home/story/scene-7-layer-1.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-7-layer-1.webp",
  "../assets/home/story/scene-7-layer-2.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-7-layer-2.webp",
  "../assets/home/story/scene-7-layer-3.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-7-layer-3.webp",
  "../assets/home/story/scene-7-layer-4.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-7-layer-4.webp",
  "../assets/home/story/scene-8-layer-1.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-8-layer-1.webp",
  "../assets/home/story/scene-8-layer-2.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-8-layer-2.webp",
  "../assets/home/story/scene-8-layer-3.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-8-layer-3.webp",
  "../assets/home/story/scene-8-layer-4.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-8-layer-4.webp",
  "../assets/home/story/scene-8-layer-5.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-8-layer-5.webp",
  "../assets/home/story/scene-8-layer-6.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-8-layer-6.webp",
  "../assets/home/story/scene-9-layer-1.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-9-layer-1.webp",
  "../assets/home/story/scene-9-layer-2.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-9-layer-2.webp",
  "../assets/home/story/scene-9-layer-3.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/scene-9-layer-3.webp",
};
const supplementUrls: Record<string, string> = {
  "../assets/home/supplements/fan-1.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/fan-1-7b6a2cdfd1c0.webp",
  "../assets/home/supplements/fan-2.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/fan-2-99316fb0dee8.webp",
  "../assets/home/supplements/fan-3.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/fan-3-5a2cfbaaa1bd.webp",
  "../assets/home/supplements/fan-4.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/fan-4-ca142f3896a2.webp",
  "../assets/home/supplements/fan-5.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/fan-5-6e5a6d6fc4bd.webp",
  "../assets/home/supplements/fan-6.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/fan-6-f2d48ddfefe2.webp",
  "../assets/home/supplements/fan-7.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/fan-7-e0b9ba792000.webp",
  "../assets/home/supplements/project-advantages.png": projectAdvantages,
  "../assets/home/supplements/tear-1.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/tear-1-6f99fafd2a57.webp",
  "../assets/home/supplements/tear-2.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/tear-2-df0640fe68b9.webp",
  "../assets/home/supplements/tear-3.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/tear-3-e5777e499af5.webp",
  "../assets/home/supplements/tear-4.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/tear-4-74fdbdde9e93.webp",
  "../assets/home/supplements/tear-5.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/tear-5-3a26285560f2.webp",
  "../assets/home/supplements/thinking-1.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/thinking-1-cf39f9eecc9d.webp",
  "../assets/home/supplements/thinking-10.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/thinking-10-958af66e1b31.webp",
  "../assets/home/supplements/thinking-2.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/thinking-2-9c0e1bf60d35.webp",
  "../assets/home/supplements/thinking-3.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/thinking-3-946139db0f4f.webp",
  "../assets/home/supplements/thinking-4.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/thinking-4-a202ea746a90.webp",
  "../assets/home/supplements/thinking-5.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/thinking-5-e9181f8afd09.webp",
  "../assets/home/supplements/thinking-6.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/thinking-6-3ae0541c5bcc.webp",
  "../assets/home/supplements/thinking-7.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/thinking-7-da0eb2680bea.webp",
  "../assets/home/supplements/thinking-8.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/thinking-8-f1b1cea38333.webp",
  "../assets/home/supplements/thinking-9.webp":
    "https://static.igem.wiki/teams/6056/wiki/files/pages/home/thinking-9-f7c387ca859a.webp",
};

function artworkUrl(file: string) {
  return (
    imageUrls[`../assets/home/story/${file}`] ??
    supplementUrls[`../assets/home/supplements/${file}`]
  );
}

type ArtworkId = keyof typeof manifest;

function StoryArtwork({
  scene,
  description,
  omitLayers = [],
  backgroundLayer = 1,
  role = "img",
  children,
}: {
  scene: ArtworkId;
  description: string;
  omitLayers?: number[];
  backgroundLayer?: number;
  role?: "img" | "group";
  children?: ReactNode;
}) {
  const artwork = manifest[scene];
  const background = artwork.layers.find(
    (layer) => layer.number === backgroundLayer,
  )!;
  return (
    <>
      <img
        className="story-backdrop"
        src={artworkUrl(background.file)}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <figure
        className={`story-art story-art--${scene}`}
        role={role}
        aria-label={description}
        style={{ "--art-aspect": artwork.aspect } as CSSProperties}
      >
        {artwork.layers.map((layer) => {
          if (
            layer.number === backgroundLayer ||
            omitLayers.includes(layer.number)
          )
            return null;
          const src = artworkUrl(layer.file);
          const style = {
            left: `${layer.left}%`,
            top: `${layer.top}%`,
            width: `${layer.width}%`,
            height: `${layer.height}%`,
          };
          // Scene 1's ring is drawn by CircRnaArtwork, not here.
          const kind =
            (scene === "4" || scene === "thinking") && layer.number === 6
              ? "arrow"
              : scene === "2" && layer.number === 2
                ? "platform"
                : null;
          return kind ? (
            <PaintedReveal
              key={layer.file}
              src={src}
              kind={kind}
              number={layer.number}
              style={style}
            />
          ) : (
            <img
              key={layer.file}
              crossOrigin="anonymous"
              src={src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="story-layer story-layer--reveal"
              data-layer={layer.number}
              style={style}
            />
          );
        })}
        {children}
      </figure>
    </>
  );
}

function WardArtwork() {
  const base = manifest["5"].layers;
  const patient = base[1];
  return (
    <>
      <img
        className="story-backdrop"
        src={imageUrls[`../assets/home/story/${base[0].file}`]}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <WardInfusionTube />
      <figure
        className="story-art story-art--ward"
        role="img"
        aria-label="In the same hospital room, a patient worries about recurrence while a medical student listens."
        style={{ "--art-aspect": 16 / 9 } as CSSProperties}
      >
        {base.slice(2).map((item) => (
          <img
            key={item.file}
            className={`story-layer story-ward-original story-ward-original--${item.number}`}
            data-ward={`original-${item.number}`}
            src={imageUrls[`../assets/home/story/${item.file}`]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              width: `${item.width}%`,
              height: `${item.height}%`,
            }}
          />
        ))}
        {[
          ["clinician", clinicianConcerned],
          ["ellipsis", clinicianEllipsis],
        ].map(([name, src]) => (
          <img
            key={name}
            className={`story-layer story-ward-change story-ward-change--${name}`}
            data-ward={name}
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        ))}
      </figure>
      <div
        className="story-art story-art--ward story-art--ward-patient"
        aria-hidden="true"
        style={{ "--art-aspect": 16 / 9 } as CSSProperties}
      >
        <img
          className="story-layer story-ward-original story-ward-original--2"
          data-ward="original-2"
          src={imageUrls[`../assets/home/story/${patient.file}`]}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            left: `${patient.left}%`,
            top: `${patient.top}%`,
            width: `${patient.width}%`,
            height: `${patient.height}%`,
          }}
        />
        <img
          className="story-layer story-ward-change story-ward-change--patient"
          data-ward="patient"
          src={patientConcerned}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <img
          className="story-layer story-ward-change story-ward-change--question"
          data-ward="question"
          src={patientQuestion}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
    </>
  );
}

const mapSouthIslandOffsetY = 3;

// Source crops stay fixed; optional left/top place details around the latest land.
const mapMotionPieces = [
  { name: "cloud-west", kind: "cloud", x: 0, y: 30, width: 8, height: 9 },
  {
    name: "cloud-northwest",
    kind: "cloud",
    x: 10,
    y: 10,
    width: 9,
    height: 8,
  },
  {
    name: "cloud-north",
    kind: "cloud",
    x: 57,
    y: 6,
    width: 8,
    height: 7,
    left: 85,
    top: 5,
  },
  { name: "cloud-east", kind: "cloud", x: 93, y: 25, width: 7, height: 9 },
  {
    name: "boat-smoke",
    kind: "cloud",
    x: 47,
    y: 66,
    width: 5,
    height: 4,
    left: 43.775,
    top: 62,
  },
  { name: "wave-west-1", kind: "wave", x: 0, y: 64, width: 8, height: 4 },
  { name: "wave-west-2", kind: "wave", x: 0, y: 69, width: 8, height: 4 },
  { name: "wave-southwest-1", kind: "wave", x: 12, y: 78, width: 8, height: 4 },
  { name: "wave-southwest-2", kind: "wave", x: 12, y: 82, width: 8, height: 5 },
  {
    name: "wave-central-west-1",
    kind: "wave",
    x: 32,
    y: 59,
    width: 7,
    height: 4,
  },
  {
    name: "wave-central-west-2",
    kind: "wave",
    x: 39,
    y: 64,
    width: 9,
    height: 4,
    top: 55,
  },
  {
    name: "wave-central-west-3",
    kind: "wave",
    x: 32,
    y: 83,
    width: 7,
    height: 5,
  },
  {
    name: "wave-central",
    kind: "wave",
    x: 50,
    y: 52,
    width: 8,
    height: 5,
    left: 34,
    top: 92,
  },
  {
    name: "wave-central-east-1",
    kind: "wave",
    x: 63,
    y: 40,
    width: 9,
    height: 5,
  },
  {
    name: "wave-central-east-2",
    kind: "wave",
    x: 61,
    y: 44,
    width: 12,
    height: 5,
  },
  {
    name: "wave-central-east-3",
    kind: "wave",
    x: 60,
    y: 64,
    width: 12,
    height: 5,
  },
  {
    name: "wave-central-east-4",
    kind: "wave",
    x: 65,
    y: 68,
    width: 5,
    height: 4,
  },
  { name: "wave-east-1", kind: "wave", x: 86, y: 39, width: 8, height: 4 },
  { name: "wave-east-2", kind: "wave", x: 87, y: 43, width: 6, height: 4 },
  { name: "wave-east-3", kind: "wave", x: 72, y: 74, width: 5, height: 4 },
  { name: "wave-east-4", kind: "wave", x: 91, y: 81, width: 9, height: 5 },
  {
    name: "wave-boat",
    kind: "wave",
    x: 43,
    y: 79.5,
    width: 9.5,
    height: 2.5,
    left: 40.1,
    top: 75.5,
  },
  {
    name: "boat",
    kind: "boat",
    x: 42,
    y: 70,
    width: 13.2,
    height: 9,
    left: 39.18125,
    top: 66,
  },
] as const;

type MapDetailCrop = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

// Source-pixel crops keep the original 1470 x 900 grid, with one pixel of padding.
// Rebuild these five frame-cleaned details with scripts/prepare-map-detail-crops.py.
const mapDetailCrops: Partial<
  Record<(typeof mapMotionPieces)[number]["name"], MapDetailCrop>
> = {
  "cloud-west": { src: mapCloudWest, x: 0, y: 269, width: 119, height: 83 },
  "cloud-east": { src: mapCloudEast, x: 1366, y: 224, width: 104, height: 83 },
  "wave-west-1": { src: mapWaveWestOne, x: 0, y: 575, width: 119, height: 38 },
  "wave-west-2": { src: mapWaveWestTwo, x: 0, y: 620, width: 119, height: 38 },
  "wave-east-4": { src: mapWaveEastFour, x: 1336, y: 728, width: 134, height: 47 },
};

const mapStatistics = [
  {
    key: "incidence-countries",
    value: "164",
    detail: "countries · 1st in incidence",
    description:
      "164 countries where breast cancer ranks first for new cases among women",
  },
  {
    key: "incidence-share",
    value: "24.3%",
    detail: "of new cases",
    description:
      "Breast cancer accounts for 24.3% of new cancer cases among women",
  },
  {
    key: "mortality-countries",
    value: "122",
    detail: "countries · 1st in mortality",
    description:
      "122 countries where breast cancer ranks first for cancer deaths among women",
  },
  {
    key: "mortality-share",
    value: "16.2%",
    detail: "of cancer deaths",
    description:
      "Breast cancer accounts for 16.2% of cancer deaths among women",
  },
] as const;

function MapArtwork() {
  const mapId = useId();
  const boatClipId = `${mapId}-boat`;
  const islandClipId = `${mapId}-south-island`;
  const mainlandMaskId = `${mapId}-mainland`;
  const mapLayer = { left: 0, top: 0, width: 100, height: 100 };
  const detailLayer = manifest["3"].layers[1];
  const detailSrc = imageUrls[`../assets/home/story/${detailLayer.file}`];
  const markerLayer = manifest["3"].layers[2];
  const markerSrc = imageUrls[`../assets/home/story/${markerLayer.file}`];
  // Independent windows preserve the artist's six original location marks.
  const markers = [
    { x: 13, y: 0, width: 11, height: 14 },
    { x: 0, y: 40, width: 10, height: 16 },
    { x: 40, y: 9, width: 10, height: 15 },
    { x: 78, y: 9, width: 11, height: 15 },
    { x: 90, y: 57, width: 10, height: 17 },
    { x: 49, y: 86, width: 11, height: 14, offsetY: mapSouthIslandOffsetY },
  ];
  const src = mapLatestUrl;
  return (
    <>
      <div className="tnbc-map-illustration">
        <StoryArtwork
          scene="3"
          omitLayers={[2, 3]}
          role="group"
          description="An illustrative world map, including Taiwan off the southeastern coast of China's mainland: six location marks appear one by one, showing that breast cancer affects people across the world. Locations are symbolic, not incidence data."
        >
          <svg
            className="story-layer story-map-landscape"
            data-layer="2"
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              left: `${mapLayer.left}%`,
              top: `${mapLayer.top}%`,
              width: `${mapLayer.width}%`,
              height: `${mapLayer.height}%`,
            }}
          >
            <defs>
              {/* Move the southern island and its islets without repainting them. */}
              <clipPath id={islandClipId}>
                <rect x="44" y="70" width="27" height="28" />
              </clipPath>
              <mask
                id={mainlandMaskId}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="100"
                height="100"
              >
                <rect width="100" height="100" fill="white" />
                <rect x="44" y="70" width="27" height="28" fill="black" />
              </mask>
              <clipPath id={boatClipId}>
                {/* Keep the smoke edge out of the independently rocking boat. */}
                <path d="M42 70 H48.7 V70.56 H55.2 V79 H42 Z" />
              </clipPath>
            </defs>
            <image
              href={src}
              mask={`url(#${mainlandMaskId})`}
              width="100"
              height="100"
              preserveAspectRatio="none"
            />
            <g transform={`translate(0 ${mapSouthIslandOffsetY})`}>
              <image
                href={src}
                clipPath={`url(#${islandClipId})`}
                width="100"
                height="100"
                preserveAspectRatio="none"
              />
            </g>
          </svg>
          {mapMotionPieces.map((part, index) => {
            const crop = mapDetailCrops[part.name];
            return (
              <svg
                key={part.name}
                className={`story-layer story-map-piece story-map-piece--${part.kind}`}
                data-map-piece={part.name}
                style={
                  {
                    left:
                      "left" in part
                        ? `${part.left}%`
                        : `${detailLayer.left + (detailLayer.width * part.x) / 100}%`,
                    top:
                      "top" in part
                        ? `${part.top}%`
                        : `${detailLayer.top + (detailLayer.height * part.y) / 100}%`,
                    width: `${(detailLayer.width * part.width) / 100}%`,
                    height: `${(detailLayer.height * part.height) / 100}%`,
                    "--piece-index": index,
                  } as CSSProperties
                }
                viewBox={
                  part.name === "cloud-northwest"
                    ? "0 0 100 100"
                    : `${part.x} ${part.y} ${part.width} ${part.height}`
                }
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <image
                  href={
                    crop?.src ??
                    (part.name === "cloud-northwest"
                      ? mapCloudNorthwestUrl
                      : detailSrc)
                  }
                  clipPath={
                    part.name === "boat" ? `url(#${boatClipId})` : undefined
                  }
                  x={crop ? (crop.x / 1470) * 100 : undefined}
                  y={crop ? (crop.y / 900) * 100 : undefined}
                  width={crop ? (crop.width / 1470) * 100 : 100}
                  height={crop ? (crop.height / 900) * 100 : 100}
                  preserveAspectRatio="none"
                />
              </svg>
            );
          })}
          {markers.map((marker, index) => (
            <svg
              key={index}
              className="story-layer tnbc-map-marker"
              data-map-marker={index}
              viewBox={`${marker.x} ${marker.y} ${marker.width} ${marker.height}`}
              preserveAspectRatio="none"
              aria-hidden="true"
              style={{
                left: `${markerLayer.left + (markerLayer.width * marker.x) / 100}%`,
                top: `${markerLayer.top + (markerLayer.height * marker.y) / 100 + (marker.offsetY ?? 0)}%`,
                width: `${(markerLayer.width * marker.width) / 100}%`,
                height: `${(markerLayer.height * marker.height) / 100}%`,
              }}
            >
              <image
                href={markerSrc}
                width="100"
                height="100"
                preserveAspectRatio="none"
              />
            </svg>
          ))}
        </StoryArtwork>
      </div>
      <div className="tnbc-map-copy">
        <h3 className="tnbc-map-intro">
          <span className="tnbc-map-intro-lead" data-map-copy>
            <span className="tnbc-map-intro-shared" data-tnbc-map-shared>
              Breast cancer
            </span>{" "}
            is the
          </span>
          <strong className="tnbc-map-intro-focus" data-map-copy>
            most common cancer
          </strong>
          <span className="tnbc-map-intro-context" data-map-copy>
            among women worldwide.
          </span>
        </h3>
      </div>
      <aside
        className="tnbc-map-notes"
        aria-label="Global breast cancer statistics for women, GLOBOCAN 2024"
      >
        {mapStatistics.map((statistic) => (
          <div
            className={`tnbc-map-note tnbc-map-note--${statistic.key}`}
            data-map-note
            key={statistic.key}
            role="group"
            aria-label={statistic.description}
          >
            <img
              src={mapDataNoteUrl}
              alt=""
              className="tnbc-map-note-img"
              aria-hidden="true"
              decoding="async"
            />
            <div className="tnbc-map-note-body">
              <strong className="tnbc-map-note-val">{statistic.value}</strong>
              <span className="tnbc-map-note-detail">{statistic.detail}</span>
            </div>
          </div>
        ))}
        <a
          className="tnbc-map-data-source"
          href="https://gco.iarc.who.int/today/"
          target="_blank"
          rel="noreferrer"
        >
          Data: GLOBOCAN 2024 ↗
        </a>
      </aside>
      <a
        className="tnbc-map-source"
        href="https://www.who.int/news-room/fact-sheets/detail/breast-cancer"
        target="_blank"
        rel="noreferrer"
        aria-label="World Health Organization: global breast cancer facts"
      >
        WHO ↗
      </a>
    </>
  );
}

const challengeItems = [
  { key: "surgery", label: "Surgery", x: 0, y: 0, width: 43, height: 52 },
  {
    key: "chemotherapy",
    label: "Chemotherapy",
    x: 0,
    y: 53,
    width: 43,
    height: 47,
  },
  {
    key: "resistance",
    label: "Drug resistance",
    x: 52,
    y: 0,
    width: 48,
    height: 38,
  },
  {
    key: "effects",
    label: "Severe side effects",
    x: 52,
    y: 36,
    width: 48,
    height: 34,
  },
  {
    key: "recurrence",
    label: "High recurrence risk",
    x: 52,
    y: 68,
    width: 48,
    height: 32,
  },
] as const;

function ChallengeArtwork() {
  const iconLayer = manifest["8"].layers[5];
  const src = imageUrls[`../assets/home/story/${iconLayer.file}`];
  return (
    <StoryArtwork
      scene="8"
      omitLayers={[5, 6]}
      description="Surgery, chemotherapy, drug resistance, severe side effects and recurrence risk, each paired with a small version of its original illustration."
    >
      <div
        className="story-challenge-heading story-challenge-heading--care"
        aria-hidden="true"
      >
        <span>Today’s care</span>
        <strong>Treatment</strong>
      </div>
      <div
        className="story-challenge-heading story-challenge-heading--need"
        aria-hidden="true"
      >
        <span>Unmet needs</span>
        <strong>Challenges</strong>
      </div>
      {challengeItems.map((item) => (
        <div className={`story-morph story-morph--${item.key}`} key={item.key}>
          <svg
            className="story-layer story-morph-icon"
            data-morph-icon={item.key}
            style={{
              left: `${iconLayer.left}%`,
              top: `${iconLayer.top}%`,
              width: `${iconLayer.width}%`,
              height: `${iconLayer.height}%`,
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <clipPath id={`challenge-${item.key}`}>
                <rect
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  height={item.height}
                />
              </clipPath>
            </defs>
            <image
              href={src}
              width="100"
              height="100"
              preserveAspectRatio="none"
              clipPath={`url(#challenge-${item.key})`}
            />
          </svg>
          <svg
            className="story-morph-thumbnail"
            data-morph-thumbnail={item.key}
            viewBox={`${item.x} ${item.y} ${item.width} ${item.height}`}
            preserveAspectRatio="none"
            style={{
              aspectRatio:
                (iconLayer.width * item.width * manifest["8"].aspect) /
                (iconLayer.height * item.height),
            }}
            aria-hidden="true"
          >
            <image
              href={src}
              width="100"
              height="100"
              preserveAspectRatio="none"
            />
          </svg>
          <span
            className="story-morph-word"
            data-morph-word={item.key}
            aria-hidden="true"
          >
            {item.label}
          </span>
        </div>
      ))}
    </StoryArtwork>
  );
}

function VaccineArtwork() {
  const boardSrc = artworkUrl("thinking-2.webp");
  const boardFrame = (side: "question" | "answer") => (
    <svg
      className="story-vaccine-mobile-frame"
      viewBox={`${side === "question" ? 0 : 58} 0 42 100`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <image
        href={boardSrc}
        width="100"
        height="100"
        preserveAspectRatio="none"
      />
    </svg>
  );
  return (
    <StoryArtwork
      scene="thinking"
      role="group"
      description="From a question about tumor recognition to cancer vaccines and antigen presentation."
    >
      <article className="story-vaccine-copy story-vaccine-copy--question">
        {boardFrame("question")}
        <div data-vaccine-copy="question">
          <h3>
            <span className="story-vaccine-context">
              If conventional therapies lack sufficient targets,
            </span>{" "}
            <span className="story-vaccine-question">
              could the patient’s <strong>immune system</strong>{" "}
              <span className="story-vaccine-question-ending">
                recognize the tumor?
              </span>
            </span>
          </h3>
        </div>
      </article>
      <article className="story-vaccine-copy story-vaccine-copy--answer">
        {boardFrame("answer")}
        <div data-vaccine-copy="answer">
          <h3>
            <strong className="story-vaccine-answer-title">
              Cancer vaccines
            </strong>{" "}
            <span className="story-vaccine-context">
              present <strong>tumor antigens</strong> to train the immune system
              to <strong>recognize and attack tumors.</strong>
            </span>
          </h3>
        </div>
      </article>
    </StoryArtwork>
  );
}

const platformNotes = [
  ["mechanism", "Immune recognition", "Present antigens to the immune system"],
  ["design", "Antigen switching", "Replace the sequence, keep the backbone"],
  ["structure", "Multiple targets", "Design for tumor heterogeneity"],
  ["beyond", "Beyond TNBC", "A platform to explore other solid tumors"],
] as const;

function PlatformArtwork() {
  return (
    <div className="story-platform-layout">
      <StoryArtwork
        scene="fan"
        role="group"
        description="Project advantages: immune recognition, antigen switching, multiple targets and a vision beyond TNBC. Conceptual platform design."
      >
        <div className="story-platform-notes">
          {platformNotes.map(([key, title, detail]) => (
            <span
              className={`story-platform-note story-platform-note--${key}`}
              data-platform-note={key}
              key={key}
            >
              <strong>{title}</strong>
              <small>{detail}</small>
            </span>
          ))}
        </div>
      </StoryArtwork>
    </div>
  );
}

function TearArtwork() {
  return (
    <>
      <StoryArtwork
        scene="tear"
        backgroundLayer={2}
        omitLayers={[1]}
        description="A hand-painted tear holds the patient's question: What if it comes back?"
      />
      <div
        className="story-tear-copy story-tear-copy--before"
        data-tear-copy="before"
      >
        <p className="story-tear-context">
          During clinical training, we met patients living with triple-negative
          breast cancer. After surgery and chemotherapy, one hope remained.
        </p>
        <div className="story-tear-dialogue">
          <blockquote className="story-tear-wish">
            “I just hope it never comes back.”
          </blockquote>
          <blockquote id="the-question" className="story-tear-question">
            “What if it comes back?”
          </blockquote>
        </div>
      </div>
      <div
        className="story-tear-copy story-tear-copy--after"
        data-tear-copy="after"
      >
        <p>
          Treatment had ended. <br />
          The uncertainty had not.
        </p>
        <p className="story-tear-ending">
          Her question <br />
          stayed with us.
        </p>
      </div>
    </>
  );
}

function BeyondArtwork() {
  const family = manifest["6"].layers[1];
  return (
    <>
      <StoryArtwork
        scene="6"
        omitLayers={[2]}
        description="A patient and doctor stand together in a sunlit clinic while a family member looks on."
      />
      <div
        className="story-art story-art--6 story-art--family"
        aria-hidden="true"
        style={{ "--art-aspect": manifest["6"].aspect } as CSSProperties}
      >
        <img
          className="story-layer"
          data-layer="2"
          src={imageUrls[`../assets/home/story/${family.file}`]}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            left: `${family.left}%`,
            bottom: 0,
            width: `${family.width}%`,
            height: `${family.height}%`,
          }}
        />
      </div>
    </>
  );
}

function HopeArtwork() {
  return (
    <>
      <StoryArtwork
        scene="9"
        description="Open hands support a smiling patient holding a heart, symbolizing care and hope."
      />
      <HomeExploreLinks />
    </>
  );
}

function Chapter({
  id,
  title,
  children,
  art,
  className = "",
  copyInArtwork = false,
  titleInArtwork = false,
}: {
  id: string;
  title: ReactNode;
  children?: ReactNode;
  art?: ReactNode;
  className?: string;
  copyInArtwork?: boolean;
  titleInArtwork?: boolean;
}) {
  return (
    <section
      id={id}
      className={`story-chapter ${className}`}
      aria-labelledby={`${id}-title`}
    >
      {copyInArtwork && !titleInArtwork && (
        <h2 className="story-sr-only" id={`${id}-title`}>
          {title}
        </h2>
      )}
      {art && (
        <div className="story-scene-track">
          <div className="story-chapter-inner">
            <div className="story-visual">
              {art}
              {titleInArtwork && (
                <h2 className="story-artwork-title" id={`${id}-title`}>
                  {title}
                </h2>
              )}
            </div>
          </div>
        </div>
      )}
      {!copyInArtwork && !titleInArtwork && (
        <div className="story-copy">
          <h2 id={`${id}-title`}>{title}</h2>
          <div className="story-body">{children}</div>
        </div>
      )}
    </section>
  );
}

export function HomeStory() {
  const root = useRef<HTMLDivElement>(null);
  useHomeStoryAnimation(root);
  useEffect(() => {
    const story = root.current;
    // Ambient motion continues while the artwork is visible, including scroll endpoints.
    const mapStage = root.current?.querySelector(
      ".story-chapter--map .story-chapter-inner",
    );
    const motionObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        target
          .closest(".story-chapter")
          ?.classList.toggle("is-visible", isIntersecting);
      });
    });
    if (mapStage) motionObserver.observe(mapStage);
    // Keep the floating artwork button clear of the four platform captions.
    const platformStage = root.current?.querySelector(
      "#our-platform .story-chapter-inner",
    );
    const platformObserver = new IntersectionObserver(([entry]) => {
      if (story) story.dataset.platformInView = String(entry.isIntersecting);
    });
    if (platformStage) platformObserver.observe(platformStage);
    return () => {
      motionObserver.disconnect();
      platformObserver.disconnect();
      if (story) delete story.dataset.platformInView;
    };
  }, []);

  return (
    <div className="home-story" ref={root}>
      <Chapter
        id="what-we-saw"
        className="story-chapter--clinic story-chapter--ward"
        title={
          <>
            <span className="story-ward-title-line">
              She hoped the hardest part
            </span>{" "}
            <em className="story-ward-title-ending">was over.</em>
          </>
        }
        art={<WardArtwork />}
        copyInArtwork
      />

      <Chapter
        id="what-stayed-with-us"
        className="story-chapter--tear"
        title="What if it comes back? That question stayed with us."
        art={<TearArtwork />}
        copyInArtwork
      />

      <Chapter
        id="why-tnbc"
        className="story-chapter--map"
        title={
          <>
            <em className="story-emphasis-why">Why</em> we choose triple-negative{" "}
            <span className="tnbc-reading-title-shared" data-tnbc-title-shared>
              breast cancer
            </span>{"?"}
          </>
        }
        art={<MapArtwork />}
      >
        <div className="tnbc-context">
          <HomeTnbcDiagram />
          <p>
            For patients with triple-negative breast cancer (TNBC), recurrence is
            an especially difficult concern.
          </p>
        </div>
        <div className="tnbc-explanation">
          <p>
            TNBC lacks the hormone receptors and HER2 overexpression that many
            breast cancer treatments target.
          </p>
          <p className="story-emphasis">
            Fewer familiar targets. A high risk of recurrence and spread.
          </p>
          <p className="tnbc-patient-callback" data-tnbc-callback>
            We kept returning to her question:{" "}
            <span className="story-emphasis">“What if it comes back?”</span>{" "}
            It is why we began looking for more options.
          </p>
          <a
            className="story-source"
            href="https://www.cancer.gov/types/breast/breast-cancer-types/triple-negative"
            target="_blank"
            rel="noreferrer"
          >
            About TNBC · NCI ↗
          </a>
        </div>
      </Chapter>

      <div className="story-clinical-sequence">
        <div className="story-clinical-stage">
          <Chapter
            id="clinical-challenge"
            className="story-chapter--challenge"
            title={
              <>
                Treatment matters. <em>So does what comes next.</em>
              </>
            }
            art={<ChallengeArtwork />}
            copyInArtwork
          />

          <Chapter
            id="a-new-direction"
            className="story-chapter--vaccine"
            title="From a question to cancer vaccines"
            copyInArtwork
            art={<VaccineArtwork />}
          />
        </div>
      </div>

      <HomeMoleculeGallery />

      <HomeRnaSequence
        rna={<CircRnaArtwork />}
        platform={<PlatformArtwork />}
      />

      <Chapter
        id="plug-and-play"
        className="story-chapter--switch"
        title={
          <>
            Like changing <em>a key.</em>
          </>
        }
        art={<HomeAntigenSwitch />}
        copyInArtwork
      />

      <Chapter
        id="beyond-tnbc"
        className="story-chapter--beyond"
        title={
          <>
            <span className="story-beyond-glow" aria-hidden="true" />
            <span className="story-beyond-line">
              <span className="story-beyond-ink">Starting with TNBC.</span>
            </span>{" "}
            <em className="story-beyond-line">
              <span className="story-beyond-ink">Looking further.</span>
            </em>
          </>
        }
        art={<BeyondArtwork />}
        titleInArtwork
      />

      <Chapter
        id="what-we-hope"
        className="story-chapter--hope-return"
        title="The question behind CirCure"
        art={<HomeHopeArtwork />}
        copyInArtwork
      />

      <HomeFinale art={<HopeArtwork />} />
    </div>
  );
}
