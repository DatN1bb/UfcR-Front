import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { UserType } from 'models/auth'
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'
import {
  CreateUserFields,
  UpdateUserFields,
} from 'hooks/react-hook-form/useCreateUpdateUser'

export const fetchUsers= async () =>
  apiRequest<undefined, void>('post', apiRoutes.FETCH_Users)

export const fetchUsersi = async (pageNumber: number) =>
  apiRequest<number, UserType[]>(
    'get',
    `${apiRoutes.FETCH_Users}?page=${pageNumber}`,
  )

export const signout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data)

export const register = async (data: RegisterUserFields) =>
  apiRequest<RegisterUserFields, void>('post', apiRoutes.SIGNUP, data)

export const refreshTokens = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.REFRESH_TOKENS)

export const uploadAvatar = async (formData: FormData, id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${id}`,
    formData,
  )

export const createUser= async (data: CreateUserFields) =>
  apiRequest<CreateUserFields, void>('post', apiRoutes.Users_PREFIX, data)

export const updateUser= async (data: UpdateUserFields, id: string) =>
  apiRequest<UpdateUserFields, void>(
    'patch',
    `${apiRoutes.Users_PREFIX}/${id}`,
    data,
  )

export const deleteUser= async (id: string) =>
  apiRequest<string, UserType>('delete', `${apiRoutes.Users_PREFIX}/${id}`)
