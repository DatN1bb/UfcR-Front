export type UserType = {
  id: string
  username: string
  email: string
  role?: {
    id: string
    name: string
  }
  avatar?: string
}
