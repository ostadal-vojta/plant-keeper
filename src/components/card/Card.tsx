
interface ICard {
    title: string;
    description?: string | JSX.Element;
    cover?: string | JSX.Element;
}

const Card = (props: ICard) => {
    const { title, description, cover } = props;
    return (
        <div className="w-80 p-4 bg-white/5 hover:bg-white/10 rounded-md ease-out duration-300 columns-1">
            <div className="w-full max-h-80">{cover}</div>
            <div className="font-bold text-slate-200 text-3xl">{title}</div>
            <div className="p-1" />
            <div className="font-light text-slate-200">{description}</div>
        </div>
    )
}

export default Card;