# Blocks configuration and usage

1. Create a blocks folder in `src/payload`
2. Create a individual block folder in `src/payload/blocks` example: hero
3. Each block folder consists of 3 files
   - component.tsx (your jsx component)
   - config.js (your block configuration)
   - index.ts (which will be a export of the component & config file, this will
     simply the import process in cql.config.ts file)
4. If you already have a `cql.config.ts` file in root folder it's fine,
   otherwise create a clone `cql-example.config.ts` file and rename that to
   `cql.config.ts`
5. import your block configuration, jsx here in `cql.config.ts file`
6. add block-jsx in blockComponents field & block-config in blockConfigurations
   field, that's it!
