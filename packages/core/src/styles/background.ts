import * as CSS from 'csstype'
import { Token } from '../css'
import { Configs, configs, transforms } from './config'

export const background: Configs = {
  background: configs.color('background'),
  backgroundColor: configs.color('backgroundColor'),
  backgroundImage: configs.gradient('backgroundImage'),
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundClip: { transform: transforms.bgClip },
  bgSize: configs.prop('backgroundSize'),
  bgPosition: configs.prop('backgroundPosition'),
  bg: configs.color('background'),
  bgColor: configs.color('backgroundColor'),
  bgPos: configs.prop('backgroundPosition'),
  bgRepeat: configs.prop('backgroundRepeat'),
  bgAttachment: configs.prop('backgroundAttachment'),
  bgGradient: configs.gradient('backgroundImage'),
  bgClip: { transform: transforms.bgClip },
}

Object.assign(background, {
  bgImage: background.backgroundImage,
  bgImg: background.backgroundImage,
})

export type BackgroundProps<Y = 'responsive', M = 'colorMode'> = {
  /**
   * The CSS `background` property
   */
  bg?: Token<CSS.Property.Color, 'colors', Y, M>
  /**
   * The CSS `background-clip` property
   */
  bgClip?: Token<CSS.Property.BackgroundClip | 'text', Y, M>
  /**
   * The CSS `background-clip` property
   */
  backgroundClip?: Token<CSS.Property.BackgroundClip | 'text', Y, M>
  /**
   * The CSS `background` property
   */
  background?: Token<CSS.Property.Color, 'colors', Y, M>
  /**
   * The CSS `background-color` property
   */
  bgColor?: Token<CSS.Property.Color, 'colors', Y, M>
  /**
   * The CSS `background-color` property
   */
  backgroundColor?: Token<CSS.Property.Color, 'colors', Y, M>
  /**
   * The CSS `background-image` property
   */
  backgroundImage?: Token<CSS.Property.BackgroundImage, 'gradients', Y, M>
  /**
   * The CSS `background-image` property
   */
  bgGradient?: Token<CSS.Property.BackgroundImage, 'gradients', Y, M>
  /**
   * The CSS `background-size` property
   */
  backgroundSize?: Token<CSS.Property.BackgroundSize | number, unknown, Y, M>
  /**
   * The CSS `background-position` property
   */
  backgroundPosition?: Token<CSS.Property.BackgroundPosition | number, unknown, Y, M>
  /**
   * The CSS `background-image` property
   */
  bgImage?: Token<CSS.Property.BackgroundImage, 'gradients', Y, M>
  /**
   * The CSS `background-image` property
   */
  bgImg?: Token<CSS.Property.BackgroundImage, 'gradients', Y, M>
  /**
   * The CSS `background-repeat` property
   */
  bgRepeat?: Token<CSS.Property.BackgroundRepeat, unknown, Y, M>
  /**
   * The CSS `background-repeat` property
   */
  backgroundRepeat?: Token<CSS.Property.BackgroundRepeat, unknown, Y, M>
  /**
   * The CSS `background-size` property
   */
  bgSize?: Token<CSS.Property.BackgroundSize | number, unknown, Y, M>
  /**
   * The CSS `background-attachment` property
   */
  bgAttachment?: Token<CSS.Property.BackgroundAttachment, unknown, Y, M>
  /**
   * The CSS `background-attachment` property
   */
  backgroundAttachment?: Token<CSS.Property.BackgroundAttachment, unknown, Y, M>
  /**
   * The CSS `background-position` property
   */
  bgPos?: Token<CSS.Property.BackgroundPosition | number, unknown, Y, M>
  /**
   * The CSS `background-position` property
   */
  bgPosition?: Token<CSS.Property.BackgroundPosition | number, unknown, Y, M>
}
