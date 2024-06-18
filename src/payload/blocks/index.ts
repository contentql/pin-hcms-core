// This is just to consolidate all the existing blocks and it's respective jsx
// Always prefer to individually import, the required block or jsx
import { Test } from '@/payload/blocks/Test'
import { Test_Block } from '@/payload/blocks/Test/block'

export const blocksJSX = {
  Test,
}

export type SlugType = keyof typeof blocksJSX

export const blocks = [Test_Block]
