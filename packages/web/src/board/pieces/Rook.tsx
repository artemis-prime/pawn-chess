  // @ts-ignore
import React from 'react'

import type { PieceComponentProps } from '../Piece'

const Rook: React.FC<PieceComponentProps> = ({
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
      d="m460.32 443.52h-1.6797l8.9609-20.16c5.6016-12.32 5.0391-26.32-0.55859-38.078-18.484-40.32-61.602-136.08-72.805-217.28h48.16c14.559 0 25.762-11.762 25.762-25.762 0-9.5195-5.0391-17.359-12.32-21.84l16.801-99.121c0.55859-3.9219-2.2383-7.2812-6.1602-7.2812h-47.602c-3.3594 0-6.1602 2.2383-6.1602 5.6016l-5.6016 55.441h-31.359l2.8008-54.32c0-3.9219-2.8008-6.7188-6.1602-6.7188h-42c-3.9219 0-6.7188 2.8008-6.1602 6.7188l2.8008 54.32h-31.359l-6.1602-55.441c-0.55859-3.3594-3.3594-5.6016-6.1602-5.6016h-47.602c-3.9219 0-6.7188 3.3594-6.1602 7.2812l16.801 99.121c-7.2812 4.4805-12.32 12.32-12.32 21.84 0 14.559 11.762 25.762 25.762 25.762h48.16c-11.199 81.199-54.32 176.96-73.359 216.72-5.6016 11.762-6.1602 25.762-0.55859 38.078l8.9609 20.16h-1.6797c-33.602 0-60.48 26.879-60.48 60.48v31.922c0 5.6016 4.4805 10.078 10.078 10.078h321.44c5.6016 0 10.078-4.4805 10.078-10.078v-31.359c-1.6797-33.602-28.559-60.48-62.16-60.48z"
    />
  </svg>
)

export default Rook

