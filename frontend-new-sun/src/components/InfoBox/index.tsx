import { Box, Heading, Text, BoxProps } from "@chakra-ui/react"

interface InfoBoxProps extends Pick<BoxProps, 'width' | 'marginTop'> {
  title: string
  info: string
  smallScreen: boolean
}

export const InfoBox = ({
  info,
  title,
  smallScreen,
  width = '25%',
  marginTop
}: InfoBoxProps) => {
  return (
    <Box width={width} marginTop={marginTop}>
      <Heading size={ smallScreen ? "xs": "sm"}>
        {title}
      </Heading>
      <Text fontSize={smallScreen ? 'small' : "medium"} >{info}</Text>
    </Box>
  )
}