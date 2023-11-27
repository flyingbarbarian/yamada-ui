import type { ComponentMultiStyle } from "@yamada-ui/core"
import { mode } from "@yamada-ui/core"
import { getColor, isArray } from "@yamada-ui/utils"

export const DatePicker: ComponentMultiStyle = {
  baseStyle: {
    container: {},
    field: {
      cursor: "pointer",
      width: "100%",
      minWidth: 0,
      outline: 0,
      position: "relative",
      appearance: "none",
      pb: "1px",
      lineHeight: "normal",
      bg: ["white", "gray.700"],
      transitionProperty: "common",
      transitionDuration: "normal",
      _focus: {
        zIndex: "unset",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _placeholder: {
        color: "gray.500",
      },
      _dark: {
        _placeholder: {
          color: "whiteAlpha.400",
        },
      },
      _readOnly: {
        pointerEvents: "none",
        _placeholder: {
          color: "inherit !important",
        },
      },
    },
    icon: {
      width: "6",
      py: "2",
      color: ["blackAlpha.600", "whiteAlpha.600"],
      fontSize: "xl",
      outline: 0,
      rounded: "md",
      _disabled: {
        opacity: 0.5,
      },
    },
    clearIcon: {
      transitionProperty: "common",
      transitionDuration: "normal",
      pointerEvents: "auto",
      _hover: {
        opacity: 0.8,
      },
      _disabled: {
        pointerEvents: "none",
        opacity: 0.4,
      },
      _focusVisible: {
        boxShadow: "outline",
      },
    },
    popover: {
      rounded: "md",
      p: "2",
      bg: ["white", "black"],
      border: "1px solid",
      borderColor: "inherit",
      color: "inherit",
      boxShadow: ["sm", "dark-lg"],
      zIndex: "yamcha",
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
          _active: {
            borderColor: focusBorderColor,
            boxShadow: `0 0 0 1px ${focusBorderColor}`,
          },
          _invalid: {
            borderColor: errorBorderColor,
            boxShadow: `0 0 0 1px ${errorBorderColor}`,
          },
          _focusVisible: {
            borderColor: focusBorderColor,
            boxShadow: `0 0 0 1px ${focusBorderColor}`,
          },
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
          _active: {
            bg: "transparent",
            borderColor: focusBorderColor,
          },
          _invalid: {
            borderColor: errorBorderColor,
          },
          _focusVisible: {
            bg: "transparent",
            borderColor: focusBorderColor,
          },
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
          _active: {
            borderColor: focusBorderColor,
            boxShadow: `0px 1px 0px 0px ${focusBorderColor}`,
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
      }
    },
    unstyled: {
      field: {
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
        pl: "2",
        pr: "8",
        minH: "6",
        rounded: "sm",
      },
      icon: {
        pt: "2",
        fontSize: "md",
        insetEnd: "1",
      },
    },
    sm: {
      field: {
        fontSize: "sm",
        pl: "2",
        pr: "8",
        minH: "8",
        rounded: "md",
      },
      icon: {
        insetEnd: "2",
      },
    },
    md: {
      field: {
        fontSize: "md",
        pl: "3",
        pr: "8",
        minH: "10",
        rounded: "md",
      },
      icon: {
        insetEnd: "2",
      },
    },
    lg: {
      field: {
        fontSize: "lg",
        pl: "4",
        pr: "8",
        minH: "12",
        rounded: "md",
      },
      icon: {
        insetEnd: "2",
      },
    },
  },

  defaultProps: {
    size: "md",
    variant: "outline",
  },
}
