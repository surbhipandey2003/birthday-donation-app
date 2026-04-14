import axios from "axios";

const handlePayment = async () => {
  const { data: order } = await axios.post(
    `${BASE_URL}/api/payment/create-order`,
    { amount: 500 }
  );

  const options = {
    key: "YOUR_KEY_ID",
    amount: order.amount,
    currency: "INR",
    name: "Birthday Donation",
    description: "Donation",
    order_id: order.id,

    handler: async function (response) {
      await axios.post(`${BASE_URL}/api/payment/verify`, response);
      alert("Payment successful!");
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};