import React from 'react'
import { observer } from 'mobx-react'

import { styled } from '~/styles/stitches.config'

import { Drawer, type IconAndStyles } from '~/primatives'

import {
  MenuItem,
  MenuSectionTitle,
  MenuCheckboxItem
} from './menu/side'

import { useBoardOrientation, useGame } from '~/services'

import menuIcons from './menu/menuIcons'

// Following this: 
// https://m3.material.io/components/navigation-drawer/specs

const MenuRoot = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch',

  w: '100%', 
  h: '100%', 
  p: '12px', // Spec: 28 to icon - 16 within button
  backgroundColor: '$menu', 
  color: 'white',

  '@desktopConstrained': {display: 'none'}
})


const SideMenu: React.FC<{
  open: boolean
  width: number
}> = observer(({
  open,
  width
}) => {

  const bo = useBoardOrientation()
  const game = useGame()
  const swapDirection = () => { bo.setWhiteOnBottom(!bo.whiteOnBottom) }
  
  const currentConcedes = (game.currentTurn === 'white') ? '0-1' : '1-0' 

  return (
    <Drawer side='left' width={width} open={open} >
      <MenuRoot >
        <MenuSectionTitle>Direction</MenuSectionTitle>
        <MenuItem onClick={swapDirection} disabled={bo.autoOrientToCurrentTurn} icon={menuIcons.swap} >swap</MenuItem>
        <MenuCheckboxItem 
          checked={bo.autoOrientToCurrentTurn} 
          setChecked={bo.setAutoOrientToCurrentTurn}
          icon={menuIcons.autoSwap}
        >auto-swap</MenuCheckboxItem>
        <MenuSectionTitle>Game</MenuSectionTitle>
        {(game.playing) && (<>
          <MenuItem onClick={game.callADraw} icon={menuIcons.draw}>call a draw</MenuItem>
          <MenuItem onClick={game.concede} icon={{icon: currentConcedes, style: (menuIcons.concede as IconAndStyles).style}}>{game.currentTurn} concedes</MenuItem>
          <MenuItem onClick={game.checkStalemate} icon={menuIcons.stalemate}>check for stalemate</MenuItem>
        </>)}
        <MenuItem onClick={game.reset} icon={menuIcons.reset}>reset</MenuItem>

      </MenuRoot>
    </Drawer>
  )
})

export default SideMenu