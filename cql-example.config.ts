import buildConfig from '@/cql/buildConfig'
import { Details, DetailsConfig } from '@/payload/blocks/Details'
import { Home, HomeConfig } from '@/payload/blocks/Home'
import { List, ListConfig } from '@/payload/blocks/List'

// This is a default configuration file
// create a new configuration file in root directory called cql.config.ts
export default buildConfig({
  blockConfigurations: [HomeConfig, DetailsConfig, ListConfig],
  blockComponents: {
    Home,
    Details,
    List,
  },
})
