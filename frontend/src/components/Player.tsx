import { createSignal, onMount, onCleanup } from "solid-js";
import { io } from "socket.io-client";
import OpenPlayerButton from "./OpenPlayerButton";

export default function Player() {
    const [isOpen, setIsOpen] = createSignal(false);
    const [fps, setFps] = createSignal(0);
    let canvasRef: HTMLCanvasElement | undefined;
    let frameCount = 0;
    let lastTime = performance.now();
    const fpsUpdateInterval = 500;
    let socket: any;

    const toggle = () => {
        setIsOpen(!isOpen());
    }

    const resizeCanvas = () => {
        if (!canvasRef) return;
        canvasRef.width = window.innerWidth * 0.8;
        canvasRef.height = window.innerHeight * 0.8;
    };

    const drawImage = (data: { count: number; timestamp: string; image: Uint8Array }) => {
        if (!canvasRef) return;
        const ctx = canvasRef.getContext('2d');
        if (!ctx) return;

        frameCount++;
        const currentTime = performance.now();
        if (currentTime - lastTime >= fpsUpdateInterval) {
            setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
            frameCount = 0;
            lastTime = currentTime;
        }

        const base64Image = btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(data.image))));
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
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.font = '24px Arial';

            const countText = `Count: ${data.count}`;
            const timestampText = data.timestamp;
            const fpsText = `FPS: ${fps()}`;

            ctx.strokeText(countText, 20, 40);
            ctx.fillText(countText, 20, 40);

            ctx.strokeText(timestampText, 20, 70);
            ctx.fillText(timestampText, 20, 70);

            ctx.strokeText(fpsText, 20, 100);
            ctx.fillText(fpsText, 20, 100);
        };

        console.log(base64Image);
        img.src = 'data:image/jpeg;base64,' + base64Image;
    };

    onMount(() => {
        socket = io("http://192.168.178.135:3000");
        
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('bird_update', drawImage);

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
    });

    onCleanup(() => {
        if (socket) {
            socket.disconnect();
        }
        window.removeEventListener('resize', resizeCanvas);
    });

    return (
        <div
            class={`fixed z-50 overflow-hidden transition-all duration-400 ease-in-out bg-[url('https://www.robchristiaans.nl/wp-content/uploads/2019/03/MG_9209-copy-2000.jpg')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-black/50
                ${isOpen() 
                    ? 'w-screen h-screen bottom-0 right-0 rounded-none opacity-100' 
                    : 'w-[100px] h-[70px] bottom-6 right-6 rounded-xl opacity-90'
                }`}
        >
            <OpenPlayerButton isOpen={isOpen()} toggle={toggle} />
            {isOpen() && (
                <canvas
                    ref={canvasRef}
                    class="w-full h-full"
                />
            )}
        </div>
    )
}