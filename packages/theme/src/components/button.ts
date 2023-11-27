import type { ComponentStyle } from "@yamada-ui/core"
import { mode } from "@yamada-ui/core"
import {
  getMemoizedObject as get,
  transparentizeColor,
  isArray,
  getColor,
  isGray,
} from "@yamada-ui/utils"

export const Button: ComponentStyle = {
  baseStyle: {
    rounded: "md",
    fontWeight: "semibold",
    transitionProperty: "common",
    transitionDuration: "slower",
    _focus: {
      outline: "none",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      boxShadow: "none",
    },
    _readOnly: {
      cursor: "default",
    },
    _hover: {
      _disabled: {
        bg: ["initial", "initial"],
      },
    },
    _active: {
      _disabled: {
        bg: ["initial", "initial"],
      },
    },
    _focusVisible: {
      boxShadow: "outline",
    },
  },

  variants: {
    solid: ({
      theme: t,
      colorMode: m,
      colorScheme: c = "gray",
      errorBorderColor: ec = ["red.500", "red.300"],
    }) => {
      const isAccessible = c === "yellow" || c === "cyan" || c === "lime"
      const errorBorderColor = isArray(ec)
        ? mode(getColor(ec[0], ec[0])(t, m), getColor(ec[1], ec[1])(t, m))(m)
        : getColor(ec, ec)(t, m)

      return {
        bg: isGray(c)
          ? [`${c}.200`, `${c}.700`]
          : [isAccessible ? `${c}.400` : `${c}.500`, `${c}.200`],
        color: isGray(c)
          ? undefined
          : [isAccessible ? `black` : `white`, `gray.800`],
        _hover: {
          bg: isGray(c)
            ? [`${c}.300`, `${c}.600`]
            : [isAccessible ? `${c}.500` : `${c}.600`, `${c}.300`],
          _disabled: {
            bg: isGray(c)
              ? [`${c}.200`, `${c}.200`]
              : [isAccessible ? `${c}.400` : `${c}.500`, `${c}.200`],
          },
        },
        _invalid: {
          border: "1px solid",
          borderColor: errorBorderColor,
          boxShadow: `0 0 0 1px ${errorBorderColor}`,
        },
        _active: {
          bg: isGray(c)
            ? [`${c}.400`, `${c}.500`]
            : [isAccessible ? `${c}.600` : `${c}.700`, `${c}.400`],
          _disabled: {
            bg: isGray(c)
              ? [`${c}.200`, `${c}.200`]
              : [isAccessible ? `${c}.400` : `${c}.500`, `${c}.200`],
          },
        },
      }
    },
    outline: ({
      theme: t,
      colorMode: m,
      colorScheme: c = "gray",
      errorBorderColor: ec = ["red.500", "red.300"],
    }) => {
      const errorBorderColor = isArray(ec)
        ? mode(getColor(ec[0], ec[0])(t, m), getColor(ec[1], ec[1])(t, m))(m)
        : getColor(ec, ec)(t, m)

      return {
        border: "1px solid",
        borderColor: isGray(c)
          ? [`${c}.200`, `${c}.400`]
          : [`${c}.600`, `${c}.300`],
        color: isGray(c) ? [`inherit`, `${c}.400`] : [`${c}.600`, `${c}.200`],
        bg: isGray(c) ? undefined : "transparent",
        _hover: {
          bg: isGray(c)
            ? [`${c}.100`, `whiteAlpha.200`]
            : [`${c}.50`, transparentizeColor(`${c}.200`, 0.12)(t, m)],
        },
        _invalid: {
          borderColor: errorBorderColor,
          boxShadow: `0 0 0 1px ${errorBorderColor}`,
        },
        _active: {
          bg: isGray(c)
            ? [`${c}.200`, `whiteAlpha.300`]
            : [`${c}.100`, transparentizeColor(`${c}.200`, 0.24)(t, m)],
        },
      }
    },
    link: ({ colorScheme: c = "gray" }) => ({
      padding: 0,
      height: "auto",
      lineHeight: "normal",
      verticalAlign: "baseline",
      color: [`${c}.500`, `${c}.200`],
      _hover: {
        textDecoration: "underline",
        _disabled: {
          textDecoration: "none",
        },
      },
      _active: {
        color: [`${c}.700`, `${c}.500`],
        _disabled: {
          color: [`${c}.500`, `${c}.200`],
        },
      },
    }),
    ghost: ({
      theme: t,
      colorMode: m,
      colorScheme: c = "gray",
      errorBorderColor: ec = ["red.500", "red.300"],
    }) => {
      const errorBorderColor = isArray(ec)
        ? mode(getColor(ec[0], ec[0])(t, m), getColor(ec[1], ec[1])(t, m))(m)
        : getColor(ec, ec)(t, m)

      return {
        color: isGray(c) ? [`inherit`, `${c}.200`] : [`${c}.600`, `${c}.200`],
        bg: isGray(c) ? undefined : "transparent",
        _hover: {
          bg: isGray(c)
            ? [`${c}.200`, `whiteAlpha.200`]
            : [`${c}.100`, transparentizeColor(`${c}.200`, 0.12)(t, m)],
        },
        _invalid: {
          border: "1px solid",
          borderColor: errorBorderColor,
          boxShadow: `0 0 0 1px ${errorBorderColor}`,
        },
        _active: {
          bg: isGray(c)
            ? [`${c}.300`, `whiteAlpha.300`]
            : [`${c}.200`, transparentizeColor(`${c}.200`, 0.24)(t, m)],
        },
      }
    },
    unstyled: {
      bg: "none",
      color: "inherit",
      display: "inline",
      lineHeight: "inherit",
      m: 0,
      p: 0,
    },
  },

  sizes: {
    xs: ({ theme: t }) => ({
      h: 6,
      minW: 6,
      fontSize: "xs",
      lineHeight: get(t, "sizes.6"),
      px: 2,
    }),
    sm: ({ theme: t }) => ({
      h: 8,
      minW: 8,
      fontSize: "sm",
      lineHeight: get(t, "sizes.8"),
      px: 3,
    }),
    md: ({ theme: t }) => ({
      h: 10,
      minW: 10,
      fontSize: "md",
      lineHeight: get(t, "sizes.10"),
      px: 4,
    }),
    lg: ({ theme: t }) => ({
      h: 12,
      minW: 12,
      fontSize: "lg",
      lineHeight: get(t, "sizes.12"),
      px: 6,
    }),
  },

  defaultProps: {
    variant: "solid",
    size: "md",
    colorScheme: "gray",
  },
}
