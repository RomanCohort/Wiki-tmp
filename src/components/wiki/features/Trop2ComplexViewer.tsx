import { useEffect, useRef, useState, useCallback } from "react";
import { RotateCcw, Maximize2, Minimize2 } from "lucide-react";
import type { Viewer } from "./shared/molstarRuntime";
import type { Vec3, Vec4 } from "molstar/lib/mol-math/linear-algebra";
import type { PluginStateObject } from "molstar/lib/mol-plugin-state/objects";
import type { StateObjectSelector } from "molstar/lib/mol-state";
import type { Color } from "molstar/lib/mol-util/color";
const TROP2_PDB_URL = "https://gitlab.igem.org/2026/software/jlu-fbh/circuforge/-/raw/main/docs/wiki-evidence/model/trop2-ctl1.pdb";
import { TROP2_COMPLEX_DATA } from "../../../data/trop2ComplexData";
import { loadLocalMolstar } from "./shared/localMolstar";
import { MolecularViewerFrame } from "./shared/MolecularViewerFrame";

type ActiveSegment = "all" | "epitope" | "pocket";
type ComponentSelector = StateObjectSelector<PluginStateObject.Molecule.Structure>;
type ReprSelector = StateObjectSelector<PluginStateObject.Molecule.Structure.Representation3D>;

// Mol* colors are branded numbers; Color(hex) is an identity function at runtime.
const color = (hex: number) => hex as Color;

export function Trop2ComplexViewer() {
  const figureRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const structureRef = useRef<StateObjectSelector<PluginStateObject.Molecule.Structure> | null>(null);
  const epitopeCompRef = useRef<ComponentSelector | undefined>(undefined);
  const pocketCompRef = useRef<ComponentSelector | undefined>(undefined);
  const surfaceReprRef = useRef<ReprSelector | null>(null);
  const isSurfaceUpdatingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const contactRefs = useRef<(SVGGElement | null)[]>([]);
  const cameraSubsRef = useRef<{ unsubscribe: () => void }[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPolarContacts, setShowPolarContacts] = useState(true);
  const [showSurface, setShowSurface] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSegment, setActiveSegment] = useState<ActiveSegment>("all");

  const showPolarContactsRef = useRef(true);

  useEffect(() => {
    showPolarContactsRef.current = showPolarContacts;
  }, [showPolarContacts]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Project the polar contacts from the 3D camera straight onto the SVG lines.
  // Writes DOM attributes imperatively so camera motion never re-renders React.
  const updateProjections = useCallback(() => {
    if (!showPolarContactsRef.current) return;
    const svg = overlayRef.current;
    const canvas3d = viewerRef.current?.plugin?.canvas3d;
    if (!svg || !canvas3d) return;

    const camera = canvas3d.camera;
    const { x: vx, y: vy, width, height } = camera.viewport;
    if (!width || !height) return;

    // camera.project already returns window coordinates in drawing-buffer pixels
    // (origin bottom-left), so the viewBox maps them onto CSS pixels at any DPR.
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const v = [0, 0, 0, 0] as unknown as Vec4;
    const project = (pos: [number, number, number]) => {
      camera.project(v, pos as unknown as Vec3);
      const x = v[0] - vx;
      const y = height - (v[1] - vy);
      const visible = v[2] > 0 && v[2] < 1 && x >= 0 && x <= width && y >= 0 && y <= height;
      return { x, y, visible };
    };

    TROP2_COMPLEX_DATA.polarContacts.forEach((contact, i) => {
      const group = contactRefs.current[i];
      if (!group) return;
      const p1 = project(contact.start);
      const p2 = project(contact.end);
      for (const line of Array.from(group.children)) {
        line.setAttribute("x1", String(p1.x));
        line.setAttribute("y1", String(p1.y));
        line.setAttribute("x2", String(p2.x));
        line.setAttribute("y2", String(p2.y));
      }
      group.setAttribute("visibility", p1.visible || p2.visible ? "visible" : "hidden");
    });
  }, []);

  // RequestAnimationFrame throttled projection updater (at most one DOM write per frame)
  const scheduleUpdateProjections = useCallback(() => {
    if (!showPolarContactsRef.current) return;
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      updateProjections();
    });
  }, [updateProjections]);

  // Re-run projection on layer toggle
  useEffect(() => {
    if (showPolarContacts) {
      scheduleUpdateProjections();
    }
  }, [showPolarContacts, scheduleUpdateProjections]);

  // Initialize Mol*
  useEffect(() => {
    let isMounted = true;

    loadLocalMolstar()
      .then(async (molstar) => {
        if (!isMounted || !containerRef.current) return;

        // Cleanup existing viewer
        if (viewerRef.current) {
          try {
            viewerRef.current.dispose();
          } catch {
            /* ignore */
          }
        }

        // The manuscript provides the controls; mount only the molecular canvas.
        const viewer = await molstar.Viewer.create(containerRef.current, {
          // Mol* multiplies pixelScale by devicePixelRatio; 1 renders at native DPR.
          pixelScale: 1,
          viewportBackgroundColor: "#0b0f19",
        });

        if (!isMounted) {
          viewer.dispose();
          return;
        }

        viewerRef.current = viewer;
        const plugin = viewer.plugin;

        // SSAO, ambient contact shadows, and silhouette outline (opaque geometry only,
        // so the transparent surface does not pay for extra depth passes)
        if (plugin.canvas3d) {
          plugin.canvas3d.setProps({
            postprocessing: {
              outline: {
                name: "on",
                params: {
                  scale: 1,
                  color: color(0x000000),
                  threshold: 0.33,
                  includeTransparent: false,
                },
              },
              occlusion: {
                name: "on",
                params: {
                  multiScale: { name: "off", params: {} },
                  radius: 5,
                  bias: 0.8,
                  blurKernelSize: 15,
                  blurDepthBias: 0.5,
                  samples: 32,
                  resolutionScale: 0.75,
                  color: color(0x000000),
                  transparentThreshold: 0.4,
                },
              },
            },
            renderer: {
              backgroundColor: color(0x0b0f19),
            },
          });
        }

        // Parse structure directly to control representations cleanly
        const data = await plugin.builders.data.rawData({
          data: await fetch(TROP2_PDB_URL).then((response) => {
            if (!response.ok) throw new Error("The structure file is unavailable.");
            return response.text();
          }),
          label: "Trop2-CTL1 Complex",
        });
        const trajectory = await plugin.builders.structure.parseTrajectory(data, "pdb");
        const model = await plugin.builders.structure.createModel(trajectory);
        const structure = await plugin.builders.structure.createStructure(model);
        structureRef.current = structure;

        // 1. MHC Heavy Chain (A) & β2M (B): Soft Lavender Cartoon Ribbon
        // Kept opaque: a transparent cartoon pushes most of the scene through the
        // OIT transparency pass and the SSAO transparent-depth pass every frame.
        const mhcComp = await plugin.builders.structure.tryCreateComponent(
          structure,
          {
            type: {
              name: "script",
              params: { language: "pymol", expression: "chain A or chain B" },
            },
            label: "MHC Heavy Chain & β2M",
          },
          "mhc-backbone"
        );
        if (mhcComp) {
          await plugin.builders.structure.representation.addRepresentation(mhcComp, {
            type: "cartoon",
            color: "uniform",
            colorParams: { value: color(0xc7d2fe) },
          });
        }

        // 2. Trop2-CTL1 Epitope (Chain C, 9-mer SVCWCVNSV): Vibrant Cyan Ball-and-Stick
        const epitopeComp = await plugin.builders.structure.tryCreateComponent(
          structure,
          {
            type: {
              name: "script",
              params: { language: "pymol", expression: "chain C" },
            },
            label: "Trop2-CTL1 Epitope (Chain C)",
          },
          "trop2-epitope"
        );
        epitopeCompRef.current = epitopeComp;
        if (epitopeComp) {
          await plugin.builders.structure.representation.addRepresentation(epitopeComp, {
            type: "ball-and-stick",
            color: "uniform",
            colorParams: { value: color(0x00e5ff) },
            typeParams: { sizeFactor: 0.28 },
          });
        }

        // 3. MHC Groove 13 Key Anchor Residues: Deep Royal Blue Ball-and-Stick
        const pocketResStr = TROP2_COMPLEX_DATA.pocketResiduesChainA.join("+");
        const pocketComp = await plugin.builders.structure.tryCreateComponent(
          structure,
          {
            type: {
              name: "script",
              params: { language: "pymol", expression: `chain A and resi ${pocketResStr}` },
            },
            label: "MHC Groove Pocket Anchors",
          },
          "pocket-anchors"
        );
        pocketCompRef.current = pocketComp;
        if (pocketComp) {
          await plugin.builders.structure.representation.addRepresentation(pocketComp, {
            type: "ball-and-stick",
            color: "uniform",
            colorParams: { value: color(0x1d4ed8) },
            typeParams: { sizeFactor: 0.22 },
          });
        }

        // Reset camera to focus on epitope cleft
        if (plugin.canvas3d) {
          plugin.managers.camera.reset(void 0, 0);
          // camera.changed fires inside Mol*'s render loop whenever the view/projection
          // matrices move (mouse rotate/zoom/pan and animated resets alike), at most once
          // per frame, so the overlay is updated in the same frame as the 3D scene.
          // camera.stateChanged only fires on programmatic setState, not on mouse input.
          cameraSubsRef.current = [
            plugin.canvas3d.camera.changed.subscribe(updateProjections),
            plugin.canvas3d.resized.subscribe(scheduleUpdateProjections),
          ];
        }

        scheduleUpdateProjections();
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : "Failed to load 3D visualizer";
        console.error("Mol* initialization error:", err);
        setError(msg);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
      cameraSubsRef.current.forEach((sub) => sub.unsubscribe());
      cameraSubsRef.current = [];
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (viewerRef.current) {
        try {
          viewerRef.current.dispose();
          viewerRef.current = null;
        } catch {
          /* ignore */
        }
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle Reset View
  const handleResetView = useCallback(() => {
    setActiveSegment("all");
    const viewer = viewerRef.current;
    if (viewer?.plugin?.managers?.camera) {
      viewer.plugin.managers.camera.reset(void 0, 600);
      scheduleUpdateProjections();
    }
  }, [scheduleUpdateProjections]);

  // Handle Peptide Surface Toggle (Clean create/delete, zero accumulation, guarded against race conditions)
  const handleToggleSurface = useCallback(async () => {
    if (isSurfaceUpdatingRef.current) return;
    const viewer = viewerRef.current;
    const plugin = viewer?.plugin;
    const epitopeComp = epitopeCompRef.current;
    if (!plugin || !epitopeComp) return;

    isSurfaceUpdatingRef.current = true;
    const next = !showSurface;
    setShowSurface(next);

    try {
      if (next) {
        if (!surfaceReprRef.current) {
          surfaceReprRef.current =
            await plugin.builders.structure.representation.addRepresentation(epitopeComp, {
              type: "molecular-surface",
              color: "uniform",
              colorParams: { value: color(0x38bdf8) },
              typeParams: { alpha: 0.45, ignoreHydrogens: true },
            });
        }
      } else {
        if (surfaceReprRef.current) {
          await plugin.state.data.build().delete(surfaceReprRef.current.ref).commit();
          surfaceReprRef.current = null;
        }
      }
    } catch {
      /* ignore */
    } finally {
      isSurfaceUpdatingRef.current = false;
    }
  }, [showSurface]);

  // Handle Fullscreen Toggle
  const handleToggleFullscreen = useCallback(() => {
    if (!figureRef.current) return;
    if (!document.fullscreenElement) {
      figureRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Handle Segment Click Focus & Highlight (instantaneous native sphere focus, zero lag)
  const handleFocusSegment = useCallback(
    (target: ActiveSegment) => {
      setActiveSegment(target);
      const viewer = viewerRef.current;
      const plugin = viewer?.plugin;
      if (!plugin?.canvas3d) return;

      if (target === "all") {
        plugin.managers.camera.reset(void 0, 600);
        return;
      }

      const compCell = target === "epitope" ? epitopeCompRef.current : pocketCompRef.current;
      const sphere = compCell?.cell?.obj?.data?.boundary?.sphere;
      if (sphere && plugin.managers.camera.focusSphere) {
        plugin.managers.camera.focusSphere(sphere, { durationMs: 600 });
      } else {
        plugin.managers.camera.reset(void 0, 600);
      }
    },
    []
  );

  return (
    <MolecularViewerFrame
      figureRef={figureRef}
      containerRef={containerRef}
      label="3D Molecular Complex"
      loading={isLoading}
      error={error ? `Error: ${error}` : undefined}
      caption={<><strong>Fig. M-01 · </strong>Structural conformation of Trop2-CTL1 (<code>{TROP2_COMPLEX_DATA.epitopeSequence}</code>) complexed within the HLA-A*02:01 / β2M binding groove, stabilized by 17 polar interaction contacts.</>}
    >
        {/* 2D Vector Projection Overlay for Polar Contacts */}
        <svg
          ref={overlayRef}
          className="trop2-viewer-svg-overlay"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {showPolarContacts &&
            TROP2_COMPLEX_DATA.polarContacts.map((_, i) => (
              <g
                key={`contact-${i}`}
                ref={(el) => {
                  contactRefs.current[i] = el;
                }}
                visibility="hidden"
              >
                <line
                  stroke="rgba(250, 204, 21, 0.25)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  stroke="#facc15"
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                  opacity="0.95"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
        </svg>

        {/* Floating Top Controls Bar */}
        <div className="trop2-viewer-floating-top" role="toolbar" aria-label="3D Controls">
          {/* Segment Focus Group */}
          <div className="trop2-floating-group">
            <button
              type="button"
              className={`trop2-floating-pill ${activeSegment === "all" ? "is-active" : ""}`}
              onClick={() => handleFocusSegment("all")}
            >
              Full Complex
            </button>
            <button
              type="button"
              className={`trop2-floating-pill trop2-floating-pill--cyan ${
                activeSegment === "epitope" ? "is-active" : ""
              }`}
              onClick={() => handleFocusSegment("epitope")}
            >
              Trop2-CTL1 (Epitope)
            </button>
            <button
              type="button"
              className={`trop2-floating-pill trop2-floating-pill--blue ${
                activeSegment === "pocket" ? "is-active" : ""
              }`}
              onClick={() => handleFocusSegment("pocket")}
            >
              Pocket Anchors
            </button>
          </div>

          {/* Action / Layer Toggles */}
          <div className="trop2-floating-group">
            <button
              type="button"
              className={`trop2-floating-btn ${showPolarContacts ? "is-active-yellow" : ""}`}
              onClick={() => setShowPolarContacts((prev) => !prev)}
              title="Toggle polar contacts"
            >
              <span className="trop2-btn-dot trop2-btn-dot--yellow" />
              Contacts (17)
            </button>
            <button
              type="button"
              className={`trop2-floating-btn ${showSurface ? "is-active-cyan" : ""}`}
              onClick={handleToggleSurface}
              title="Toggle peptide surface"
            >
              <span className="trop2-btn-dot trop2-btn-dot--cyan" />
              Surface
            </button>
            <button
              type="button"
              className="trop2-floating-icon-btn"
              onClick={handleResetView}
              title="Reset View"
              aria-label="Reset View"
            >
              <RotateCcw size={14} />
            </button>
            <button
              type="button"
              className="trop2-floating-icon-btn"
              onClick={handleToggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>

        {/* Floating Bottom Bar: Minimal Legend & Interaction Hint */}
        <div className="trop2-viewer-floating-bottom">
          <div className="trop2-floating-legend">
            <span className="trop2-legend-item">
              <span className="trop2-legend-dot trop2-legend-dot--cyan" />
              Trop2-CTL1
            </span>
            <span className="trop2-legend-item">
              <span className="trop2-legend-dot trop2-legend-dot--blue" />
              Pocket Anchors
            </span>
            <span className="trop2-legend-item">
              <span className="trop2-legend-dot trop2-legend-dot--lavender" />
              HLA-A*02:01 / β2M
            </span>
            <span className="trop2-legend-item">
              <span className="trop2-legend-dot trop2-legend-dot--yellow" />
              Polar Contacts
            </span>
          </div>
          <div className="trop2-floating-hint">
            <span>Left-drag: Rotate • Scroll: Zoom • Right-drag: Pan</span>
          </div>
        </div>
    </MolecularViewerFrame>
  );
}
