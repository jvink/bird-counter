import { createSignal } from "solid-js";
import OpenPlayerButton from "./OpenPlayerButton";

export default function Player() {
    const [isOpen, setIsOpen] = createSignal(false);

    const toggle = () => {
        setIsOpen(!isOpen());
    }

    // Fullscreen dimensions
    const fullscreenStyle = {
        transform: "scale(1) translate(0, 0)",
        opacity: 1,
        pointerEvents: "auto",
    };
    // Minimized dimensions
    const minimizedStyle = {
        transform: "scale(0.15) translate(-400px, -200px)", // Adjust as needed for your layout
        opacity: 0.9,
        pointerEvents: "auto",
    };

    return (
        <div
            style={`
                position: fixed;
                width: ${isOpen() ? "100vw" : "100px"};
                height: ${isOpen() ? "100vh" : "70px"};
                bottom: ${isOpen() ? "0px" : "24px"};
                right: ${isOpen() ? "0px" : "24px"};
                background: red;
                border-radius: ${isOpen() ? "0px" : "12px"};
                overflow: hidden;
                z-index: 1000;
                transition: width 0.4s cubic-bezier(0.4,0,0.2,1), height 0.4s cubic-bezier(0.4,0,0.2,1), border-radius 0.3s, opacity 0.3s;
                opacity: ${isOpen() ? 1 : 0.9};
                pointer-events: auto;
            `}
        >
            <OpenPlayerButton isOpen={isOpen()} toggle={toggle} />
        </div>
    )
}