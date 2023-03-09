import { useState, useEffect } from 'react'
import './admin.css'

import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function Admin() {
    const [taskInput, setTaskInput] = useState('')
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState({})

    const [tasks, setTasks] = useState([])

    useEffect(()=> {
        async function loadTasks(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail)

                const taskRef = collection(db, "tasks")
                const q = query(taskRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snapshot)=>{
                    let list = []

                    snapshot.forEach((doc)=> {
                        list.push({
                            id: doc.id,
                            task: doc.data().task,
                            userUid: doc.data().userUid
                        })
                    })
                    setTasks(list)

                })
            }
        }

        loadTasks()
    }, [])

    async function handleRegister(e){
        e.preventDefault()

        if(taskInput === '') {
            toast.warn('Digite sua tarefa...')
            return
        }

        if(edit?.id) {
            handleUpdateTask()
            return
        }

        await addDoc(collection(db, "tasks"), {
            task: taskInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(()=> {
            toast.info('Tarefa adicionada')
            setTaskInput('')
        })
        .catch((error)=> {

        })
    }

    async function handleLogout(){
        await signOut(auth)
    }

    async function deleteTask(id){
        const docRef = doc(db, "tasks", id)
        await deleteDoc(docRef)
        .then(()=> {
            toast.success('Tarefa concluida!!!', {
                icon: '🎉',
                theme: 'light'
            })
        })
    }

    function editTask(item){
        setTaskInput(item.task)
        setEdit(item)
    }

    async function handleUpdateTask(){
        const docRef = doc(db, "tasks", edit?.id)
        await updateDoc(docRef, {
            task: taskInput
        })
        .then(()=> {
            toast.info('Tarefa atualizada')
            setTaskInput('')
            setEdit({})
        })
        .catch(()=> {
            toast.error('Erro ao atualizar')
            setTaskInput('')
            setEdit({})
        })
    }

    return(
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea
                    placeholder='Digite sua tarefa'
                    value={taskInput}
                    onChange={(e)=> setTaskInput(e.target.value)}
                />

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' style={{ background: '#6add39' }} type='submit'>Atualizar tarefa</button>
                ): (
                    <button className='btn-register' type='submit'>Registrar tarefa</button>
                )}
            </form>

            {tasks.map((item)=> (
                <article key={item.id} className='list'>
                    <p>{item.task}</p>
                    <div>
                        <button onClick={()=> editTask(item)}>Editar</button>
                        <button onClick={()=> deleteTask(item.id)} className='btn-delete'>Concluir</button>
                    </div>
                </article>
            ))}

            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}