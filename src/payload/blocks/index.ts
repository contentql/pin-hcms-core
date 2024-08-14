// This is just to consolidate all the existing blocks and their respective JSX components
// Always prefer to individually import the required block or JSX in other parts of your application
// Importing the block components and its configurations
import { Details, DetailsConfig } from './Details'
import { List, ListConfig } from './List'
import { Test, TestConfig } from './Test'

// Exporting an object that maps block names (as keys) to their corresponding JSX components (as values)
// This object allows dynamic rendering of components based on the block names
export const blocksJSX = {
  Test,
  Details,
  List,
}

// Exporting an array that consolidates all block configurations
// This array is useful for registering or iterating over all blocks and their configurations in one place
export const blocks = [TestConfig, DetailsConfig, ListConfig]
