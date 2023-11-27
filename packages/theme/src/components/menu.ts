import type { ComponentStyle } from "@yamada-ui/core"
import { transparentizeColor } from "@yamada-ui/utils"

export const Menu: ComponentStyle = {
  baseStyle: ({ theme: t, colorMode: m }) => ({
    button: {
      transitionProperty: "common",
      transitionDuration: "normal",
    },
    list: {
      rounded: "md",
      minW: "xs",
      py: "2",
      bg: ["white", "black"],
      border: "1px solid",
      borderColor: "inherit",
      color: "inherit",
      boxShadow: ["sm", "dark-lg"],
      zIndex: "yamcha",
    },
    item: {
      py: "1.5",
      px: "3",
      transitionProperty: "background",
      transitionDuration: "ultra-fast",
      transitionTimingFunction: "ease-in",
      _focus: {
        bg: [transparentizeColor(`gray.200`, 0.56)(t, m), "whiteAlpha.100"],
      },
      _hover: {
        bg: ["gray.200", "whiteAlpha.50"],
      },
      _active: {
        bg: [transparentizeColor(`gray.300`, 0.64)(t, m), "whiteAlpha.200"],
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
    icon: {},
    command: {
      opacity: 0.6,
    },
    divider: {
      my: "2",
      borderBottomWidth: "1px",
      borderColor: "inherit",
    },
    group: {},
    groupTitle: {
      py: "1.5",
      px: "3",
      fontSize: "sm",
      fontWeight: "semibold",
      color: ["blackAlpha.600", "whiteAlpha.600"],
    },
  }),
}
