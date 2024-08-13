// This is just to consolidate all the existing blocks and it's respective jsx
// Always prefer to individually import, the required block or jsx
import { Test } from './Test'
import { Test_Block } from './Test/block'
import { DynamicContent } from './block-components/DynamicContent'
import { List } from './block-components/List'
import { DynamicContent_Block } from './block-configuration/DynamicContent'
import { List_Block } from './block-configuration/List'

export const blocksJSX = {
  Test,
  DynamicContent,
  List,
}

export type SlugType = keyof typeof blocksJSX

export const blocks = [Test_Block, DynamicContent_Block, List_Block]
