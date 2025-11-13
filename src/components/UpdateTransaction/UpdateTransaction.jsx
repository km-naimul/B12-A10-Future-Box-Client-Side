import React from "react";
import { useParams } from "react-router";

const UpdateTransaction = () => {
  const { id } = useParams();

  const handleUpdate = (e) => {
    e.preventDefault();
    alert(`Transaction ${id} updated successfully!`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-3xl font-bold mb-4 text-primary">Update Transaction</h1>
      <p className="mb-6 text-lg">Updating transaction ID: <strong>{id}</strong></p>

      <form onSubmit={handleUpdate} className="w-80 space-y-4">
        <input type="text" placeholder="Category" className="input input-bordered w-full" />
        <input type="number" placeholder="Amount" className="input input-bordered w-full" />
        <textarea placeholder="Description" className="textarea textarea-bordered w-full"></textarea>
        <button type="submit" className="btn btn-success w-full">Update</button>
      </form>
    </div>
  );
};

export default UpdateTransaction;
