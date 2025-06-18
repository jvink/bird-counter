import { createSignal, type Component, onMount, onCleanup } from "solid-js";
import { io } from "socket.io-client";
import Player from "./components/Player";
import BirdsSpotted from "./components/BirdsSpotted";
import BirdsPerHour, { TimeFrame } from "./components/BirdsPerHour";
import LastBirdImage from "./components/LastBirdImage";

const timeFrames: TimeFrame[] = [
  { daySection: 'morning', statusLevel: null },
  { daySection: 'afternoon', statusLevel: null },
  { daySection: 'evening', statusLevel: null },
];

const lastBirdImage = {
  datetime: new Date(),
  image: 'https://www.birdspot.co.uk/wp-content/uploads/2025/04/bird-house.jpg'
};

const App: Component = () => {
  const [amountOfBirdsVisible, setAmountOfBirdsVisible] = createSignal(0);
  const [amountOfBirds, setAmountOfBirds] = createSignal(0);
  const [dailyStats, setDailyStats] = createSignal<{
    morning: number;
    noon: number;
    evening: number;
    total: number;
  } | null>(null);
  const [birdData, setBirdData] = createSignal<{ count: number; timestamp: string; image: string } | null>(null);
  let socket: any;

  const fetchDailyStats = async () => {
    try {
      const response = await fetch('http://192.168.178.135:3000/api/birds/daily');
      const data = await response.json();
      setDailyStats(data);
      setAmountOfBirds(data.total);
    } catch (error) {
      console.error('Failed to fetch daily stats:', error);
    }
  };

  onMount(() => {
    fetchDailyStats();
    const interval = setInterval(fetchDailyStats, 30000);

    // Socket connection for live bird updates
    socket = io("http://192.168.178.135:3000");
    
    socket.on('connect', () => {
      console.log('App connected to server');
    });

    socket.on('bird_update', (data: { count: number; timestamp: string; image: string }) => {
      setBirdData(data);
      setAmountOfBirdsVisible(data.count);
    });

    return () => {
      clearInterval(interval);
      if (socket) {
        socket.disconnect();
      }
    };
  });

  const getStatusLevel = (amount: number | null): 0 | 1 | 2 | null => {
    if (amount === null || amount === 0) return null;
    if (amount < 10) return 0;
    if (amount < 50) return 1;
    return 2;
  };

  const getTimeFrames = (): TimeFrame[] => {
    const stats = dailyStats();
    if (!stats) return timeFrames;

    return [
      { 
        daySection: 'morning', 
        statusLevel: getStatusLevel(stats.morning)
      },
      { 
        daySection: 'afternoon', 
        statusLevel: getStatusLevel(stats.noon)
      },
      { 
        daySection: 'evening', 
        statusLevel: getStatusLevel(stats.evening)
      },
    ];
  };

  return (
    <div class="flex flex-col gap-6 p-6 bg-[#e7e7e7] min-h-screen">
      <h1 class="text-4xl font-bold">Bird Box</h1>
      <p class="text-xl">Currently <span class="text-green-800 font-bold text-2xl">{amountOfBirdsVisible()}</span> birds visible</p>
      <div class="flex gap-6 items-stretch">
        <div class="flex-1 min-w-0">
          <BirdsSpotted amountOfBirds={amountOfBirds()} />
        </div>
        <div class="flex-1 min-w-0">
          <BirdsPerHour timeFrames={getTimeFrames()} />
        </div>
      </div>
      <LastBirdImage {...lastBirdImage} />
      <Player birdData={birdData()} />
    </div>
  );
};

export default App;
