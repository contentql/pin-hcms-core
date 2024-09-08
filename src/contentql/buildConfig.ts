import { type Block } from 'payload'

type ConfigType = {
  blockConfig: Block[]
  blockElement: { [key: string]: React.ComponentType<any> }
}

// Function to create a type-safe config object
export default function buildConfig<T extends Block[]>({
  blockConfig,
  blockElement,
}: {
  blockConfig: T
  blockElement: { [K in T[number]['slug']]?: React.ComponentType<any> }
}): ConfigType {
  // mapping through the block-config array and filtering if slug is not present in the block-jsx object
  const missingComponents = blockConfig
    .map(block => block.slug)
    .filter(slug => !(slug in blockElement))

  // this will throw an error if the block-jsx is missing
  if (missingComponents.length > 0) {
    throw new Error(
      `Missing block-jsx for config: ${missingComponents.join(', ')}`,
    )
  }

  return {
    blockConfig,
    blockElement: blockElement as Record<string, React.ComponentType<any>>,
  }
}
