import {
  RegisterUserFields,
  useRegisterForm,
} from 'hooks/react-hook-form/useRegister'
import { useState, FC, ChangeEvent, useEffect } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { useNavigate, Link } from 'react-router-dom'
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

const RegisterForm: FC = () => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useRegisterForm()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const [file, SetFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    if (!file) return
    const response = await API.login(data)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      //Login userbefore uploading an avatar image
      const loginResponse = await API.login({
        email: data.email,
        password: data.password,
      })
      if (loginResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(loginResponse.data.message)
        setShowError(true)
      } else if (
        loginResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(loginResponse.data.message)
        setShowError(true)
      } else {
        //Upload avatar
        const formData = new FormData()
        formData.append('avatar', file, file.name)
        const fileResponse = await API.uploadAvatar(
          formData,
          loginResponse.data.id,
        )
        if (fileResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
          setApiError(fileResponse.data.message)
          setShowError(true)
        } else if (
          fileResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
        ) {
          setApiError(fileResponse.data.message)
          setShowError(true)
        } else {
          // Get userwith avatar image
          const UserResponse = await API.fetchUsers()
          if (
            UserResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
          ) {
            setApiError(fileResponse.data.message)
            setShowError(true)
          } else {
            authStore.login(UserResponse.data)
            navigate('/')
          }
        }
      }
    }
  })

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
      <Form className="register-form" onSubmit={onSubmit}>
        <Form.Group className="d-flex flex-column justify-content-center align-items-center">
          <FormLabel html For="avatar" id="avatar-p">
            <Avatar round src={preview as string} alt="Avatar" />
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
                aria-label="Username"
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
                placeholder="exmaple@gmail.com"
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
          name="password"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="password">Password</FormLabel>
              <input
                {...field}
                type="password"
                aria-label="Password"
                aria-describedby="password"
                className={
                  errors.password ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.password && (
                <div className="invalid-feedback text-danger">
                  {errors.password.message}
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
              <FormLabel htmlFor="confirm_password">confirm password</FormLabel>
              <input
                {...field}
                type="password"
                aria-label="Confirm_password"
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
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="mb-0">Already have an account?</p>
          <Link className="text-decoration-none text-end" to={routes.SIGNUP}>
            Login
          </Link>
        </div>
        <Button className="w-100" type="submit" onMouseUp={handleFileError}>
          Create an Account
        </Button>
      </Form>
      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-suto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  )
}

export default observer(RegisterForm)
