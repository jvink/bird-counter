import { createSignal, onMount, onCleanup } from "solid-js";
import { io } from "socket.io-client";
import MiniPlayer from "./MiniPlayer";
import LargePlayer from "./LargePlayer";

export default function Player() {
    const [isOpen, setIsOpen] = createSignal(false);
    const [birdData, setBirdData] = createSignal<{ count: number; timestamp: string; image: string } | null>(null);
    let socket: any;

    const openPlayer = () => {
        setIsOpen(true);
    };

    const closePlayer = () => {
        setIsOpen(false);
    };

    onMount(() => {
        socket = io("http://192.168.178.135:3000");
        
        socket.on('connect', () => {
            console.log('Player connected to server');
        });

        socket.on('bird_update', (data: { count: number; timestamp: string; image: string }) => {
            console.log('Player received bird_update:', data);
            setBirdData(data);
        });
    });

    onCleanup(() => {
        if (socket) {
            socket.disconnect();
        }
    });

    return (
        <>
            {!isOpen() && <MiniPlayer onOpen={openPlayer} birdData={birdData()} />}
            {isOpen() && <LargePlayer onClose={closePlayer} birdData={birdData()} />}
        </>
    );
}