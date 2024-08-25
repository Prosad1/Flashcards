'use client'
import getStripe from './utils/get-stripe.js';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Head from 'next/head'
import { Container, AppBar, Typography, Button, Toolbar, Box, Grid} from '@mui/material'
//analytics import
import { useEffect } from 'react';
import { analytics } from '@/firebase';
import { usePathname } from 'next/navigation';
import { logEvent } from "firebase/analytics";


export default function Home() {
  //analytics
  const pathname = usePathname();

  useEffect(() => {
    if (analytics) {
      console.log('Firebase Analytics initialized successfully');

      // Log the page view
      logEvent(analytics, 'page_view', {
        page_path: pathname, // Current page path
      });
    }
  }, [pathname]); // Run effect when pathname changes

  //before this is analytics
  const handleSubmit = async() =>{
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers:{
        origin: 'https://localhost:3000',
      },
  })


  const checkoutSessionJson = await checkoutSession.json()
 
  if(checkoutSession.statusCode === 500){
    console.error(checkoutSession.message)
    return
  }

  const stripe = await getStripe()
  const {error} = await stripe.redirectToCheckout({
    sessionId: checkoutSessionJson.id,
  })

  if (error){
    console.warn(error.message)
  }
  }

  return(
    <Container maxWidth="auto">
      <Head>
        <title>Flashcard  SaaS</title>
        <meta name ="description" content="Create flashcard from your text"></meta>
      </Head>

      <AppBar position="Static">
        <Toolbar>
          <Typography variant ="h6" style={{flexGrow:1}}>Smart Cards</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>


      </AppBar>
      <Box sx = {{mt:2, display:'flex', flexDirection:'column', alignItems:'center'}}>
        <Typography variant="h2"> Welcome to Smart Cards</Typography>
        <Typography variant ="h5">
          {' '}
          The easiest way to make flashcards from your text
        </Typography>
        <Button variant="contained" color='primary' sx = {{mt:2, display:'flex', flexDirection:'column', alignItems:'center'}} href="/generate"   >Get Started</Button>
      </Box>
      <Box>
        <Typography>
          Features
        </Typography>
        <Grid container spacing = {4}>
          <Grid item xs = {12} md = {4}>
            <Typography variant ="h6">Easy Text Input</Typography>
            <Typography>Simply put in your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
          </Grid>
          <Grid item xs = {12} md = {4}>
            <Typography variant ="h6">Smart Cards</Typography>
            <Typography>Simply put in your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
          </Grid>
          <Grid item xs = {12} md = {4}>
            <Typography variant ="h6">Access Everywhere</Typography>
            <Typography>Simply put in your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center '}}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing = {4}>
          <Grid item xs = {12} md = {6}>
            <Box sx={{p:3, border: '1px solid', borderColor: 'grey.300', borderRadius:2}}>
            <Typography variant ="h5" gutterBottom>Basic</Typography>
            <Typography variant="h6" gutterBottom>5$ / month</Typography>
            <Typography>{''} Access to basic flashcard features and limited storage.</Typography>
            <Button variant="contained" color="primary" sx={{mt: 2}}> Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs = {12} md = {6}>
          <Box sx={{p:3, border: '1px solid', borderColor: 'grey.300', borderRadius:2}}>
            <Typography variant ="h5" gutterBottom>Pro</Typography>
            <Typography variant="h6" gutterBottom>10$ / month</Typography>
            <Typography>{''} Unlimited flashcards and storage, with priority suppport</Typography>
            <Button variant="contained" color="primary" sx={{mt: 2}} onClick={handleSubmit}> Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>



  )
}
