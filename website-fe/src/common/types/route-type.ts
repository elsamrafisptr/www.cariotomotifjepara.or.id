type RouteItem = {
  path: string
  label?: string
}

type RouteTree = {
  [key: string]: RouteItem | RouteTree
}

export type { RouteItem, RouteTree }
