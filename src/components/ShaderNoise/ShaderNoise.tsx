import { useEffect, useRef } from "react";
import { useTheme } from "../../context/theme-context";
import "./ShaderNoise.css";

const VERTEX_SRC = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uAccent;
uniform vec3 uBg;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv * 3.0;
  p.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.06;
  vec2 warp = vec2(snoise(p + t), snoise(p - t));
  float n = snoise(p + warp * 1.2 + t * 0.5);
  n = n * 0.5 + 0.5;

  float glow = smoothstep(0.35, 0.9, n);

  // gl_FragCoord.y vale 0 en la parte inferior del canvas — se desvanece el
  // aporte de color del ruido cerca del borde inferior para que se mezcle
  // con el fondo sólido de la siguiente sección, en vez de taparlo con un
  // overlay de CSS.
  float edgeFade = smoothstep(0.0, 0.32, uv.y);
  vec3 color = mix(uBg, uAccent, glow * 0.5 * edgeFade);

  gl_FragColor = vec4(color, 1.0);
}
`;

function hexToVec3(hex: string): [number, number, number] {
  const trimmed = hex.trim();
  const long = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(trimmed);
  if (long) {
    return [
      parseInt(long[1], 16) / 255,
      parseInt(long[2], 16) / 255,
      parseInt(long[3], 16) / 255,
    ];
  }
  // getComputedStyle puede serializar un hex de 6 dígitos a su forma corta
  // (ej. #ffffff -> #fff) — sin esto, el tema claro caía al color de
  // respaldo oscuro apenas el navegador lo abreviaba.
  const short = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(trimmed);
  if (short) {
    return [
      parseInt(short[1] + short[1], 16) / 255,
      parseInt(short[2] + short[2], 16) / 255,
      parseInt(short[3] + short[3], 16) / 255,
    ];
  }
  return [0.04, 0.04, 0.04];
}

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

interface ShaderNoiseProps {
  extendBehindNavbar?: boolean;
  /** Nombre de una propiedad personalizada de CSS de la que leer el color
   *  del glow (ej. "--glow-muted"). Si se omite, cae en --accent-text. */
  accentColor?: string;
}

export default function ShaderNoise({
  extendBehindNavbar = true,
  accentColor,
}: ShaderNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  // Puente entre el efecto de setup (que crea el contexto GL una sola vez)
  // y el efecto de tema (que solo necesita re-subir los uniforms de color) —
  // sin esto habría que destruir y recrear todo el programa GL en cada
  // toggle de tema.
  const updateColorsRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uAccent = gl.getUniformLocation(program, "uAccent");
    const uBg = gl.getUniformLocation(program, "uBg");

    const updateColors = () => {
      const style = getComputedStyle(document.documentElement);
      // Respaldo hardcodeado solo por si getPropertyValue devuelve vacío
      // (ej. primer paint antes de que globals.css termine de aplicarse) —
      // replica el valor actual de --accent-text/--bg-primary en oscuro,
      // no puede ser var() porque ya estamos leyendo el propio token.
      const accent = hexToVec3(
        (accentColor && style.getPropertyValue(accentColor).trim()) ||
          style.getPropertyValue("--accent-text").trim() ||
          "#e74c3c",
      );
      const bg = hexToVec3(style.getPropertyValue("--bg-primary").trim() || "#0a0a0b");
      gl.useProgram(program);
      gl.uniform3f(uAccent, accent[0], accent[1], accent[2]);
      gl.uniform3f(uBg, bg[0], bg[1], bg[2]);
    };
    updateColorsRef.current = updateColors;
    updateColors();

    let width = 0;
    let height = 0;

    const resize = () => {
      // Extiende el canvas hacia arriba, detrás del navbar fijo (`.hero`
      // empieza justo debajo), así el navbar de vidrio difumina el shader
      // en vez de un fondo vacío.
      const navbarHeight = extendBehindNavbar
        ? (document.querySelector<HTMLElement>(".navbar")?.offsetHeight ?? 0)
        : 0;
      const nextWidth = parent.clientWidth;
      const nextHeight = parent.clientHeight + navbarHeight;
      if (nextWidth === 0 || nextHeight === 0) return;
      width = nextWidth;
      height = nextHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.style.top = `${-navbarHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const render = (time: number) => {
      gl.uniform1f(uTime, time * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let rafId = 0;
    const animate = (t: number) => {
      render(t);
      rafId = requestAnimationFrame(animate);
    };

    if (reducedMotion) {
      render(0);
    } else {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      resizeObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
      updateColorsRef.current = () => {};
    };
  }, [extendBehindNavbar, accentColor]);

  useEffect(() => {
    // Se difiere porque ShaderNoise, al ser descendiente de ThemeProvider,
    // dispara este efecto antes que el de ThemeProvider (React ejecuta los
    // efectos de hijos primero) — leer getComputedStyle aquí mismo todavía
    // vería el atributo data-theme viejo. requestAnimationFrame no sirve
    // para este defer porque se pausa por completo en pestañas no visibles;
    // setTimeout sí se dispara siempre.
    const id = window.setTimeout(() => updateColorsRef.current(), 0);
    return () => window.clearTimeout(id);
  }, [theme]);

  return <canvas ref={canvasRef} className="shader-noise" aria-hidden="true" />;
}
