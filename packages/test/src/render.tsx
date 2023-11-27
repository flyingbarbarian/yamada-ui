import type { RenderOptions } from "@testing-library/react"
import { render as reactRender } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UIProvider } from "@yamada-ui/providers"
import theme from "@yamada-ui/theme"
import { toHaveNoViolations } from "jest-axe"
import type { ReactElement } from "react"
import "@testing-library/jest-dom"

expect.extend(toHaveNoViolations)

export type RenderProps = RenderOptions & {
  withProvider?: boolean
}

export type RenderReturn = ReturnType<typeof reactRender> & {
  user: ReturnType<typeof userEvent.setup>
}

export const render = (
  ui: ReactElement,
  { withProvider, ...rest }: RenderProps = {
    withProvider: true,
  },
): RenderReturn => {
  const user = userEvent.setup()

  if (withProvider)
    rest.wrapper = (props: any) => <UIProvider {...props} theme={theme} />

  const result = reactRender(ui, rest)

  return { user, ...result }
}
