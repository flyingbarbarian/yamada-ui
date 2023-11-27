import type { ComponentMultiStyle } from "@yamada-ui/core"
import { mergeStyle } from "@yamada-ui/core"
import { DatePicker } from "./date-picker"

export const MonthPicker: ComponentMultiStyle = mergeStyle(DatePicker, {})
