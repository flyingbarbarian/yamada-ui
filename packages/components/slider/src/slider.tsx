import {
  ui,
  forwardRef,
  useMultiComponentStyle,
  omitThemeProps,
  CSSUIObject,
  HTMLUIProps,
  ThemeProps,
  UIProps,
} from '@yamada-ui/core'
import {
  FormControlOptions,
  useFormControlProps,
  formControlProperties,
} from '@yamada-ui/form-control'
import { useControllableState } from '@yamada-ui/use-controllable-state'
import { useLatestRef } from '@yamada-ui/use-latest-ref'
import { usePanEvent } from '@yamada-ui/use-pan-event'
import { useSize } from '@yamada-ui/use-size'
import {
  createContext,
  cx,
  omitObject,
  pickObject,
  PropGetter,
  useCallbackRef,
  valueToPercent,
  clampNumber,
  roundNumberToStep,
  useUpdateEffect,
  mergeRefs,
  dataAttr,
  handlerAll,
  RequiredPropGetter,
  percentToValue,
  getValidChildren,
  findChildren,
  isEmpty,
  omitChildren,
  includesChildren,
} from '@yamada-ui/utils'
import { CSSProperties, KeyboardEvent, useCallback, useRef, useState } from 'react'

export type UseSliderProps = FormControlOptions & {
  id?: string
  name?: string
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  orientation?: 'horizontal' | 'vertical'
  isReversed?: boolean
  focusThumbOnChange?: boolean
  onChangeStart?: (value: number) => void
  onChangeEnd?: (value: number) => void
  onChange?: (value: number) => void
}

export const useSlider = (props: UseSliderProps) => {
  const {
    id,
    name,
    min = 0,
    max = 100,
    step = 1,
    defaultValue,
    orientation = 'horizontal',
    isReversed,
    focusThumbOnChange = true,
    required,
    disabled,
    readOnly,
    onChange,
    ...rest
  } = useFormControlProps(props)

  if (max < min) throw new Error("Do not assign a number less than 'min' to 'max'")

  const onChangeStart = useCallbackRef(rest.onChangeStart)
  const onChangeEnd = useCallbackRef(rest.onChangeEnd)

  const [computedValue, setValue] = useControllableState({
    value: rest.value,
    defaultValue: defaultValue ?? min + (max - min) / 2,
    onChange,
  })

  const [isDragging, setDragging] = useState(false)
  const [isFocused, setFocused] = useState(false)
  const isInteractive = !(disabled || readOnly)

  const tenStep = (max - min) / 10
  const oneStep = step || (max - min) / 100

  const value = clampNumber(computedValue, min, max)
  const reversedValue = max - value + min
  const thumbValue = isReversed ? reversedValue : value
  const thumbPercent = valueToPercent(thumbValue, min, max)

  const isVertical = orientation === 'vertical'

  const latestRef = useLatestRef({
    min,
    max,
    step,
    value,
    isInteractive,
    eventSource: null as 'pointer' | 'keyboard' | null,
    focusThumbOnChange,
  })

  const containerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLElement>(null)
  const thumbRef = useRef<HTMLElement>(null)

  const thumbSize = useSize(thumbRef)

  usePanEvent(containerRef, {
    onSessionStart: (ev) => {
      const { isInteractive, value } = latestRef.current

      if (!isInteractive) return

      setDragging(true)
      focusThumb()
      setValueFromPointer(ev)
      onChangeStart(value)
    },
    onSessionEnd: () => {
      const { isInteractive, value } = latestRef.current

      if (!isInteractive) return

      setDragging(false)
      onChangeEnd(value)
    },
    onMove: (ev) => {
      const { isInteractive } = latestRef.current

      if (!isInteractive) return

      setValueFromPointer(ev)
    },
  })

  const getValueFromPointer = useCallback(
    (ev: any) => {
      if (!trackRef.current) return

      const { min, max, step } = latestRef.current

      latestRef.current.eventSource = 'pointer'

      const { bottom, left, height, width } = trackRef.current.getBoundingClientRect()
      const { clientX, clientY } = ev.touches?.[0] ?? ev

      const diff = isVertical ? bottom - clientY : clientX - left

      const length = isVertical ? height : width

      let percent = diff / length

      if (isReversed) percent = 1 - percent

      let nextValue = percentToValue(percent, min, max)

      if (step) nextValue = parseFloat(roundNumberToStep(nextValue, min, step))

      nextValue = clampNumber(nextValue, min, max)

      return nextValue
    },
    [isVertical, isReversed, latestRef],
  )

  const setValueFromPointer = (ev: MouseEvent | TouchEvent | PointerEvent) => {
    const { value } = latestRef.current
    const nextValue = getValueFromPointer(ev)

    if (nextValue != null && nextValue !== value) setValue(nextValue)
  }

  const focusThumb = useCallback(() => {
    const { focusThumbOnChange } = latestRef.current

    if (focusThumbOnChange) setTimeout(() => thumbRef.current?.focus())
  }, [latestRef])

  const constrain = useCallback(
    (value: number) => {
      const { isInteractive, min, max } = latestRef.current

      if (!isInteractive) return

      value = parseFloat(roundNumberToStep(value, min, oneStep))
      value = clampNumber(value, min, max)

      setValue(value)
    },
    [oneStep, setValue, latestRef],
  )

  const stepUp = useCallback(
    (step = oneStep) => constrain(isReversed ? value - step : value + step),
    [constrain, isReversed, oneStep, value],
  )

  const stepDown = useCallback(
    (step = oneStep) => constrain(isReversed ? value + step : value - step),
    [constrain, isReversed, oneStep, value],
  )

  const reset = useCallback(() => constrain(defaultValue || 0), [constrain, defaultValue])

  const stepTo = useCallback((value: number) => constrain(value), [constrain])

  const onKeyDown = useCallback(
    (ev: KeyboardEvent<HTMLElement>) => {
      const { min, max } = latestRef.current

      const actions: Record<string, React.KeyboardEventHandler> = {
        ArrowRight: () => stepUp(),
        ArrowUp: () => stepUp(),
        ArrowLeft: () => stepDown(),
        ArrowDown: () => stepDown(),
        PageUp: () => stepUp(tenStep),
        PageDown: () => stepDown(tenStep),
        Home: () => constrain(min),
        End: () => constrain(max),
      }

      const action = actions[ev.key]

      if (!action) return

      ev.preventDefault()
      ev.stopPropagation()

      action(ev)

      latestRef.current.eventSource = 'keyboard'
    },
    [constrain, latestRef, stepDown, stepUp, tenStep],
  )

  useUpdateEffect(() => {
    const { eventSource, value } = latestRef.current

    focusThumb()

    if (eventSource === 'keyboard') onChangeEnd(value)
  }, [value, onChangeEnd])

  const getContainerProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      const { width: w, height: h } = thumbSize ?? { width: 0, height: 0 }

      const style: CSSProperties = {
        ...props.style,
        position: 'relative',
        userSelect: 'none',
        touchAction: 'none',
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        outline: 0,
        ...(isVertical
          ? { paddingLeft: w / 2, paddingRight: w / 2 }
          : { paddingTop: h / 2, paddingBottom: h / 2 }),
      }

      return {
        ...omitObject(rest, ['value', 'onChangeStart', 'onChangeEnd']),
        ...props,
        ref: mergeRefs(ref, containerRef),
        tabIndex: -1,
        style,
      }
    },
    [isVertical, rest, thumbSize],
  )

  const getInputProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...pickObject(rest, formControlProperties),
      ...props,
      ref,
      type: 'hidden',
      name,
      value,
      required,
      disabled,
      readOnly,
    }),
    [disabled, name, readOnly, required, rest, value],
  )

  const getTrackProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      const style: CSSProperties = {
        ...props.style,
        position: 'absolute',
        ...(isVertical
          ? {
              left: '50%',
              transform: 'translateX(-50%)',
              height: '100%',
            }
          : {
              top: '50%',
              transform: 'translateY(-50%)',
              width: '100%',
            }),
      }

      return {
        ...pickObject(rest, formControlProperties),
        ...props,
        ref: mergeRefs(ref, trackRef),
        style,
      }
    },
    [isVertical, rest],
  )

  const getFilledTrackProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      const n = Math.abs(isReversed ? 100 - thumbPercent : thumbPercent)

      const style: CSSProperties = {
        ...props.style,
        position: 'absolute',
        ...(isVertical
          ? {
              left: '50%',
              transform: 'translateX(-50%)',
              height: `${n}%`,
              ...(isReversed ? { top: '0%' } : { bottom: '0%' }),
            }
          : {
              top: '50%',
              transform: 'translateY(-50%)',
              width: `${n}%`,
              ...(isReversed ? { right: '0%' } : { left: '0%' }),
            }),
      }

      return { ...pickObject(rest, formControlProperties), ...props, ref, style }
    },
    [isReversed, isVertical, rest, thumbPercent],
  )

  const getMarkProps: RequiredPropGetter<{ value: number }> = useCallback(
    (props = {}, ref = null) => {
      let n = valueToPercent(props.value, min, max)
      n = isReversed ? 100 - n : n

      const style: CSSProperties = {
        ...props.style,
        position: 'absolute',
        pointerEvents: 'none',
        ...(isVertical ? { bottom: `${n}%` } : { left: `${n}%` }),
      }

      return {
        ...pickObject(rest, formControlProperties),
        ...props,
        ref,
        'aria-hidden': true,
        'data-invalid': dataAttr(props.value < min || max < props.value),
        'data-highlighted': dataAttr(props.value <= value),
        style,
      }
    },
    [isReversed, isVertical, max, min, rest, value],
  )

  const getThumbProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      const n = thumbPercent
      const { width: w, height: h } = thumbSize ?? { width: 0, height: 0 }

      const style: CSSProperties = {
        ...props.style,
        position: 'absolute',
        userSelect: 'none',
        touchAction: 'none',
        ...(isVertical
          ? { bottom: `calc(${n}% - ${h / 2}px)` }
          : { left: `calc(${n}% - ${w / 2}px)` }),
      }

      return {
        ...pickObject(rest, formControlProperties),
        ...props,
        ref: mergeRefs(ref, thumbRef),
        tabIndex: isInteractive ? 0 : undefined,
        role: 'slider',
        'data-active': dataAttr(isDragging),
        'aria-orientation': orientation,
        onKeyDown: handlerAll(props.onKeyDown, onKeyDown),
        onFocus: handlerAll(props.onFocus, rest.onFocus, () => setFocused(true)),
        onBlur: handlerAll(props.onBlur, rest.onBlur, () => setFocused(false)),
        style,
      }
    },
    [isDragging, isInteractive, isVertical, onKeyDown, orientation, rest, thumbPercent, thumbSize],
  )

  return {
    value,
    isFocused,
    isDragging,
    isVertical,
    stepUp,
    stepDown,
    reset,
    stepTo,
    getContainerProps,
    getInputProps,
    getTrackProps,
    getFilledTrackProps,
    getMarkProps,
    getThumbProps,
  }
}

export type ReturnUseSlider = ReturnType<typeof useSlider>

type SliderContext = Pick<
  ReturnUseSlider,
  'isVertical' | 'getTrackProps' | 'getFilledTrackProps' | 'getMarkProps' | 'getThumbProps'
> &
  Omit<SliderOptions, 'input'> & { styles: Record<string, CSSUIObject> }

const [SliderProvider, useSliderContext] = createContext<SliderContext>({
  name: 'SliderContext',
  errorMessage: `useSliderContext returned is 'undefined'. Seems you forgot to wrap the components in "<Slider />" `,
})

type SliderOptions = {
  input?: HTMLUIProps<'input'>
  track?: SliderTrackProps
  filledTrack?: SliderFilledTrackProps
  thumb?: SliderThumbProps
  trackColor?: UIProps['color']
  filledTrackColor?: UIProps['color']
  trackSize?: UIProps['h']
  thumbColor?: UIProps['bg']
  thumbSize?: UIProps['boxSize']
}

export type SliderProps = Omit<HTMLUIProps<'div'>, keyof UseSliderProps> &
  ThemeProps<'Slider'> &
  UseSliderProps &
  SliderOptions

export const Slider = forwardRef<SliderProps, 'input'>((props, ref) => {
  const [styles, mergedProps] = useMultiComponentStyle('Slider', props)
  const {
    className,
    children,
    input,
    track,
    filledTrack,
    thumb,
    trackColor,
    filledTrackColor,
    trackSize,
    thumbColor,
    thumbSize,
    ...rest
  } = omitThemeProps(mergedProps)
  const {
    isVertical,
    getContainerProps,
    getInputProps,
    getTrackProps,
    getFilledTrackProps,
    getMarkProps,
    getThumbProps,
  } = useSlider(rest)

  const css: CSSUIObject = { ...styles.container }

  const validChildren = getValidChildren(children)

  const [customSliderTrack] = findChildren(validChildren, SliderTrack)
  const [customSliderThumb] = findChildren(validChildren, SliderThumb)

  const hasSliderThumb = includesChildren(validChildren, SliderThumb)

  const cloneChildren = !isEmpty(validChildren)
    ? omitChildren(validChildren, SliderTrack, SliderThumb)
    : children

  return (
    <SliderProvider
      value={{
        isVertical,
        getTrackProps,
        getFilledTrackProps,
        getMarkProps,
        getThumbProps,
        track,
        trackColor,
        trackSize,
        filledTrack,
        filledTrackColor,
        thumb,
        thumbColor,
        thumbSize,
        styles,
      }}
    >
      <ui.div className={cx('ui-slider', className)} __css={css} {...getContainerProps()}>
        <ui.input {...getInputProps(input, ref)} />

        {customSliderTrack ?? <SliderTrack />}

        {cloneChildren}

        {customSliderThumb ?? (!hasSliderThumb ? <SliderThumb /> : null)}
      </ui.div>
    </SliderProvider>
  )
})

export type SliderTrackProps = HTMLUIProps<'div'> & Pick<SliderOptions, 'filledTrack'>

export const SliderTrack = forwardRef<SliderTrackProps, 'div'>(
  ({ className, children, filledTrack, ...rest }, ref) => {
    const { styles, track, trackColor, trackSize, isVertical, getTrackProps } = useSliderContext()

    const css: CSSUIObject = { ...styles.track }

    return (
      <ui.div
        className={cx('ui-slider-track', className)}
        __css={css}
        {...getTrackProps(
          {
            ...(trackColor ? { bg: trackColor } : {}),
            ...(trackSize ? (isVertical ? { w: trackSize } : { h: trackSize }) : {}),
            ...track,
            ...rest,
          },
          ref,
        )}
      >
        {children ?? <SliderFilledTrack {...filledTrack} />}
      </ui.div>
    )
  },
)

export type SliderFilledTrackProps = HTMLUIProps<'div'>

export const SliderFilledTrack = forwardRef<SliderFilledTrackProps, 'div'>(
  ({ className, ...rest }, ref) => {
    const { styles, filledTrack, filledTrackColor, getFilledTrackProps } = useSliderContext()

    const css: CSSUIObject = { ...styles.filledTrack }

    return (
      <ui.div
        className={cx('ui-slider-filledTrack', className)}
        __css={css}
        {...getFilledTrackProps(
          { ...(filledTrackColor ? { bg: filledTrackColor } : {}), ...filledTrack, ...rest },
          ref,
        )}
      />
    )
  },
)

export type SliderMarkProps = HTMLUIProps<'div'> & { value: number }

export const SliderMark = forwardRef<SliderMarkProps, 'div'>(({ className, ...rest }, ref) => {
  const { styles, getMarkProps } = useSliderContext()

  const css: CSSUIObject = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...styles.mark,
  }

  return (
    <ui.div className={cx('ui-slider-mark', className)} __css={css} {...getMarkProps(rest, ref)} />
  )
})

export type SliderThumbProps = HTMLUIProps<'div'>

export const SliderThumb = forwardRef<SliderThumbProps, 'div'>(({ className, ...rest }, ref) => {
  const { styles, thumb, thumbColor, thumbSize, getThumbProps } = useSliderContext()

  const css: CSSUIObject = { ...styles.thumb }

  return (
    <ui.div
      className={cx('ui-slider-thumb', className)}
      __css={css}
      {...getThumbProps(
        {
          ...(thumbColor ? { bg: thumbColor } : {}),
          ...(thumbSize ? { boxSize: thumbSize } : {}),
          ...thumb,
          ...rest,
        },
        ref,
      )}
    />
  )
})
