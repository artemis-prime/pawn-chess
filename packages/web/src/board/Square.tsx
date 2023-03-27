import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useDrop } from 'react-dnd'

import type { Position, Piece } from '@artemis-prime/chess-domain'
import { FILES, positionsEqual } from '@artemis-prime/chess-domain'

import { useGame } from './GameProvider'
import PieceComponent from './Piece'
import { useVisualFeedback } from './VisualFeedback'
import { type DnDPiece, DND_ITEM_NAME } from './DnDPiece'

const SquareComponent: React.FC<{ 
  position: Position
  piece?: Piece | null
}> = observer(({ 
  position : pos,
  piece
}) => {

  const game = useGame()
  const feedback = useVisualFeedback()
  const [rookSquareCastling, setRookSquareCastling] = useState<'from' | 'to' | null>(null)
  const [inCheckFromHere, setInCheckFromHere] = useState<boolean>(false)
  const [kingInCheckHere, setKingInCheckHere] = useState<boolean>(false)

  const [props, drop] = useDrop(
    () => ({
      accept: DND_ITEM_NAME,
      drop: (item: DnDPiece, monitor) => { game.takeAction({piece: item.piece, from: item.from, to: pos})},
      canDrop: (item: DnDPiece, monitor) => {
        return !!game.resolveAction({piece: item.piece, from: item.from, to: pos}); 
      },
    }),
    [pos]
  )

  useEffect(() => {
    let imACastlingRookSquare: 'from' | 'to' | null = null
    if (feedback.action === 'castle') {

      if (positionsEqual(pos, feedback.note.rooks.from)) {
        imACastlingRookSquare = 'from'  
      } 
      else if (positionsEqual(pos, feedback.note.rooks.to)) {
        imACastlingRookSquare = 'to'  
      }
    } 
    setRookSquareCastling(imACastlingRookSquare) 
  }, [feedback.action, pos] )

  useEffect(() => {
    const kingInCheckHere_ = !!feedback.kingInCheck && (feedback.kingInCheck.file === pos.file && feedback.kingInCheck.rank === pos.rank)
    if (kingInCheckHere_ !== kingInCheckHere) {
      setKingInCheckHere(kingInCheckHere_)
    }
    const inCheckFromMe = !!feedback.inCheckFrom.find((e) => (e.file === pos.file && e.rank === pos.rank)) 
    if (inCheckFromHere != inCheckFromMe) {
      setInCheckFromHere(inCheckFromMe) 
    }
  },[feedback.inCheckFrom, feedback.kingInCheck])

  let effectClass = ''

  if (feedback.action && positionsEqual(feedback.note.to, pos)) {
    if (feedback.action === 'capture') {
      effectClass = 'capture' 
    }
    else if (feedback.action && feedback.action.includes('promote')) {
      effectClass = 'promote' 
    }
      // castle in this case means we're the king's pos (not the rooks')
    else if (feedback.action === 'move' || (feedback.action === 'castle' && !rookSquareCastling)) {
      effectClass = 'move-or-castle'
    }
  }
  else if (rookSquareCastling) {
    effectClass = `castling-rook ${rookSquareCastling}`
  } 

  if (kingInCheckHere) {
    effectClass = 'in-check in-check-king'
  }
  else if (inCheckFromHere) {
    effectClass = 'in-check in-check-from'
  }

  return (
    <div 
      ref={drop}
      style={{ position: 'relative' }}
      className={`square rank-${pos.rank} rank-${(pos.rank % 2) ? 'odd' : 'even'} ` +
        `file-${pos.file} file-${(FILES.indexOf(pos.file) % 2) ? 'even' : 'odd'}` 
      }
    >
      <div  
        style={{
          position: 'absolute', 
          top: 0, 
          bottom: 0, 
          left: 0, 
          right: 0,
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center', 
        }} 
        className={`effects ${effectClass}`}
      >
      {(!!piece) && (
        <PieceComponent position={pos} piece={piece} />  
      )}
      </div>
    </div>  
  )
})

export default SquareComponent
