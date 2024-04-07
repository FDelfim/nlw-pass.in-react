import React from 'react'
import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'

export default function AtendeeList() {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-3 items-center'>
                <h1 className='text-2xl'>Participantes</h1>
                <div className='px-3 py-1.5 border w-72 border-white/10 rounded-large text-sm flex items-center gap-3'>
                    <Search className='size-4 text-emerald-300' />
                    <input type="text" placeholder='Buscar participante' className='bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm' />
                </div>
            </div>
            <div className='border border-white/10 rounded-lg'>
                <table className='w-full'>
                    <thead className='py-3 px-4 text-sm font-semibold'>
                        <tr className='border-b border-white/10'>
                            <th style={{ width: 64 }} className='py-3 px-4 text-sm font-semibold text-left'><input type="checkbox" className='size-4 bg-black/10 border border-white-10 checked:bg-orange-400 outline-none' /></th>
                            <th className='py-3 px-4 text-sm font-semibold text-left'>Código</th>
                            <th className='py-3 px-4 text-sm font-semibold text-left'>Participante</th>
                            <th className='py-3 px-4 text-sm font-semibold text-left'>Data de inscrição</th>
                            <th className='py-3 px-4 text-sm font-semibold text-left'>Data do check-in</th>
                            <th style={{ width: 64 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from({ length: 10 }).map((_, index) => {
                                return (
                                    <tr className='border-b border-white/10 hover:bg-white/5' key={index}>
                                        <td className='py-3 px-4 text-sm text-zinc-300'><input type="checkbox" className='size-4 bg-black/10 border border-white-10 checked:bg-orange-400 outline-none' /></td>
                                        <td className='py-3 px-4 text-sm text-zinc-300'>12332123</td>
                                        <td className='py-3 px-4 text-sm text-zinc-300'>
                                            <div className='flex flex-col gap-1'>
                                                <span className='font-semibold text-white'>Felipe Delfim Machado</span>
                                                <span>felipe.delfim@email.com</span>
                                            </div>
                                        </td>
                                        <td className='py-3 px-4 text-sm text-zinc-300'>06 de Abril de 2024</td>
                                        <td className='py-3 px-4 text-sm text-zinc-300'>Data do check-in</td>
                                        <td>
                                            <button className='bg-black/20 border border-white/10 rounded-md p-1.5'>
                                                <MoreHorizontal className='size-4 text-zinc-300' />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className='py-3 px-4 text-sm text-zinc-300' colSpan={3}>Mostrando 10 - 228</td>
                            <td className='py-3 px-4 text-sm text-zinc-300 text-right' colSpan={3}>
                                <div className='items-center gap-8 inline-flex'>
                                    <span>Página 1 de 23</span>
                                    <div className='flex gap-1.5'>
                                        <button className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                                            <ChevronsLeft className='size-4 text-zinc-300' />
                                        </button>
                                        <button className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                                            <ChevronLeft className='size-4 text-zinc-300' />
                                        </button>
                                        <button className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                                            <ChevronRight className='size-4 text-zinc-300' />
                                        </button>
                                        <button className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                                            <ChevronsRight className='size-4 text-zinc-300' />
                                        </button>
                                    </div>

                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}
