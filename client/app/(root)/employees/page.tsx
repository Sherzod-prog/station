"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function EmployeesPage() {
  const [dataEmployees, setDataEmployees] = useState([]);
  const getAll = () => {
    const res = fetch("http://localhost:5000/employeis")
      .then((res) => res.json())
      .then((data) => setDataEmployees(data));

    return res;
  };
  console.log(dataEmployees);

  return (
    <div className="w-[1268px] ">
      <div>
        <Button onClick={getAll}>Get All</Button>
      </div>
      {dataEmployees.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
