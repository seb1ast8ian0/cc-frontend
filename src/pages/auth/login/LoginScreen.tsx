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
  import classes from './LoginScreen.module.css';
  import logo from '../../../logo.png'
import { motion } from "framer-motion";
import { GoogleButton } from '../../../components/GoogleButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/auth/AuthProvider';
import { useForm } from '@mantine/form';
import { useState } from 'react';
  
function LoginScreen() {

    const navigate = useNavigate();
    const { onLogin } = useAuth();
    const [error, setError] = useState<string|null>(null);

    document.title = "PicHub | Login";

    const form = useForm({
        initialValues: { password: '', username: '', staySignedIn: false },
        validate: {
            password: (value) => (value.length > 1 ? null : 'Ungültiges Passwort!'),
            username: (value) => (value.length > 1 ? null : 'Ungültiger Username!')
        },
    });

    const login = (credentials:any) => {
        const reponse = onLogin(credentials).catch((error: Error) => {
            form.setErrors({ password: ' ', username: ' ' });
            setError('Ungültiger Benutzername oder Passwort!');
        });
    }

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
                            Willkommen zurück!
                        </Title>
                    </Container>

                    <form onSubmit={form.onSubmit(login)}>

                        

                        <TextInput label="Username" placeholder="" size="md" 
                            {...form.getInputProps('username')}
                        />
                        <PasswordInput label="Passwort" placeholder="" mt="md" size="md" 
                            {...form.getInputProps('password')}
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <Checkbox label="Angemeldet bleiben" mt="xl" size="md" 
                            {...form.getInputProps('staySignedIn', { type: 'checkbox' })}
                        />

                        <Button fullWidth mt="xl" size="md" type="submit">
                            Login
                        </Button>
                        

                    </form>

                    <Text ta="center" mt="md">
                        Noch keinen Account?{' '}
                        <Anchor<'a'> href="#" fw={700} onClick={() => {navigate("/auth/signup");}}>
                            Registrieren
                        </Anchor>
                    </Text>
                </Paper>
            </motion.div>
        </div>
    );
}

export default LoginScreen;

/** 
    <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
    </Group>

    <Divider label="Weiter mit E-Mail?" labelPosition="center" my="lg" />
    */