// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./Components/TaskList";

const App: React.FC = () => {
  return (
    <Router>
      <div className="p-8">
        <Routes>
          <Route path="/" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
