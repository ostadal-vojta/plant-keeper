type IButton = {
    onClick?: () => void;
}

const Button = (props: IButton) => {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
            className="w-max leading-6 font-medium ease-in-out duration-300 cursor-pointer bg-green-400 hover:bg-green-500 rounded-md py-2 px-4 text-center uppercase"
        >
            toggle detail
        </div>
    );
}

export default Button;