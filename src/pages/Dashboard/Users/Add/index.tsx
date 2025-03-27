import CreateUpdateRoleForm from "components/role/CreateUpdateRoleForm/CreateUpdateRoleForm";
import DashboardLayout from "components/ui/DashboardLayout";
import CreateUpdateUserForm from "components/user/CreateUpdateUserForm";
import { FC } from "react";
import { useLocation } from "react-router-dom";

const DashboardUsersAdd: FC = () => {
return <DashboardLayout>
<h1 className="mb-4 text-center">Create new user</h1>
<CreateUpdateUserForm />
</DashboardLayout>
}

export default DashboardUsersAdd