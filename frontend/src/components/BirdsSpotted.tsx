export default function BirdsSpotted(props: { amountOfBirds: number }) {
    return (
        <div class="flex flex-col bg-green-700 gap-3 p-6 flex-1 rounded-3xl">
            <div class="flex gap-3 items-center justify-between">
                <span class="text-white text-6xl">{props.amountOfBirds}</span>
                <div class="bg-green-800 rounded-full h-16 w-16 flex items-center justify-center text-7xl">🐦‍⬛</div>
            </div>
            <span class="text-white text-xl">birds spotted today</span>
        </div>
    );
}