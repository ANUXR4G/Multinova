"use client";

import React, { useEffect, useRef, memo } from 'react';
import { Renderer, Triangle, Program, Mesh } from 'ogl';

type PrismProps = {
  height?: number;
  baseWidth?: number;
  animationType?: 'rotate' | 'hover' | '3drotate';
  glow?: number;
  offset?: { x?: number; y?: number };
  noise?: number;
  transparent?: boolean;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  hoverStrength?: number;
  inertia?: number;
  bloom?: number;
  suspendWhenOffscreen?: boolean;
  timeScale?: number;
};

const Prism: React.FC<PrismProps> = memo(({
  height = 3.5,
  baseWidth = 5.5,
  animationType = '3drotate',
  glow = 0.8,
  offset = { x: 0, y: 0 },
  noise = 0.3,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  hoverStrength = 2,
  inertia = 0.08,
  bloom = 0.8,
  suspendWhenOffscreen = true,
  timeScale = 0.5
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const H = Math.max(0.001, height);
    const BW = Math.max(0.001, baseWidth);
    const BASE_HALF = BW * 0.5;
    const GLOW = Math.max(0.0, glow);
    const NOISE = Math.max(0.0, noise);
    const offX = offset?.x ?? 0;
    const offY = offset?.y ?? 0;
    const SAT = transparent ? 1.5 : 1;
    const SCALE = Math.max(0.001, scale);
    const HUE = hueShift || 0;
    const CFREQ = Math.max(0.0, colorFrequency || 1);
    const BLOOM = Math.max(0.0, bloom || 1);
    const TS = Math.max(0, timeScale || 1);
    const HOVSTR = Math.max(0, hoverStrength || 1);
    const INERT = Math.max(0, Math.min(1, inertia || 0.12));

    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    const renderer = new Renderer({
      dpr,
      alpha: transparent,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    });
    const gl = renderer.gl;
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);

    Object.assign(gl.canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      display: 'block',
      willChange: 'transform'
    } as Partial<CSSStyleDeclaration>);
    container.appendChild(gl.canvas);

    const vertex = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = `
      precision mediump float;

      uniform vec2  iResolution;
      uniform float iTime;
      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3  uRot;
      uniform int   uUseBaseWobble;
      uniform float uGlow;
      uniform vec2  uOffsetPx;
      uniform float uNoise;
      uniform float uSaturation;
      uniform float uScale;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uBloom;
      uniform float uCenterShift;
      uniform float uInvBaseHalf;
      uniform float uInvHeight;
      uniform float uMinAxis;
      uniform float uPxScale;
      uniform float uTimeScale;

      vec4 tanh4(vec4 x){
        vec4 e2x = exp(2.0*x);
        return (e2x - 1.0) / (e2x + 1.0);
      }

      float rand(vec2 co){
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float sdOctaAnisoInv(vec3 p){
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
        float m = q.x + q.y + q.z - 1.0;
        return m * uMinAxis * 0.577;
      }

      float sdPyramidUpInv(vec3 p){
        return max(sdOctaAnisoInv(p), -p.y);
      }

      mat3 hueRotation(float a){
        float c = cos(a), s = sin(a);
        return mat3(
          0.299 + 0.701*c + 0.168*s, 0.587 - 0.587*c - 0.331*s, 0.114 - 0.114*c + 0.500*s,
          0.299 - 0.299*c + 0.328*s, 0.587 + 0.413*c + 0.035*s, 0.114 - 0.114*c - 0.500*s,
          0.299 - 0.300*c - 0.497*s, 0.587 - 0.588*c + 0.296*s, 0.114 + 0.886*c + 0.201*s
        );
      }

      void main(){
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;
        float z = 5.0;
        vec4 o = vec4(0.0);

        mat2 wob = mat2(1.0);
        if (uUseBaseWobble == 1) {
          float t = iTime * uTimeScale;
          float c0 = cos(t);
          float c1 = cos(t + 33.0);
          float c2 = cos(t + 11.0);
          wob = mat2(c0, c1, c2, c0);
        }

        for (int i = 0; i < 80; i++) {
          vec3 p = vec3(f, z);
          p.xz = p.xz * wob;
          p = uRot * p;
          vec3 q = p;
          q.y += uCenterShift;
          float d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
          z -= d;
          o += (sin((p.y + z) * uColorFreq + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
        }

        o = tanh4(o * o * (uGlow * uBloom) / 1e5);

        vec3 col = o.rgb;
        if (uNoise > 0.01) {
          col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;
        }
        col = clamp(col, 0.0, 1.0);

        if (uSaturation != 1.0) {
          float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
          col = mix(vec3(L), col, uSaturation);
        }

        if (abs(uHueShift) > 0.001) {
          col = hueRotation(uHueShift) * col;
        }

        gl_FragColor = vec4(clamp(col, 0.0, 1.0), o.a);
      }
    `;

    const geometry = new Triangle(gl);
    const iResBuf = new Float32Array(2);
    const offsetPxBuf = new Float32Array(2);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: iResBuf },
        iTime: { value: 0 },
        uHeight: { value: H },
        uBaseHalf: { value: BASE_HALF },
        uUseBaseWobble: { value: animationType === 'rotate' ? 1 : 0 },
        uRot: { value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) },
        uGlow: { value: GLOW },
        uOffsetPx: { value: offsetPxBuf },
        uNoise: { value: NOISE },
        uSaturation: { value: SAT },
        uScale: { value: SCALE },
        uHueShift: { value: HUE },
        uColorFreq: { value: CFREQ },
        uBloom: { value: BLOOM },
        uCenterShift: { value: H * 0.25 },
        uInvBaseHalf: { value: 1 / BASE_HALF },
        uInvHeight: { value: 1 / H },
        uMinAxis: { value: Math.min(BASE_HALF, H) },
        uPxScale: { value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE) },
        uTimeScale: { value: TS }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    let resizeTimeout: NodeJS.Timeout;
    const resize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h);
        iResBuf[0] = gl.drawingBufferWidth;
        iResBuf[1] = gl.drawingBufferHeight;
        offsetPxBuf[0] = offX * dpr;
        offsetPxBuf[1] = offY * dpr;
        program.uniforms.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);
      }, 100);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const rotBuf = new Float32Array(9);
    const setMat3FromEuler = (yawY: number, pitchX: number, rollZ: number, out: Float32Array) => {
      const cy = Math.cos(yawY), sy = Math.sin(yawY);
      const cx = Math.cos(pitchX), sx = Math.sin(pitchX);
      const cz = Math.cos(rollZ), sz = Math.sin(rollZ);
      out[0] = cy * cz + sy * sx * sz; out[1] = cx * sz; out[2] = -sy * cz + cy * sx * sz;
      out[3] = -cy * sz + sy * sx * cz; out[4] = cx * cz; out[5] = sy * sz + cy * sx * cz;
      out[6] = sy * cx; out[7] = -sx; out[8] = cy * cx;
      return out;
    };

    const t0 = performance.now();
    const rnd = () => Math.random();
    const wX = (0.3 + rnd() * 0.6);
    const wY = (0.2 + rnd() * 0.7);
    const wZ = (0.1 + rnd() * 0.5);
    const phX = rnd() * Math.PI * 2;
    const phZ = rnd() * Math.PI * 2;

    let yaw = 0, pitch = 0, roll = 0;
    let targetYaw = 0, targetPitch = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const pointer = { x: 0, y: 0, inside: true };
    const onMove = (e: PointerEvent) => {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      pointer.x = ((e.clientX - ww * 0.5) / (ww * 0.5));
      pointer.y = ((e.clientY - wh * 0.5) / (wh * 0.5));
      pointer.inside = true;
    };

    if (animationType === 'hover') {
      window.addEventListener('pointermove', onMove, { passive: true });
    }

    const render = (t: number) => {
      const time = (t - t0) * 0.001;
      program.uniforms.iTime.value = time;

      if (animationType === 'hover') {
        targetYaw = (pointer.inside ? -pointer.x : 0) * 0.6 * HOVSTR;
        targetPitch = (pointer.inside ? pointer.y : 0) * 0.6 * HOVSTR;
        yaw = lerp(yaw, targetYaw, INERT);
        pitch = lerp(pitch, targetPitch, INERT);
        roll = lerp(roll, 0, 0.1);
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);
      } else if (animationType === '3drotate') {
        const tScaled = time * TS;
        yaw = tScaled * wY;
        pitch = Math.sin(tScaled * wX + phX) * 0.6;
        roll = Math.sin(tScaled * wZ + phZ) * 0.5;
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotBuf);
      }

      renderer.render({ scene: mesh });
      rafRef.current = requestAnimationFrame(render);
    };

    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!rafRef.current) rafRef.current = requestAnimationFrame(render);
      } else {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      }
    }, { threshold: 0.1 });

    if (suspendWhenOffscreen) io.observe(container);
    else rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimeout);
      ro.disconnect();
      io.disconnect();
      if (animationType === 'hover') window.removeEventListener('pointermove', onMove as EventListener);
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
    };
  }, [height, baseWidth, animationType, glow, noise, offset?.x, offset?.y, scale, transparent, hueShift, colorFrequency, timeScale, hoverStrength, inertia, bloom, suspendWhenOffscreen]);

  return (
    <div className="w-full h-screen relative" ref={containerRef}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem]  text-white tracking-tighter leading-none select-none">
          F.A.Q
        </h1>
      </div>
    </div>
  );
});

Prism.displayName = 'Prism';

export default Prism;
