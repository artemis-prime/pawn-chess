import { useContext } from 'react'

import type BoardOrientation from './BoardOrientation'
import { UIServicesContext } from './UIServicesProvider'

const useBoardOrientation = (): BoardOrientation =>  {
  return useContext(UIServicesContext) as BoardOrientation
}

export default useBoardOrientation
