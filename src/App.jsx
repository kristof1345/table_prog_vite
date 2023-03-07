import { useState, useEffect } from "react";
import MainPage from "./pages/MainPage";

function App() {
  const [tables, setTables] = useState(
    JSON.parse(localStorage.getItem("tables")) || []
  );

  useEffect(() => {
    localStorage.setItem("tables", JSON.stringify(tables));
  }, [tables]);
  return (
    <div>
      <MainPage tables={tables} setTables={setTables} />
    </div>
  );
}

export default App;
