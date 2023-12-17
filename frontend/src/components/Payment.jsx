import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Payment = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please fill all the fields");
      return;
    }
    fetch("http://localhost:5000/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then(async (res) => {
        const resJson = await res.json();
        if (resJson.paymentResult === "success") {
          toast.success("Payment Successful");
        } else if (resJson.paymentResult === "not user") {
          toast.error("User not found");
        } else if (resJson.paymentResult === "already") {
          toast.success("Payment Already done");
        } else {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Something went wrong");
      });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="p-5 flex justify-center gap-y-4 items-center w-full flex-col">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold">Payment Page</h1>
      <h2 className="text-sm text-gray-500">
        Payment link also shared on your registered email
      </h2>
  <div className="w-full max-w-lg">
        <div>
          <label
            htmlFor="price"
            className="block text-base font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              onChange={handleChange}
              name="email"
              id="email"
              className="block outline-none font-semibold w-full rounded-md border-0 py-2 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-4 text-green-500 font-semibold text-base">
          Price of each course is Rs. 500
        </div>
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 w-full mt-4 hover:bg-indigo-500  text-white font-bold py-2 px-4 rounded"
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default Payment;
