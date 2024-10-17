// This is just to consolidate all the existing blocks and their respective JSX components
// Always prefer to individually import the required block or JSX in other parts of your application
// Importing the block components and its configurations
import { DetailsConfig } from './Details'
import { FormConfig } from './Form'
import { HomeConfig } from './Home'
import { ListConfig } from './List'

// Exporting an array that consolidates all block configurations
// This array is useful for registering or iterating over all blocks and their configurations in one place
export const blocks = [HomeConfig, DetailsConfig, ListConfig, FormConfig]
