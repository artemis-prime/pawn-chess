import React from 'react'

import { styled, layout } from '~/styles/stitches.config'
import { BurgerButton, Flex } from '~/primatives'

const FakeBurgerButton = styled('div', {
  width: '$header',
  height: '$header'
})

const Outer = styled('header', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'stretch',

  color: 'white',
  backgroundColor: '$headerBG',
  //padding:  0.5rem 12px;
  height: '$header',
})

const Title = styled('h1', {
  m: 0,
  p: 0,
  lineHeight:  '$header',
  /*
    @include m.portrait-phone {
    font-size: 1.4rem; 
  }

  @include m.portrait-tablet {
    font-size: 1.9rem; 
  }

*/
}) 

const Header: React.FC<{
  menuOpen: boolean
  toggleMenu: () => void
}> = ({
  menuOpen,
  toggleMenu
}) => {
  
  return (
    <Outer>
      <Flex direction='row' justify='between' css={{
        width: layout.staging,
        m: '0 auto',
        //border: '0.5px gray solid'
      }}>
        <BurgerButton toggledOn={menuOpen} onClick={toggleMenu} css={{
          alignSelf: 'center', 
          width: 'initial', 
          height: '80%', 
          aspectRatio: 1, 
          ml: -6
        }}/>
        <Title>Chess Two Ways - Web</Title>
        <FakeBurgerButton />
      </Flex>
    </Outer>
  )
}

export default Header
