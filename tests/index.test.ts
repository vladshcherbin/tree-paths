import { deepStrictEqual } from 'node:assert/strict'
import { test } from 'node:test'
import { sortPaths, treeifyPaths } from '../src/index.ts'

await test('treeifyPaths', () => {
  const paths = [
    'components/input.ts',
    'assets/media/video.mp4',
    'readme.md'
  ]

  const expected = [
    {
      children: [
        {
          children: [
            {
              children: [],
              name: 'video.mp4',
              path: 'assets/media/video.mp4'
            }
          ],
          name: 'media',
          path: 'assets/media'
        }
      ],
      name: 'assets',
      path: 'assets'
    },
    {
      children: [
        {
          children: [],
          name: 'input.ts',
          path: 'components/input.ts'
        }
      ],
      name: 'components',
      path: 'components'
    },
    {
      children: [],
      name: 'readme.md',
      path: 'readme.md'
    }
  ] as const

  deepStrictEqual(treeifyPaths(paths), expected)
})

await test('sortPaths', () => {
  const paths = [
    'readme.md',
    'assets/media/video.mp4',
    'components/input.ts',
    'components/button.ts'
  ]

  const expected = [
    'assets/media/video.mp4',
    'components/button.ts',
    'components/input.ts',
    'readme.md'
  ] as const

  deepStrictEqual(sortPaths(paths), expected)
})

await test('sortPaths with duplicate paths', () => {
  const paths = [
    'readme.md',
    'components/button.ts',
    'readme.md'
  ]

  const expected = [
    'components/button.ts',
    'readme.md',
    'readme.md'
  ] as const

  deepStrictEqual(sortPaths(paths), expected)
})
