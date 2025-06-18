import { onMount, onCleanup, createEffect } from "solid-js";

interface MiniPlayerProps {
    onOpen: () => void;
    birdData: { count: number; timestamp: string; image: string } | null;
}

export default function MiniPlayer(props: MiniPlayerProps) {
    let canvasRef: HTMLCanvasElement | undefined;

    const resizeCanvas = () => {
        if (!canvasRef) return;
        canvasRef.width = 100;
        canvasRef.height = 70;
    };

    const drawImage = (data: { count: number; timestamp: string; image: string }) => {
        if (!canvasRef) return;
        const ctx = canvasRef.getContext('2d');
        if (!ctx) return;

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
        };

        img.src = 'data:image/jpeg;base64,' + data.image;
    };

    createEffect(() => {
        if (props.birdData) {
            drawImage(props.birdData);
        }
    });

    onMount(() => {
        resizeCanvas();
    });

    return (
        <div class="fixed z-50 w-[200px] h-[140px] bottom-6 right-6 rounded-xl opacity-90 bg-black/50 cursor-pointer hover:opacity-100 hover:scale-105 transition-all duration-200 hover:shadow-lg" onClick={props.onOpen}>
            <canvas
                ref={canvasRef}
                class="w-full h-full rounded-xl"
            />
            <div
                class="absolute top-2 left-2 w-8 h-8 flex items-center justify-center border-none text-white transition-colors hover:text-blue-300 hover:scale-110"
                aria-label="Expand"
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px" fill="currentColor">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M5,15h2V8.41L18.59,20L20,18.59L8.41,7H15V5H5V15z" />
                </svg>
            </div>
        </div>
    );
} 