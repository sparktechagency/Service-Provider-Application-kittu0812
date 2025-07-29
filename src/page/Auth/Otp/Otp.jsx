import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from "sonner";

import logoimage from "/public/logo/Logo-Orange.png";
import otpImage from "/public/Auth/otp.png";

import {
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} from "../../../redux/features/auth/authApi";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();

  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleMatchOtp = async () => {
    try {
      const res = await verifyOtp({ otp }).unwrap();
      if (res?.changePasswordToken) {
        localStorage.setItem("jwtToken", res?.changePasswordToken);
        toast.success(res?.message || "OTP Verified");
        navigate(`/auth/new-password/${email}`);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleResendPassword = async () => {
    try {
      const res = await forgotPassword({ email });
      if (res.error) {
        toast.error(res?.error?.data?.message);
      } else if (res.data) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
        {/* Left: OTP Form */}
        <div className=" lg:w-1/2 lg:mx-auto mx-5 py-12 lg:py-0">
          <div className="mb-8">
            <Link to="/auth/login" className="font-semibold text-3xl text-gray-800 flex items-center gap-2">
              <span>
                <IoIosArrowBack />
              </span>
              Verify Code
            </Link>
            <p className="text-lg text-gray-700 mt-2">
              We've sent a verification code to your email. Please check your inbox and enter the code below.
            </p>
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <OTPInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              containerStyle="flex justify-between gap-2 "

              inputStyle={{
                width: "100%",
                maxWidth: "5rem",
                height: "3.2rem",
                fontSize: "1.5rem",
                fontWeight: "600",
                borderBottom: "2px solid #fff050",
                textAlign: "center", 
              }}
            />
          </div>

          {/* Verify Button */}
          <button
            onClick={handleMatchOtp}
            disabled={isLoading}
            className="w-full bg-[#fff050] text-xl font-semibold text-[#1b2428] rounded-md py-2"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>

          {/* Resend Code */}
          <div className="flex justify-between items-center mt-5 text-sm text-gray-700">
            <p>Didn’t receive code?</p>
            <button
              onClick={handleResendPassword}
              className="text-[#4c7e95] font-medium hover:underline"
            >
              Resend Code
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="lg:flex hidden items-center justify-end">
          <img className=" h-screen" src="/Auth/auth-banner.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Otp;
