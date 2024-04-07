
import nlwUnite from '../assets/nlw-unite.svg'
import NavLink from './nav-link'

export default function Header() {
  return (
    <div className='flex items-center gap-5 py-2'>
        <img src={nlwUnite} alt="NLW Unite" />
        <nav className='flex items-center gap-5'>
          <NavLink href='/eventos' >Eventos</NavLink>
          <NavLink href='/participantes'>Participantes</NavLink>
        </nav>
    </div>
  )
}
