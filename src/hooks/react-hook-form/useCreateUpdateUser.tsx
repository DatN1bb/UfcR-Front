import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { UporabnikType } from 'models/auth'

export interface CreateUporabnikFields {
  username: string
  email: string
  password: string
  confirm_password: string
}

export interface UpdateUporabnikFields {
  username: string
  email: string
  password: string
  confirm_password: string
  role_id: string
}

interface Props {
  defaultValues?: UporabnikType
}

export const useCreateUpdateUporabnikForm = ({ defaultValues }: Props) => {
  const CreateUporabnikSchema = Yup.object().shape({
    username: Yup.string().notRequired(),
    email: Yup.string().email().required('Please enter a valid email'),
    password: Yup.string()
      .matches(
        /^(?=.*\d)[A-Za-z. \s_-]+[\w~@#$%^&*+=`[{};;!.?"()[\]-]{6,}/,
        'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters.',
      )
      .required(),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords do not match')
      .required('Passwords do not match'),
    role_id: Yup.string().required('Role field is required'),
  })

  const UpdateUporabnikSchema = Yup.object().shape({
    username: Yup.string().notRequired(),
    email: Yup.string().email().required('Please enter a valid email'),
    password: Yup.string().notRequired(),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords do not match')
      .notRequired(),
    role_id: Yup.string().notRequired(),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      role_id: '',
      ...defaultValues,
    },
    mode: 'onSubmit',
    resolver: defaultValues
      ? yupResolver(UpdateUporabnikSchema)
      : yupResolver(CreateUporabnikSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
  }
}

export type CreateUpdateRoleFields = ReturnType<typeof useCreateUpdateUporabnikForm>
