export type TimeFrame = {
    hour: number;
    statusLevel: 0 | 1 | 2;
}

export default function BirdsPerHour(props: { timeFrames: TimeFrame[] }) {
    return (
        <div class="flex flex-col bg-white flex-1 gap-1 p-6 rounded-3xl">
            {props.timeFrames.map((timeFrame) => (
                <div class="flex items-center gap-4 rounded-3xl">
                    <div class="w-[16px]">
                        <span class="text-lg font-bold">{timeFrame.hour}</span>
                    </div>
                    <div class={timeFrame.statusLevel === 2 ? "bg-green-700 rounded-full h-4 w-[100%]" : timeFrame.statusLevel === 0 ? "bg-red-700 rounded-full h-4 w-[25%]" : "rounded-full bg-yellow-700 h-4 w-[50%]"}></div>
                </div>
            ))}
        </div>
    );
}