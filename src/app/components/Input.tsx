
interface props {
    style?: string,
    type: string,
    required: boolean
    onChange?: any,
    value?: any,
    placeHolder?: string
}

export default function Input({style = '', type = 'text', required = true, onChange = null, value = null, placeHolder } : props ) {
    return (
        <>
            <input
                placeholder={placeHolder}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                required={required}
                type={`${type}`}
                className={`rounded-lg p-3 hover:opacity-95 text-zinc-900 outline-none${style}`}
            />
        </>
    )

}

