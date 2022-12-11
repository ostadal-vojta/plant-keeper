import Image from "next/image";
import { useState } from "react";
import Button from "./Button";

type ICard = {
    title: string;
    description?: string | JSX.Element;
    cover?: string;
    waterAmount?: number;
}

const Card = (props: ICard) => {
    const { title, description, cover, waterAmount } = props;

    const [isDetail, setIsDetail] = useState(false);
    return (
        <div className={`${isDetail ? 'w-full h-96 delay-200' : 'w-72 h-80'} relative rounded-md overflow-hidden bg-white/5 ease-in-out duration-200`}>
            {cover && <Image src={cover} width={280} height={320} className={`h-96 w-80 rounded-md ease-in-out ${isDetail ? 'opacity-0 delay-75 duration-100' : 'opacity-100 delay-200 duration-200'}`} alt={'house plant'} />}
            {!isDetail && (<label htmlFor="bulk-action" className="absolute top-0 right-0 p-4 cursor-pointer">
                <input id="bulk-action" checked={isDetail} type="checkbox" className="cursor-pointer" />
            </label>)}
            <div className={`${isDetail ? 'h-96 leading-6 w-full top-0' : 'h-48 w-72 hover:top-20 hover:h-80 leading-9 hover:leading-6 hover:delay-200 top-56'} ease-in-out duration-300 absolute overflow-hidden p-4 bg-gradient-to-b from-green-700/90 via-green-800/90 to-slate-800`}>
                <div className="font-bold text-slate-200 flex justify-between">
                    <span className="text-3xl">{title}</span>
                    <span>{waterAmount !== undefined ? `${waterAmount ? waterAmount : ''} 💧` : ''}</span>
                </div>
                <div className="pt-1" />
                <div className="font-normal text-slate-300">{description}</div>
                <div className="pt-1" />
                <Button onClick={() => setIsDetail((prev) => !prev)} />
            </div>
        </div>
    )
}

export default Card;