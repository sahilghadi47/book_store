import { useState } from 'react';
import { useId } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
export default function PasswordField({
    value, onChange, className
}) {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);
    return (

        <>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Password : </label>
            <div class="relative mb-6">
                <div class="absolute inset-y-0 end-0 px-5 flex items-center ps-3.5 cursor-pointer font-light text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </div>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id={id}
                    placeholder='Passwoard'
                    className={`flex-1 block start-0 px-5 py-2 border w-full my-2 
                    outline-none rounded-md ${className}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </>
    )
}
