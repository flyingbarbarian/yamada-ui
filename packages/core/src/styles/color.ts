import type * as CSS from "csstype"
import type { Token } from "../css"
import type { Configs } from "./config"
import { configs } from "./config"

export const color: Configs = {
  color: configs.color("color"),
  textColor: configs.color("color"),
  fill: configs.color("fill"),
  stroke: configs.color("stroke"),
}

export type ColorProps = {
  /**
   * The CSS `color` property.
   */
  color?: Token<CSS.Property.Color, "colors">
  /**
   * The CSS `color` property.
   */
  textColor?: Token<CSS.Property.Color, "colors">
  /**
   * The CSS `fill` property.
   */
  fill?: Token<CSS.Property.Color, "colors">
  /**
   * The CSS `stroke` property.
   */
  stroke?: Token<CSS.Property.Color, "colors">
}
