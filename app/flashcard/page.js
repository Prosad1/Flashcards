'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

import {useSearchParams} from 'next/navigation'
import { collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { Card, Container, AppBar, Typography, Button, Toolbar, Box, Grid, Paper, TextField, CardActionArea, CardContent, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions} from '@mui/material'

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    
    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []

            docs.forEach((doc) => {
            flashcards.push({id: doc.id, ...doc.data()})
            })
            setFlashcards(flashcards)
        }

        getFlashcard()
    }, [user, search])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    return (<Container maxWidth="100vw">
        <Grid container spacing = {3} sx = {{ mt:4}}>
            {flashcards.map((flashcard, index) => (
                <Grid item sx={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardActionArea onClick={() => {
                            handleCardClick(index)
                        }}>
                            <CardContent>
                                <Box sx={{
                                    perspective: '1000px',
                                    '& > div': {
                                        transition: 'transform 0.6s',
                                        transformStyle: 'preserve-3d',
                                        position: 'relative',
                                        width: '100%',
                                        height: '200px',
                                        boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                        transform: flipped[index]? 'rotateY(180deg)' : 'rotateY(0deg)',
                                    },
                                    '& > div > div': {
                                        
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 2,
                                        boxSizing: 'border-box',
                                    },
                                    '& > div > div:nth-of-type(2)': {
                                        transform: 'rotateY(180deg)'
                                    },
                                }}
                                >
                                <div>
                                <div>
                                <Typography variant='h5' component='div'>
                                    {flashcard.front}
                                </Typography></div>
                                <div>
                                <Typography variant='h5' component='div'>
                                    {flashcard.back}
                                </Typography>
                                </div>
                                </div></Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}

        </Grid>
    </Container>)
}