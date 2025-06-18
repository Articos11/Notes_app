import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { formatDate } from '../lib/utils.js'
import toast from "react-hot-toast"
import api from '../lib/axios.js'

const NoteCard = ({note, setNotes}) => {

    const navigate = useNavigate()

    const handleDelete = async (e, id) => {
        e.preventDefault();
        
        if(!window.confirm("Tem certeza que quer deletar essa nota?")) return;

        try {
           await api.delete(`/notes/${id}`)
        setNotes((prev) => prev.filter((note) => note._id !== id))
           toast.success("Nota deletada com sucesso.")
        } catch (error) {
            console.log("Erro ao deletar a nota", error)
            toast.error("Falha ao deletar a nota.")
        }
    }
  return (
    <Link to={`/note/${note._id}`} className='card bg-base-100 hover:bg-base-300 
    transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'>

        <div className='card-body'>
            <h3 className='card-title text-based-content'>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
                <div className='flex items-center gap-1'>
                    <button className='btn btn-ghost btn-xs' onClick={() => toast.success("Iniciando edição")}>
                        <PenSquareIcon className='size-4'/>
                    </button>
                    <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}>
                        <Trash2Icon className='size-4'/>
                    </button>
                </div>
            </div>
        </div>

    </Link>
  )
}

export default NoteCard