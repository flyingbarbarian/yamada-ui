import type { ComponentMultiStyle } from "@yamada-ui/core"

export const Checkbox: ComponentMultiStyle = {
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
      color: "white",
      _checked: {
        bg: [`${c}.500`, `${c}.200`],
        borderColor: [`${c}.500`, `${c}.200`],
        color: ["white", "gray.900"],
        _hover: {
          bg: [`${c}.600`, `${c}.300`],
          borderColor: [`${c}.600`, `${c}.300`],
        },
        _disabled: {
          borderColor: ["gray.200", "transparent"],
          bg: ["gray.200", "whiteAlpha.300"],
          color: ["gray.500", "whiteAlpha.500"],
        },
      },
      _indeterminate: {
        bg: [`${c}.500`, `${c}.200`],
        borderColor: [`${c}.500`, `${c}.200`],
        color: ["white", "gray.900"],
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
      icon: { boxSize: "3.5", rounded: "base", fontSize: "2xs" },
      label: { fontSize: "sm" },
    },
    md: {
      icon: { boxSize: "4", rounded: "base", fontSize: "2xs" },
      label: { fontSize: "md" },
    },
    lg: {
      icon: { boxSize: "5", rounded: "base", fontSize: "sm" },
      label: { fontSize: "lg" },
    },
  },

  defaultProps: {
    size: "md",
    colorScheme: "primary",
  },
}
