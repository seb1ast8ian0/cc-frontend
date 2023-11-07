import { CognitoUser } from 'amazon-cognito-identity-js';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../components/auth/AuthProvider';
import { Anchor, Box, Button, Center, Container, Flex, Group, Paper, PinInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowLeft, IconReload } from '@tabler/icons-react';
import classes from './VerificateScreen.module.css';

interface VerificateCredentials{
  pin: number;
}

function VerificateScreen() {

  const [resend, setResend] = useState(true);
  const { cognitoUsername } = useParams();
  const [error, setError] = useState<string|null>(null);
  const { onVerification, onResendVerification} = useAuth();
  const navigation = useNavigate();



  const  verificate = async (credentials: VerificateCredentials) => {
    onVerification(cognitoUsername, credentials.pin).then(() => {
      navigation("/auth/login");
      console.log("success");
    })
    .catch((error: Error) => {
      setResend(true);
      setError(error.message);
    });
  }
  
  const resendCode = async () => {
    onResendVerification(cognitoUsername)
    .then(() => {
      setResend(false);
    })
    .catch((error: Error) => {
      setError(error.message);
    });

  }

const form = useForm({
  initialValues: { pin: 0},
  validate: {
      pin: (value) => (value.toString().length === 6 ? null : 'Ungültiger Pin!'),
  },
});

  return (
    <Flex justify="center" align="center" className={classes.wrapper}>
      <Container size={560} my={30}>
        <Title className={classes.title} ta="center">
          Willkommen { cognitoUsername }!
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Wir haben dir einen Bestätigungscode an die angegeben E-Mail geschickt.
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        
          <form onSubmit={form.onSubmit(verificate)}>
          <Flex justify="center">
            <PinInput length={6} inputMode="numeric" type={/^[0-9]+/} {...form.getInputProps('pin')}/>
          </Flex>
          {error && <p style={{ color: 'red' }}>{error}</p>}
            <Group justify="space-between" mt="lg" className={classes.controls}>
              <Flex direction="column">
                {resend &&
                  <Anchor c="dimmed" size="sm" className={classes.control} onClick={() => resendCode()}>
                  <Center inline>
                    <IconReload style={{ width: 12, height: 12 }} stroke={1.5} />
                    <Box ml={5}>Neu senden</Box>
                  </Center>
                </Anchor>
                } 
                <Anchor c="dimmed" size="sm" className={classes.control} onClick={() => navigation("/auth/signup")}>
                  <Center inline>
                    <IconArrowLeft style={{ width: 12, height: 12 }} stroke={1.5} />
                    <Box ml={5}>Zurück zur Registrierung</Box>
                  </Center>
                </Anchor>
              </Flex>
              <Button className={classes.control} type="submit">Verifizieren</Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Flex>
  );
}

export default VerificateScreen;