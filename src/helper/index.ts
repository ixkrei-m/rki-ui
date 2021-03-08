import { TooltipPayload } from "recharts";

/**
 * helper function to format number with separators
 */
export function formatValue(
  value: string | number | React.ReactText[],
  name: string,
  entry: TooltipPayload,
  index: number
) {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}
