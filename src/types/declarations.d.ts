declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "maath/random/dist/maath-random.esm" {
  export function inSphere(array: Float32Array, options: { radius: number }): Float32Array;
}
