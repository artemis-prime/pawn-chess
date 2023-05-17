import React, { type HTMLProps } from 'react'

import { styled, type CSS, common, deborder } from '~/styles/stitches.config'

import {  
  type WidgetIconDesc,
  WidgetIcon,
  EMPTY_ICON,
  IconMargin,
  IconWidth,
} from '~/primatives'

// Following this: 
// https://m3.material.io/components/navigation-drawer/specs

// https://m3.material.io/styles/typography/type-scale-tokens#d74b73c2-ac5d-43c5-93b3-088a2f67723d
const StyledButton = styled('button', {

  all: 'unset',
  ...common.menu,
  ...deborder('yellow', 'menu'),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  boxSizing: 'border-size',
  cursor: 'pointer',
  outline: 'none',

  '&:hover': {
    backgroundColor: '$menuBGHover'
  },
  '&:active': {
    backgroundColor: '$menuBGPressed'
  },

  variants: {
    spaceForIcon: {
      true: {
        paddingLeft: `${16 + IconWidth + IconMargin}px`
      }
    },
    disabled: {
      true: {
        color: '$menuTextDisabled',
        pointerEvents: 'none'
      }
    }
  }
})

const MenuItem: React.FC<{
  icon?: WidgetIconDesc
  css?: CSS,
} & HTMLProps<HTMLButtonElement>> = ({
  onClick,
  icon,
  css,
  disabled,
  children,
}) => (
    // Was getting very odd typescript issues w ...rest / spread 
  <StyledButton onClick={onClick} disabled={disabled} css={css} spaceForIcon={icon === EMPTY_ICON}>
    {(icon !== EMPTY_ICON) ? <WidgetIcon icon={icon} /> : null}
    {children}
  </StyledButton> 
)

export {
  MenuItem as default,
}
