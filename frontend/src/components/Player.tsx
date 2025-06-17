import { createSignal } from "solid-js";
import OpenPlayerButton from "./OpenPlayerButton";

export default function Player() {
    const [isOpen, setIsOpen] = createSignal(false);

    const toggle = () => {
        setIsOpen(!isOpen());
    }

    return (
        <div
            class={`fixed z-50 overflow-hidden bg-red-500 transition-all duration-400 ease-in-out
                ${isOpen() 
                    ? 'w-screen h-screen bottom-0 right-0 rounded-none opacity-100' 
                    : 'w-[100px] h-[70px] bottom-6 right-6 rounded-xl opacity-90'
                }`}
        >
            <OpenPlayerButton isOpen={isOpen()} toggle={toggle} />
        </div>
    )
}