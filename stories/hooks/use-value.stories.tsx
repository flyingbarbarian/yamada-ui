import { Box, useBreakpoint, useColorMode, useValue } from '@yamada-ui/react'

export default {
  title: 'Hooks / useValue',
}

export const basic = () => {
  const { colorMode } = useColorMode()
  const breakpoint = useBreakpoint()
  const bg = useValue({
    base: 'red.500',
    xl: 'blue.500',
    lg: 'green.500',
    md: 'yellow.500',
    sm: 'purple.500',
  })
  const color = useValue(['whiteAlpha.800', 'blackAlpha.800'])

  return (
    <Box
      bg={bg}
      p='md'
      rounded='md'
      color={color}
      transitionProperty='all'
      transitionDuration='slower'
    >
      The current breakpoint is "{breakpoint}", colorMode is "{colorMode}"
    </Box>
  )
}
