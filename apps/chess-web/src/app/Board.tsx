  // @ts-ignore
import React from 'react'
import type { CSS } from '@stitches/react'
import { DragOverlay } from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'

import type { SquareDesc } from '@artemis-prime/chess-core'

import { Box } from '~/primitives'
import { useBoardOrientation, useGame } from '~/service'

import { ChessDnDShell } from './board/ChessDnD'
import Square from './board/Square'
import DraggingPiece from './board/DraggingPiece'

const Board: React.FC<{ css?: CSS }> = ({css}) => {

  const game = useGame()
  const { whiteOnBottom } = useBoardOrientation()

  return (
    <ChessDnDShell>
      <Box className={'board'} css={css}>
      {game.getBoardAsArray(whiteOnBottom).map((d: SquareDesc) => (
        <Square desc={d} key={`key-${d.position.rank}-${d.position.file}`} />
      ))}
      </Box>
      <DragOverlay modifiers={[snapCenterToCursor]}>
        <DraggingPiece size={70}  /> 
      </DragOverlay>
    </ChessDnDShell>
  )
}

export default Board
