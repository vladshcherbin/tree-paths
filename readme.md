# tree-paths

Convert a list of paths into a nested directory tree.

## How it works

This package takes an array of path strings and builds a nested tree structure by grouping shared path segments. Paths are sorted so directories come before their contents, and numeric segments are naturally ordered.

## Features

- **Nested tree** — converts a flat list of paths into a hierarchical tree structure
- **Natural sorting** — directories come before files, numeric segments are ordered correctly
- **Locale-aware** — uses `Intl.Collator` for proper sorting across locales
- **Zero dependencies** — lightweight, pure ESM

## Install

```sh
pnpm add tree-paths
```

```sh
yarn add tree-paths
```

```sh
npm add tree-paths
```

## Usage

### treeifyPaths(paths: string[], parentPath?: string): TreeNode[]

Takes an array of path strings, sorts them, and converts them into a nested directory tree. `parentPath` is optional, defaults to `''`.

#### TreeNode

```ts
interface TreeNode {
  /** Name of this node (e.g. "video.mp4") */
  name: string
  /** Full path from root (e.g. "assets/media/video.mp4") */
  path: string
  /** Direct child nodes */
  children: TreeNode[]
}
```

**Example**:

```ts
import { treeifyPaths } from 'tree-paths'

const paths = [
  'components/input.ts',
  'assets/media/video.mp4',
  'readme.md'
]

treeifyPaths(paths)
```

**Result:**

```ts
[
  {
    name: 'assets',
    path: 'assets',
    children: [
      {
        name: 'media',
        path: 'assets/media',
        children: [
          {
            name: 'video.mp4',
            path: 'assets/media/video.mp4',
            children: []
          }
        ]
      }
    ]
  },
  {
    name: 'components',
    path: 'components',
    children: [
      {
        name: 'input.ts',
        path: 'components/input.ts',
        children: []
      }
    ]
  },
  {
    name: 'readme.md',
    path: 'readme.md',
    children: []
  }
]
```

### sortPaths(paths: string[]): string[]

Takes an array of path strings and returns them sorted using natural, locale-aware comparison.

**Example**:

```ts
import { sortPaths } from 'tree-paths'

const paths = [
  'readme.md',
  'assets/media/video.mp4',
  'components/input.ts',
  'components/button.ts'
]

sortPaths(paths)
```

**Result:**

```ts
[
  'assets/media/video.mp4',
  'components/button.ts',
  'components/input.ts',
  'readme.md'
]
```

## License

MIT