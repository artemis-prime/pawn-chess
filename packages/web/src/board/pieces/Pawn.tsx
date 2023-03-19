  // @ts-ignore
import React from 'react'

import type { PieceComponentProps } from '../Piece'

const Pawn: React.FC<PieceComponentProps> = ({
  color,
  size
}) => (
  <svg
    width={size ? size : '75px'}
    height={size ? size : '75px'}
    viewBox="0 -50 700 700"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fill={color} 
        d="M467.6 446.32h-14c-15.121-50.961-34.16-122.64-47.039-198.24h31.359c20.16 0 36.398-16.238 36.398-36.398s-16.238-36.398-36.398-36.398h-28c19.602-16.801 31.922-41.441 31.922-69.441 0-50.961-41.441-91.84-91.84-91.84-50.402-.004-91.844 41.438-91.844 91.836 0 28 12.879 52.641 31.922 69.441h-28c-20.16 0-36.398 16.238-36.398 36.398 0 20.16 16.238 36.398 36.398 36.398h31.918c-12.879 75.602-31.922 147.28-47.039 198.24h-14c-26.879 0-48.719 21.84-48.719 48.719v35.281c0 8.398 6.719 15.68 15.68 15.68h300.72c8.398 0 15.68-6.719 15.68-15.68v-35.281c-.559-26.875-22.398-48.715-48.719-48.715z" 
      />
    </svg>
)

export default Pawn
