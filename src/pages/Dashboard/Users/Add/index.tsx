import DashboardLayout from 'components/ui/DashboardLayout'
import CreateUpdateUporabnikForm from 'components/user/CreateUpdateUserForm'
import { FC } from 'react'

const DashboardUsersAdd: FC = () => {
  return (
    <DashboardLayout>
      <h1 className="mb-4 text-center">Create new user</h1>
      <CreateUpdateUporabnikForm />
    </DashboardLayout>
  )
}

export default DashboardUsersAdd
