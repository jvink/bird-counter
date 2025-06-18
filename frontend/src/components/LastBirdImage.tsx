import { BirdData } from "./LastBird";

interface LastBirdImageProps {
    birdData: BirdData;
}

export default function LastBirdImage(props: LastBirdImageProps) {
    const datetime = new Date(props.birdData!.timestamp);
    const hours = datetime.getHours().toString().padStart(2, '0');
    const minutes = datetime.getMinutes().toString().padStart(2, '0');

    return (
        <>
            <img src={`data:image/jpeg;base64,${props.birdData.image}`} class="w-full h-full object-cover" />
            <span class="absolute top-6 left-6 text-white font-bold text-2xl">{hours}:{minutes}</span>
        </>
    );
}