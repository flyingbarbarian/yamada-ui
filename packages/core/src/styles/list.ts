import type * as CSS from "csstype"
import type { Token } from "../css"
import type { Configs } from "./config"
import { configs } from "./config"

export const list: Configs = {
  listStyleType: true,
  listStylePosition: true,
  listStylePos: configs.prop("listStylePosition"),
  listStyleImage: true,
  listStyleImg: configs.prop("listStyleImage"),
}

export type ListProps = {
  /**
   * The CSS `list-style-type` property.
   */
  listStyleType?: Token<CSS.Property.ListStyleType>
  /**
   * The CSS `list-style-position` property.
   */
  listStylePosition?: Token<CSS.Property.ListStylePosition>
  /**
   * The CSS `list-style-position` property.
   */
  listStylePos?: Token<CSS.Property.ListStylePosition>
  /**
   * The CSS `list-style-image` property.
   */
  listStyleImage?: Token<CSS.Property.ListStyleImage>
  /**
   * The CSS `list-style-image` property.
   */
  listStyleImg?: Token<CSS.Property.ListStyleImage>
}
