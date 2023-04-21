import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then((res)=>res.json())
    .then((data)=>{
      setToys(data)
    })
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    setToys([...toys, newToy])
  }

  function handleDeleteToy(id) {
    const filteredToy = toys.filter((toy) => {
      return toy.id !== id
    })
    setToys(filteredToy)
  }

  function handleUpdateToy(id) {
    const updatedToy = toys.map((toy) => {
      return toy.id === id ? updatedToy : toy
    })
    setToys(updatedToy)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} onUpdateToy={handleUpdateToy}/>
    </>
  );
}

export default App;
