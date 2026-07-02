/** A single node in the parsed path tree */
export interface TreeNode {
  /**
   * Direct child nodes
   * @example []
   */
  children: TreeNode[]

  /**
   * Name of this node
   * @example "video.mp4"
   */
  name: string

  /**
   * Full path from root
   * @example "assets/media/video.mp4"
   */
  path: string
}

export default function createTree(paths: string[], parentPath = ''): TreeNode[] {
  const groups = Map.groupBy(paths, (path) => path.split('/').at(0)!)

  return [...groups].map(([name, entries]) => {
    const path = parentPath ? `${parentPath}/${name}` : name
    const subPaths: string[] = []

    for (const entry of entries) {
      const [, ...rest] = entry.split('/')

      if (rest.length) {
        subPaths.push(rest.join('/'))
      }
    }

    return {
      children: subPaths.length ? createTree(subPaths, path) : [],
      name,
      path
    }
  })
}
