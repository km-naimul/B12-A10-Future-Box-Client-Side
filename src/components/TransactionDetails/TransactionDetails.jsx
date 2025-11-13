import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);

  useEffect(() => {
    // একক ট্রানজ্যাকশন fetch করা
    fetch(`http://localhost:3000/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data);

        // Category অনুযায়ী সব ট্রানজ্যাকশন fetch করে total বের করা
        fetch(
          `http://localhost:3000/transactions?category=${data.category}`
        )
          .then((res) => res.json())
          .then((allCategoryData) => {
            const total = allCategoryData.reduce(
              (sum, t) => sum + parseFloat(t.amount || 0),
              0
            );
            setCategoryTotal(total);
          });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to load transaction details.", "error");
      });
  }, [id]);

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center p-6">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
        <h2
          className={`text-3xl font-bold mb-4 text-center ${
            transaction.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          Transaction Details
        </h2>

        <div className="space-y-3">
          <p>
            <strong>Type:</strong> {transaction.type}
          </p>
          <p>
            <strong>Category:</strong> {transaction.category}
          </p>
          <p>
            <strong>Description:</strong> {transaction.description}
          </p>
          <p>
            <strong>Amount:</strong> ${transaction.amount}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(transaction.date).toLocaleDateString()}
          </p>
          <p className="font-semibold text-primary">
            <strong>Total in this Category:</strong> ${categoryTotal.toFixed(2)}
          </p>
        </div>

        <div className="card-actions justify-center mt-6">
          <button
            className="btn btn-primary"
            onClick={() => (window.location.href = "/my-transactions")}
          >
            ⬅ Back to My Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
