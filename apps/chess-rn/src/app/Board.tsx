import React, { useEffect, useState } from 'react'
import { 
  View,
  StyleProp, 
  ViewStyle,
  LayoutChangeEvent 
} from 'react-native'

import { type SquareDesc } from '@artemis-prime/chess-core'

import { styled } from '~/style/stitches.config'
import { useGame } from '~/service'

import BGImage from '~/primatives/BGImage'

import Square from './board/Square'
import { ChessDnDShell, useDnDConfig } from './board/ChessDnD'
import DraggingPiece from './board/DraggingPiece'

const BoardInner = styled(View, {
  aspectRatio: 1,
  width: '100%',
  backgroundColor: 'transparent', // needed for gestures to work on android
  borderWidth: 2,
  borderRadius: 3,
  overflow: 'hidden', 
  borderColor: '$pieceBlack',
})

const SquaresOuter = styled(View, {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  position: 'relative',
  backgroundColor: 'transparent', // needed for gestures to work on android
})

const Board: React.FC<{ style?: StyleProp<ViewStyle> }> = ({
  style 
}) => {
  const whiteOnBottom = true // TODO: will be ui state soon :)

  const game = useGame()

    // Squares need to know their size in pt to do internal layout.
    // Instead of forcing each square listen for it's own size changes,
    // we optimize by doing it here and informing them of changes.
    // We are a simple 8x8 grid after all! :)
  const [boardSize, setBoardSize] = useState<number | undefined>(undefined)
  const { layoutListener: layoutListenerDnd, setWhiteOnBottom } = useDnDConfig()

  useEffect(() => {
    setWhiteOnBottom(whiteOnBottom)
  }, [whiteOnBottom])

  const layoutListener = (e: LayoutChangeEvent): void  => {
    const {nativeEvent: { layout: {width}}} = e;
    setBoardSize(width)
    layoutListenerDnd(e)
  }

  return (
    <BoardInner style={style} collapsable={false}>
      <BGImage imageURI={'wood_grain_bg'}  >
        <SquaresOuter onLayout={layoutListener} >
        {game.getBoardAsArray(whiteOnBottom).map((d: SquareDesc) => (
              // See comments above
          <Square desc={d} sizeInLayout={boardSize && boardSize / 8 } key={`key-${d.position.rank}-${d.position.file}`} />
        ))}
        </SquaresOuter>
      </BGImage>
      <DraggingPiece sizeInLayout={boardSize && boardSize * .85 / 8} />
    </BoardInner>
  )
}


const BoardWithDnD: React.FC<{ 
  style?: StyleProp<ViewStyle> 
}> = ({
  style,
}) => (
  <ChessDnDShell>
    <Board style={style} />
  </ChessDnDShell>
)

export default BoardWithDnD
