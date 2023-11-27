import type { HTMLUIProps, CSSUIObject } from "@yamada-ui/core"
import { ui, forwardRef } from "@yamada-ui/core"
import { cx } from "@yamada-ui/utils"
import { useMenu } from "./menu"

export type MenuGroupProps = HTMLUIProps<"div">

export const MenuGroup = forwardRef<MenuGroupProps, "div">(
  ({ className, title, children, ...rest }, ref) => {
    const { styles } = useMenu()

    const css: CSSUIObject = { ...styles.group }

    return (
      <ui.div
        ref={ref}
        className={cx("ui-menu__item--group", className)}
        role="group"
        __css={css}
        {...rest}
      >
        {title ? (
          <ui.span
            className={cx("ui-menu__item--group-title")}
            __css={styles.groupTitle}
          >
            {title}
          </ui.span>
        ) : null}

        {children}
      </ui.div>
    )
  },
)
