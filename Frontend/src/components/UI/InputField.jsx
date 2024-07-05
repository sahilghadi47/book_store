import { useId } from 'react'

export default function Input(
    {
        type = "text",
        placeholder,
        className,
        value,
        onChange,
        label,
        props
    }
) {
    const id = useId();
    return (

        <>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={`block px-5 py-2 border w-full my-2 outline-none rounded-md invalid:border-red-600
                ${className}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                {...props}
            />
        </>
    )
}
