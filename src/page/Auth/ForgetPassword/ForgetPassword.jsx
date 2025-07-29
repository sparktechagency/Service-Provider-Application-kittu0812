/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "antd";
import { HiOutlineMail } from "react-icons/hi";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";

import CustomInput from "../../../utils/CustomInput";
import logoimage from "/public/logo/Logo-Orange.png";
import forgetPasswordImage from "/public/Auth/forgot-password.png";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submit = async (values) => {
    try {
      const res = await forgotPassword(values);
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res.data) {
        toast.success(res.data.message);
        navigate(`/auth/otp/${values?.email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
        {/* Left: Form */}
        <div className=" lg:w-1/2 lg:mx-auto mx-5 py-12 lg:py-0">
          <div className="mb-8">
            <Link to="/auth/login" className="font-semibold text-3xl text-gray-800 flex items-center gap-2">
              <IoIosArrowBack />
              <span>Forgot Password</span>
            </Link>
            <p className="text-lg text-gray-700 mt-3">
              Enter the email address associated with your account. We'll send you a verification code to your email.
            </p>
          </div>

          <Form
            layout="vertical"
            onFinish={submit}
            initialValues={{ email: "" }}
            className="space-y-4"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email address!" },
              ]}
            >
              <CustomInput className={"border border-[#fff080]"} icon={HiOutlineMail} placeholder="Email" />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="w-full bg-[#fff050] text-xl font-semibold text-[#1b2428] rounded-md py-2"
              >
                Send Verification Code
              </button>
            </Form.Item>
          </Form>
        </div>

        {/* Right: Illustration Image */}
        <div className="lg:flex hidden items-center justify-end">
          <img className="h-screen" src="/Auth/auth-banner.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
