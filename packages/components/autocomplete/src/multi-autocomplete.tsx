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
import { cx, handlerAll } from '@yamada-ui/utils'
import { cloneElement, CSSProperties, FC, MouseEventHandler, ReactElement, useMemo } from 'react'
import { AutocompleteClearIcon, AutocompleteIcon, AutocompleteIconProps } from './autocomplete-icon'
import { AutocompleteList, AutocompleteListProps } from './autocomplete-list'
import {
  AutocompleteProvider,
  useAutocomplete,
  UseAutocompleteProps,
  AutocompleteDescendantsContextProvider,
  useAutocompleteContext,
  useAutocompleteInput,
} from './use-autocomplete'
import { AutocompleteCreate, AutocompleteEmpty } from './'

type MultiAutocompleteOptions = {
  separator?: string
  component?: FC<{
    value: string | number
    displayValue: string
    index: number
    onRemove: MouseEventHandler<HTMLElement>
  }>
  keepPlaceholder?: boolean
  isClearable?: boolean
  focusBorderColor?: string
  errorBorderColor?: string
  containerProps?: Omit<HTMLUIProps<'div'>, 'children'>
  listProps?: Omit<AutocompleteListProps, 'children'>
  inputProps?: HTMLUIProps<'input'>
  iconProps?: AutocompleteIconProps
  clearIconProps?: AutocompleteIconProps
}

export type MultiAutocompleteProps = ThemeProps<'Select'> &
  UseAutocompleteProps<string[]> &
  MultiAutocompleteOptions

export const MultiAutocomplete = forwardRef<MultiAutocompleteProps, 'div'>((props, ref) => {
  const [styles, mergedProps] = useMultiComponentStyle('Select', props)
  let {
    className,
    defaultValue = [],
    component,
    separator,
    isClearable = true,
    color,
    h,
    height,
    minH,
    minHeight,
    closeOnSelect = false,
    keepPlaceholder = false,
    containerProps,
    listProps,
    inputProps,
    iconProps,
    clearIconProps,
    children,
    ...computedProps
  } = omitThemeProps(mergedProps)

  const {
    value,
    descendants,
    formControlProps,
    getPopoverProps,
    getContainerProps,
    getFieldProps,
    createOption,
    isEmpty,
    inputValue,
    computedChildren,
    onClear,
    ...rest
  } = useAutocomplete<string[]>({
    ...computedProps,
    defaultValue,
    closeOnSelect,
    children,
  })

  h = h ?? height
  minH = minH ?? minHeight

  const css: CSSUIObject = {
    position: 'relative',
    w: '100%',
    h: 'fit-content',
    color,
    ...styles.container,
  }

  return (
    <AutocompleteDescendantsContextProvider value={descendants}>
      <AutocompleteProvider
        value={{
          ...rest,
          value,
          formControlProps,
          inputValue,
          createOption,
          isEmpty,
          styles,
        }}
      >
        <Popover {...getPopoverProps()}>
          <ui.div className='ui-autocomplete' __css={css} {...getContainerProps(containerProps)}>
            <MultiAutocompleteField
              component={component}
              separator={separator}
              keepPlaceholder={keepPlaceholder}
              h={h}
              minH={minH}
              inputProps={inputProps}
              {...getFieldProps({}, ref)}
            />

            {isClearable && value.length ? (
              <AutocompleteClearIcon
                {...clearIconProps}
                onClick={handlerAll(clearIconProps?.onClick, onClear)}
                {...formControlProps}
              />
            ) : (
              <AutocompleteIcon {...iconProps} {...formControlProps} />
            )}

            {!isEmpty ? (
              <AutocompleteList {...listProps}>
                {createOption ? <AutocompleteCreate /> : <AutocompleteEmpty />}

                {children ?? computedChildren}
              </AutocompleteList>
            ) : (
              <AutocompleteList {...listProps}>
                {createOption && inputValue ? <AutocompleteCreate /> : <AutocompleteEmpty />}
              </AutocompleteList>
            )}
          </ui.div>
        </Popover>
      </AutocompleteProvider>
    </AutocompleteDescendantsContextProvider>
  )
})

type MultiAutocompleteFieldProps = HTMLUIProps<'div'> &
  Pick<MultiAutocompleteProps, 'component' | 'separator' | 'keepPlaceholder' | 'inputProps'>

const MultiAutocompleteField = forwardRef<MultiAutocompleteFieldProps, 'div'>(
  (
    {
      className,
      component,
      separator = ',',
      keepPlaceholder,
      h,
      minH,
      placeholder,
      inputProps,
      ...rest
    },
    ref,
  ) => {
    const { value, displayValue, inputValue, onChange, isOpen, inputRef, styles } =
      useAutocompleteContext()

    const { getInputProps } = useAutocompleteInput()

    const cloneChildren = useMemo(() => {
      if (!displayValue?.length) return null

      if (component) {
        return (displayValue as string[]).map((displayValue, index) => {
          const onRemove: MouseEventHandler<HTMLElement> = (e) => {
            e.stopPropagation()

            onChange(value[index])

            if (inputRef.current) inputRef.current.focus()
          }

          const el = component({
            value: value[index],
            displayValue,
            index,
            onRemove,
          })

          const style: CSSProperties = {
            cursor: 'default',
            marginBlockStart: '0.125rem',
            marginBlockEnd: '0.125rem',
            marginInlineEnd: '0.25rem',
          }

          return el ? cloneElement(el as ReactElement, { style }) : null
        })
      } else {
        return (displayValue as string[]).map((value, index) => {
          const isLast = displayValue.length === index + 1

          return (
            <ui.span key={index} display='inline-block' me='0.25rem'>
              {value}
              {!isLast || isOpen ? separator : null}
            </ui.span>
          )
        })
      }
    }, [displayValue, component, value, onChange, isOpen, inputRef, separator])

    const css: CSSUIObject = {
      paddingEnd: '2rem',
      h,
      minH,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      ...styles.field,
      cursor: 'text',
    }

    return (
      <PopoverTrigger>
        <ui.div
          className={cx('ui-autocomplete-field', className)}
          __css={css}
          py={displayValue?.length && component ? '0.125rem' : undefined}
          {...rest}
        >
          {cloneChildren}

          <ui.input
            className='ui-autocomplete-input'
            display='inline-block'
            flex='1'
            overflow='hidden'
            marginBlockStart='0.125rem'
            marginBlockEnd='0.125rem'
            placeholder={!displayValue || (keepPlaceholder && isOpen) ? placeholder : undefined}
            {...getInputProps({ ...inputProps, value: inputValue ?? '' }, ref)}
          />
        </ui.div>
      </PopoverTrigger>
    )
  },
)
