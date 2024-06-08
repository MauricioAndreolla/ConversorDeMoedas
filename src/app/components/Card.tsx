import Image from "next/image";
import { CardType } from "../types/Types";
import { ClipboardEditIcon } from "lucide-react";
import { Trash2Icon } from "lucide-react";


export default function Card(props: CardType) {
    return (
        <div className="flex items-center justify-center w-[300px] h-[300px] rounded bg-zinc-900 mx-2 my-2">


            <div className="m-2 p-2 w-[200px]">

                <div className="m-2 text-center">
                    <h5 className="text-white text-center font-bold">{props.title}</h5>
                </div>

                <div className="w-max-[200px] h-[80px] m-2">
                    <Image
                        alt="image"
                        src={props.url ? props.url:  'https://ntc.ind.br/wp-content/uploads/2021/04/ntc-company-logo.svg' }
                        width={150}
                        height={120}
                    />
                </div>

                <div className="flex items-center justify-center m-1">
                    <small className="text-justify text-sm">{props.content?.length > 30 ? props.content?.slice(0, 50) + "..." : props.content}</small>
                </div>

                <div className="flex justify-end mt-3 ">
                    <ClipboardEditIcon className="text-purple-900 hover:text-purple-700 mx-2 mt-2"
                    />
                    <Trash2Icon
                        className="text-red-900 hover:text-red-700 mx-2 mt-2"
                    />
                </div>

            </div>

        </div>



    )
}