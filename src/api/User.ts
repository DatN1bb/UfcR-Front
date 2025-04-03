import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { LoginUporabnikFields } from 'hooks/react-hook-form/useLogin'
import { UporabnikType } from 'models/auth'
import { RegisterUporabnikFields } from 'hooks/react-hook-form/useRegister'
import {
  CreateUporabnikFields,
  UpdateUporabnikFields,
} from 'hooks/react-hook-form/useCreateUpdateUser'

export const fetchUporabniki= async () =>
  apiRequest<undefined, void>('post', apiRoutes.FETCH_UPORABNIKI)

export const fetchUporabnikii = async (pageNumber: number) =>
  apiRequest<number, UporabnikType[]>(
    'get',
    `${apiRoutes.FETCH_UPORABNIKI}?page=${pageNumber}`,
  )

export const signout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)

export const login = async (data: LoginUporabnikFields) =>
  apiRequest<LoginUporabnikFields, UporabnikType>('post', apiRoutes.LOGIN, data)

export const register = async (data: RegisterUporabnikFields) =>
  apiRequest<RegisterUporabnikFields, void>('post', apiRoutes.SIGNUP, data)

export const refreshTokens = async () =>
  apiRequest<undefined, UporabnikType>('get', apiRoutes.REFRESH_TOKENS)

export const uploadAvatar = async (formData: FormData, id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${id}`,
    formData,
  )

export const createUporabnik= async (data: CreateUporabnikFields) =>
  apiRequest<CreateUporabnikFields, void>('post', apiRoutes.UPORABNIKI_PREFIX, data)

export const updateUporabnik= async (data: UpdateUporabnikFields, id: string) =>
  apiRequest<UpdateUporabnikFields, void>(
    'patch',
    `${apiRoutes.UPORABNIKI_PREFIX}/${id}`,
    data,
  )

export const deleteUporabnik= async (id: string) =>
  apiRequest<string, UporabnikType>('delete', `${apiRoutes.UPORABNIKI_PREFIX}/${id}`)
