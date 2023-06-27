import { ComponentArgs, ThemeProps } from '@yamada-ui/core'
import { FormControlOptions, useFormControl } from '@yamada-ui/form-control'
import { Flex, FlexProps } from '@yamada-ui/layouts'
import { useControllableState } from '@yamada-ui/use-controllable-state'
import {
  createContext,
  cx,
  isObject,
  omitObject,
  useCallbackRef,
  PropGetter,
  DOMAttributes,
} from '@yamada-ui/utils'
import { ChangeEvent, ForwardedRef, forwardRef, Ref, useCallback } from 'react'

const isEvent = (value: any): value is { target: HTMLInputElement } =>
  value && isObject(value) && isObject(value.target)

export type UseCheckboxGroupProps<Y extends string | number = string> = {
  value?: Y[]
  defaultValue?: Y[]
  onChange?: (value: Y[]) => void
  isNative?: boolean
}

export const useCheckboxGroup = <Y extends string | number = string>({
  isNative,
  ...props
}: UseCheckboxGroupProps<Y>) => {
  props.onChange = useCallbackRef(props.onChange)

  const [value, setValue] = useControllableState({
    value: props.value,
    defaultValue: props.defaultValue || [],
    onChange: props.onChange,
  })

  const onChange = useCallback(
    (evOrValue: ChangeEvent<HTMLInputElement> | Y) => {
      const isChecked = isEvent(evOrValue) ? evOrValue.target.checked : !value.includes(evOrValue)

      const selectedValue = (isEvent(evOrValue) ? evOrValue.target.value : evOrValue) as Y

      const nextValue = isChecked
        ? [...value, selectedValue]
        : value.filter((v) => String(v) !== String(selectedValue))

      setValue(nextValue)
    },
    [value, setValue],
  )

  const getCheckboxProps: PropGetter<
    DOMAttributes<HTMLInputElement> & { isChecked?: boolean },
    Omit<DOMAttributes<HTMLInputElement>, 'onChange'> & {
      onChange: (ev: ChangeEvent<HTMLInputElement> | Y) => void
    }
  > = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      [isNative ? 'checked' : 'isChecked']: value.some(
        (val) => String(props.value) === String(val),
      ),
      onChange,
    }),
    [onChange, isNative, value],
  )

  return { value, setValue, onChange, getCheckboxProps }
}

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>

export type CheckboxGroupProps<Y extends string | number = string> = ThemeProps<'Checkbox'> &
  Omit<FlexProps, 'onChange'> &
  UseCheckboxGroupProps<Y> &
  FormControlOptions

type CheckboxContext = ThemeProps<'Checkbox'> &
  FormControlOptions & {
    value: (string | number)[]
    onChange: (evOrValue: ChangeEvent<HTMLInputElement> | string | number) => void
  }

const [CheckboxGroupProvider, useCheckboxGroupContext] = createContext<CheckboxContext | undefined>(
  {
    strict: false,
    name: 'CheckboxGroupContext',
  },
)

export { useCheckboxGroupContext }

export const CheckboxGroup = forwardRef(
  <Y extends string | number = string>(
    {
      className,
      size,
      variant,
      colorScheme,
      children,
      direction = 'column',
      gap,
      ...props
    }: CheckboxGroupProps<Y>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { value, onChange } = useCheckboxGroup<Y>(props)
    const { isRequired, isReadOnly, isDisabled, isInvalid } = useFormControl(props)

    return (
      <CheckboxGroupProvider
        value={
          {
            size,
            variant,
            colorScheme,
            isRequired,
            isReadOnly,
            isDisabled,
            isInvalid,
            value,
            onChange,
          } as CheckboxContext
        }
      >
        <Flex
          ref={ref}
          className={cx('ui-checkbox-group', className)}
          role='group'
          direction={direction}
          gap={gap ?? (direction === 'row' ? '1rem' : undefined)}
          {...omitObject(props, [
            'value',
            'defaultValue',
            'onChange',
            'isInvalid',
            'isDisabled',
            'isRequired',
            'isReadOnly',
          ])}
        >
          {children}
        </Flex>
      </CheckboxGroupProvider>
    )
  },
) as {
  <Y extends string | number = string>(
    props: CheckboxGroupProps<Y> & { ref?: Ref<HTMLDivElement> },
  ): JSX.Element
} & ComponentArgs

CheckboxGroup.displayName = 'CheckboxGroup'
