# vite-plugin-prevent-debug

Preventing debugging

## 📦 Install

```shell
pnpm add vite-plugin-env-parse -D
```

## 🦄 Usage

Add preventDebug plugin to vite.config.js / vite.config.ts and configure it:

```ts
// vite.config.js / vite.config.ts
import { preventDebug } from 'vite-plugin-prevent-debug'

export default {
  plugins: [preventDebug()]
}
```

## API

### EnvParseOptions

| Property       | Type                | Description                                                                        |
| -------------- | ------------------- | ---------------------------------------------------------------------------------- |
| `exclude`      | `string[]`          | A list of environment variable keys to exclude from parsing. Optional.             |
| `parseJson`    | `boolean`           | Whether to parse JSON strings into JSON objects. Defaults to `true`. Optional.     |
| `customParser` | `CustomTransformer` | A custom transformer function for parsing environment variables. Optional.         |
| `dtsPath`      | `string`            | The file path for generating the `.d.ts` file. Defaults to `'env.d.ts'`. Optional. |
