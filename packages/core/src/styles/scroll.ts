import type * as CSS from "csstype"
import type { Token } from "../css"
import type { Configs } from "./config"
import { configs } from "./config"

export const scroll: Configs = {
  scrollBehavior: true,
  scrollSnapAlign: true,
  scrollSnapStop: true,
  scrollSnapType: true,
  scrollMargin: configs.space("scrollMargin"),
  scrollMarginTop: configs.space("scrollMarginTop"),
  scrollMarginBottom: configs.space("scrollMarginBottom"),
  scrollMarginLeft: configs.space("scrollMarginLeft"),
  scrollMarginRight: configs.space("scrollMarginRight"),
  scrollMarginX: configs.space(["scrollMarginLeft", "scrollMarginRight"]),
  scrollMarginY: configs.space(["scrollMarginTop", "scrollMarginBottom"]),
  scrollPadding: configs.space("scrollPadding"),
  scrollPaddingTop: configs.space("scrollPaddingTop"),
  scrollPaddingBottom: configs.space("scrollPaddingBottom"),
  scrollPaddingLeft: configs.space("scrollPaddingLeft"),
  scrollPaddingRight: configs.space("scrollPaddingRight"),
  scrollPaddingX: configs.space(["scrollPaddingLeft", "scrollPaddingRight"]),
  scrollPaddingY: configs.space(["scrollPaddingTop", "scrollPaddingBottom"]),
}

export type ScrollProps = {
  /**
   * The CSS `scroll-behavior` property.
   */
  scrollBehavior?: Token<CSS.Property.ScrollBehavior>
  /**
   * The CSS `scroll-snap-align` property.
   */
  scrollSnapAlign?: Token<CSS.Property.ScrollSnapAlign>
  /**
   * The CSS `scroll-snap-stop` property.
   */
  scrollSnapStop?: Token<CSS.Property.ScrollSnapStop>
  /**
   * The CSS `scroll-snap-type` property.
   */
  scrollSnapType?: Token<CSS.Property.ScrollSnapType>
  /**
   * The CSS `scroll-margin` property.
   */
  scrollMargin?: Token<CSS.Property.ScrollMargin | number, "spaces">
  /**
   * The CSS `scroll-margin-top` property.
   */
  scrollMarginTop?: Token<CSS.Property.ScrollMarginTop | number, "spaces">
  /**
   * The CSS `scroll-margin-bottom` property.
   */
  scrollMarginBottom?: Token<CSS.Property.ScrollMarginBottom | number, "spaces">
  /**
   * The CSS `scroll-margin-left` property.
   */
  scrollMarginLeft?: Token<CSS.Property.ScrollMarginLeft | number, "spaces">
  /**
   * The CSS `scroll-margin-right` property.
   */
  scrollMarginRight?: Token<CSS.Property.ScrollMarginRight | number, "spaces">
  /**
   * The CSS `scroll-margin-left`, and `scroll-margin-right` property.
   */
  scrollMarginX?: Token<CSS.Property.ScrollMargin | number, "spaces">
  /**
   * The CSS `scroll-margin-top`, and `scroll-margin-bottom` property.
   */
  scrollMarginY?: Token<CSS.Property.ScrollMargin | number, "spaces">
  /**
   * The CSS `scroll-padding` property.
   */
  scrollPadding?: Token<CSS.Property.ScrollPadding | number, "spaces">
  /**
   * The CSS `scroll-padding-top` property.
   */
  scrollPaddingTop?: Token<CSS.Property.ScrollPaddingTop | number, "spaces">
  /**
   * The CSS `scroll-padding-bottom` property.
   */
  scrollPaddingBottom?: Token<
    CSS.Property.ScrollPaddingBottom | number,
    "spaces"
  >
  /**
   * The CSS `scroll-padding-left` property.
   */
  scrollPaddingLeft?: Token<CSS.Property.ScrollPaddingLeft | number, "spaces">
  /**
   * The CSS `scroll-padding-right` property.
   */
  scrollPaddingRight?: Token<CSS.Property.ScrollPaddingRight | number, "spaces">
  /**
   * The CSS `scroll-padding-left`, and `scroll-padding-right` property.
   */
  scrollPaddingX?: Token<CSS.Property.ScrollPadding | number, "spaces">
  /**
   * The CSS `scroll-padding-top`, and `scroll-padding-bottom` property.
   */
  scrollPaddingY?: Token<CSS.Property.ScrollPadding | number, "spaces">
}
