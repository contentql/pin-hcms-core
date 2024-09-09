import { type Block } from 'payload'

type ConfigType = {
  blockConfigurations: Block[]
  blockComponents: { [key: string]: React.ComponentType<any> }
}

// Function to create a type-safe config object
export default function buildConfig<T extends Block[]>({
  blockConfigurations,
  blockComponents,
}: {
  blockConfigurations: T
  blockComponents: { [K in T[number]['slug']]?: React.ComponentType<any> }
}): ConfigType {
  // mapping through the block-config array and filtering if slug is not present in the block-jsx object
  const missingComponents = blockConfigurations
    .map(block => block.slug)
    .filter(slug => !(slug in blockComponents))

  // this will throw an error if the block-jsx is missing
  if (missingComponents.length > 0) {
    throw new Error(
      `Missing block-jsx for config: ${missingComponents.join(', ')}`,
    )
  }

  return {
    blockConfigurations,
    blockComponents: blockComponents as Record<
      string,
      React.ComponentType<any>
    >,
  }
}
