import type { ComponentMultiStyle, UIMultiStyle } from "@yamada-ui/core"
import { transparentizeColor, isGray } from "@yamada-ui/utils"

export const NativeTable: ComponentMultiStyle = {
  baseStyle: {
    container: {
      w: "100%",
    },
    table: {
      h: "100%",
      w: "100%",
      fontVariantNumeric: "lining-nums tabular-nums",
      borderCollapse: "collapse",
    },
    tr: {
      _disabled: {
        cursor: "not-allowed",
        opacity: 0.4,
        _hover: {
          bg: ["initial", "initial"],
        },
      },
    },
    th: {
      fontFamily: "heading",
      fontWeight: "bold",
      textAlign: "start",
      textTransform: "uppercase",
      letterSpacing: "wider",
    },
    td: {
      textAlign: "start",
    },
    caption: {
      fontFamily: "heading",
      fontWeight: "medium",
      textAlign: "center",
    },
  },

  variants: {
    simple: (({
      theme: t,
      colorMode: m,
      colorScheme: c = "gray",
      withBorder,
      withColumnBorders,
      highlightOnSelected,
      highlightOnHover,
    }) => ({
      table: {
        ...(withBorder ? { borderWidth: "1px" } : {}),
      },
      th: {
        color: ["gray.600", "gray.400"],
        borderBottomWidth: "1px",

        "&[data-is-numeric=true]": {
          textAlign: "end",
        },
        ...(withColumnBorders ? { _notLast: { borderRightWidth: "1px" } } : {}),
      },
      td: {
        borderBottomWidth: "1px",

        "&[data-is-numeric=true]": {
          textAlign: "end",
        },
        ...(withColumnBorders ? { _notLast: { borderRightWidth: "1px" } } : {}),
      },
      caption: {
        color: ["gray.600", "gray.100"],
      },
      tbody: {
        tr: {
          ...(highlightOnSelected
            ? {
                _selected: {
                  bg: isGray(c)
                    ? [`${c}.100`, `whiteAlpha.50`]
                    : [
                        transparentizeColor(`${c}.400`, 0.08)(t, m),
                        transparentizeColor(`${c}.200`, 0.04)(t, m),
                      ],
                },
              }
            : {}),
          ...(highlightOnHover
            ? {
                cursor: "pointer",
                transitionProperty: "common",
                transitionDuration: "slow",
                _hover: {
                  bg: isGray(c)
                    ? [
                        transparentizeColor(`${c}.200`, 0.8)(t, m),
                        `whiteAlpha.200`,
                      ]
                    : [
                        transparentizeColor(`${c}.300`, 0.24)(t, m),
                        transparentizeColor(`${c}.200`, 0.16)(t, m),
                      ],
                },
              }
            : {}),
        },
      },
      tfoot: {
        tr: {
          _last: {
            th: { borderBottomWidth: 0 },
          },
        },
      },
    })) as UIMultiStyle,
    striped: (({
      theme: t,
      colorMode: m,
      colorScheme: c = "gray",
      withBorder,
      withColumnBorders,
      highlightOnHover,
    }) => ({
      table: {
        ...(withBorder ? { borderWidth: "1px" } : {}),
      },
      th: {
        color: ["gray.600", "gray.400"],
        borderBottomWidth: "1px",

        "&[data-is-numeric=true]": {
          textAlign: "end",
        },
        ...(withColumnBorders ? { _notLast: { borderRightWidth: "1px" } } : {}),
      },
      td: {
        borderBottomWidth: "1px",

        "&[data-is-numeric=true]": {
          textAlign: "end",
        },
        ...(withColumnBorders ? { _notLast: { borderRightWidth: "1px" } } : {}),
      },
      caption: {
        color: ["gray.600", "gray.100"],
      },
      tbody: {
        tr: {
          _odd: {
            bg: isGray(c)
              ? [`${c}.100`, `whiteAlpha.50`]
              : [
                  transparentizeColor(`${c}.400`, 0.08)(t, m),
                  transparentizeColor(`${c}.200`, 0.04)(t, m),
                ],
          },
          ...(highlightOnHover
            ? {
                cursor: "pointer",
                transitionProperty: "common",
                transitionDuration: "slow",
                _hover: {
                  bg: isGray(c)
                    ? [
                        transparentizeColor(`${c}.200`, 0.8)(t, m),
                        `whiteAlpha.200`,
                      ]
                    : [
                        transparentizeColor(`${c}.300`, 0.24)(t, m),
                        transparentizeColor(`${c}.200`, 0.16)(t, m),
                      ],
                },
              }
            : {}),
        },
      },
      tfoot: {
        tr: {
          _last: {
            th: { borderBottomWidth: 0 },
          },
        },
      },
    })) as UIMultiStyle,
    unstyled: {},
  },

  sizes: {
    sm: {
      container: {
        gap: 2,
      },
      th: {
        px: 2,
        py: 1,
        fontSize: "xs",
        lineHeight: 5,
      },
      td: {
        px: 2,
        py: 1,
        fontSize: "xs",
        lineHeight: 5,
      },
      caption: {
        mt: 1,
        px: 2,
        py: 1,
        fontSize: "xs",
      },
    },
    md: {
      container: {
        gap: 4,
      },
      th: {
        px: 3,
        py: 2,
        fontSize: "sm",
        lineHeight: 5,
      },
      td: {
        px: 3,
        py: 2,
        fontSize: "sm",
        lineHeight: 5,
      },
      caption: {
        mt: 2,
        px: 3,
        py: 2,
        fontSize: "sm",
      },
    },
    lg: {
      container: {
        gap: 6,
      },
      th: {
        px: 4,
        py: 3,
        lineHeight: 6,
      },
      td: {
        px: 4,
        py: 3,
        lineHeight: 6,
      },
      caption: {
        mt: 3,
        px: 4,
        py: 3,
      },
    },
    xl: {
      container: {
        gap: 8,
      },
      th: {
        px: 6,
        py: 4,
        fontSize: "lg",
        lineHeight: 6,
      },
      td: {
        px: 6,
        py: 4,
        fontSize: "lg",
        lineHeight: 6,
      },
      caption: {
        mt: 4,
        px: 6,
        py: 4,
        fontSize: "lg",
      },
    },
  },

  defaultProps: {
    variant: "simple",
    size: "md",
    colorScheme: "gray",
  },
}
