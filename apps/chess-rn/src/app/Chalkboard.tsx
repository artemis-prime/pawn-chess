import React from 'react'
import { observer } from 'mobx-react-lite'

import { styled, type CSS } from '~/style'
import { useChess } from '~/services'
import { BGImage, Column, Row } from '~/primatives'

import {
  GameStatusIndicator,
  TurnIndicator,
  InCheckIndicator,
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
    css?: CSS
  } 
  & MenuControlProps
> = observer(({
  disableInput,
  css,
  ...rest
}) => {
  const game = useChess()
  return (
    <StyledBGImage imageURI={'slate_bg_low_res'} css={css}>
      <AppBarInChalkboard {...rest} />
      <Column pointerEvents={(disableInput ? 'none' : 'auto')} css={{py: '$1', px: '$1_5'}}>
        {(game.playing) ?  <TurnIndicator /> : <GameStatusIndicator />}
        {(game.playing) && <InCheckIndicator /> }
      </Column>
    </StyledBGImage>
  )
})

export default Chalkboard
