import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

interface LargePlayerProps {
  onClose: () => void;
  birdData: { count: number; timestamp: string; image: string } | null;
}

export default function LargePlayer(props: LargePlayerProps) {
  const [fps, setFps] = createSignal(0);
  let canvasRef: HTMLCanvasElement | undefined;
  let frameCount = 0;
  let lastTime = performance.now();
  let lastDrawnTimestamp = 0;
  const fpsUpdateInterval = 500;
  const MAX_FRAME_AGE_MS = 100; // Skip frames older than 100ms

  const resizeCanvas = () => {
    if (!canvasRef) return;
    canvasRef.width = window.innerWidth * 0.8;
    canvasRef.height = window.innerHeight * 0.8;
  };

  const drawImage = (data: {
    count: number;
    timestamp: string;
    image: string;
  }) => {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;

    // Check if this frame is too old
    const currentTime = performance.now();
    const frameTimestamp = new Date(data.timestamp).getTime();
    if (currentTime - frameTimestamp > MAX_FRAME_AGE_MS) {
      return; // Skip this frame
    }
    lastDrawnTimestamp = frameTimestamp;

    frameCount++;
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
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  });

  onCleanup(() => {
    window.removeEventListener("resize", resizeCanvas);
  });

  return (
    <div class="fixed z-50 w-screen h-screen bottom-0 right-0 bg-black/50">
      <button
        onClick={props.onClose}
        class="absolute z-[1001] top-4 right-4 w-10 h-10 text-3xl flex items-center justify-center border-none cursor-pointer transition-all duration-200 text-red-500"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32px"
          viewBox="0 0 24 24"
          width="32px"
          fill="#e3e3e3"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
      <canvas ref={canvasRef} class="w-full h-full" />
    </div>
  );
}
