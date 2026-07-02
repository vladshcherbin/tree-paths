import createTree from './create-tree.ts'
import sortPaths from './sort-paths.ts'

function treeifyPaths(paths: string[], parentPath = '') {
  return createTree(sortPaths(paths), parentPath)
}

export { sortPaths, treeifyPaths }
