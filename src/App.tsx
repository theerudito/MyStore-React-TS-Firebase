import { useState } from "react";

import { Auth } from "./Pages/Auth/Auth";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Auth />
    </div>
  );
}

export default App;
