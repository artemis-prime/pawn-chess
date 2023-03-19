  // @ts-ignore
import React from 'react'

import type { PieceComponentProps } from '../Piece'

const Queen: React.FC<PieceComponentProps> = ({
  color,
  size
}) => (
  <svg
  width={size ? size : '75px'}
  height={size ? size : '75px'}
  viewBox="0 -50 700 700"
  xmlns="http://www.w3.org/2000/svg"
>
  <g fill={color} fillRule="evenodd">
    <path d="m271.4 476.05h157.19c29.258 0 54.945 27.297 35.707 51.727l22.262 32.223h-273.12l22.254-32.215c-19.242-24.402 6.4492-51.734 35.707-51.734z"/>
    <path d="m422.54 130.62c-10.984 35.262-18.344 70.105-22.305 104.6h13.871c21.465 0 21.465 32.445 0 32.445h-16.602c-3.7227 69.59 6.3359 137.73 28.387 204.76h-151.79c22.051-67.031 32.109-135.17 28.379-204.76h-16.602c-21.465 0-21.465-32.445 0-32.445h13.871c-3.957-34.492-11.32-69.34-22.305-104.6-13.828-1.0547-24.531-8.2109-24.531-16.887 0-9.3867 12.555-17.004 28.043-17.004 9.9922 0 18.754 3.168 23.727 7.9375 4.9688-4.7695 13.742-7.9375 23.734-7.9375 8.6719 0 16.426 2.3867 21.57 6.1328 5.1445-3.75 12.902-6.1328 21.57-6.1328 9.9922 0 18.762 3.168 23.734 7.9375 4.9688-4.7695 13.734-7.9375 23.727-7.9375 15.488 0 28.043 7.6133 28.043 17.004 0 8.6758-10.695 15.832-24.531 16.887z"/>
    <path d="m349.99 0c22.691 0 41.078 18.387 41.078 41.078 0 22.684-18.387 41.078-41.078 41.078-22.684 0-41.074-18.395-41.074-41.078 0-22.691 18.387-41.078 41.074-41.078z"/>
  </g>
</svg>
)

export default Queen

