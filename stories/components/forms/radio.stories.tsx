import type { Meta, StoryFn } from "@storybook/react"
import type { RadioItem, UseRadioGroupReturn } from "@yamada-ui/react"
import {
  FormControl,
  Radio,
  RadioGroup,
  useRadio,
  useRadioGroup,
  Wrap,
  HStack,
  Box,
  VStack,
  Button,
} from "@yamada-ui/react"
import type { FC } from "react"
import { useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"

type Story = StoryFn<typeof Radio>

const meta: Meta<typeof Radio> = {
  title: "Components / Forms / Radio",
  component: Radio,
}

export default meta

export const basic: Story = () => {
  return <Radio>孫悟空</Radio>
}

export const withSize: Story = () => {
  return (
    <Wrap gap="md">
      <Radio size="sm">孫悟空</Radio>
      <Radio size="md">ベジータ</Radio>
      <Radio size="lg">フリーザ</Radio>
    </Wrap>
  )
}

export const withdefaultIsChecked: Story = () => {
  return <Radio defaultIsChecked>孫悟空</Radio>
}

export const withColorScheme: Story = () => {
  return (
    <Wrap gap="md">
      <Radio colorScheme="primary" defaultIsChecked>
        Primary
      </Radio>

      <Radio colorScheme="secondary" defaultIsChecked>
        Secondary
      </Radio>

      <Radio colorScheme="warning" defaultIsChecked>
        Warning
      </Radio>

      <Radio colorScheme="danger" defaultIsChecked>
        Danger
      </Radio>

      <Radio colorScheme="link" defaultIsChecked>
        Link
      </Radio>

      <Radio colorScheme="gray" defaultIsChecked>
        Gray
      </Radio>

      <Radio colorScheme="zinc" defaultIsChecked>
        Zinc
      </Radio>

      <Radio colorScheme="neutral" defaultIsChecked>
        Neutral
      </Radio>

      <Radio colorScheme="stone" defaultIsChecked>
        Stone
      </Radio>

      <Radio colorScheme="red" defaultIsChecked>
        Red
      </Radio>

      <Radio colorScheme="rose" defaultIsChecked>
        Rose
      </Radio>

      <Radio colorScheme="pink" defaultIsChecked>
        Pink
      </Radio>

      <Radio colorScheme="orange" defaultIsChecked>
        Orange
      </Radio>

      <Radio colorScheme="amber" defaultIsChecked>
        Amber
      </Radio>

      <Radio colorScheme="yellow" defaultIsChecked>
        Yellow
      </Radio>

      <Radio colorScheme="lime" defaultIsChecked>
        Lime
      </Radio>

      <Radio colorScheme="green" defaultIsChecked>
        Green
      </Radio>

      <Radio colorScheme="emerald" defaultIsChecked>
        Emerald
      </Radio>

      <Radio colorScheme="teal" defaultIsChecked>
        Teal
      </Radio>

      <Radio colorScheme="cyan" defaultIsChecked>
        Cyan
      </Radio>

      <Radio colorScheme="sky" defaultIsChecked>
        Sky
      </Radio>

      <Radio colorScheme="blue" defaultIsChecked>
        Blue
      </Radio>

      <Radio colorScheme="indigo" defaultIsChecked>
        Indigo
      </Radio>

      <Radio colorScheme="violet" defaultIsChecked>
        Violet
      </Radio>

      <Radio colorScheme="purple" defaultIsChecked>
        Purple
      </Radio>

      <Radio colorScheme="fuchsia" defaultIsChecked>
        Fuchsia
      </Radio>
    </Wrap>
  )
}

export const isDisabled: Story = () => {
  return (
    <>
      <Radio isDisabled>All Notifications</Radio>
      <Radio isDisabled defaultIsChecked>
        All Notifications
      </Radio>

      <RadioGroup defaultValue="all">
        <Radio value="all">All Notifications</Radio>
        <Radio value="important" isDisabled>
          Important Notifications
        </Radio>
        <Radio value="service">Service Notifications</Radio>
      </RadioGroup>

      <FormControl
        isDisabled
        label="Which notifications would you like to receive?"
      >
        <Radio defaultIsChecked>All Notifications</Radio>
      </FormControl>

      <FormControl
        isDisabled
        label="Which notifications would you like to receive?"
      >
        <RadioGroup defaultValue="all">
          <Radio value="all">All Notifications</Radio>
          <Radio value="important">Important Notifications</Radio>
          <Radio value="service">Service Notifications</Radio>
        </RadioGroup>
      </FormControl>
    </>
  )
}

export const isReadonly: Story = () => {
  return (
    <>
      <Radio isReadOnly>All Notifications</Radio>
      <Radio isReadOnly defaultIsChecked>
        All Notifications
      </Radio>

      <RadioGroup defaultValue="all">
        <Radio value="all">All Notifications</Radio>
        <Radio value="important" isReadOnly>
          Important Notifications
        </Radio>
        <Radio value="service">Service Notifications</Radio>
      </RadioGroup>

      <FormControl
        isReadOnly
        label="Which notifications would you like to receive?"
      >
        <Radio defaultIsChecked>All Notifications</Radio>
      </FormControl>

      <FormControl
        isReadOnly
        label="Which notifications would you like to receive?"
      >
        <RadioGroup defaultValue="all">
          <Radio value="all">All Notifications</Radio>
          <Radio value="important">Important Notifications</Radio>
          <Radio value="service">Service Notifications</Radio>
        </RadioGroup>
      </FormControl>
    </>
  )
}

export const isInvalid: Story = () => {
  return (
    <>
      <Radio isInvalid>All Notifications</Radio>
      <Radio isInvalid defaultIsChecked>
        All Notifications
      </Radio>

      <RadioGroup defaultValue="all">
        <Radio value="all">All Notifications</Radio>
        <Radio value="important" isInvalid>
          Important Notifications
        </Radio>
        <Radio value="service">Service Notifications</Radio>
      </RadioGroup>

      <FormControl
        isInvalid
        label="Which notifications would you like to receive?"
        errorMessage="This is required."
      >
        <Radio>All Notifications</Radio>
      </FormControl>

      <FormControl
        isInvalid
        label="Which notifications would you like to receive?"
        errorMessage="This is required."
      >
        <RadioGroup defaultValue="all">
          <Radio value="all">All Notifications</Radio>
          <Radio value="important">Important Notifications</Radio>
          <Radio value="service">Service Notifications</Radio>
        </RadioGroup>
      </FormControl>
    </>
  )
}

export const withGroup: Story = () => {
  const items: RadioItem[] = [
    { label: "孫悟空", value: "孫悟空" },
    { label: "ベジータ", value: "ベジータ" },
    { label: "フリーザ", value: "フリーザ" },
  ]

  return (
    <>
      <RadioGroup defaultValue="孫悟空">
        <Radio value="孫悟空">孫悟空</Radio>
        <Radio value="ベジータ">ベジータ</Radio>
        <Radio value="フリーザ">フリーザ</Radio>
      </RadioGroup>

      <RadioGroup direction="row" defaultValue="孫悟空">
        <Radio value="孫悟空">孫悟空</Radio>
        <Radio value="ベジータ">ベジータ</Radio>
        <Radio value="フリーザ">フリーザ</Radio>
      </RadioGroup>

      <RadioGroup defaultValue="孫悟空" items={items} />
    </>
  )
}

export const customControl: Story = () => {
  const [value, setValue] = useState<string>("孫悟空")

  return (
    <RadioGroup value={value} onChange={(value) => setValue(value)}>
      <Radio value="孫悟空">孫悟空</Radio>
      <Radio value="ベジータ">ベジータ</Radio>
      <Radio value="フリーザ">フリーザ</Radio>
    </RadioGroup>
  )
}

export const customHook: Story = () => {
  const CustomRadio: FC<ReturnType<UseRadioGroupReturn["getRadioProps"]>> = (
    props,
  ) => {
    const { getInputProps, getIconProps } = useRadio(props)

    return (
      <Box as="label">
        <input {...getInputProps()} />

        <Box
          {...getIconProps()}
          cursor="pointer"
          borderWidth="1px"
          py="xs"
          px="sm"
          rounded="md"
          _checked={{
            bg: "blue.500",
            color: "white",
            borderColor: "blue.500",
          }}
        >
          {props.value}
        </Box>
      </Box>
    )
  }

  const { getContainerProps, getRadioProps } = useRadioGroup<string>({
    defaultValue: "孫悟空",
  })

  return (
    <HStack gap="sm" {...getContainerProps()}>
      <CustomRadio {...getRadioProps({ value: "孫悟空" })} />
      <CustomRadio {...getRadioProps({ value: "ベジータ" })} />
      <CustomRadio {...getRadioProps({ value: "フリーザ" })} />
    </HStack>
  )
}

export const reactHookForm: Story = () => {
  type Data = { radio: string }

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Data>()

  const onSubmit: SubmitHandler<Data> = (data) => console.log("submit:", data)

  console.log("watch:", watch())

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isInvalid={!!errors.radio}
        label="Who is your favorite character?"
        errorMessage={errors.radio?.message}
      >
        <Controller
          name="radio"
          control={control}
          rules={{ required: { value: true, message: "This is required." } }}
          render={({ field }) => (
            <RadioGroup {...field}>
              <Radio value="孫悟空">孫悟空</Radio>
              <Radio value="ベジータ">ベジータ</Radio>
              <Radio value="フリーザ">フリーザ</Radio>
            </RadioGroup>
          )}
        />
      </FormControl>

      <Button type="submit" alignSelf="flex-end">
        Submit
      </Button>
    </VStack>
  )
}

export const reactHookFormWithDefaultValue: Story = () => {
  type Data = { radio: string }

  const defaultValues: Data = {
    radio: "孫悟空",
  }

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Data>({ defaultValues })

  const onSubmit: SubmitHandler<Data> = (data) => console.log("submit:", data)

  console.log("watch:", watch())

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isInvalid={!!errors.radio}
        label="Who is your favorite character?"
        errorMessage={errors.radio?.message}
      >
        <Controller
          name="radio"
          control={control}
          rules={{ required: { value: true, message: "This is required." } }}
          render={({ field }) => (
            <RadioGroup {...field}>
              <Radio value="孫悟空">孫悟空</Radio>
              <Radio value="ベジータ">ベジータ</Radio>
              <Radio value="フリーザ">フリーザ</Radio>
            </RadioGroup>
          )}
        />
      </FormControl>

      <Button type="submit" alignSelf="flex-end">
        Submit
      </Button>
    </VStack>
  )
}
