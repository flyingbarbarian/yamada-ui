import type { ComponentMultiStyle } from "@yamada-ui/core"
import { mode } from "@yamada-ui/core"
import { getColor, isArray } from "@yamada-ui/utils"

export const Input: ComponentMultiStyle = {
  baseStyle: {
    field: {
      width: "100%",
      minWidth: 0,
      outline: 0,
      position: "relative",
      appearance: "none",
      transitionProperty: "common",
      transitionDuration: "normal",
      _placeholder: {
        color: "gray.500",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
  },

  variants: {
    outline: ({
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
        field: {
          border: "1px solid",
          borderColor: "inherit",
          bg: "inherit",
          _hover: {
            borderColor: ["gray.300", "whiteAlpha.400"],
          },
          _readOnly: {
            boxShadow: "none !important",
            userSelect: "all",
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
        },
        addon: {
          border: "1px solid",
          borderColor: ["inherit", "whiteAlpha.50"],
          bg: ["gray.100", "whiteAlpha.300"],
        },
      }
    },
    filled: ({
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
        field: {
          border: "2px solid",
          borderColor: "transparent",
          bg: ["gray.100", "whiteAlpha.50"],
          _hover: {
            bg: ["gray.200", "whiteAlpha.100"],
          },
          _readOnly: {
            boxShadow: "none !important",
            userSelect: "all",
          },
          _invalid: {
            borderColor: errorBorderColor,
          },
          _focusVisible: {
            bg: "transparent",
            borderColor: focusBorderColor,
          },
        },
        addon: {
          border: "2px solid transparent",
          bg: ["gray.100", "whiteAlpha.50"],
        },
      }
    },
    flushed: ({
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
        field: {
          borderBottom: "1px solid",
          borderColor: "inherit",
          rounded: "0",
          px: "0",
          bg: "transparent",
          _readOnly: {
            boxShadow: "none !important",
            userSelect: "all",
          },
          _invalid: {
            borderColor: errorBorderColor,
            boxShadow: `0px 1px 0px 0px ${errorBorderColor}`,
          },
          _focusVisible: {
            borderColor: focusBorderColor,
            boxShadow: `0px 1px 0px 0px ${focusBorderColor}`,
          },
        },
        addon: {
          border: "2px solid",
          borderColor: "inherit",
          bg: "transparent",
          rounded: "0",
          px: "0",
        },
      }
    },
    unstyled: {
      field: {
        bg: "transparent",
        minH: "auto",
        px: "0",
      },
      addon: {
        bg: "transparent",
        minH: "auto",
        px: "0",
      },
    },
  },

  sizes: {
    xs: {
      field: {
        fontSize: "xs",
        px: "2",
        minH: "6",
        rounded: "sm",
      },
      addon: {
        fontSize: "xs",
        px: "2",
        minH: "6",
        rounded: "sm",
      },
    },
    sm: {
      field: {
        fontSize: "sm",
        px: "2",
        minH: "8",
        rounded: "md",
      },
      addon: {
        fontSize: "sm",
        px: "2",
        minH: "8",
        rounded: "md",
      },
    },
    md: {
      field: {
        fontSize: "md",
        px: "3",
        minH: "10",
        rounded: "md",
      },
      addon: {
        fontSize: "md",
        px: "3",
        minH: "10",
        rounded: "md",
      },
    },
    lg: {
      field: {
        fontSize: "lg",
        px: "4",
        minH: "12",
        rounded: "md",
      },
      addon: {
        fontSize: "lg",
        px: "4",
        minH: "12",
        rounded: "md",
      },
    },
  },

  defaultProps: {
    size: "md",
    variant: "outline",
  },
}
