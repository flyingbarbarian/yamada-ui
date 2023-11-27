import type { ComponentMultiStyle } from "@yamada-ui/core"
import { isUndefined, transparentizeColor } from "@yamada-ui/utils"

export const SegmentedControl: ComponentMultiStyle = {
  baseStyle: {
    container: {
      p: "1",
      bg: [`gray.200`, `whiteAlpha.200`],
      _readOnly: { cursor: "auto" },
      _disabled: { cursor: "not-allowed" },
    },
    active: {
      transitionProperty: "common",
      transitionDuration: "normal",
      boxShadow: "md",
    },
    button: {
      transitionProperty: "common",
      transitionDuration: "slower",
      fontWeight: "semibold",
      whiteSpace: "nowrap",
      _focusVisible: {
        boxShadow: "outline",
      },
      _readOnly: { cursor: "auto" },
      _disabled: { opacity: 0.4, cursor: "not-allowed" },
    },
  },

  variants: {
    basic: ({ theme: t, colorMode: m, colorScheme: c }) => ({
      container: {
        rounded: "lg",
      },
      active: {
        bg: isUndefined(c)
          ? ["whiteAlpha.700", "whiteAlpha.100"]
          : [`${c}.500`, transparentizeColor(`${c}.500`, 0.6)(t, m)],
        rounded: "md",
      },
      button: {
        rounded: "md",
        color: ["blackAlpha.700", "whiteAlpha.700"],
        _hover: {
          color: [`blackAlpha.800`, `whiteAlpha.800`],
        },
        _checked: {
          color: [
            isUndefined(c) ? `blackAlpha.800` : `white`,
            `whiteAlpha.800`,
          ],
        },
      },
    }),
    rounded: ({ theme: t, colorMode: m, colorScheme: c }) => ({
      container: {
        rounded: "full",
      },
      active: {
        bg: isUndefined(c)
          ? ["whiteAlpha.700", "whiteAlpha.100"]
          : [`${c}.500`, transparentizeColor(`${c}.500`, 0.6)(t, m)],
        rounded: "full",
      },
      button: {
        rounded: "full",
        color: ["blackAlpha.700", "whiteAlpha.700"],
        _hover: {
          color: [`blackAlpha.800`, `whiteAlpha.800`],
        },
        _checked: {
          color: [
            isUndefined(c) ? `blackAlpha.800` : `white`,
            `whiteAlpha.800`,
          ],
        },
      },
    }),
  },

  sizes: {
    sm: {
      container: { minW: "xs" },
      button: { py: "1", px: "2", fontSize: "sm" },
    },
    md: {
      container: { minW: "sm" },
      button: { py: "1.5", px: "3", fontSize: "md" },
    },
    lg: {
      container: { minW: "md" },
      button: { py: "2", px: "4" },
    },
  },

  defaultProps: {
    variant: "basic",
    size: "md",
  },
}
