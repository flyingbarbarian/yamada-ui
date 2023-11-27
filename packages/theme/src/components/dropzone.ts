import type { ComponentMultiStyle } from "@yamada-ui/core"
import { mode } from "@yamada-ui/core"
import { getColor, isArray, transparentizeColor } from "@yamada-ui/utils"

export const Dropzone: ComponentMultiStyle = {
  baseStyle: {
    container: {
      w: "100%",
      bg: ["gray.100", "whiteAlpha.50"],
      outline: 0,
      overflow: "hidden",
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
    overlay: {
      bg: ["whiteAlpha.500", "blackAlpha.300"],
      zIndex: "kurillin",
    },
  },

  variants: {
    solid: ({
      theme: t,
      colorMode: m,
      focusBorderColor: fc = ["blue.500", "blue.300"],
      errorBorderColor: ec = ["red.500", "red.300"],
    }) => {
      const focusBorderColor = isArray(fc)
        ? mode(getColor(fc[0], fc[0])(t, m), getColor(fc[1], fc[1])(t, m))(m)
        : getColor(fc, fc)(t, m)
      const errorBorderColor = isArray(ec)
        ? mode(getColor(ec[0], ec[0])(t, m), getColor(ec[1], ec[1])(t, m))(m)
        : getColor(ec, ec)(t, m)

      return {
        container: {
          color: ["blackAlpha.500", "whiteAlpha.500"],
          rounded: "md",
          borderWidth: "1px",
          borderStyle: "solid",
          _focus: {
            zIndex: "yamcha",
            borderColor: focusBorderColor,
            boxShadow: `0 0 0 1px ${focusBorderColor}`,
          },
          _invalid: {
            borderColor: errorBorderColor,
            boxShadow: `0 0 0 1px ${errorBorderColor}`,
          },
          _focusVisible: {
            zIndex: "yamcha",
            borderColor: focusBorderColor,
            boxShadow: `0 0 0 1px ${focusBorderColor}`,
          },
          _hover: {
            cursor: "pointer",
            bg: ["gray.200", "whiteAlpha.100"],
          },
          _accept: {
            bg: [
              transparentizeColor("blue.200", 0.48)(t, m),
              transparentizeColor("blue.400", 0.12)(t, m),
            ],
            borderColor: ["blue.500", "blue.300"],
          },
          _reject: {
            bg: [
              transparentizeColor("red.200", 0.48)(t, m),
              transparentizeColor("red.400", 0.12)(t, m),
            ],
            borderColor: ["red.500", "red.300"],
          },
          _loading: {
            cursor: "not-allowed",
            bg: ["gray.100", "whiteAlpha.50"],
          },
        },
      }
    },
    dashed: ({
      theme: t,
      colorMode: m,
      focusBorderColor: fc = ["blue.500", "blue.300"],
      errorBorderColor: ec = ["red.500", "red.300"],
    }) => {
      const focusBorderColor = isArray(fc)
        ? mode(getColor(fc[0], fc[0])(t, m), getColor(fc[1], fc[1])(t, m))(m)
        : getColor(fc, fc)(t, m)
      const errorBorderColor = isArray(ec)
        ? mode(getColor(ec[0], ec[0])(t, m), getColor(ec[1], ec[1])(t, m))(m)
        : getColor(ec, ec)(t, m)

      return {
        container: {
          color: ["blackAlpha.500", "whiteAlpha.500"],
          rounded: "md",
          borderWidth: "1px",
          borderStyle: "dashed",
          _focus: {
            zIndex: "yamcha",
            borderColor: focusBorderColor,
            boxShadow: `0 0 0 1px ${focusBorderColor}`,
          },
          _invalid: {
            borderColor: errorBorderColor,
            boxShadow: `0 0 0 1px ${errorBorderColor}`,
          },
          _focusVisible: {
            zIndex: "yamcha",
            borderColor: focusBorderColor,
            boxShadow: `0 0 0 1px ${focusBorderColor}`,
          },
          _hover: {
            cursor: "pointer",
            bg: ["gray.200", "whiteAlpha.100"],
          },
          _accept: {
            bg: [
              transparentizeColor("blue.200", 0.48)(t, m),
              transparentizeColor("blue.400", 0.12)(t, m),
            ],
            borderColor: ["blue.500", "blue.300"],
          },
          _reject: {
            bg: [
              transparentizeColor("red.200", 0.48)(t, m),
              transparentizeColor("red.400", 0.12)(t, m),
            ],
            borderColor: ["red.500", "red.300"],
          },
          _loading: {
            cursor: "not-allowed",
            bg: ["gray.100", "whiteAlpha.50"],
          },
        },
      }
    },
    unstyled: {
      container: {
        bg: "transparent",
        h: "auto",
      },
      overlay: {
        bg: "transparent",
      },
    },
  },

  sizes: {
    xs: {
      container: { h: "xs" },
    },
    sm: {
      container: { h: "sm" },
    },
    md: {
      container: { h: "md" },
    },
    lg: {
      container: { h: "lg" },
    },
    full: {
      container: { h: "full" },
    },
  },

  defaultProps: {
    size: "sm",
    variant: "dashed",
  },
}
