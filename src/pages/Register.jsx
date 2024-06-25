import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("0");

  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "";

    if (username.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in username field";
    } else if (fullname.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in fullname field";
    } else if (email.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in email field";
    } else if (phone.length < 4) {
      isProceed = false;
      errorMessage = "Phone must be longer than 3 characters";
    } else if (gender!=="0" && gender!=="1") {
      isProceed = false;
      errorMessage = "Please enter";
    } else if (password.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a password longer than 5 characters";
    }
    // } else if (confirmPassword.length < 6) {
    //   isProceed = false;
    //   errorMessage = "Please enter a confirm password longer than 5 characters";
    // }


    if (!isProceed) {
      toast.warn(errorMessage);
    }

    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let regObj = {
      username,
      password,
      fullname,
      email,
      phone,
      gender,
    };
    if (isValidate()) {
      fetch("http://localhost:8080/api/v1/client-api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          if(res=== null){
            toast.error("Failed");
          }
          if (res.ok) {
            toast.success("Register successfully");
            navigate("/login");
          }
        
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };
  return (
    <>
      <SectionTitle title="Register" path="Home | Register" />
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={handleSubmit}>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Name
              </label>
              <input
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Password
              </label>
              <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                FullName
              </label>
              <input
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                E-mail
              </label>
              <input
                  type="email"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Phone
              </label>
              <input
                  type="tel"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                gender
              </label>
              <input
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required={true}
              />

              {/*<label className="font-semibold text-sm pb-1 block text-accent-content">*/}
              {/*  Repeat Password*/}
              {/*</label>*/}
              {/*<input*/}
              {/*  type="password"*/}
              {/*  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"*/}
              {/*  value={confirmPassword}*/}
              {/*  onChange={(e) => setConfirmPassword(e.target.value)}*/}
              {/*  required={true}*/}
              {/*/>*/}
              <button
                  type="submit"
                  className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Register</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="py-5 text-center">
            <Link
                to="/login"
                className="btn btn-neutral text-white"
                onClick={() => window.scrollTo(0, 0)}
            >
              Already have an account? Please login.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
