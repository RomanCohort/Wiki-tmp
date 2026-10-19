const vertexSource = `
precision highp float;
attribute vec2 a_source;
attribute vec2 a_target;
attribute vec4 a_color;
attribute vec3 a_motion;
uniform vec2 u_resolution;
uniform float u_ratio;
uniform float u_spacing;
uniform float u_progress;
uniform vec3 u_accent;
varying vec4 v_color;
void main() {
  float p = u_progress;
  float local = (p - a_motion.x) / (1.0 - a_motion.x);
  float travel = smoothstep(0.06, 0.86, local);
  float arc = sin(3.14159265 * travel);
  float flutter = sin(a_motion.z + travel * 6.2831853) * arc;
  vec2 position = mix(a_source, a_target, travel);
  position += vec2(a_motion.y * arc * 0.32 + flutter * 3.0,
                   -a_motion.y * arc + flutter * 2.0);
  vec2 clip = position / u_resolution * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = max(0.7, u_spacing * (1.25 - 0.42 * arc - 0.48 * travel)) * u_ratio;
  float alpha = smoothstep(0.0, 0.07, p - a_motion.x)
    * (1.0 - smoothstep(0.88, 1.0, p)) * mix(a_color.a, 0.8, travel);
  v_color = vec4(mix(a_color.rgb, u_accent, smoothstep(0.42, 0.84, p)), alpha);
}`;

const imageVertexSource = `
precision highp float;
attribute vec2 a_source;
attribute vec2 a_target;
attribute vec4 a_color;
attribute vec4 a_targetColor;
attribute vec3 a_motion;
uniform vec2 u_resolution;
uniform float u_ratio;
uniform float u_spacing;
uniform float u_targetSpacing;
uniform float u_progress;
varying vec4 v_color;
void main() {
  float p = u_progress;
  float local = (p - a_motion.x) / (1.0 - a_motion.x);
  float travel = smoothstep(0.09, 0.86, local);
  float arc = sin(3.14159265 * travel);
  float flutter = sin(a_motion.z + travel * 6.2831853) * arc;
  vec2 position = mix(a_source, a_target, travel);
  position += vec2(a_motion.y * arc * 0.32 + flutter * 3.0,
                   -a_motion.y * arc + flutter * 2.0);
  vec2 clip = position / u_resolution * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = max(0.7, mix(u_spacing, u_targetSpacing, travel)
    * (1.42 - 0.48 * arc)) * u_ratio;
  float alpha = smoothstep(0.0, 0.09, p)
    * (1.0 - smoothstep(0.88, 1.0, p))
    * mix(a_color.a, a_targetColor.a, travel);
  v_color = vec4(mix(a_color.rgb, a_targetColor.rgb, travel), alpha);
}`;

const fragmentSource = `
precision mediump float;
varying vec4 v_color;
void main() {
  float radius = length(gl_PointCoord - vec2(0.5));
  float coverage = 1.0 - smoothstep(0.3, 0.5, radius);
  float alpha = v_color.a * coverage;
  gl_FragColor = vec4(v_color.rgb * alpha, alpha);
}`;

/** Static positions are uploaded only on layout changes. The GPU evaluates
 * the same deterministic trajectory as the Canvas fallback in one draw call. */
export function createChallengeParticleRenderer(canvas: HTMLCanvasElement, imageMorph = false) {
  const gl = canvas.getContext("webgl", {
    alpha: true, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: true, preserveDrawingBuffer: true,
  });
  if (!gl) return null;
  const shaders: WebGLShader[] = [];
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  };
  const vertex = compile(gl.VERTEX_SHADER, imageMorph ? imageVertexSource : vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const targetColorBuffer = imageMorph ? gl.createBuffer() : null;
  const dispose = () => {
    shaders.forEach(shader => gl.deleteShader(shader));
    gl.deleteBuffer(buffer);
    gl.deleteBuffer(targetColorBuffer);
    gl.deleteProgram(program);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
  if (!vertex || !fragment || !program || !buffer || (imageMorph && !targetColorBuffer)) {
    dispose();
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    dispose();
    return null;
  }
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const attributes = [["a_source", 2, 0], ["a_target", 2, 2],
    ["a_color", 4, 4], ["a_motion", 3, 8]] as const;
  attributes.forEach(([name, size, offset]) => {
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 44, offset * 4);
  });
  const targetColorLocation = imageMorph ? gl.getAttribLocation(program, "a_targetColor") : -1;
  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const resolution = uniform("u_resolution");
  const ratioUniform = uniform("u_ratio");
  const spacingUniform = uniform("u_spacing");
  const targetSpacingUniform = imageMorph ? uniform("u_targetSpacing") : null;
  const progress = uniform("u_progress");
  const accentUniform = uniform("u_accent");
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);
  let count = 0;
  return {
    // Image mode adds normalized RGBA for each target point in a separate
    // buffer, leaving the original 11-float particle layout unchanged.
    upload(data: Float32Array, width: number, height: number, ratio: number, spacing: number, accent: number[], targetColors?: Float32Array, targetSpacing = spacing) {
      if (gl.isContextLost()) return;
      canvas.width = Math.ceil(width * ratio);
      canvas.height = Math.ceil(height * ratio);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.uniform2f(resolution, width, height);
      gl.uniform1f(ratioUniform, ratio);
      gl.uniform1f(spacingUniform, spacing);
      gl.uniform3f(accentUniform, accent[0] / 255, accent[1] / 255, accent[2] / 255);
      count = data.length / 11;
      if (imageMorph) {
        gl.uniform1f(targetSpacingUniform, targetSpacing);
        if (targetColors && targetColors.length === count * 4) {
          gl.bindBuffer(gl.ARRAY_BUFFER, targetColorBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, targetColors, gl.STATIC_DRAW);
          gl.enableVertexAttribArray(targetColorLocation);
          gl.vertexAttribPointer(targetColorLocation, 4, gl.FLOAT, false, 16, 0);
        } else {
          // A missing target palette retains a usable single-tint morph.
          gl.disableVertexAttribArray(targetColorLocation);
          gl.vertexAttrib4f(targetColorLocation, accent[0] / 255, accent[1] / 255, accent[2] / 255, 0.8);
        }
      }
    },
    render(value: number) {
      if (gl.isContextLost()) return false;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(progress, value);
      gl.drawArrays(gl.POINTS, 0, count);
      return true;
    },
    dispose,
  };
}
