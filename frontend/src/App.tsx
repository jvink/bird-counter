import { createSignal, type Component } from "solid-js";
import Player from "./components/Player";
import BirdsSpotted from "./components/BirdsSpotted";
import BirdsPerHour, { TimeFrame } from "./components/BirdsPerHour";
import LastBirdImage from "./components/LastBirdImage";

const timeFrames: TimeFrame[] = [
  { hour: 6, statusLevel: 2 },
  { hour: 9, statusLevel: 1 },
  { hour: 12, statusLevel: 0 },
  { hour: 15, statusLevel: 2 },
  { hour: 18, statusLevel: 1 },
  { hour: 21, statusLevel: 0 },
];

const lastBirdImage = {
  datetime: new Date(),
  image: 'https://www.birdspot.co.uk/wp-content/uploads/2025/04/bird-house.jpg'
};

const App: Component = () => {
  const [amountOfBirdsVisible, setAmountOfBirdsVisible] = createSignal(2);
  return (
    <div class="flex flex-col gap-6 p-6 bg-[#e7e7e7] min-h-screen">
      <h1 class="text-4xl font-bold">Bird Box</h1>
      {amountOfBirdsVisible() > 0 && <p class="text-xl">Currently <span class="text-green-800 font-bold text-2xl">{amountOfBirdsVisible()}</span> birds visible</p>}
      <div class="flex gap-6">
        <BirdsSpotted amountOfBirds={84} />
        <BirdsPerHour timeFrames={timeFrames} />
      </div>
      <LastBirdImage {...lastBirdImage} />
      <Player />
    </div>
  );
};

export default App;
