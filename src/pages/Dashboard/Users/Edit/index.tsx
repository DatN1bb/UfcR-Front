import DashboardLayout from 'components/ui/DashboardLayout'
import CreateUpdateUporabnikForm from 'components/user/CreateUpdateUserForm'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const DashboardUporabnikiEdit: FC = () => {
  const location = useLocation()
  return (
    <DashboardLayout>
      <h1 className="mb-4 text-center">Edit user</h1>
      <CreateUpdateUporabnikForm defaultValues={location.state} />
    </DashboardLayout>
  )
}
export default DashboardUporabnikiEdit
