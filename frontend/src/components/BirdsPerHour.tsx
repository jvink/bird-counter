import Loading from "./Loading";

export type TimeFrame = {
    daySection: 'morning' | 'afternoon' | 'evening';
    statusLevel: 0 | 1 | 2 | null;
};

export default function BirdsPerHour(props: { timeFrames: TimeFrame[], isLoading: boolean }) {
    return (
        <div class="flex flex-col bg-white flex-1 gap-3 p-6 rounded-3xl h-[156px]">
            {props.isLoading && <Loading />}
            {!props.isLoading && (
                <>
                    {props.timeFrames.map((timeFrame) => (
                        <div class="flex items-center gap-4 rounded-3xl">
                            <div class="w-[16px]">
                                <span class="text-lg font-bold">{timeFrame.daySection === 'morning' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000"><path d="m734-556-56-58 86-84 56 56-86 86ZM80-160v-80h800v80H80Zm360-520v-120h80v120h-80ZM226-558l-84-86 56-56 86 86-58 56Zm71 158h366q-23-54-72-87t-111-33q-62 0-111 33t-72 87Zm-97 80q0-117 81.5-198.5T480-600q117 0 198.5 81.5T760-320H200Zm280-80Z" /></svg>
                                ) : timeFrame.daySection === 'afternoon' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000"><path d="M560-80q-82 0-155-31.5t-127.5-86Q223-252 191.5-325T160-480q0-83 31.5-155.5t86-127Q332-817 405-848.5T560-880q54 0 105 14t95 40q-91 53-145.5 143.5T560-480q0 112 54.5 202.5T760-134q-44 26-95 40T560-80Zm0-80h21q10 0 19-2-57-66-88.5-147.5T480-480q0-89 31.5-170.5T600-798q-9-2-19-2h-21q-133 0-226.5 93.5T240-480q0 133 93.5 226.5T560-160Zm-80-320Z" /></svg>
                                )}</span>
                            </div>
                            <div class={timeFrame.statusLevel === 2 ? "bg-green-700 rounded-full h-4 w-[100%]" : timeFrame.statusLevel === 0 ? "bg-red-700 rounded-full h-4 w-[25%]" : timeFrame.statusLevel === 1 ? "rounded-full bg-yellow-700 h-4 w-[50%]" : "rounded-full bg-gray-300 h-4 w-4"}></div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}