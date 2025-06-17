interface OpenPlayerButtonProps {
    isOpen: boolean;
    toggle: () => void;
}

export default function OpenPlayerButton(props: OpenPlayerButtonProps) {
    return (
        <button
            onClick={props.toggle}
            class={`absolute z-[1001] flex items-center justify-center border-none bg-transparent cursor-pointer transition-all duration-200 text-red-500
                ${props.isOpen 
                    ? 'top-4 right-4 w-10 h-10 text-3xl' 
                    : 'top-2 left-2 w-6 h-6 text-4xl'
                }`}
            aria-label={props.isOpen ? "Close" : "Open"}
        >
            {props.isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px" fill="#e3e3e3">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M5,15h2V8.41L18.59,20L20,18.59L8.41,7H15V5H5V15z" />
                </svg>
            )}
        </button>
    )
}