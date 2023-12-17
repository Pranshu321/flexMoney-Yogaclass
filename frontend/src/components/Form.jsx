import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    batch: "",
  });

  function sendMail(email) {
    emailjs
      .send(
        "service_6kpfmja",
        "template_0dj02ca",
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: email,
          batch: formData.batch,
        },
        "M59Q72Ln2jOVV1krL"
      )
      .then(function (response) {
        toast.success("Appointment Mail Sent !!");
        setTimeout(() => navigate("/payment"), 2000);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Internal Server Error OR Invalid Email");
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.age ||
      !formData.batch
    ) {
      toast.error("Please fill all the fields");
      return;
    } else if (formData.age < 18) {
      toast.error("Age should be greater than equal to 18");
      return;
    } else if (formData.age > 65) {
      toast.error("Age should be less than equal to 65");
      return;
    }
    fetch("https://flexmoney-backend-79ao.onrender.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        age: parseInt(formData.age),
        batch: formData.batch,
      }),
    })
      .then(async (res) => {
        const resj = await res.json();
        if (resj.error === "User already exists") {
          toast.error("User already exists");
          return;
        }
        if (res.ok) {
          sendMail(formData.email);
          toast.success("Form Submitted");
        } else {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Something went wrong");
      });
  };
  return (
    <div className="bg-gray-100">
      <Toaster position="top-center" />
      <form className="p-4">
        <div className="flex justify-center flex-col w-full items-center">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                    }}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-inset font-semibold px-3 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                    }}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-inset font-semibold px-3 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4 lg:col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-inset font-semibold px-3 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Age
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="age"
                    id="age"
                    value={formData.age}
                    onChange={(e) => {
                      setFormData({ ...formData, age: e.target.value });
                    }}
                    autoComplete="age"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-inset font-semibold px-3 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Yoga Classes Batches
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              You pick what you want to choose as per your convinience.
            </p>
            <div className="space-y-10">
              <fieldset>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="batch1"
                      name="batch"
                      type="radio"
                      value="6 - 7 AM"
                      onChange={(e) => {
                        setFormData({ ...formData, batch: e.target.value });
                      }}
                      className="h-4 w-4 border-gray-300 text-indigo-600 font-semibold px-3 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      6 - 7 AM
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="batch2"
                      name="batch"
                      type="radio"
                      value="7 - 8 AM"
                      onChange={(e) => {
                        setFormData({ ...formData, batch: e.target.value });
                      }}
                      className="h-4 w-4 border-gray-300 text-indigo-600 px-3 font-semibold font-semibold px-3 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="batch2"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      7 - 8 AM
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="batch3"
                      name="batch"
                      type="radio"
                      value="8 - 9 AM"
                      onChange={(e) => {
                        setFormData({ ...formData, batch: e.target.value });
                      }}
                      className="h-4 w-4 border-gray-300 text-indigo-600 font-semibold px-3 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="batch3"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      8 - 9 AM
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="batch4"
                      name="batch"
                      type="radio"
                      value="5 - 6 PM"
                      onChange={(e) => {
                        setFormData({ ...formData, batch: e.target.value });
                      }}
                      className="h-4 w-4 border-gray-300 text-indigo-600 font-semibold px-3 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="batch4"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      5 - 6 PM
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-4 w-full">
          <button
            type="reset"
            className="text-sm font-semibold hover:bg-gray-200 bg-gray-300 px-[1.2rem] py-2 rounded-md leading-6 text-gray-900"
          >
            Reset
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
