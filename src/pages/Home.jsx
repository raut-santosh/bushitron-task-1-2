import React from "react";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800">Home Page</h1>
        <p className="mt-4 text-gray-600">
          This is the homepage of the Knowledge Sharing Platform. Welcome!
        </p>
      </div>
    </div>
  );
}
