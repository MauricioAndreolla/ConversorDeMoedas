"use client";
import { useState } from "react";
import Input from "./Input";
import { CardType } from "../types/Types";

export default function Form() {

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    const [cards, setCards] = useState<[CardType?]>([{
        title: '',
        content: '',
        url: ''
    }]);

    const [card, setCard] = useState<CardType>({
        title: '',
        content: '',
        url: ''
    });

    function SendValues(e: any) {
        
    }


    function ValidatedForm() {
        if (title == null) {
            return true;
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">

            <form method="post">

                <div className="bg-zinc-900 w-[700px] rounded-lg p-10">

                    <div className="m-1 p-1">
                        <h1 className="font-bold text-center text-2xl text-purple-500">Card Add</h1>
                    </div>

                    <div className="flex flex-col justify-center my-3">
                        <label className="text-left my-2 text-purple-500">Title</label>

                        <Input
                            placeHolder="Teste 123"
                            required={true}
                            onChange={setTitle}
                            value={title}
                            type="text"
                        />

                    </div>

                    <div className="flex flex-col justify-center my-3">
                        <label className="text-left my-2  text-purple-500">Content</label>

                        <textarea
                            id="content"
                            name="content"
                            placeholder="Conteúdo adicional"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            required={false}
                            className="rounded-lg text-zinc-900 p-3 resize-none"
                            cols={10}
                            rows={10}
                        />
                    </div>

                    <div className="flex flex-col justify-center my-3">
                        <label className="text-left my-2  text-purple-500">Image URL</label>

                        <Input
                            placeHolder="https://image.com.br"
                            required={false}
                            onChange={setUrl}
                            value={url}
                            type="text"
                        />
                    </div>


                    <div className="flex  items-end justify-end mt-5 w-[200px]">

                        <button type="submit" className="w-[100px] h-[40px] bg-purple-700 hover:bg-purple-500 rounded-lg mx-2" onClick={(e: any) => SendValues(e)}>Add</button>
                        <button type="reset" className="w-[100px] h-[40px] bg-red-700 hover:bg-red-500 rounded-lg">Cancel</button>

                    </div>

                </div>


            </form>

        </div>

    )
}