import { makeAutoObservable } from 'mobx'
import { UporabnikType } from 'models/auth'
import { uporabnikStorage } from 'utils/localStorage'

export interface AuthContextType {
  uporabnik?: UporabnikType | null
  login: () => void
  signout: () => void
}

class AuthStore {
  uporabnik?: UporabnikType | null = uporabnikStorage.getUporabnik() || null

  constructor() {
    makeAutoObservable(this)
  }

  login(uporabnik: UporabnikType) {
    uporabnikStorage.setUporabnik(uporabnik)
    this.uporabnik = uporabnik
  }

  signout() {
    uporabnikStorage.clearUporabnik()
    this.uporabnik = undefined
  }
}

const authStore = new AuthStore()
export default authStore
