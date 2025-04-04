import { UserType } from 'models/auth'

const User_prefix = 'User'

const UserStorage = {
  getUser: (): UserType => {
    if (typeof window === 'undefined') return {} as UserType
    return JSON.parse(
      window.localStorage.getItem(`${User_prefix}`) as string,
    ) as UserType
  },
  setUser: (User: UserType): void => {
    window.localStorage.setItem(`${User_prefix}`, JSON.stringify(User))
  },
  clearUser: (): void => {
    window.localStorage.removeItem(`${User_prefix}`)
  },
}

export { UserStorage }
