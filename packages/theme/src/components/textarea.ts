import type { ComponentStyle } from "@yamada-ui/core"
import { mode } from "@yamada-ui/core"
import { getColor, isArray } from "@yamada-ui/utils"

export const Textarea: ComponentStyle = {
  baseStyle: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    py: "2",
    minH: "20",
    lineHeight: "short",
    verticalAlign: "top",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
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
        borderBottom: "1px solid",
        borderColor: "inherit",
        rounded: "0",
        py: "0",
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
      }
    },
    unstyled: {
      bg: "transparent",
      h: "auto",
      py: "0",
      px: "0",
    },
  },

  sizes: {
    xs: {
      fontSize: "xs",
      py: "2",
      px: "2",
      h: "6",
      rounded: "sm",
    },
    sm: {
      fontSize: "sm",
      py: "2",
      px: "2",
      h: "8",
      rounded: "md",
    },
    md: {
      fontSize: "md",
      py: "2",
      px: "3",
      h: "10",
      rounded: "md",
    },
    lg: {
      fontSize: "lg",
      py: "3",
      px: "4",
      h: "12",
      rounded: "md",
    },
  },

  defaultProps: {
    size: "md",
    variant: "outline",
  },
}
