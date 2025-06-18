import { createEffect, createSignal } from 'solid-js';
import Loading from './Loading';

export default function BirdsSpotted(props: { amountOfBirds: number, isLoading: boolean }) {
    const [isAnimating, setIsAnimating] = createSignal(false);
    const [prevAmount, setPrevAmount] = createSignal(props.amountOfBirds);

    createEffect(() => {
        if (props.amountOfBirds !== prevAmount()) {
            setIsAnimating(true);
            setPrevAmount(props.amountOfBirds);

            // Reset animation after it completes
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    });

    return (
        <div class="flex flex-col bg-green-700 gap-2 p-6 flex-1 rounded-3xl group relative justify-between h-[156px]">
            {props.isLoading && <Loading />}
            {!props.isLoading && (
                <>
                    <div class="flex gap-3 items-center justify-between">
                        <span
                            class={`text-white text-5xl transition-all duration-500 ease-out z-10 ${isAnimating() ? 'animate-pulse scale-105' : 'scale-100'
                                }`}
                        >
                            {props.amountOfBirds}
                        </span>
                        <div class="bg-green-800 rounded-full h-16 w-16 flex items-center justify-center absolute top-3 right-3">
                            <span class="text-white text-7xl group-hover:-translate-y-1 transition-transform duration-300">🐦‍⬛</span>
                        </div>
                    </div>
                    <span class="text-white text-lg">birds spotted today</span>
                </>
            )}
        </div>
    );
}