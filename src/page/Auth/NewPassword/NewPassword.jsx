import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "sonner";

import logoimage from '/public/logo/Logo-Orange.png';
import changePasswordImage from "/public/Auth/update-password.png";

import CustomInput from "../../../utils/CustomInput";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";

const NewPassword = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const jwtToken = localStorage.getItem("jwtToken");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submit = async (values) => {
    const { password, confirmPassword } = values;

    if (!password || !confirmPassword) {
      toast.error("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await resetPassword({
        jwtToken,
        newPassword: password
      });

      if (res.error) {
        toast.error(res.error.data.message || "Reset failed");
      } else if (res.data) {
        toast.success(res.data.message);
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
        {/* Left Side (Form) */}
        <div className=" lg:w-1/2 lg:mx-auto mx-5 py-12 lg:py-0">
          <div className="mb-8">
            <Link to="/auth/login" className="font-semibold text-3xl text-gray-800 flex items-center gap-2">
              <IoIosArrowBack />
              <span>Update Password</span>
            </Link>
            <p className="text-lg text-gray-700 mt-2">
              Enter a strong and secure password to protect your account.
            </p>
          </div>

          <Form
            layout="vertical"
            onFinish={submit}
            initialValues={{ password: "", confirmPassword: "" }}
          >
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password",
                },
              ]}
            >
              <CustomInput
                isPassword
                className={"border border-[#fff080]"}
                type="password"
                placeholder="New Password"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <CustomInput
                isPassword
                type="password"
                className={"border border-[#fff080]"}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="w-full bg-[#fff050] text-xl font-semibold text-[#1b2428] rounded-md py-2"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </Form.Item>
          </Form>
        </div>

        {/* Right Side (Image) */}
        <div className="lg:flex hidden items-center justify-end">
          <img className=" h-screen" src="/Auth/auth-banner.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
