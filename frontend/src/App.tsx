import { createSignal, type Component } from "solid-js";
import Player from "./components/Player";
import BirdsSpotted from "./components/BirdsSpotted";
import BirdsPerHour, { TimeFrame } from "./components/BirdsPerHour";
import LastBirdImage from "./components/LastBirdImage";

const timeFrames: TimeFrame[] = [
  { daySection: 'morning', statusLevel: 2 },
  { daySection: 'afternoon', statusLevel: 1 },
  { daySection: 'evening', statusLevel: null },
];

const lastBirdImage = {
  datetime: new Date(),
  image: 'https://www.birdspot.co.uk/wp-content/uploads/2025/04/bird-house.jpg'
};

const App: Component = () => {
  const [amountOfBirdsVisible, setAmountOfBirdsVisible] = createSignal(2);
  const [amountOfBirds, setAmountOfBirds] = createSignal(84);

  setInterval(() => {
    setAmountOfBirds(amountOfBirds() + 1);
  }, 1000);

  return (
    <div class="flex flex-col gap-6 p-6 bg-[#e7e7e7] min-h-screen">
      <h1 class="text-4xl font-bold">Bird Box</h1>
      {amountOfBirdsVisible() > 0 && <p class="text-xl">Currently <span class="text-green-800 font-bold text-2xl">{amountOfBirdsVisible()}</span> birds visible</p>}
      <div class="flex gap-6 items-stretch">
        <div class="flex-1 min-w-0">
          <BirdsSpotted amountOfBirds={amountOfBirds()} />
        </div>
        <div class="flex-1 min-w-0">
          <BirdsPerHour timeFrames={timeFrames} />
        </div>
      </div>
      <LastBirdImage {...lastBirdImage} />
      <Player />
    </div>
  );
};

export default App;
