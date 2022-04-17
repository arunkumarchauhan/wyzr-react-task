import ".././App.css";

import LoadingSpinner from "./LoadingSpinner";
import React, { useState, useEffect } from "react";
import BuildRows from "./BuildRow";
function AnalysisTable() {
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    const loginData = localStorage.getItem("loginData");
    if (!loginData) {
      alert("Please login first");
    }
    const fetchData = async () => {
      const result = await fetch("/api/stats", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const data = await result.json();
      console.log(data.data);
      setTableData(data.data);
    };
    fetchData();
  }, []);
  if (tableData) {
    var listtable = [];

    tableData.forEach((val, index) => {
      listtable.push(<BuildRows element={val} index={index} key={index} />);
    });

    return (
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Keyword</th>
            <th scope="col">Keyword Count</th>
          </tr>
        </thead>

        <tbody>{listtable}</tbody>
      </table>
    );
  }
  return <LoadingSpinner />;
}
export default AnalysisTable;
