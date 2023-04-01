  // @ts-ignore
import React from 'react'
import { observer } from 'mobx-react'

import ScrollableFeed from 'react-scrollable-feed' 

import type { ConsoleMessage } from '~/board/VisualFeedback'

import { useVisualFeedback } from '~/board/VisualFeedback'
import unicodePieces from './pieceTypeToUnicode'

import '../styles/messages.scss'
  // TS workaround for put in module
const Scrollable = ScrollableFeed as any

const EMOJIS = {
  ninja: '\u{1f977}',
  shrug: '\u{1F937}\u200D\u2642\uFE0F',
  ouch: '\u{1F64E}\u200D\u2642\uFE0F'
}

const Messages: React.FC<{
  showMoves: boolean
}> = observer(({
  showMoves
}) => {

  const { messages } = useVisualFeedback()

  const getIndentation = (m: ConsoleMessage): string => (
    m.type.includes('undo') || 
    m.type.includes('redo') || 
    (m.type === 'check') ||
    m.type.includes('transient')
    ? 'indent' : ''
  )

  const getMessagePrefix = (m: ConsoleMessage): React.ReactNode | null => {
    if (m.type.includes('undo')) return (<span className='prefix'>(undo:)</span>)
    if (m.type.includes('redo')) return (<span className='prefix'>(redo:)</span>)
    if (m.type === 'check') return (
      <span className='prefix'>
        <span className='loud'>Check!</span><span className={`side-indicator ${m.note!.side}`} />
      </span>)
    return null
  }

  const getMessagePostfixElement = (m: ConsoleMessage): React.ReactNode | null => {
      // not in check output takes precedence over capture!
    if (m.type.includes('not-in-check')) {
      // ninja emoji
      return m.type.includes('undo') ? null : (<span className='postfix'>(phew! <span className='emoji'>{EMOJIS.ninja}</span>)</span>)  
    }
    else if (m.type.includes('capture')) {
      const pieceType = m.actionRecord!.captured!.type
      const colorCaptured = m.actionRecord!.captured!.color
      return (
        <span className='postfix'>
          <span className={`side-indicator ${colorCaptured}`} />
          <span>(<span className={`unicode-chess-piece ${colorCaptured}`}>{(unicodePieces as any)[pieceType]}</span>
            - {pieceType !== 'pawn' ? `${EMOJIS.ouch} ouch!` : `${EMOJIS.shrug} meh`})</span>
        </span>
      ) 
    }
    return null
  }

  const isMove = (m: ConsoleMessage) => (
    !!m.actionRecord
  )

  return messages.length > 0 ? (<>
    <p>----------------------</p>
    <Scrollable className='messages-list'>
    {messages.map((m, i) => {
      if (!showMoves && isMove(m)) return null
      const postFix = getMessagePostfixElement(m)
      return (
        <div key={i} className={`message-outer ${getIndentation(m)} ${postFix ? 'has-postfix' : 'no-postfix'} ${m.type}`}>
          <p className='message-and-prefix'>
            {getMessagePrefix(m)}
            <span className='message'>{m.message}</span>
          </p>
          {postFix && <p className='message-postfix'>{postFix}</p>}
        </div>
      )
    })}
    </Scrollable>
  </>) : <></>
})

export default Messages
