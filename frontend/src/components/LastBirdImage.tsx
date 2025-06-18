export default function LastBirdImage(props: { datetime: Date; image: string }) {
    return (
        <div class="bg-white rounded-3xl h-64 md:h-[300px] relative overflow-hidden">
            <img src={props.image} class="w-full h-full object-cover" />
            <span class="absolute top-6 left-6 text-white font-bold text-2xl">{new Date(props.datetime).getHours()}:{new Date(props.datetime).getMinutes()}</span>
        </div>
    );
}