import type { ComponentStyle } from "@yamada-ui/core"

export const Radio: ComponentStyle = {
  baseStyle: {
    container: {
      _readOnly: { cursor: "auto" },
      _disabled: { cursor: "not-allowed" },
    },
    icon: ({ colorScheme: c = "primary" }) => ({
      transitionProperty: "box-shadow",
      transitionDuration: "normal",
      border: "2px solid",
      borderColor: "inherit",
      rounded: "full",
      color: "white",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      _checked: {
        _before: {
          content: `""`,
          display: "inline-block",
          rounded: "full",
          bg: [`${c}.500`, `${c}.200`],
        },
        _hover: {
          _before: {
            bg: [`${c}.600`, `${c}.300`],
          },
        },
        _disabled: {
          borderColor: ["gray.200", "transparent"],
          _before: {
            bg: "gray.200",
          },
          _dark: {
            _before: {
              bg: "whiteAlpha.300",
            },
          },
        },
      },
      _disabled: {
        bg: ["gray.100", "whiteAlpha.100"],
        borderColor: ["gray.100", "transparent"],
      },
      _focusVisible: {
        boxShadow: "outline",
      },
      _invalid: {
        borderColor: ["red.500", "red.300"],
      },
    }),
    label: {
      userSelect: "none",
      _disabled: { opacity: 0.4 },
    },
  },

  sizes: {
    sm: {
      icon: {
        boxSize: "3.5",
        _before: {
          boxSize: "1.5",
        },
      },
      label: { fontSize: "sm" },
    },
    md: {
      icon: {
        boxSize: "4",
        _before: {
          boxSize: "2",
        },
      },
      label: { fontSize: "md" },
    },
    lg: {
      icon: {
        boxSize: "5",
        _before: {
          boxSize: "3",
        },
      },
      label: { fontSize: "lg" },
    },
  },

  defaultProps: {
    size: "md",
    colorScheme: "primary",
  },
}
