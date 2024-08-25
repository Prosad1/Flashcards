'use-client'
import { Container, AppBar, Typography, Button, Toolbar, Box, Grid} from '@mui/material'
import Link from 'next/link'
import { SignIn } from '@clerk/nextjs'
export default function SignUpPage(){

     return <Container maxWidth="100vw">
        <AppBar position="static">
            <Toolbar>
                <Typography variant='h6' sx={{ flexGrow: 1,}}>
                    Flashcard Saas
                </Typography>
                <Button color = "inherit">
                    <Link href ="/sign-in" passHref>
                        Login
                    </Link>
                </Button>
                <Button color = "inherit">
                    <Link href ="/sign-up" passHref>
                        Sign up
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>
        
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="h4">Sign in</Typography>
            <SignIn/>
        </Box>
     </Container>

}
