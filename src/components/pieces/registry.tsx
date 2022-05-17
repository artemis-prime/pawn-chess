import React from 'react'

import { PieceType, Color } from '../../domain/types'

import Pawn from './Pawn' 
import Queen from './Queen' 
import Bishop from './Bishop' 
import Rook from './Rook'

interface PieceRenderer {
  (c: Color): React.ReactNode
}

export default new Map<PieceType, PieceRenderer>([
  ['pawn', (c: Color) => (<Pawn color={c}/>)],
  ['queen', (c: Color) => (<Queen color={c}/>)],
  ['bishop', (c: Color) => (<Bishop color={c}/>)],
  ['rook', (c: Color) => (<Rook color={c}/>)]
])
