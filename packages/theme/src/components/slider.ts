import type { ComponentMultiStyle } from "@yamada-ui/core"

export const Slider: ComponentMultiStyle = {
  baseStyle: {
    container: ({ orientation: o }) => ({
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      _readOnly: { cursor: "auto" },
      _disabled: {
        opacity: 0.6,
        cursor: "not-allowed",
      },
      ...(o === "vertical" ? { h: "100%" } : { w: "100%" }),
    }),
    track: {
      overflow: "hidden",
      rounded: "sm",
      bg: ["gray.200", "whiteAlpha.200"],
      _disabled: {
        bg: ["gray.300", "whiteAlpha.300"],
      },
    },
    filledTrack: ({ colorScheme: c = "primary" }) => ({
      w: "inherit",
      h: "inherit",
      bg: [`${c}.500`, `${c}.200`],
    }),
    mark: {
      fontSize: "sm",
    },
    thumb: ({ orientation: o }) => ({
      position: "absolute",
      zIndex: "yamcha",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: 0,
      rounded: "full",
      bg: "white",
      boxShadow: "base",
      border: "1px solid",
      borderColor: "transparent",
      transitionProperty: "transform",
      transitionDuration: "normal",
      _focusVisible: {
        boxShadow: "outline",
      },
      _disabled: {
        bg: "gray.300",
      },
      ...(o === "vertical"
        ? {
            left: "50%",
            transform: `translateX(-50%)`,
            _active: {
              transform: `translateX(-50%) scale(1.15)`,
            },
          }
        : {
            top: "50%",
            transform: `translateY(-50%)`,
            _active: {
              transform: `translateY(-50%) scale(1.15)`,
            },
          }),
    }),
  },

  sizes: {
    sm: ({ orientation: o }) => ({
      track: o === "vertical" ? { w: "0.5" } : { h: "0.5" },
      thumb: { boxSize: "2.5" },
      mark: o === "vertical" ? { ml: "2" } : { mt: "2" },
    }),
    md: ({ orientation: o }) => ({
      track: o === "vertical" ? { w: "1" } : { h: "1" },
      thumb: { boxSize: "3.5" },
      mark: o === "vertical" ? { ml: "3" } : { mt: "3" },
    }),
    lg: ({ orientation: o }) => ({
      track: o === "vertical" ? { w: "1.5" } : { h: "1.5" },
      thumb: { boxSize: "5" },
      mark: o === "vertical" ? { ml: "4" } : { mt: "4" },
    }),
  },

  defaultProps: {
    size: "md",
    colorScheme: "primary",
  },
}
