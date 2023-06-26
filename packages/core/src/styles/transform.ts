import * as CSS from 'csstype'
import { Token } from '../css'
import { Configs } from './config'

export const transform: Configs = {
  clipPath: true,
  transform: true,
  transformOrigin: true,
}

export type TransformProps<Y = 'responsive', M = 'colorMode'> = {
  /**
   * The CSS `clip-path` property
   */
  clipPath?: Token<CSS.Property.ClipPath, unknown, Y, M>
  /**
   * The CSS `transform` property
   */
  transform?: Token<CSS.Property.Transform, unknown, Y, M>
  /**
   * The CSS `transform-origin` property
   */
  transformOrigin?: Token<CSS.Property.TransformOrigin | number, 'sizes', Y, M>
}
