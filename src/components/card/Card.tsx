import Image from "next/image";

type ICard = {
    title: string;
    description?: string | JSX.Element;
    cover?: string;
    waterAmount?: number;
}

const Card = (props: ICard) => {
    const { title, description, cover, waterAmount } = props;
    return (
        <div className="w-72 h-80 rounded-md relative overflow-hidden bg-white/5">
            {cover && <Image src={cover} width={280} height={320} className='h-96 w-80 rounded-md' alt={'house plant'} />}
            <label htmlFor="bulk-action" className="absolute top-0 right-0 p-4 cursor-pointer">
                <input id="bulk-action" type="checkbox" className="cursor-pointer" />
            </label>
            <div className="h-28 w-72 leading-9 top-56 hover:top-20 hover:h-64 focus:h-96 hover:leading-6 ease-in-out duration-300 delay-75 hover:delay-200 absolute overflow-hidden p-4 bg-gradient-to-b from-green-700/90 to-slate-800">
                <div className="font-bold text-slate-200 flex justify-between">
                    <span className="text-3xl">{title}</span>
                    <span>{waterAmount !== undefined ? `${waterAmount ? waterAmount : ''} 💧` : ''}</span>
                </div>
                <div className="pt-1" />
                <div className="font-normal text-slate-300">{description}</div>
            </div>
        </div>
    )
}

export default Card;