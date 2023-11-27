import type { ComponentMultiStyle } from "@yamada-ui/core"
import { mode } from "@yamada-ui/core"
import { getColor, transparentizeColor } from "@yamada-ui/utils"

export const Tabs: ComponentMultiStyle = {
  baseStyle: {
    container: ({ orientation }) => ({
      display: "flex",
      flexDirection: orientation === "vertical" ? "row" : "column",
    }),
    tabList: ({ align, orientation }) => ({
      flexDirection: orientation === "vertical" ? "column" : "row",
      justifyContent: align === "center" ? align : `flex-${align}`,
    }),
    tab: ({ isFitted }) => ({
      flex: isFitted ? 1 : undefined,
      whiteSpace: "nowrap",
      transitionProperty: "common",
      transitionDuration: "normal",
      _hover: { opacity: 0.7 },
      _focusVisible: {
        zIndex: "yamcha",
        boxShadow: "outline",
      },
      _selected: { _hover: { opacity: 1 } },
      _disabled: {
        cursor: "not-allowed",
        opacity: 0.4,
      },
    }),
    tabPanels: {},
    tabPanel: {
      p: "md",
    },
  },

  variants: {
    line: ({ colorScheme: c = "primary", orientation }) => {
      const isVertical = orientation === "vertical"

      return {
        tabList: {
          borderColor: "inherit",
          ...(isVertical
            ? { borderEndWidth: "1px" }
            : { borderBottomWidth: "1px" }),
        },
        tab: {
          borderColor: "transparent",
          _selected: {
            color: [`${c}.600`, `${c}.300`],
            borderColor: "currentColor",
          },
          ...(isVertical
            ? {
                borderEndWidth: "1px",
                borderEndStyle: "solid",
                marginEnd: "-1px",
              }
            : {
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                marginBottom: "-1px",
              }),
        },
      }
    },
    sticky: ({ colorScheme: c = "primary", orientation }) => {
      const isVertical = orientation === "vertical"

      return {
        tabList: {
          borderColor: "inherit",
          ...(isVertical
            ? { borderEndWidth: "1px" }
            : { borderBottomWidth: "1px" }),
        },
        tab: {
          borderColor: "transparent",
          _selected: {
            color: [`${c}.600`, `${c}.300`],
            borderColor: "inherit",
            ...(isVertical
              ? { borderEndColor: ["white", "black"] }
              : { borderBottomColor: ["white", "black"] }),
          },
          ...(isVertical
            ? {
                roundedLeft: "md",
                borderWidth: "1px",
                borderStyle: "solid",
                marginEnd: "-2px",
              }
            : {
                roundedTop: "md",
                borderWidth: "1px",
                borderStyle: "solid",
                marginBottom: "-2px",
              }),
        },
      }
    },
    "sticky-subtle": ({
      theme: t,
      colorMode: m,
      colorScheme: c = "primary",
      orientation,
    }) => {
      const isVertical = orientation === "vertical"

      return {
        tabList: {
          borderColor: "inherit",
          ...(isVertical
            ? { borderEndWidth: "1px" }
            : { borderBottomWidth: "1px" }),
        },
        tab: {
          borderColor: "inherit",
          _notLast: {
            ...(isVertical ? { marginBottom: "-1px" } : { marginEnd: "-1px" }),
          },
          _selected: {
            bg: [`${c}.100`, transparentizeColor(`${c}.200`, 0.16)(t, m)],
            color: [`${c}.800`, `${c}.200`],
          },
          ...(isVertical
            ? {
                borderWidth: "1px",
                borderStyle: "solid",
                marginEnd: "-1px",
              }
            : {
                borderWidth: "1px",
                borderStyle: "solid",
                marginBottom: "-1px",
              }),
        },
      }
    },
    "sticky-solid": ({
      theme: t,
      colorMode: m,
      colorScheme: c = "primary",
      orientation,
    }) => {
      const isVertical = orientation === "vertical"

      return {
        tabList: {
          borderColor: "inherit",
          ...(isVertical
            ? { borderEndWidth: "1px" }
            : { borderBottomWidth: "1px" }),
        },
        tab: {
          borderColor: "inherit",
          _notLast: {
            ...(isVertical ? { marginBottom: "-1px" } : { marginEnd: "-1px" }),
          },
          _selected: {
            bg: [`${c}.500`, transparentizeColor(`${c}.500`, 0.6)(t, m)],
            color: [`white`, `whiteAlpha.800`],
          },
          ...(isVertical
            ? {
                borderWidth: "1px",
                borderStyle: "solid",
                marginEnd: "-1px",
              }
            : {
                borderWidth: "1px",
                borderStyle: "solid",
                marginBottom: "-1px",
              }),
        },
      }
    },
    rounded: ({ theme: t, colorMode: m, colorScheme: c = "primary" }) => {
      const color = mode(
        getColor(`${c}.500`)(t, m),
        transparentizeColor(`${c}.200`, 0.8)(t, m),
      )(m)

      return {
        tabList: { gap: "sm" },
        tab: {
          borderRadius: "full",
          fontWeight: "semibold",
          _selected: {
            color,
            boxShadow: `inset 0 0 0px 1px ${color}`,
          },
        },
      }
    },
    "rounded-subtle": ({
      theme: t,
      colorMode: m,
      colorScheme: c = "primary",
    }) => ({
      tabList: { gap: "sm" },
      tab: {
        borderRadius: "full",
        fontWeight: "semibold",
        color: "gray.600",
        _selected: {
          bg: [`${c}.100`, transparentizeColor(`${c}.200`, 0.16)(t, m)],
          color: [`${c}.800`, `${c}.200`],
        },
      },
    }),
    "rounded-solid": ({
      theme: t,
      colorMode: m,
      colorScheme: c = "primary",
    }) => ({
      tabList: { gap: "sm" },
      tab: {
        borderRadius: "full",
        fontWeight: "semibold",
        _selected: {
          bg: [`${c}.500`, transparentizeColor(`${c}.500`, 0.6)(t, m)],
          color: [`white`, `whiteAlpha.800`],
        },
      },
    }),
    unstyled: {},
  },

  sizes: {
    sm: {
      tab: {
        py: 1,
        px: 3,
        fontSize: "sm",
      },
    },
    md: {
      tab: {
        fontSize: "md",
        py: 2,
        px: 4,
      },
    },
    lg: {
      tab: {
        fontSize: "lg",
        py: 3,
        px: 5,
      },
    },
  },

  defaultProps: {
    size: "md",
    variant: "line",
    colorScheme: "primary",
  },
}
