import DashboardLayout from "components/ui/DashboardLayout";
import RegisterForm from "components/user/RegisterForm";
import { FC } from "react";

const Register: FC = () => {
    return (
        <DashboardLayout>
            <RegisterForm />
        </DashboardLayout>
    )
}

export default Register