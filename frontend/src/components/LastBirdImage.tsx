export default function LastBirdImage(props: { datetime: Date; image: string }) {
    return (
        <div class="bg-white rounded-3xl h-64 relative overflow-hidden">
            <img src={props.image} />
            <span class="absolute top-6 left-6 text-white font-bold text-2xl">{new Date(props.datetime).getHours()}:{new Date(props.datetime).getMinutes()}</span>
        </div>
    );
}