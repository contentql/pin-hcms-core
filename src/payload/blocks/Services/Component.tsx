import { Params } from '../types'
import { ServiceType } from '@payload-types'

// Step 2: Create an interface with params type
interface ServiceProps extends ServiceType {
  params: Params
}

// Make sure this be named export with proper name
export const Service = (props: ServiceProps) => {
  console.log({ props })

  return <div>Component</div>
}
