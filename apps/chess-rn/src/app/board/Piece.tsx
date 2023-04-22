import React, { PropsWithChildren } from 'react'
import { 
  StyleProp,
  Text, 
  View,
  ViewStyle,
  TextStyle,
  ColorValue 
} from 'react-native'
import { observer } from 'mobx-react'

import { 
  type SquareDesc,
  PIECETYPE_TO_UNICODE 
} from '@artemis-prime/chess-core'

import { styled, useTheme } from '~/style/stitches.config'
import { usePulses } from '~/service'

interface ShadowDesc {
  variant: 
    'normal' |
    'large' | 
    'effectRt1' | 
    'effectRt2' | 
    'effectLt1' | 
    'effectLt2'

  color: ColorValue
}

const IN_CHECK_SHADOWS = [
  { variant: 'effectRt1', color: 'rgba(100, 0, 0, 0.5)' },
  { variant: 'effectRt2', color: 'rgba(100, 0, 0, 0.2)' },
  { variant: 'effectLt1', color: 'rgba(100, 0, 0, 0.2)' },
  { variant: 'effectLt2', color: 'rgba(100, 0, 0, 0.1)' }
] as ShadowDesc[]

const CAPTURE_SHADOWS = [
  { variant: 'effectRt1', color: 'rgba(228, 134, 5, 0.4)' },
  { variant: 'effectRt2', color: 'rgba(228, 134, 5, 0.1)' },
  { variant: 'effectLt1', color: 'rgba(228, 134, 5, 0.3)' },
  { variant: 'effectLt2', color: 'rgba(228, 134, 5, 0.1)' }
] as ShadowDesc[]

const NORMAL_SHADOW_COLOR = {
  white: 'rgba(0, 0, 0, 0.3)' as ColorValue,
  black: 'rgba(0, 0, 0, 0.5)' as ColorValue
}

interface Offset {
  left: number,
  top: number
}

  // This offset makes the image look centered based on applied styles
const IMAGE_OFFSET = {
  left: -1,
  top: -2
} as Offset

  // This offset makes the image look centered based on applied styles
const IMAGE_OFFSET_LARGER = {
  left: -1,
  top: -6
} as Offset

const sumOffsets = (o1: Offset, o2: Offset): Offset => ({
  left: o1.left + o2.left,
  top: o1.top + o2.top
})

const PieceFigure = styled(Text, {

  fontWeight: '600', 
  textAlign: 'center',
  textAlignVertical: 'center',
  width: '100%',
  variants: {
    figureSize: {
      'normal': {
        ...IMAGE_OFFSET
      },
      'large': {
        ...IMAGE_OFFSET_LARGER
      }
    }
  }
})

const ShadowFigure = styled(Text, {

  fontWeight: '600', 
  textAlign: 'center',
  textAlignVertical: 'top',
  width: '100%',
  position: 'absolute',
  variants: {
    variant: {
      normal: {
        ...sumOffsets(IMAGE_OFFSET, {left: 2, top: 2}),
      },
      large: {
        ...sumOffsets(IMAGE_OFFSET_LARGER, {left: 2, top: 2}),
      },
      effectRt1: {
        ...sumOffsets(IMAGE_OFFSET_LARGER, {left: 1.5, top: 2.5}),
      },
      effectRt2: {
        ...sumOffsets(IMAGE_OFFSET_LARGER, {left: 3, top: 3}),
      },
      effectLt1: {
        ...sumOffsets(IMAGE_OFFSET_LARGER, {left: -2.5, top: 0}),
      },
      effectLt2: {
        ...sumOffsets(IMAGE_OFFSET_LARGER, {left: -4.5, top: 1}),
      }
    }
  }
})

  // https://stackoverflow.com/questions/51611619/text-with-solid-shadow-in-react-native 
const Shadows: React.FC<{
  descs: ShadowDesc[]
  style?: StyleProp<TextStyle>
} & PropsWithChildren> = ({
  descs,
  style,
  children
}) => (<>
  {descs.map((d, i) => (
    <ShadowFigure style={[{color: d.color}, style]} variant={d.variant} key={i}>{children}</ShadowFigure> 
  ))}
</>)

    // Size is safe, since if the layout-based size is unavailable,
    // this component won't be rendered.
const Piece: React.FC<{  
  desc: SquareDesc 
  size: number 
  style?: StyleProp<ViewStyle>
}> = observer(({
  desc,
  size,
  style 
}) => {

  const pulses = usePulses()
  const theme = useTheme()

  if (!desc.pieceRef.piece) {
    return null
  }

  const { 
    fontSize, 
    figureSize, 
    shadows
  } = ((): {
    fontSize: number 
    figureSize: 'normal' | 'large' 
    shadows: ShadowDesc[]
  } => {

    if (desc.posStateRef.state === 'kingInCheck' && pulses.slow ) {
      return { 
        fontSize: size * .9, 
        figureSize: 'large', 
        shadows: IN_CHECK_SHADOWS 
      }
    } 
    if (desc.posStateRef.state === 'inCheckFrom' && !pulses.slow) {
      return { 
        fontSize: size * .95, 
        figureSize: 'large', 
        shadows: IN_CHECK_SHADOWS 
      }
    } 
      // in 'capturePromote' case, the square will pulse w a yellow border as well.
    else if (desc.posStateRef.state.includes('capture') && pulses.fast) {
      return { 
        fontSize: size * .9, 
        figureSize: 'large', 
        shadows: CAPTURE_SHADOWS 
      }
    } 
    else if (desc.posStateRef.state === 'castleRookFrom' && pulses.slow) {
        // pulse larger
      return {
        fontSize: size * .9, 
        figureSize: 'large',
        shadows: [ { variant: 'large', color: NORMAL_SHADOW_COLOR[desc.pieceRef.piece!.color] }]
      }
    }
      // Default size and shadows
    return {
      fontSize: size *.8,
      figureSize: 'normal',
      shadows: [ { variant: 'normal', color: NORMAL_SHADOW_COLOR[desc.pieceRef.piece!.color] }]
    }
  })()

  const height = fontSize * 1.1 // ensure no clipping 
  const color = (desc.pieceRef.piece!.color === 'white') ? theme.colors.pieceWhite : theme.colors.pieceBlack

    // android bug: https://stackoverflow.com/questions/41943191/how-to-use-zindex-in-react-native
  return (
    <View style={[style, { width: '100%', height: '100%' }]} >
      <Shadows descs={shadows} style={{ fontSize, height  }} >
        {PIECETYPE_TO_UNICODE[desc.pieceRef.piece!.type]}
      </Shadows> 
      <PieceFigure figureSize={figureSize} style={{ fontSize, height, color }} >
        {PIECETYPE_TO_UNICODE[desc.pieceRef.piece!.type]}
      </PieceFigure>
    </View>
  ) 
})

export default Piece