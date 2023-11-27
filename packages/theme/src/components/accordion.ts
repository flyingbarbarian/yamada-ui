import type { ComponentMultiStyle } from "@yamada-ui/core"

export const Accordion: ComponentMultiStyle = {
  baseStyle: {
    container: {},
    item: {},
    button: {
      transitionProperty: "common",
      transitionDuration: "normal",
      _focusVisible: {
        boxShadow: "outline",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      py: "3",
      px: "4",
    },
    panel: {
      px: "4",
      pb: "3",
    },
    icon: {
      ml: "auto",
      fontSize: "1.25em",
    },
  },

  variants: {
    basic: {
      item: {
        borderTopWidth: "1px",
        borderColor: "inherit",
        _last: {
          borderBottomWidth: "1px",
        },
      },
      button: {
        _hover: {
          bg: "blackAlpha.50",
          _disabled: {
            bg: "none",
          },
        },
      },
    },
    card: {
      item: {
        borderWidth: "1px",
        rounded: "md",
        bg: ["blackAlpha.50", "whiteAlpha.50"],
        _expanded: {
          bg: ["white", "black"],
        },
        _notFirst: {
          mt: "md",
        },
      },
      button: {
        _hover: {
          bg: "blackAlpha.50",
          _expanded: {
            bg: "none",
          },
          _disabled: {
            bg: "none",
          },
        },
      },
    },
    unstyled: {},
  },

  defaultProps: {
    variant: "basic",
  },
}
