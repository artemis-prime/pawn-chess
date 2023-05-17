import React, { type PropsWithChildren, useState } from 'react'
import { 
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import type WidgetIconDesc from './WidgetIconDesc'

interface CheckboxViewProps extends PropsWithChildren {
  checked: boolean,
  pressed: boolean,
  disabled: boolean | null, // to match type of Pressable prop
  icon?: WidgetIconDesc
  style?: StyleProp<ViewStyle>
}

const CheckboxShell: React.FC<{
  view: React.ComponentType<CheckboxViewProps>
  checked: boolean
  setChecked: (b: boolean) => void
  icon?: WidgetIconDesc
  style?: StyleProp<ViewStyle>
} & PropsWithChildren & PressableProps> = ({
  view,
  checked,
  setChecked,
  style,
  icon, 
  disabled = false,
  children,
  ...rest
}) => {

  const [pressed, setPressed] = useState<boolean>(false)

  const CheckboxView = view // must convert the referenced variable to uppercase

  const onPressIn = (e: GestureResponderEvent): void => {
    setPressed(true)
  }

  const onPressOut = (e: GestureResponderEvent): void => {
    setPressed(false)
  }

  const onPress = (e: GestureResponderEvent): void => {
    setChecked(!checked)
  }

  return (
    <Pressable {...rest} {...{onPressIn, onPressOut, onPress, disabled: !!disabled}} >
      <CheckboxView {...{checked, pressed, disabled, icon}} style={style} >
        {children}
      </CheckboxView>
    </Pressable>
  )
}

export {
  CheckboxShell as default,
  type CheckboxViewProps,
}
