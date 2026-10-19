import { PluginContext } from "molstar/lib/mol-plugin/context";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { DefaultPluginSpec } from "molstar/lib/mol-plugin/spec";
import { Color } from "molstar/lib/mol-util/color";

/** The manuscripts supply their own controls, so only mount Mol*'s canvas. */
export class Viewer {
  private resize: ResizeObserver;

  private constructor(
    readonly plugin: PluginContext,
    target: HTMLElement,
  ) {
    this.resize = new ResizeObserver(() => plugin.handleResize());
    this.resize.observe(target);
  }

  static async create(
    target: HTMLElement,
    options: {
      pixelScale?: number;
      viewportBackgroundColor?: string;
    } = {},
  ) {
    const plugin = new PluginContext(DefaultPluginSpec());
    try {
      plugin.config.set(
        PluginConfig.General.PixelScale,
        options.pixelScale ?? 1,
      );
      await plugin.init();
      if (!(await plugin.mountAsync(target)))
        throw new Error("The molecular canvas could not be initialized.");
      plugin.canvas3d?.setProps({
        illumination: { enabled: false },
        renderer: {
          backgroundColor: Color(
            Number.parseInt(
              (options.viewportBackgroundColor ?? "#0b0f19").slice(1),
              16,
            ),
          ),
        },
      });
      return new Viewer(plugin, target);
    } catch (error) {
      plugin.dispose();
      throw error;
    }
  }

  dispose() {
    this.resize.disconnect();
    this.plugin.dispose();
  }
}
