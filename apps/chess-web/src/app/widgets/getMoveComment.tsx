import React, { type ReactNode } from 'react'

import { ActionRecord, type AnnotatedResult, PIECETYPE_TO_UNICODE } from '@artemis-prime/chess-core'

import { styled } from '~/styles/stitches.config'

import SideSwatch from './SideSwatch'
import EMOJIS from './emojis'

const Outer = styled('span', {})

const Emoji = styled('span', {
  fontSize: '0.8rem',
  variants: {
    lighter: {
      true: {
        borderRadius: '$rounded',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      }
    },
    larger: {
      true: {
        fontSize: '0.9rem',
      }
    },
    large: {
      true: {
        fontSize: '1.0rem',
      }
    }
  }
})

const Text = styled('span', {
  fontSize: 'inherit',
  color: 'inherit'
})

const getMoveComment = (rec: ActionRecord, previous: ActionRecord | undefined): ReactNode => {

  const result: ReactNode[] = [] 
  let check = false
  if (rec.annotatedResult === 'check') {
    check = true
    result.push(
      <Outer css={{color: '$alert9'}} key={rec.move.piece.side + 'one'}>
        <SideSwatch smaller side={rec.move.piece.side}/>
        <Text>:&nbsp;</Text>
        <Emoji>{EMOJIS.fist}</Emoji>
        <Text>!</Text>
      </Outer>
    )
  }
  if (previous?.annotatedResult === 'check') {
    result.push(
      <Outer key={rec.move.piece.side + 'two'}>
        <SideSwatch smaller side={rec.move.piece.side}/>
        <Text>{': phew! '}</Text>
        <Emoji larger lighter>{EMOJIS.ninja}</Emoji>
      </Outer>
    )
  }
  if (rec.action.includes('capture')) {
      // Even though its technically in response to the pawn
      // capture, 'meh' seems odd after a check!
    if (!(check && rec.captured!.type === 'pawn')) {
      result.push(
        <Outer css={{color: rec.captured!.type === 'pawn' ? 'white' : '$alert8'}} key={rec.move.piece.side + 'three'}>
          <SideSwatch smaller side={rec.captured!.side}/>
          {rec.captured!.type === 'pawn' ? (<>
            <Text>{': '}</Text>
            <Emoji larger>{EMOJIS.shrug}</Emoji>
            <Text>{' meh'}</Text>
          </>) : (<>
            <Text>{': '}</Text>
            <Emoji large>{PIECETYPE_TO_UNICODE[rec.captured!.type]}</Emoji>
            <Text>{' ouch!'}</Text>
          </>)}
        </Outer>
      )
    }
  }
  if (result.length === 1) {
    return result[0]
  }
  else if (result.length > 1) {
    return <>{result.map((el, i) => (
      (i === 0) ? el : <><Text>{', '}</Text>{el}</> 
    ))}</>
  }
  return null
}

export default getMoveComment