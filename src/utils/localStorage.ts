import { UporabnikType } from 'models/auth'

const uporabnik_prefix = 'uporabnik'

const uporabnikStorage = {
  getUporabnik: (): UporabnikType => {
    if (typeof window === 'undefined') return {} as UporabnikType
    return JSON.parse(
      window.localStorage.getItem(`${uporabnik_prefix}`) as string,
    ) as UporabnikType
  },
  setUporabnik: (uporabnik: UporabnikType): void => {
    window.localStorage.setItem(`${uporabnik_prefix}`, JSON.stringify(uporabnik))
  },
  clearUporabnik: (): void => {
    window.localStorage.removeItem(`${uporabnik_prefix}`)
  },
}

export { uporabnikStorage }
