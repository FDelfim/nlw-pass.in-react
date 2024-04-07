
import nlwUnite from '../assets/nlw-unite.svg'

export default function Header() {
  return (
    <div className='flex items-center gap-5 py-2'>
        <img src={nlwUnite} alt="NLW Unite" />
        <nav className='flex items-center gap-5'>
            <a className='font-mediu text-sm text-zinc-300'>Eventos</a>
            <a className='font-mediu text-sm text-zinc-300'>Participantes</a>
        </nav>
    </div>
  )
}
