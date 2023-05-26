import React from 'react'
import { observer } from 'mobx-react-lite'

import type { SharedValue } from 'react-native-reanimated'

import { styled, type CSS, deborder } from '~/style'
import { useChess } from '~/services'
import { BGImage, Column, Row } from '~/primatives'

import {
  GameStatusIndicator,
  TurnAndInCheckIndicator,
  AppBarInChalkboard,
  type MenuControlProps
} from '~/app/widgets'

const StyledBGImage = styled(BGImage, {

  flexGrow: 0,
  flexShrink: 1,
  backgroundColor: '#333',
  minHeight: 150,
  borderWidth: '$thicker',
  borderTopLeftRadius: '$lg',
  borderTopRightRadius: '$lg',
  borderBottomLeftRadius: '$sm',
  borderBottomRightRadius: '$sm',
  borderColor: '$chalkboardBorderColor',
})

const Chalkboard: React.FC<
  {
    disableInput: boolean,
    animBaseForButton?: SharedValue<number>
    css?: CSS
  } 
  & MenuControlProps
> = observer(({
  disableInput,
  animBaseForButton,
  css,
  ...rest
}) => {
  const game = useChess()
  return (
    <StyledBGImage imageURI={'slate_bg_low_res'} css={css}>
      <AppBarInChalkboard animBaseForButton={animBaseForButton} {...rest} />
      <Column 
        align='stretch' 
        pointerEvents={(disableInput ? 'none' : 'auto')} 
        css={{py: '$1', px: '$1_5', ...deborder('red', 'chalkboard')}}
      >
        <Row align='stretch' css={{...deborder('yellow', 'chalkboard')}}>
          {(game.playing) ?  <TurnAndInCheckIndicator /> : <GameStatusIndicator />}
        </Row>
      </Column>
    </StyledBGImage>
  )
})

export default Chalkboard
