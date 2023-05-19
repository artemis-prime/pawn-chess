import { styled } from '~/style'

const SideSwatch = styled('span', {

  display: 'inline-block',
  verticalAlign: 'middle',

  h: '$swatchNormalHeight', 
  w: '$swatchNormalWidth',
  borderRadius: '$sm',
  borderWidth: '$thicker',
  borderColor: '#777',
  borderStyle: '$solid',

  variants: {
    side: {
      white: {
        backgroundColor: '$pieceColorWhite'
      },
      black: {
        backgroundColor: '$pieceColorBlack'
      },
    },
    small: {
      true: {
        h: '0.8rem', 
        w: '0.8rem',
        borderWidth: '$normal',
      }
    },
    narrow: {
      true: {
        height: '1rem',
        borderWidth: '$normal', 
      }
    }
  }
})

export default SideSwatch
