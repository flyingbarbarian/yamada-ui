import type { ComponentMultiStyle } from "@yamada-ui/core"
import { mode } from "@yamada-ui/core"
import {
  getMemoizedObject as get,
  transparentizeColor,
  getColor,
  isGray,
} from "@yamada-ui/utils"

export const Tag: ComponentMultiStyle = {
  baseStyle: {
    container: {
      outline: 0,
      fontWeight: "medium",
      rounded: "md",
      _focusVisible: {
        boxShadow: "outline",
      },
    },
    label: {
      overflow: "visible",
    },
    closeButton: {
      transitionProperty: "common",
      transitionDuration: "normal",
      rounded: "full",
      opacity: 0.5,
      _disabled: {
        opacity: 0.4,
      },
      _hover: {
        opacity: 0.8,
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed",
        },
      },
      _active: {
        opacity: 1,
      },
      _focusVisible: {
        boxShadow: "outline",
        bg: "rgba(0, 0, 0, 0.14)",
      },
    },
  },

  variants: {
    solid: {
      container: ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => ({
        bg: [`${c}.500`, transparentizeColor(`${c}.500`, 0.6)(t, m)],
        color: [`white`, `whiteAlpha.800`],
      }),
    },
    subtle: {
      container: ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => {
        return {
          bg: [
            isGray(c) ? `${c}.200` : `${c}.100`,
            transparentizeColor(`${c}.200`, 0.16)(t, m),
          ],
          color: [`${c}.800`, `${c}.200`],
        }
      },
    },
    outline: {
      container: ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => {
        const color = mode(
          getColor(`${c}.500`)(t, m),
          transparentizeColor(`${c}.200`, 0.8)(t, m),
        )(m)

        return {
          color,
          boxShadow: `inset 0 0 0px 1px ${color}`,
        }
      },
    },
  },

  sizes: {
    sm: ({ theme: t }) => ({
      container: {
        minH: "6",
        minW: "6",
        fontSize: "xs",
        px: "2",
        lineHeight: get(t, "sizes.6"),
      },
    }),
    md: ({ theme: t }) => ({
      container: {
        minH: "7",
        minW: "7",
        fontSize: "sm",
        px: "2",
        lineHeight: get(t, "sizes.7"),
      },
    }),
    lg: ({ theme: t }) => ({
      container: {
        minH: "8",
        minW: "8",
        fontSize: "md",
        px: "3",
        lineHeight: get(t, "sizes.8"),
      },
    }),
  },

  defaultProps: {
    size: "md",
    variant: "subtle",
    colorScheme: "primary",
  },
}
