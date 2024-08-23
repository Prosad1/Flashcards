'use client'
import {useUser} from '@clerk/nextjs'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import { Container, AppBar, Typography, Button, Toolbar, Box, Grid} from '@mui/material'

export default function Generate() {
    const{isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState("")
    const [name,setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async ()=> {

        fetch['api/generate', {
            method: 'POST',
            body: text,

        }]
        .then((res) => res.json())
        .then((data) > setFlashcards(data))
    }

    const handleCardCLick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const handleOpen =() => {
        setOpen(true)
    }
    const handleClose =() => {
        setOpen(false)
    }

    const saveFlashcards = async () =>{
        if (!name){
            alert('Please enter a name')
            return 
        }

        const batch = writeBatch(db)
        const UserDOcRef = doc(collection (db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if(docSnap.exists()){
            const collections =docSnap.data().flashcards || [] 
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with the same name already exists.')
                return 
            }
            else{
                collections.push({name})
                batch.set(userDocRef, {flashcards: collections}, {merge:true} )
            }
        }
        else {
            batch .set(userDocRef, {flashcards: [{name}]})
        }

        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })
        
        await batch.commit()
        handleClose()
        router.push('/flashcards')

    }

    return(
        <Container maxWidth="md"></Container>
    )

}