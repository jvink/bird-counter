import { createEffect, createSignal } from "solid-js";
import LastBirdImage from "./LastBirdImage";
import Loading from "./Loading";

export interface BirdData {
    count: number;
    timestamp: string;
    image: string;
}

export default function LastBird() {
    const [birdData, setBirdData] = createSignal<BirdData | null>(null);
    const [loading, setLoading] = createSignal(true);

    createEffect(() => {
        setLoading(true);
        fetch('http://192.168.178.135:3000/api/birds/latest')
            .then(response => response.json())
            .then(data => {
                setBirdData(data);
                setLoading(false);
            });
    });

    return (
        <div class="bg-white rounded-3xl h-64 md:h-[300px] relative overflow-hidden">
            {loading() && <Loading />}
            {!loading() && birdData() && <LastBirdImage birdData={birdData()!} />}
        </div>
    );
}