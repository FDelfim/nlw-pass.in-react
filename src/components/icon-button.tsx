import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'>{
    transparent?: boolean
}

export default function IconButton({transparent, ...props} : ButtonProps) {
  return (
    <button className={twMerge('bg-white/10 border border-white/10 rounded-md p-1.5',
        transparent && 'bg-black/20',
        props.disabled && 'opacity-50 cursor-not-allowed'
    )} {...props}/>
  )
}
