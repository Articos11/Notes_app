import React, { useState } from 'react'
import { Link, useNavigate } from "react-router"
import { ArrowLeftIcon } from 'lucide-react';
import toast from "react-hot-toast"
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!title.trim() || !content.trim()) {
      toast.error("Todos os campos são necessários.")
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title, 
        content
      })
      toast.success("Nota criada com sucesso!")
      navigate("/")

    } catch (error) {
      if(error.response.status === 429){
        toast.error("Devagar. Muitas notas estão sendo criadas.", {
          duration: 4000,
          icon:"🤯"
        })
      } else {
        toast.error("Falha ao criar nota.")
      }
      console.log("erro criando nota", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5'/>
            Voltar para Notas
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Criar nova nota</h2>
              <form onSubmit={handleSubmit}>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Titulo</span>
                  </label>
                  <input type="text" 
                  placeholder='Digite o título da nota...'
                  className='input input-bordered'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Descrição da Nota</span>
                  </label>
                  <textarea
                  placeholder='Digite as informações da nota'
                  className='textarea textarea-bordered h-32'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className='card-actions justify-end'>
                  <button type="submit" className='btn btn-primary' disabled={loading}>
                    {loading ? "Criando..." : "Criar Nota"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage