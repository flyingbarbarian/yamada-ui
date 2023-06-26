import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  useBoolean,
  useCheckbox,
  useCheckboxGroup,
  VStack,
  Wrap,
  Box,
  HStack,
  Button,
} from '@yamada-ui/react'
import { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export default {
  title: 'Components / Forms / Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>

export const basic: ComponentStory<typeof Checkbox> = () => {
  return <Checkbox>孫悟空</Checkbox>
}

export const withSize: ComponentStory<typeof Checkbox> = () => {
  return (
    <Wrap gap='md'>
      <Checkbox size='sm'>孫悟空</Checkbox>
      <Checkbox size='md'>ベジータ</Checkbox>
      <Checkbox size='lg'>フリーザ</Checkbox>
    </Wrap>
  )
}

export const withDefaultChecked: ComponentStory<typeof Checkbox> = () => {
  return <Checkbox defaultChecked>孫悟空</Checkbox>
}

export const withColorScheme: ComponentStory<typeof Checkbox> = () => {
  return (
    <Wrap gap='md'>
      <Checkbox colorScheme='primary' defaultChecked>
        Primary
      </Checkbox>

      <Checkbox colorScheme='secondary' defaultChecked>
        Secondary
      </Checkbox>

      <Checkbox colorScheme='warning' defaultChecked>
        Warning
      </Checkbox>

      <Checkbox colorScheme='danger' defaultChecked>
        Danger
      </Checkbox>

      <Checkbox colorScheme='link' defaultChecked>
        Link
      </Checkbox>

      <Checkbox colorScheme='gray' defaultChecked>
        Gray
      </Checkbox>

      <Checkbox colorScheme='red' defaultChecked>
        Red
      </Checkbox>

      <Checkbox colorScheme='orange' defaultChecked>
        Orange
      </Checkbox>

      <Checkbox colorScheme='yellow' defaultChecked>
        Yellow
      </Checkbox>

      <Checkbox colorScheme='green' defaultChecked>
        Green
      </Checkbox>

      <Checkbox colorScheme='teal' defaultChecked>
        Teal
      </Checkbox>

      <Checkbox colorScheme='blue' defaultChecked>
        Blue
      </Checkbox>

      <Checkbox colorScheme='cyan' defaultChecked>
        Cyan
      </Checkbox>

      <Checkbox colorScheme='purple' defaultChecked>
        Purple
      </Checkbox>

      <Checkbox colorScheme='pink' defaultChecked>
        pink
      </Checkbox>
    </Wrap>
  )
}

export const isDisabled: ComponentStory<typeof Checkbox> = () => {
  return (
    <>
      <Checkbox isDisabled>All Notifications</Checkbox>
      <Checkbox isDisabled defaultChecked>
        All Notifications
      </Checkbox>

      <CheckboxGroup defaultValue={['all']}>
        <Checkbox value='all'>All Notifications</Checkbox>
        <Checkbox value='important' isDisabled>
          Important Notifications
        </Checkbox>
        <Checkbox value='service'>Service Notifications</Checkbox>
      </CheckboxGroup>

      <FormControl isDisabled label='Which notifications would you like to receive?'>
        <Checkbox defaultChecked>All Notifications</Checkbox>
      </FormControl>

      <FormControl isDisabled label='Which notifications would you like to receive?'>
        <CheckboxGroup defaultValue={['all']}>
          <Checkbox value='all'>All Notifications</Checkbox>
          <Checkbox value='important'>Important Notifications</Checkbox>
          <Checkbox value='service'>Service Notifications</Checkbox>
        </CheckboxGroup>
      </FormControl>
    </>
  )
}

export const isReadonly: ComponentStory<typeof Checkbox> = () => {
  return (
    <>
      <Checkbox isReadOnly>All Notifications</Checkbox>
      <Checkbox isReadOnly defaultChecked>
        All Notifications
      </Checkbox>

      <CheckboxGroup defaultValue={['all']}>
        <Checkbox value='all'>All Notifications</Checkbox>
        <Checkbox value='important' isReadOnly>
          Important Notifications
        </Checkbox>
        <Checkbox value='service'>Service Notifications</Checkbox>
      </CheckboxGroup>

      <FormControl isReadOnly label='Which notifications would you like to receive?'>
        <Checkbox defaultChecked>All Notifications</Checkbox>
      </FormControl>

      <FormControl isReadOnly label='Which notifications would you like to receive?'>
        <CheckboxGroup defaultValue={['all']}>
          <Checkbox value='all'>All Notifications</Checkbox>
          <Checkbox value='important'>Important Notifications</Checkbox>
          <Checkbox value='service'>Service Notifications</Checkbox>
        </CheckboxGroup>
      </FormControl>
    </>
  )
}

export const isInvalid: ComponentStory<typeof Checkbox> = () => {
  return (
    <>
      <Checkbox isInvalid>All Notifications</Checkbox>
      <Checkbox isInvalid defaultChecked>
        All Notifications
      </Checkbox>

      <CheckboxGroup defaultValue={['all']}>
        <Checkbox value='all'>All Notifications</Checkbox>
        <Checkbox value='important' isInvalid>
          Important Notifications
        </Checkbox>
        <Checkbox value='service'>Service Notifications</Checkbox>
      </CheckboxGroup>

      <FormControl
        isInvalid
        label='Which notifications would you like to receive?'
        errorMessage='This is required.'
      >
        <Checkbox>All Notifications</Checkbox>
      </FormControl>

      <FormControl
        isInvalid
        label='Which notifications would you like to receive?'
        errorMessage='This is required.'
      >
        <CheckboxGroup defaultValue={['all']}>
          <Checkbox value='all'>All Notifications</Checkbox>
          <Checkbox value='important'>Important Notifications</Checkbox>
          <Checkbox value='service'>Service Notifications</Checkbox>
        </CheckboxGroup>
      </FormControl>
    </>
  )
}

export const indeterminate: ComponentStory<typeof Checkbox> = () => {
  const [values, setValues] = useState([false, false])

  const allChecked = values.every(Boolean)
  const isIndeterminate = values.some(Boolean) && !allChecked

  return (
    <VStack gap='sm'>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setValues([e.target.checked, e.target.checked])}
      >
        地球人
      </Checkbox>

      <VStack pl='md' gap='sm'>
        <Checkbox isChecked={values[0]} onChange={(e) => setValues([e.target.checked, values[1]])}>
          孫悟空
        </Checkbox>

        <Checkbox isChecked={values[1]} onChange={(e) => setValues([values[0], e.target.checked])}>
          孫悟飯
        </Checkbox>
      </VStack>
    </VStack>
  )
}

export const group: ComponentStory<typeof Checkbox> = () => {
  return (
    <>
      <CheckboxGroup defaultValue={['孫悟空', 'ベジータ']}>
        <Checkbox value='孫悟空'>孫悟空</Checkbox>
        <Checkbox value='ベジータ'>ベジータ</Checkbox>
        <Checkbox value='フリーザ'>フリーザ</Checkbox>
      </CheckboxGroup>

      <CheckboxGroup direction='row' defaultValue={['孫悟空', 'ベジータ']}>
        <Checkbox value='孫悟空'>孫悟空</Checkbox>
        <Checkbox value='ベジータ'>ベジータ</Checkbox>
        <Checkbox value='フリーザ'>フリーザ</Checkbox>
      </CheckboxGroup>
    </>
  )
}

export const customControl: ComponentStory<typeof Checkbox> = () => {
  const [isChecked, { toggle }] = useBoolean(false)

  return (
    <Checkbox isChecked={isChecked} onChange={toggle}>
      孫悟空
    </Checkbox>
  )
}

export const customControlGroup: ComponentStory<typeof Checkbox> = () => {
  const [value, setValue] = useState<string[]>(['孫悟空', 'ベジータ'])

  return (
    <CheckboxGroup value={value} onChange={(value) => setValue(value)}>
      <Checkbox value='孫悟空'>孫悟空</Checkbox>
      <Checkbox value='ベジータ'>ベジータ</Checkbox>
      <Checkbox value='フリーザ'>フリーザ</Checkbox>
    </CheckboxGroup>
  )
}

export const customHook: ComponentStory<typeof Checkbox> = () => {
  const CustomCheckbox: FC<any> = (props) => {
    const { getInputProps, getIconProps } = useCheckbox(props)

    return (
      <Box as='label'>
        <input {...getInputProps()} />

        <Box
          {...getIconProps()}
          cursor='pointer'
          borderWidth='1px'
          py='xs'
          px='sm'
          rounded='md'
          _checked={{
            bg: 'blue.500',
            color: 'white',
            borderColor: 'blue.500',
          }}
        >
          {props.value}
        </Box>
      </Box>
    )
  }

  const { getCheckboxProps } = useCheckboxGroup({ defaultValue: ['孫悟空'] })

  return (
    <HStack gap='sm'>
      <CustomCheckbox {...getCheckboxProps({ value: '孫悟空' })} />
      <CustomCheckbox {...getCheckboxProps({ value: 'ベジータ' })} />
      <CustomCheckbox {...getCheckboxProps({ value: 'フリーザ' })} />
    </HStack>
  )
}

export const reactHookForm: ComponentStory<typeof Checkbox> = () => {
  type Data = { checkbox: boolean; checkboxGroup: string[] }

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Data>()

  const onSubmit: SubmitHandler<Data> = (data) => console.log('submit:', data)

  console.log('watch:', watch())

  return (
    <VStack as='form' onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isInvalid={!!errors.checkbox}
        label='Who is your favorite character?'
        errorMessage={errors.checkbox?.message}
      >
        <Controller
          name='checkbox'
          control={control}
          rules={{ required: { value: true, message: 'This is required.' } }}
          render={({ field: { value, ...rest } }) => (
            <Checkbox isChecked={value} {...rest}>
              孫悟空
            </Checkbox>
          )}
        />
      </FormControl>

      <FormControl
        isInvalid={!!errors.checkboxGroup}
        label='Who is your favorite character?'
        errorMessage={errors.checkboxGroup?.message}
      >
        <Controller
          name='checkboxGroup'
          control={control}
          rules={{ required: { value: true, message: 'This is required.' } }}
          render={({ field }) => (
            <CheckboxGroup {...field}>
              <Checkbox value='孫悟空'>孫悟空</Checkbox>
              <Checkbox value='ベジータ'>ベジータ</Checkbox>
              <Checkbox value='フリーザ'>フリーザ</Checkbox>
            </CheckboxGroup>
          )}
        />
      </FormControl>

      <Button type='submit' alignSelf='flex-end'>
        Submit
      </Button>
    </VStack>
  )
}

export const reactHookFormWithDefaultValue: ComponentStory<typeof Checkbox> = () => {
  type Data = { checkbox: boolean; checkboxGroup: string[] }

  const defaultValues: Data = {
    checkbox: true,
    checkboxGroup: ['孫悟空'],
  }

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Data>({ defaultValues })

  const onSubmit: SubmitHandler<Data> = (data) => console.log('submit:', data)

  console.log('watch:', watch())

  return (
    <VStack as='form' onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        isInvalid={!!errors.checkbox}
        label='Who is your favorite character?'
        errorMessage={errors.checkbox?.message}
      >
        <Controller
          name='checkbox'
          control={control}
          rules={{ required: { value: true, message: 'This is required.' } }}
          render={({ field: { value, ...rest } }) => (
            <Checkbox isChecked={value} {...rest}>
              孫悟空
            </Checkbox>
          )}
        />
      </FormControl>

      <FormControl
        isInvalid={!!errors.checkboxGroup}
        label='Who is your favorite character?'
        errorMessage={errors.checkboxGroup?.message}
      >
        <Controller
          name='checkboxGroup'
          control={control}
          rules={{ required: { value: true, message: 'This is required.' } }}
          render={({ field }) => (
            <CheckboxGroup {...field}>
              <Checkbox value='孫悟空'>孫悟空</Checkbox>
              <Checkbox value='ベジータ'>ベジータ</Checkbox>
              <Checkbox value='フリーザ'>フリーザ</Checkbox>
            </CheckboxGroup>
          )}
        />
      </FormControl>

      <Button type='submit' alignSelf='flex-end'>
        Submit
      </Button>
    </VStack>
  )
}
