export type Lut = {
  size: number;
  data: Float32Array;
  min: number[];
  max: number[];
};
export function parseCube(text: string): Lut {
  let size = 0,
    min = [0, 0, 0],
    max = [1, 1, 1];
  const values: number[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || line.startsWith("TITLE")) continue;
    const parts = line.split(/\s+/);
    if (parts[0] === "LUT_3D_SIZE") size = Number(parts[1]);
    else if (parts[0] === "DOMAIN_MIN") min = parts.slice(1).map(Number);
    else if (parts[0] === "DOMAIN_MAX") max = parts.slice(1).map(Number);
    else if (
      parts.length === 3 &&
      parts.every((x) => Number.isFinite(Number(x)))
    )
      values.push(...parts.map(Number));
  }
  if (
    size < 2 ||
    values.length !== size ** 3 * 3 ||
    min.some((v, i) => v >= max[i])
  )
    throw new Error("LUT inválido");
  return { size, data: new Float32Array(values), min, max };
}
/** Standard .cube ordering (red fastest), with trilinear interpolation. */
export function applyLut(source: ImageData, lut: Lut): ImageData {
  const output = new ImageData(
    new Uint8ClampedArray(source.data),
    source.width,
    source.height,
  );
  const { size, data, min, max } = lut;
  const last = size - 1;
  for (let p = 0; p < source.data.length; p += 4) {
    const c = [0, 1, 2].map(
      (i) =>
        Math.max(
          0,
          Math.min(1, (source.data[p + i] / 255 - min[i]) / (max[i] - min[i])),
        ) * last,
    );
    const lo = c.map(Math.floor),
      hi = lo.map((v) => Math.min(v + 1, last)),
      f = c.map((v, i) => v - lo[i]);
    for (let channel = 0; channel < 3; channel++) {
      let value = 0;
      for (let b = 0; b < 2; b++)
        for (let g = 0; g < 2; g++)
          for (let r = 0; r < 2; r++) {
            const idx =
              ((b ? hi[2] : lo[2]) * size * size +
                (g ? hi[1] : lo[1]) * size +
                (r ? hi[0] : lo[0])) *
                3 +
              channel;
            value +=
              data[idx] *
              (r ? f[0] : 1 - f[0]) *
              (g ? f[1] : 1 - f[1]) *
              (b ? f[2] : 1 - f[2]);
          }
      output.data[p + channel] = Math.max(0, Math.min(255, value * 255));
    }
  }
  return output;
}
