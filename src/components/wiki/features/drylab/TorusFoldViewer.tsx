import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, RotateCcw } from "lucide-react";
import type { Viewer } from "../shared/molstarRuntime";
import type { PluginStateObject } from "molstar/lib/mol-plugin-state/objects";
import type { StateObjectSelector } from "molstar/lib/mol-state";
import type { Color } from "molstar/lib/mol-util/color";
import {
  softwareModel,
} from "../../../../data/drylab/softwareAssets";
import { MolecularViewerFrame } from "../shared/MolecularViewerFrame";
import { loadLocalMolstar } from "../shared/localMolstar";

type Component = StateObjectSelector<PluginStateObject.Molecule.Structure>;
type Representation =
  StateObjectSelector<PluginStateObject.Molecule.Structure.Representation3D>;
type DisplayStyle = "cartoon" | "ball-and-stick" | "line" | "spacefill";
type ColorMode = "sequence-id" | "residue-name" | "element-symbol";

export function TorusFoldViewer() {
  const figure = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const viewer = useRef<Viewer | null>(null);
  const component = useRef<Component | null>(null);
  const representation = useRef<Representation | null>(null);
  const junction = useRef<Component | null>(null);
  const updating = useRef(false);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [style, setStyle] = useState<DisplayStyle>("cartoon");
  const [colorMode, setColorMode] = useState<ColorMode>("sequence-id");
  const [marked, setMarked] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const source =
    softwareModel.uploadUrl;
  const caption = softwareModel;

  useEffect(() => {
    if (!figure.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    observer.observe(figure.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const changed = () =>
      setFullscreen(document.fullscreenElement === figure.current);
    document.addEventListener("fullscreenchange", changed);
    return () => document.removeEventListener("fullscreenchange", changed);
  }, []);

  useEffect(() => {
    if (!active) return;
    const abort = new AbortController();
    let disposed = false;
    let instance: Viewer | undefined;
    const initialize = async () => {
      const [molstar, pdb] = await Promise.all([
        loadLocalMolstar(),
        fetch(source, { signal: abort.signal }).then((response) => {
          if (!response.ok)
            throw new Error("The saved RNA structure is unavailable.");
          return response.text();
        }),
      ]);
      if (disposed || !canvas.current) return;
      instance = await molstar.Viewer.create(canvas.current, {
        pixelScale: 1,
        viewportBackgroundColor: "#0b0f19",
      });
      if (disposed) {
        instance.dispose();
        return;
      }
      viewer.current = instance;
      const plugin = instance.plugin;
      const data = await plugin.builders.data.rawData({
        data: pdb,
        label: "TorusFold · saved PPR-repaired model",
      });
      const trajectory = await plugin.builders.structure.parseTrajectory(
        data,
        "pdb",
      );
      const model = await plugin.builders.structure.createModel(trajectory);
      const structure = await plugin.builders.structure.createStructure(model);
      const whole = await plugin.builders.structure.tryCreateComponentStatic(
        structure,
        "all",
        { label: "Mature circRNA · 2,013 nt" },
      );
      if (!whole) throw new Error("The saved file contains no RNA structure.");
      component.current = whole;
      representation.current =
        await plugin.builders.structure.representation.addRepresentation(
          whole,
          {
            type: "cartoon",
            color: "sequence-id",
            typeParams: { quality: "medium" },
          },
        );
      if (disposed) return;
      await plugin.managers.camera.reset();
      setReady(true);
      setLoading(false);
    };
    initialize().catch((reason: unknown) => {
      if (disposed) return;
      setError(
        reason instanceof Error
          ? reason.message
          : "The 3D structure could not be displayed.",
      );
      setLoading(false);
    });
    return () => {
      disposed = true;
      abort.abort();
      instance?.dispose();
      viewer.current = null;
      component.current = null;
      representation.current = null;
      junction.current = null;
    };
  }, [active, attempt, source]);

  useEffect(() => {
    if (!ready || !canvas.current) return;
    let width = canvas.current.clientWidth;
    let frame = 0;
    const observer = new ResizeObserver(([entry]) => {
      if (Math.abs(entry.contentRect.width - width) < 2) return;
      width = entry.contentRect.width;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const plugin = viewer.current?.plugin;
        if (!plugin) return;
        plugin.canvas3d?.handleResize();
        const sphere = junction.current?.cell?.obj?.data.boundary.sphere;
        if (sphere)
          plugin.managers.camera.focusSphere(sphere, { durationMs: 0 });
        else void plugin.managers.camera.reset();
      });
    });
    observer.observe(canvas.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ready]);

  const updateDisplay = async (
    nextStyle: DisplayStyle,
    nextColor: ColorMode,
  ) => {
    const plugin = viewer.current?.plugin;
    if (!plugin || !component.current || updating.current) return;
    updating.current = true;
    setBusy(true);
    try {
      const previous = representation.current;
      const next =
        await plugin.builders.structure.representation.addRepresentation(
          component.current,
          {
            type: nextStyle,
            color: nextColor,
            typeParams: { quality: "medium" },
          },
        );
      if (previous)
        await plugin.state.data.build().delete(previous.ref).commit();
      representation.current = next;
      setStyle(nextStyle);
      setColorMode(nextColor);
    } catch {
      if (viewer.current)
        setError("The display could not be updated. Please reload the model.");
    } finally {
      updating.current = false;
      setBusy(false);
    }
  };

  const markJunction = async () => {
    const plugin = viewer.current?.plugin;
    if (!plugin || !component.current || updating.current) return;
    updating.current = true;
    setBusy(true);
    try {
      if (!junction.current) {
        const endpoints = await plugin.builders.structure.tryCreateComponent(
          component.current,
          {
            type: {
              name: "script",
              params: {
                language: "pymol",
                expression: `chain ${softwareModel.chain} and resi 1+${softwareModel.residueCount}`,
              },
            },
            label: "BSJ endpoints · residues 1 and 2,013",
          },
          "torusfold-bsj",
        );
        if (!endpoints) return;
        junction.current = endpoints;
        await plugin.builders.structure.representation.addRepresentation(
          endpoints,
          {
            type: "ball-and-stick",
            color: "uniform",
            colorParams: { value: 0xfacc15 as Color },
            typeParams: { sizeFactor: 0.45 },
          },
        );
      }
      const sphere = junction.current.cell?.obj?.data.boundary.sphere;
      if (sphere)
        plugin.managers.camera.focusSphere(sphere, { durationMs: 400 });
      setMarked(true);
    } catch {
      if (viewer.current)
        setError(
          "The BSJ endpoints could not be displayed. Please reload the model.",
        );
    } finally {
      updating.current = false;
      setBusy(false);
    }
  };

  const clearJunction = async () => {
    const plugin = viewer.current?.plugin;
    if (!plugin || !junction.current || updating.current) return;
    updating.current = true;
    setBusy(true);
    try {
      await plugin.state.data.build().delete(junction.current.ref).commit();
      junction.current = null;
      setMarked(false);
      await plugin.managers.camera.reset();
    } catch {
      if (viewer.current)
        setError("The marker could not be cleared. Please reload the model.");
    } finally {
      updating.current = false;
      setBusy(false);
    }
  };

  return (
    <MolecularViewerFrame
      figureRef={figure}
      containerRef={canvas}
      className="software-rna-viewer wiki-figure--labelled"
      label="Interactive TorusFold RNA model"
      loading={loading}
      error={
        error ? (
          <>
            <span>{error}</span>
            <button
              type="button"
              className="trop2-floating-btn"
              onClick={() => {
                setError(null);
                setLoading(true);
                setReady(false);
                setMarked(false);
                setStyle("cartoon");
                setColorMode("sequence-id");
                setAttempt((value) => value + 1);
              }}
            >
              Try again
            </button>
            <a href={source} download>
              Download PDB
            </a>
          </>
        ) : undefined
      }
      caption={
        <>
          <span className="wiki-figure__label">{caption.figureLabel}</span>
          <span className="wiki-figure__caption">{caption.caption}</span>
        </>
      }
    >
      <div
        className="trop2-viewer-floating-top software-rna-controls"
        role="group"
        aria-label="RNA display controls"
      >
        <fieldset className="trop2-floating-group" disabled={!ready || busy}>
          <legend className="software-visually-hidden">Display</legend>
          <label>
            Color
            <select
              aria-label="RNA color"
              value={colorMode}
              onChange={(event) =>
                void updateDisplay(style, event.target.value as ColorMode)
              }
            >
              <option value="sequence-id">Residue index</option>
              <option value="residue-name">Base</option>
              <option value="element-symbol">Element</option>
            </select>
          </label>
          <label>
            Style
            <select
              aria-label="RNA display style"
              value={style}
              onChange={(event) =>
                void updateDisplay(
                  event.target.value as DisplayStyle,
                  colorMode,
                )
              }
            >
              <option value="cartoon">Cartoon</option>
              <option value="ball-and-stick">Stick</option>
              <option value="line">Line</option>
              <option value="spacefill">Sphere</option>
            </select>
          </label>
        </fieldset>
        <fieldset className="trop2-floating-group" disabled={!ready || busy}>
          <legend className="software-visually-hidden">Model controls</legend>
          <button
            type="button"
            className={`trop2-floating-btn ${marked ? "is-active-yellow" : ""}`}
            aria-pressed={marked}
            onClick={() => void markJunction()}
          >
            Mark BSJ
          </button>
          <button
            type="button"
            className="trop2-floating-btn"
            disabled={!marked}
            onClick={() => void clearJunction()}
          >
            Clear
          </button>
          <button
            type="button"
            className="trop2-floating-icon-btn"
            aria-label="Reset RNA view"
            onClick={() => void viewer.current?.plugin.managers.camera.reset()}
          >
            <RotateCcw size={14} />
          </button>
          <button
            type="button"
            className="trop2-floating-icon-btn"
            aria-label={
              fullscreen ? "Exit RNA fullscreen" : "Fullscreen RNA model"
            }
            onClick={() => {
              if (fullscreen) void document.exitFullscreen();
              else void figure.current?.requestFullscreen();
            }}
          >
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </fieldset>
      </div>
      <div className="trop2-viewer-floating-bottom">
        <div className="trop2-floating-legend">
          <span>{softwareModel.stage} · 2,013 nt</span>
          {marked && (
            <span className="trop2-legend-item">
              <span className="trop2-legend-dot trop2-legend-dot--yellow" />
              BSJ endpoints: 1 / 2,013
            </span>
          )}
        </div>
        <div className="trop2-floating-hint">
          Left-drag: Rotate · Scroll: Zoom · Right-drag: Pan
        </div>
      </div>
    </MolecularViewerFrame>
  );
}
