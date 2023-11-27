import type { ComponentMultiStyle } from "@yamada-ui/core"
import { shadeColor } from "@yamada-ui/utils"

export const Alert: ComponentMultiStyle = {
  baseStyle: {
    container: {
      px: 4,
      py: 3,
      rounded: "md",
    },
    icon: {
      flexShrink: 0,
      marginEnd: 3,
      boxSize: 5,
    },
    loading: {
      flexShrink: 0,
      marginEnd: 3,
      fontSize: "xl",
    },
    title: {
      marginEnd: 2,
      fontWeight: "bold",
      lineHeight: 5,
    },
    description: {
      lineHeight: 5,
    },
  },

  variants: {
    basic: ({ colorScheme: c = "primary" }) => ({
      container: { bg: ["white", "black"], borderWidth: "1px" },
      icon: { color: [`${c}.500`, `${c}.200`] },
      loading: { color: [`${c}.500`, `${c}.200`] },
    }),
    subtle: ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => ({
      container: { bg: [`${c}.100`, shadeColor(`${c}.200`, 56)(t, m)] },
      icon: { color: [`${c}.500`, `${c}.200`] },
      loading: { color: [`${c}.500`, `${c}.200`] },
    }),
    solid: ({ colorScheme: c = "primary" }) => ({
      container: {
        bg: [`${c}.500`, `${c}.200`],
        color: ["white", "gray.900"],
      },
    }),
    "island-accent": ({ colorScheme: c = "primary" }) => ({
      container: {
        bg: ["white", "black"],
        borderWidth: "1px",
        pl: 7,
        _before: {
          content: '""',
          position: "absolute",
          top: "50%",
          left: 3,
          transform: "translateY(-50%)",
          w: 1,
          h: "calc(100% - 1.5rem)",
          bg: [`${c}.500`, `${c}.200`],
          rounded: "full",
        },
      },
      icon: { color: [`${c}.500`, `${c}.200`] },
    }),
    "left-accent": ({
      theme: t,
      colorMode: m,
      colorScheme: c = "primary",
    }) => ({
      container: {
        bg: [`${c}.100`, shadeColor(`${c}.200`, 56)(t, m)],
        pl: 3,
        borderLeft: "0.25rem solid",
        borderLeftColor: [`${c}.500`, `${c}.200`],
        rounded: 4,
      },
      icon: { color: [`${c}.500`, `${c}.200`] },
    }),
    "top-accent": ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => ({
      container: {
        bg: [`${c}.100`, shadeColor(`${c}.200`, 56)(t, m)],
        pt: 3,
        borderTop: "0.25rem solid",
        borderTopColor: [`${c}.500`, `${c}.200`],
        rounded: 4,
      },
      icon: { color: [`${c}.500`, `${c}.200`] },
    }),
  },

  defaultProps: {
    variant: "basic",
    colorScheme: "primary",
  },
}
