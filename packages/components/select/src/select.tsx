import {
  ui,
  forwardRef,
  useMultiComponentStyle,
  omitThemeProps,
  CSSUIObject,
  HTMLUIProps,
  ThemeProps,
} from '@yamada-ui/core'
import { Popover, PopoverTrigger } from '@yamada-ui/popover'
import { cx, getValidChildren, isArray } from '@yamada-ui/utils'
import { ReactElement } from 'react'
import { SelectIcon, SelectIconProps } from './select-icon'
import { SelectList, SelectListProps } from './select-list'
import {
  useSelect,
  UseSelectProps,
  SelectDescendantsContextProvider,
  SelectProvider,
  useSelectContext,
} from './use-select'
import { OptionGroup, Option, OptionProps } from './'

export type UIOption = Omit<OptionProps, 'value' | 'children'> & {
  label?: string
  value?: string | UIOption[]
}

type SelectOptions = {
  options?: UIOption[]
  focusBorderColor?: string
  errorBorderColor?: string
  containerProps?: Omit<HTMLUIProps<'div'>, 'children'>
  listProps?: Omit<SelectListProps, 'children'>
  iconProps?: SelectIconProps
}

export type SelectProps = ThemeProps<'Select'> &
  Omit<UseSelectProps<string>, 'isEmpty' | 'maxSelectedValues' | 'omitSelectedValues'> &
  SelectOptions

export const Select = forwardRef<SelectProps, 'div'>((props, ref) => {
  const [styles, mergedProps] = useMultiComponentStyle('Select', props)
  let {
    className,
    placeholder,
    defaultValue = '',
    placeholderInOptions = true,
    options = [],
    color,
    h,
    height,
    minH,
    minHeight,
    containerProps,
    listProps,
    iconProps,
    children,
    ...computedProps
  } = omitThemeProps(mergedProps)

  const validChildren = getValidChildren(children)
  let computedChildren: ReactElement[] = []

  if (!validChildren.length && options.length) {
    computedChildren = options.map(({ label, value, ...props }, i) => {
      if (!isArray(value)) {
        return (
          <Option key={i} value={value} {...props}>
            {label}
          </Option>
        )
      } else {
        return (
          <OptionGroup key={i} label={label ?? ''} {...(props as HTMLUIProps<'ul'>)}>
            {value.map(({ label, value, ...props }, i) =>
              !isArray(value) ? (
                <Option key={i} value={value} {...props}>
                  {label}
                </Option>
              ) : null,
            )}
          </OptionGroup>
        )
      }
    })
  }

  const isEmpty =
    !validChildren.length && !computedChildren.length && !(!!placeholder && placeholderInOptions)

  const {
    descendants,
    formControlProps,
    getPopoverProps,
    getContainerProps,
    getFieldProps,
    ...rest
  } = useSelect({ ...computedProps, placeholder, placeholderInOptions, defaultValue, isEmpty })

  h = h ?? height
  minH = minH ?? minHeight

  const css: CSSUIObject = {
    position: 'relative',
    w: '100%',
    h: 'fit-content',
    color,
    ...styles.containerProps,
  }

  return (
    <SelectDescendantsContextProvider value={descendants}>
      <SelectProvider value={{ ...rest, placeholder, placeholderInOptions, styles }}>
        <Popover {...getPopoverProps()}>
          <ui.div className='ui-select' __css={css} {...getContainerProps(containerProps)}>
            <PopoverTrigger>
              <SelectField h={h} minH={minH} {...getFieldProps({}, ref)} />
            </PopoverTrigger>

            <SelectIcon {...iconProps} {...formControlProps} />

            {!isEmpty ? (
              <SelectList {...listProps}>
                {!!placeholder && placeholderInOptions ? <Option>{placeholder}</Option> : null}

                {children ?? computedChildren}
              </SelectList>
            ) : null}
          </ui.div>
        </Popover>
      </SelectProvider>
    </SelectDescendantsContextProvider>
  )
})

type SelectFieldProps = HTMLUIProps<'div'>

const SelectField = forwardRef<SelectFieldProps, 'div'>(
  ({ className, isTruncated = true, noOfLines, h, minH, ...rest }, ref) => {
    const { displayValue, placeholder, styles } = useSelectContext()

    const css: CSSUIObject = {
      paddingEnd: '2rem',
      h,
      minH,
      display: 'flex',
      alignItems: 'center',
      ...styles.field,
    }

    return (
      <ui.div ref={ref} className={cx('ui-select-field', className)} __css={css} {...rest}>
        <ui.span isTruncated={isTruncated} noOfLines={noOfLines}>
          {displayValue ?? placeholder}
        </ui.span>
      </ui.div>
    )
  },
)
