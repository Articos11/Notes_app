import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../lib/axios'
import toast from "react-hot-toast"
import { LoaderIcon, Trash2Icon, ArrowLeftIcon} from 'lucide-react'
import { Link } from 'react-router'

const NoteDetailPage = () => {
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const navigate = useNavigate()

  const {id} = useParams()

  console.log({ id })

  useEffect(() => {
    const fetchNote = async () =>{
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        toast.error("Não foi possível recuperar a nota")
        console.log("Erro encontrado ao tentar recuperar a nota.", error)
      } finally {
        setLoading(false)
      }
    }
    fetchNote();
  }, [id])

  const handleDelete = async () => {
      if(!window.confirm("Tem certeza de que quer deletar essa nota?")) return

      try {
        await api.delete(`/notes/${id}`)
        toast.success("Nota deletada com sucesso.")
        navigate('/')
      } catch (error) {
        console.log("Erro ao deletar a nota", error)
        toast.error("Erro ao deletar a nota")
      }
  }
  const handleSave = async () => {
      if (!note.title.trim() || !note.content.trim()) {
        toast.error("Por favor, adicione um título ou uma descrição")
        return;
      }

      setSaving(true)

      try {
        await api.put(`/notes/${id}`, note)
        toast.success("Nota atualizada com sucesso")
        navigate('/')
      } catch (error) {
        console.log("Erro ao editar a nota", error)
        toast.error("Erro ao editar a nota")
      } finally {
        setSaving(false)
      }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className='min-h-scree bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">
          <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
              <Link to="/" className="btn btn-ghost">
                <ArrowLeftIcon className="h-5 w-5" />
                Voltar para Notas
              </Link>
              <button  onClick={handleDelete} className="btn btn-error btn-outline">
                <Trash2Icon className="h-5 w-5" />
                Deletar Nota
              </button>
              </div>

              <div className='card bg-base-100'>
                <div className="card-body">
                  <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Título</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Título da nota"
                    className="input input-bordered"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                  />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Descrição da Nota</span>
                    </label>
                    <textarea
                      placeholder="Digite as informações da nota"
                      className="textarea textarea-bordered h-32"
                      value={note.content}
                      onChange={(e) => setNote({ ...note, content: e.target.value })}
                    />
                  </div>

                  <div className='card-actions justify-end'>
                    <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                      {saving ? "Salvando" : "Salvar mudanças"}
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage