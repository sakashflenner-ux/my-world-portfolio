"use client";

import { useEffect, useRef } from "react";

type GeoPoint = { lon: number; lat: number };
type Vec3 = { x: number; y: number; z: number };

const continents: GeoPoint[][] = [
  [{lon:-168,lat:70},{lon:-140,lat:72},{lon:-112,lat:61},{lon:-88,lat:50},{lon:-60,lat:49},{lon:-52,lat:28},{lon:-81,lat:9},{lon:-105,lat:20},{lon:-126,lat:38},{lon:-153,lat:58}],
  [{lon:-81,lat:11},{lon:-63,lat:9},{lon:-48,lat:-5},{lon:-36,lat:-24},{lon:-54,lat:-55},{lon:-72,lat:-43},{lon:-79,lat:-12}],
  [{lon:-11,lat:36},{lon:10,lat:37},{lon:34,lat:31},{lon:51,lat:12},{lon:41,lat:-11},{lon:28,lat:-35},{lon:10,lat:-34},{lon:-5,lat:-5}],
  [{lon:-10,lat:36},{lon:-9,lat:57},{lon:15,lat:71},{lon:48,lat:72},{lon:80,lat:61},{lon:112,lat:67},{lon:151,lat:55},{lon:177,lat:48},{lon:146,lat:35},{lon:121,lat:20},{lon:103,lat:6},{lon:78,lat:8},{lon:57,lat:22},{lon:35,lat:31},{lon:15,lat:38}],
  [{lon:111,lat:-12},{lon:132,lat:-10},{lon:153,lat:-23},{lon:146,lat:-42},{lon:116,lat:-35}],
  [{lon:-52,lat:83},{lon:-20,lat:80},{lon:-26,lat:61},{lon:-48,lat:59},{lon:-66,lat:70}],
];

const nodes = [
  { lon: 116, lat: 34, color: "#d39a64" },
  { lon: 12, lat: 48, color: "#72aebe" },
  { lon: -74, lat: 41, color: "#82ad78" },
  { lon: 77, lat: 22, color: "#c98273" },
];

const links = [[0,1],[1,2],[0,3],[2,3]];

function inside(point: GeoPoint, polygon: GeoPoint[]) {
  let hit = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i];
    const b = polygon[j];
    if ((a.lat > point.lat) !== (b.lat > point.lat) && point.lon < ((b.lon - a.lon) * (point.lat - a.lat)) / (b.lat - a.lat) + a.lon) hit = !hit;
  }
  return hit;
}

const landPoints: GeoPoint[] = [];
for (let lat = -56; lat <= 82; lat += 3.4) {
  for (let lon = -177; lon <= 177; lon += 3.4) {
    if (continents.some((shape) => inside({ lon, lat }, shape))) landPoints.push({ lon, lat });
  }
}

function sphere(point: GeoPoint, rotation: number): Vec3 {
  const lat = point.lat * Math.PI / 180;
  const lon = point.lon * Math.PI / 180 + rotation;
  return { x: Math.cos(lat) * Math.sin(lon), y: -Math.sin(lat), z: Math.cos(lat) * Math.cos(lon) };
}

export default function AnimatedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let start = performance.now();

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const drawPath = (points: Vec3[], cx: number, cy: number, radius: number, alpha = .45) => {
      context.beginPath();
      let drawing = false;
      for (const point of points) {
        if (point.z < -.03) { drawing = false; continue; }
        const x = cx + point.x * radius;
        const y = cy + point.y * radius;
        if (!drawing) { context.moveTo(x, y); drawing = true; } else context.lineTo(x, y);
      }
      context.strokeStyle = `rgba(112,103,95,${alpha})`;
      context.lineWidth = 1;
      context.stroke();
    };

    const render = (time: number) => {
      const rotation = reduced ? .55 : (time - start) * .000115 + .55;
      context.clearRect(0, 0, width, height);
      const cx = width * .5;
      const cy = height * .49;
      const radius = Math.min(width, height) * .3;

      context.save();
      context.translate(cx, cy);
      context.rotate(Math.sin(time * .00022) * .08);
      context.strokeStyle = "rgba(151,141,131,.38)";
      context.lineWidth = 1;
      for (const tilt of [-.36, .58]) {
        context.save();
        context.rotate(tilt + (reduced ? 0 : time * .000035));
        context.beginPath();
        context.ellipse(0, 0, radius * 1.52, radius * .42, 0, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      }
      context.restore();

      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.strokeStyle = "rgba(104,96,89,.58)";
      context.lineWidth = 1.2;
      context.stroke();

      for (const lat of [-60,-30,0,30,60]) {
        const line: Vec3[] = [];
        for (let lon = -180; lon <= 180; lon += 4) line.push(sphere({lon,lat}, rotation));
        drawPath(line, cx, cy, radius, .34);
      }
      for (let lon = -150; lon <= 180; lon += 30) {
        const line: Vec3[] = [];
        for (let lat = -90; lat <= 90; lat += 3) line.push(sphere({lon,lat}, rotation));
        drawPath(line, cx, cy, radius, .3);
      }

      for (const point of landPoints) {
        const projected = sphere(point, rotation);
        if (projected.z < -.02) continue;
        const depth = .38 + projected.z * .62;
        context.beginPath();
        context.arc(cx + projected.x * radius, cy + projected.y * radius, 1.05 + projected.z * .35, 0, Math.PI * 2);
        context.fillStyle = `rgba(70,65,60,${depth})`;
        context.fill();
      }

      for (const [from, to] of links) {
        const a = nodes[from];
        const b = nodes[to];
        const route: Vec3[] = [];
        for (let step = 0; step <= 28; step++) {
          const t = step / 28;
          route.push(sphere({ lon: a.lon + (b.lon - a.lon) * t, lat: a.lat + (b.lat - a.lat) * t + Math.sin(t * Math.PI) * 12 }, rotation));
        }
        drawPath(route, cx, cy, radius, .72);
      }

      nodes.forEach((node, index) => {
        const projected = sphere(node, rotation);
        if (projected.z < 0) return;
        const pulse = reduced ? 1 : 1 + Math.sin(time * .003 + index) * .16;
        const x = cx + projected.x * radius;
        const y = cy + projected.y * radius;
        context.beginPath();
        context.arc(x, y, (5 + projected.z * 2) * pulse, 0, Math.PI * 2);
        context.fillStyle = node.color;
        context.fill();
        context.strokeStyle = "rgba(72,64,57,.85)";
        context.lineWidth = 1.2;
        context.stroke();
      });

      if (!reduced) frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="globe-canvas" aria-hidden="true" />;
}
