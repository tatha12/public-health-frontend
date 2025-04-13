import { useState } from "react";

const CovidSearch = () => {
  const [state, setState] = useState("");
  return (
    <div>
      <h2>COVID Case Search</h2>
      <input
        type="text"
        placeholder="State Code (e.g., CA)"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default CovidSearch;
