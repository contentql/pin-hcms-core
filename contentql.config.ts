import buildConfig from '@/contentql/buildConfig'
import Details from '@/payload/blocks/Details/component'
import DetailsConfig from '@/payload/blocks/Details/config'
import Home from '@/payload/blocks/Home/component'
import HomeConfig from '@/payload/blocks/Home/config'
import List from '@/payload/blocks/List/component'
import ListConfig from '@/payload/blocks/List/config'

// Create the config
export default buildConfig({
  blockConfig: [HomeConfig, DetailsConfig, ListConfig],
  blockElement: {
    Home,
    Details,
    List,
  },
})
