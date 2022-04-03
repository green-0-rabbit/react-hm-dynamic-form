import { createColors } from "colorette";

// @see https://no-color.org
// @see https://www.npmjs.com/package/chalk
export const { bold, cyan, dim, gray, green, red, underline, yellow, white } =
  createColors({
    useColor: true
  });
