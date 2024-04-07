import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import IconButton from './icon-button'
import Table from './table/table'
import TableHeader from './table/table-header'
import TableCell from './table/teable.cell'
import TableRow from './table/table-row'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendee{
    id: string
    name: string
    email: string
    createdAt: string
    checkInAt: string | null
}

export default function AtendeeList() {

    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString()); return url.searchParams.get('search') || ''
    })
    const [ page, setPage ] = useState(() => {
        const url = new URL(window.location.toString()); return Number(url.searchParams.get('page') || 1)
    })
    const [ attendees, setAttendees ] = useState<Attendee[]>([])
    const [ total, setTotal ] = useState(0)

    useEffect(() => {
        const url = new URL('http://localhost:8000/events/6ab897da-aa44-447b-9e7c-d2a90908481c/attendees')
        url.searchParams.set('pageIndex', String(page - 1))

        if(search.length > 0){
            url.searchParams.set('query', search)
        }

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setAttendees(data.attendees)
            setTotal(data.total)
        })
    }, [page, search])

    const totalPages = Math.ceil(total / 10)

    function setCurrentPage (page: number){
        const url = new URL(window.location.toString())
        url.searchParams.set('page', String(page))
        window.history.pushState({}, '', url)
        setPage(page)
    }
    
    function setCurrentSearch (search: string){
        const url = new URL(window.location.toString())
        url.searchParams.set('search', search)
        window.history.pushState({}, '', url)
        setSearch(search)
    }

    const nextPage = () => {
        setCurrentPage(page + 1)
    }

    const lastPage = () => {
        setCurrentPage(totalPages)
    }

    const previousPage = () => {
        setCurrentPage(page - 1)
    }

    const firstPage = () => {
        setCurrentPage(1)
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-3 items-center'>
                <h1 className='text-2xl'>Participantes</h1>
                <div className='px-3 py-1.5 border w-72 border-white/10 rounded-large text-sm flex items-center gap-3'>
                    <Search className='size-4 text-emerald-300' />
                    <input type="text" onChange={(e) => {setCurrentSearch(e.target.value); setCurrentPage(1)}} value={search} placeholder='Buscar participante' className='bg-transparent flex-1 outline-none focus:ring-0 h-auto border-0 p-0 text-sm' />
                </div>
            </div>
                <Table>
                    <thead className='py-3 px-4 text-sm font-semibold'>
                        <tr className='border-b border-white/10'>
                            <TableHeader style={{ width: 64 }}><input type="checkbox" className='size-4 bg-black/10 border border-white-10 checked:bg-orange-400 outline-none' /></TableHeader>
                            <TableHeader>Código</TableHeader>
                            <TableHeader>Participante</TableHeader>
                            <TableHeader>Data de inscrição</TableHeader>
                            <TableHeader className='text-center'>Check-in</TableHeader>
                            <TableHeader style={{ width: 64 }}></TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendees.map((attendee) => {
                                return (
                                    <TableRow key={attendee.id}>
                                        <TableCell><input type="checkbox" className='size-4 bg-black/10 border border-white-10 checked:bg-orange-400 outline-none' /></TableCell>
                                        <TableCell>{attendee.id}</TableCell>
                                        <TableCell>
                                            <div className='flex flex-col gap-1'>
                                                <span className='font-semibold text-white'>{attendee.name}</span>
                                                <span>{attendee.email.toLocaleLowerCase()}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                                        <TableCell className='text-center'>{attendee.checkInAt ? dayjs().to(attendee.checkInAt) : <span className='bg-slate-200/10 text-zinc-300 border border-slate-100/10 rounded p-1 text-xs text-center'>Não realizado</span>}</TableCell>
                                        <TableCell>
                                            <IconButton transparent>
                                                <MoreHorizontal className='size-4 text-zinc-300' />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <TableCell className='py-3 px-4 text-sm text-zinc-300' colSpan={3}>Mostrando {attendees.length} de {total}</TableCell>
                            <TableCell className='py-3 px-4 text-sm text-zinc-300 text-right' colSpan={3}>
                                <div className='items-center gap-8 inline-flex'>
                                    <span>Página {page} de { totalPages }</span>
                                    <div className='flex gap-1.5'>
                                        <IconButton onClick={firstPage} disabled={page === 1}>
                                            <ChevronsLeft className='size-4' />
                                        </IconButton>
                                        <IconButton onClick={previousPage} disabled={page === 1}>
                                            <ChevronLeft className='size-4' />
                                        </IconButton>
                                        <IconButton onClick={nextPage} disabled={page === totalPages}>
                                            <ChevronRight className='size-4' />
                                        </IconButton>
                                        <IconButton onClick={lastPage} disabled={page === totalPages}>
                                            <ChevronsRight className='size-4' />
                                        </IconButton>
                                    </div>
                                </div>
                            </TableCell>
                        </tr>
                    </tfoot>
                </Table>
        </div>
    )
}
