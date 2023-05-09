interface IconAndStyles {
  icon: string 
  style: any
}

  // 'empty' means offset the text as if an icon is there,
  // (to align with other menu items)
type UnicodeIcon = 'empty' | string | IconAndStyles

export {
  type UnicodeIcon as default,
  type IconAndStyles
}
