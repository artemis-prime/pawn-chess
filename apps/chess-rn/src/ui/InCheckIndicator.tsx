// @ts-ignore
import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { autorun } from 'mobx'

import { positionToString } from '@artemis-prime/chess-core'

import { useTheme } from '~/conf/stitches.config'
import ui from '~/conf/conf'
import { useGame } from '~/board/GameProvider'

const InCheckIndicator: React.FC = () => {

  const game = useGame()
  const theme = useTheme()
  const [squaresString, setSquaresString] = useState<string>('')

    // Note that autorun returns a cleanup function that deletes the created listener
    // This is advised by mobx docs: https://mobx.js.org/reactions.html
  useEffect(() => (autorun(() => {
    let str = ''
    const inCheckResult = game.inCheck
    if (inCheckResult) {
      str = inCheckResult.from.reduce((acc, current, i) => (
        ((i > 0) ? ', ' : '') + acc + positionToString(current)
      ), '')
    }
    setSquaresString(str)
  })), [])

  return !!squaresString ? (
    <Text style={{...ui.typography.common, color: theme.colors.alert9}}>
      {`In check from ${squaresString}!`}
    </Text> 
  ) : null
}

export default InCheckIndicator
