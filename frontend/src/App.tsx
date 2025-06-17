import { createSignal, type Component } from "solid-js";
import Player from "./components/Player";

const App: Component = () => {
  const [amountOfBirdsVisible, setAmountOfBirdsVisible] = createSignal(0);
  return (
    <div>
      <h1>Bird Box</h1>
      {amountOfBirdsVisible() > 0 && <p>Currently <span>{amountOfBirdsVisible()}</span> birds visible</p>}
      <Player />
    </div>
  );
};

export default App;
