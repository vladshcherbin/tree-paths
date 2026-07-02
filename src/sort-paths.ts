const collator = new Intl.Collator([], { numeric: true, sensitivity: 'base' })

export default function sortPaths(paths: string[]) {
  return paths.toSorted((a, b) => {
    const aSegments = a.split('/')
    const bSegments = b.split('/')
    const minLength = Math.min(aSegments.length, bSegments.length)

    for (let index = 0; index < minLength; index++) {
      const aHasMoreSegments = index < aSegments.length - 1
      const bHasMoreSegments = index < bSegments.length - 1

      if (aHasMoreSegments !== bHasMoreSegments) {
        return aHasMoreSegments ? -1 : 1
      }

      const comparison = collator.compare(aSegments[index]!, bSegments[index]!)

      if (comparison !== 0) {
        return comparison
      }
    }

    return aSegments.length - bSegments.length
  })
}
