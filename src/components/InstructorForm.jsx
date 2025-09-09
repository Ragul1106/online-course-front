import React, { useState } from "react";

export default function InstructorForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    await onSubmit({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 shadow-lg rounded-2xl p-6 flex flex-col gap-4 max-w-md mx-auto border-2 border-purple-200 mb-6 transition duration-300 hover:shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-purple-700 mb-2 text-center">
        👨‍🏫 Add New Instructor
      </h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm bg-white placeholder-purple-400 text-purple-700"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="px-4 py-2 border-2 border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm bg-white placeholder-pink-400 text-pink-700"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-bold px-6 py-2 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-200"
      >
        Add Instructor
      </button>
    </form>
  );
}
