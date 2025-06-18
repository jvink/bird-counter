import { createSignal } from "solid-js";
import MiniPlayer from "./MiniPlayer";
import LargePlayer from "./LargePlayer";

export default function Player(props: { birdData: { count: number; timestamp: string; image: string } | null }) {
    const [isOpen, setIsOpen] = createSignal(false);

    const openPlayer = () => {
        setIsOpen(true);
    };

    const closePlayer = () => {
        setIsOpen(false);
    };

    return (
        <>
            {!isOpen() && <MiniPlayer onOpen={openPlayer} birdData={props.birdData} />}
            {isOpen() && <LargePlayer onClose={closePlayer} birdData={props.birdData} />}
        </>
    );
}