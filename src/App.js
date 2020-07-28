import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/repositories")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  async function handleAddRepository() {
    const newData = {
      title: "React Repo",
      url: "https://reactjs.org/",
      techs: ["React", "React Native"],
    };
    const response = await api.post("/repositories", newData);
    setData([...data, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);
    setData(data.filter((item) => item.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {data.length > 0 &&
          data.map((item) => (
            <li key={item.id}>
              {item.title}
              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
