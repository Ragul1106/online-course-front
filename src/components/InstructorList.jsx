import React from "react";

export default function InstructorList({ instructors }) {
  return (
    <div className="mt-6">
      {/* <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
        👨‍🏫 Instructors
      </h2> */}
      {instructors.length === 0 ? (
        <p className="text-gray-500 italic text-center">No instructors available.</p>
      ) : (
        <ul className="space-y-4">
          {instructors.map((i) => (
            <li
              key={i.id}
              className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl shadow-md p-4 flex items-center justify-between hover:shadow-xl transition duration-300"
            >
              <div>
                <p className="font-semibold text-purple-700 text-lg">{i.name}</p>
                <p className="text-sm text-purple-500">{i.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
