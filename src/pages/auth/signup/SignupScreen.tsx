import {
    Paper,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    Container,
    Group,
    Divider,
  } from '@mantine/core';
  import classes from './SignupScreen.module.css';
  import logo from '../../../logo.png'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useAuth } from '../../../components/auth/AuthProvider';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';


function SignupScreen() {

    const navigate = useNavigate();
    const { onSignup } = useAuth();
    const [error, setError] = useState<string|null>(null);

    document.title = "PicHub | Regisitrieren";

    const  signup = (credentials:any) => {
        onSignup(credentials)
            .then((user: CognitoUser) => {
                console.log(user);
                navigate(`/auth/verificate/${user.getUsername()}`);
            })
            .catch((error: Error) => {
                console.log(error);
                setError('Fehler bei der Registrierung. Versuche es nochmal!');
            });
    }

    const form = useForm({
        initialValues: { email: '', password: '', username: '', name: '', staySignedIn: false },
        validate: {
            email: (value) => {
              if (!value) return 'E-Mail ist erforderlich.';
              if (!/^\S+@\S+$/.test(value)) return 'Ungültige E-Mail-Adresse.';
              return null;
            },
            username: (value) => {
              if (!value) return 'Username ist erforderlich.';
              if (value.length < 5) return 'Der Username sollte mindestens 5 Zeichen lang sein.';
              return null;
            },
            name: (value) => {
              if (!value) return 'Name ist erforderlich.';
              return null;
            },
            password: (value) => {
              if (!value) return 'Passwort ist erforderlich.';
              if (value.length < 8) return 'Das Passwort muss mindestens 8 Zeichen lang sein.';
              if (!/\d/.test(value)) return 'Das Passwort muss mindestens eine Zahl enthalten.';
              if (!/[a-zA-Z]/.test(value)) return 'Das Passwort muss mindestens einen Buchstaben enthalten.';
              return null;
            },
          },
    });

    return (
        
        <div className={classes.wrapper}>

            <motion.div 
                initial={{x: -20, opacity: 0.9}}
                animate={{x: 0, opacity: 1}}
                exit={{ opacity: 0.9}}>

            <Paper className={classes.form} radius={0} p={30}>
                <Container className={classes.titleWrapper}>
                    <img src={logo} width={100}/>
                    <Title order={2} className={classes.title} ta="center" mt="0" mb={20}>
                        Willkommen bei PicHub!
                    </Title>
                </Container>

                <form onSubmit={form.onSubmit(signup)}>
                    
                    <TextInput label="Username" placeholder="" mt="md" size="md" 
                    {...form.getInputProps('username')}/>

                    <TextInput label="Name" placeholder="" mt="md" size="md" 
                    {...form.getInputProps('name')}/>

                    <TextInput label="E-Mail" placeholder="" mt="md" size="md" 
                    {...form.getInputProps('email')}/>

                    <PasswordInput label="Passwort" placeholder="" mt="md" size="md" 
                    {...form.getInputProps('password')}/>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Checkbox label="Angemeldet bleiben" mt="xl" size="md" 
                    {...form.getInputProps('staySignedIn')}/>
                    
                    <Button fullWidth mt="xl" size="md" type="submit">
                        Registrieren
                    </Button>

                </form>

                <Text ta="center" mt="md">
                    Bereits einen Account?{' '}
                    <Anchor<'a'> href="#" fw={700} onClick={() => {navigate("/auth/login");}}>
                        Anmelden
                    </Anchor>
                </Text>
            </Paper>
            </motion.div>
        </div>
        
    );
}

export default SignupScreen;

/**
<Group grow mb="md" mt="md">
    <GoogleButton radius="xl">Google</GoogleButton>
</Group>

<Divider label="Weiter mit E-Mail?" labelPosition="center" my="lg" />
 */