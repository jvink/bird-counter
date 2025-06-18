import { createEffect, createSignal, onMount } from "solid-js";

interface LargePlayerProps {
  onClose: () => void;
  birdData: { count: number; timestamp: string; image: string } | null;
}

export default function LargePlayer(props: LargePlayerProps) {
  const [fps, setFps] = createSignal(0);
  let canvasRef: HTMLCanvasElement | undefined;
  let frameCount = 0;
  let lastTime = performance.now();
  const fpsUpdateInterval = 500;

  const drawImage = (data: {
    count: number;
    timestamp: string;
    image: string;
  }) => {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;

    frameCount++;
    const currentTime = performance.now();
    if (currentTime - lastTime >= fpsUpdateInterval) {
      setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
      frameCount = 0;
      lastTime = currentTime;
    }

    const img = new Image();

    img.onload = () => {
      ctx.clearRect(0, 0, canvasRef!.width, canvasRef!.height);

      const aspectRatio = img.width / img.height;
      let drawWidth = canvasRef!.width;
      let drawHeight = canvasRef!.width / aspectRatio;

      if (drawHeight > canvasRef!.height) {
        drawHeight = canvasRef!.height;
        drawWidth = canvasRef!.height * aspectRatio;
      }

      const x = (canvasRef!.width - drawWidth) / 2;
      const y = (canvasRef!.height - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      // Show text overlays
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.font = "24px Arial";

      const countText = `Count: ${data.count}`;
      const timestampText = new Date(data.timestamp).toLocaleString();
      const fpsText = `FPS: ${fps()}`;

      ctx.strokeText(countText, 20, 40);
      ctx.fillText(countText, 20, 40);

      ctx.strokeText(timestampText, 20, 70);
      ctx.fillText(timestampText, 20, 70);

      ctx.strokeText(fpsText, 20, 100);
      ctx.fillText(fpsText, 20, 100);
    };
    img.src = "data:image/jpeg;base64," + data.image;
  };

  createEffect(() => {
    if (props.birdData) {
      drawImage(props.birdData);
    }
  });

  onMount(() => {
    if (canvasRef) {
      canvasRef.width = window.innerWidth;
      canvasRef.height = window.innerHeight;
    }
  });

  return (
    <div class="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <button
        onClick={props.onClose}
        class="absolute cursor-pointer top-4 right-4 z-10 bg-black/30 text-white font-bold p-3 rounded-full text-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#ffffff"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
      <canvas ref={canvasRef} class="w-full h-full" />
    </div>
  );
}
