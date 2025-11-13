import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/transactions?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setTransactions(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // Delete Transaction
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this transaction?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/transactions/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setTransactions(transactions.filter((t) => t._id !== id));
            Swal.fire("Deleted!", "Your transaction has been removed.", "success");
          });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        My Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transactions.map((t) => (
            <div key={t._id} className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3
                  className={`font-bold text-lg ${
                    t.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.type.toUpperCase()}
                </h3>
                <p><strong>Category:</strong> {t.category}</p>
                <p><strong>Amount:</strong> ${t.amount}</p>
                <p><strong>Date:</strong> {new Date(t.date).toLocaleDateString()}</p>

                <div className="flex justify-between mt-4">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => navigate(`/transaction/${t._id}`)}
                  >
                    View Details
                  </button>

                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => navigate(`/transaction/update/${t._id}`)}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTransactions;
