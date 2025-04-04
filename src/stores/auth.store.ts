import { makeAutoObservable } from 'mobx'
import { UserType } from 'models/auth'
import { UserStorage } from 'utils/localStorage'

export interface AuthContextType {
  user?: UserType | null
  login: () => void
  signout: () => void
}

class AuthStore {
  user?: UserType | null = UserStorage.getUser() || null

  constructor() {
    makeAutoObservable(this)
  }

  login(User: UserType) {
    UserStorage.setUser(User)
    this.user= User
  }

  signout() {
    UserStorage.clearUser()
    this.user= undefined
  }
}

const authStore = new AuthStore()
export default authStore
