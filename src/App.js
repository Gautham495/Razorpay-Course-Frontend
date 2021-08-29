import './App.css';
import axios from 'axios'

function App() {

  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

  async function displayRazorpay() {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const options = {
        key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
        amount: 100,
        currency: "INR",
        name: "Soumya Corp.",
        description: "Test Transaction",
        handler: async function (response) {
            const data = {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };
            console.log(data)


        },
        prefill: {
            name: "Gautham",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

  return (
    <div className="App">
      Razorpay
    </div>
  );
}

export default App;

// one time payment
// Subscriptions or recurring

// Uber 

// 1. driver 2. Customer

//    50 dollars ----> Driver 50% ---> 2% --> 23 dollars credited to uber

// 1. Aadhar Card Pan Card Bank Account
// 2. SSN Bank 
 