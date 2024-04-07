import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import IconButton from './icon-button'
import Table from './table/table'
import TableHeader from './table/table-header'
import TableCell from './table/teable.cell'
import TableRow from './table/table-row'
import { useState } from 'react'
import { attendees } from '../data/attendees'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export default function AtendeeList() {

    const [search, setSearch] = useState('')
    const [ page, setPage ] = useState(1)

    const totalPages = Math.ceil(attendees.length / 10)
    
    const nextPage = () => {
        setPage(page + 1)
    }

    const lastPage = () => {
        setPage(totalPages)
    }

    const previousPage = () => {
        setPage(page - 1)
    }

    const firstPage = () => {
        setPage(1)
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-3 items-center'>
                <h1 className='text-2xl'>Participantes</h1>
                <div className='px-3 py-1.5 border w-72 border-white/10 rounded-large text-sm flex items-center gap-3'>
                    <Search className='size-4 text-emerald-300' />
                    <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Buscar participante' className='bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm' />
                </div>
            </div>
                <Table>
                    <thead className='py-3 px-4 text-sm font-semibold'>
                        <tr className='border-b border-white/10'>
                            <TableHeader style={{ width: 64 }}><input type="checkbox" className='size-4 bg-black/10 border border-white-10 checked:bg-orange-400 outline-none' /></TableHeader>
                            <TableHeader>Código</TableHeader>
                            <TableHeader>Participante</TableHeader>
                            <TableHeader>Data de inscrição</TableHeader>
                            <TableHeader>Data do check-in</TableHeader>
                            <TableHeader style={{ width: 64 }}></TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
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
                                        <TableCell>{dayjs().to(attendee.checkInAt)}</TableCell>
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
                            <TableCell className='py-3 px-4 text-sm text-zinc-300' colSpan={3}>Mostrando 10 de {attendees.length}</TableCell>
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
