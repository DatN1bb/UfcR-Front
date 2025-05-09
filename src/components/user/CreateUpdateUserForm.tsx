import {
  CreateUserFields,
  UpdateUserFields,
  useCreateUpdateUserForm,
} from 'hooks/react-hook-form/useCreateUpdateUser'
import { useState, FC, ChangeEvent, useEffect } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { useNavigate } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import FormLabel from 'react-bootstrap/FormLabel'
import { Form } from 'react-bootstrap'
import { routes } from 'constants/routesConstants'
import Button from 'react-bootstrap/Button'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import authStore from 'stores/auth.store'
import Avatar from 'react-avatar'
import { observer } from 'mobx-react'
import { UserType } from 'models/auth'
import { useQuery } from 'react-query'
import { RoleType } from 'models/role'

interface Props {
  defaultValues?: UserType & { isActiveUser?: boolean }
}

const CreateUpdateUserForm: FC<Props> = ({ defaultValues }) => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useCreateUpdateUserForm({
    defaultValues,
  })
  const { data: rolesData } = useQuery(['roles'], API.fetchRoles)
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const [file, SetFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

  const onSubmit = handleSubmit(
    async (data: CreateUserFields | UpdateUserFields) => {
      if (!defaultValues) await handleAdd(data as UpdateUserFields)
      else await handleUpdate(data as UpdateUserFields)
    },
  )

  const handleAdd = async (data: CreateUserFields) => {
    if (!file) return
    const response = await API.login(data)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      // Upload avatar
      const formData = new FormData()
      formData.append('avatar', file, file.name)
      const fileResponse = await API.uploadAvatar(formData, response.data.id)
      if (fileResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(fileResponse.data.message)
        setShowError(true)
      } else if (
        fileResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(fileResponse.data.message)
        setShowError(true)
      } else {
        navigate(`${routes.DASHBOARD_PREFIX}/Users`)
      }
    }
  }

  const handleUpdate = async (data: UpdateUserFields) => {
    const response = await API.updateUser(data, defaultValues?.id as string)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      if (!file) {
        if (defaultValues?.isActiveUser) {
          authStore.login(response.data)
        }
        navigate(`${routes.DASHBOARD_PREFIX}/Users`)
        return
      }
      // Upload avatar
      const formData = new FormData()
      formData.append('avatar', file, file.name)
      const fileResponse = await API.uploadAvatar(formData, response.data.id)
      if (fileResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(fileResponse.data.message)
        setShowError(true)
      } else if (
        fileResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(fileResponse.data.message)
        setShowError(true)
      } else {
        if (defaultValues?.isActiveUser) {
          // Get userwith avatar image
          const UserResponse = await API.fetchUsers()
          if (
            UserResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
          ) {
            setApiError(UserResponse.data.message)
            setShowError(true)
          } else {
            authStore.login(UserResponse.data)
          }
        }
        navigate(`${routes.DASHBOARD_PREFIX}/Users`)
      }
    }
  }

  const handleFileError = () => {
    if (!file) setFileError(true)
    else setFileError(false)
  }

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myFile = target.files[0]
      SetFile(myFile)
    }
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        setFileError(false)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }, [file])

  return (
    <>
      <Form className="User-form" onSubmit={onSubmit}>
        <Form.Group className="d-flex flex-column justify-content-center align-items-center">
          <FormLabel htmlFor="avatar" id="avatar-p">
            <Avatar
              round
              src={
                preview
                  ? preview
                  : defaultValues &&
                    `${process.env.REACT_APP_API_URL}/files/${defaultValues?.avatar}`
              }
              alt="Avatar"
            />
          </FormLabel>
          <input
            onChange={handleFileChange}
            id="avatar"
            name="avatar"
            type="file"
            aria-label="Avatar"
            aria-describedby="avatar"
            className="d-none"
          />
          {fileError && (
            <div className="d-block invalid-feedback text-danger mb-2 text-center">
              Field avatar is required
            </div>
          )}
        </Form.Group>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="username">Username</FormLabel>
              <input
                {...field}
                type="text"
                aria-label="username"
                aria-describedby="username"
                className={
                  errors.username ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.username && (
                <div className="invalid-feedback text-danger">
                  {errors.username.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="email">Email</FormLabel>
              <input
                {...field}
                type="email"
                aria-label="Email"
                aria-describedby="email"
                className={
                  errors.email ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.email && (
                <div className="invalid-feedback text-danger">
                  {errors.email.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="role_id"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="role_id">Role</FormLabel>
              <Form.Select
                className={
                  errors.role_id ? 'form-control is-invalid' : 'form-control'
                }
                {...field}
                aria-label="Role"
                aria-describedby="role_id"
              >
                <option></option>
                {rolesData?.data.map((role: RoleType, index: number) => (
                  <option key={index} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
              {errors.role_id && (
                <div className="invalid-feedback text-danger">
                  {errors.role_id.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="confirm_password"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
              <input
                {...field}
                type="password"
                aria-label="Confirm password"
                aria-describedby="confirm_password"
                className={
                  errors.confirm_password
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
              />
              {errors.confirm_password && (
                <div className="invalid-feedback text-danger">
                  {errors.confirm_password.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Button
          className="w-100"
          type="submit"
          onMouseUp={defaultValues ? undefined : handleFileError}
        >
          {defaultValues ? 'Update User' : 'Create new User'}
        </Button>
      </Form>
      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-auto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  )
}

export default observer(CreateUpdateUserForm)
