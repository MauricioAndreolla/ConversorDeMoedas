import { useState } from "react"

export default function Modal() {
    const [open, setOpen] = useState(true);

    

    return (

    

        <div className="fixed inset-0 z-10 w-screen overflow-y-aut ">
            <div className="flex flex-col w-[370px] h-[270px] bg-zinc-900 rounded m-auto">
                <div className="flex flex-row-reverse p-4"  >
                    <a className="text-lg font-bold hover:opacity-50 text-right" href="#">X</a>
                </div>

                <div className="flex flex-col justify-center items-center mt-7">
                    <div>
                        <span className="block font-semibold">Deseja realmente excluir o item? </span>
                        <span className="block font-semibold text-center">ABC</span>
                    </div>
                    <div className="text-center mt-5">
                        <button className="w-[full] p-2 mx-1 my-1 bg-red-700 hover:bg-red-500 rounded-lg">Confirmar</button>
                        <button className="w-[full] p-2 mx-1 my-1 bg-purple-700 hover:bg-purple-500 rounded-lg">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}