import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import image from './image.svg';
import classes from './NotFound.module.css';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {

  let navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Du bist hier falsch...</Title>
          <Text c="dimmed" size="lg">
            Die seite, die du aufrufen willst, existiert nicht.
          </Text>
          <Button variant="outline" size="md" mt="xl" className={classes.control} onClick={() => navigate("/")}>
            Zurück zur Startseite
          </Button>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}