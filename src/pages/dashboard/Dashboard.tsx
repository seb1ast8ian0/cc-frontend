import { Anchor, Container, Grid, Skeleton, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./Dashboard.module.css";
import {IconPlus} from "@tabler/icons-react"
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { rem, em } from '@mantine/core';

function Dashboard() {

    let navigate = useNavigate();
    const child = <Skeleton height={140} radius="md" animate={false}/>;

    return (
        <motion.div 
            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <h1>Meine Bilder</h1>
            <Container my="md" pl={0} ml={0} pr={0}>
                <Grid >
                    <Grid.Col span={{ base: 12, xs: 3}}>
                        <Tooltip label={"Neues Bild hinzufügen"} position="right" transitionProps={{ duration: 0 }}>
                            <Anchor onClick={() => {navigate("/add");}} className={classes.link}>
                                <Container className={classes.add} >
                                    <IconPlus stroke={1.5} />
                                </Container>
                            </Anchor>
                        </Tooltip>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 3}}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 2 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 2 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 2 }}>{child}</Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
                </Grid>
            </Container>
        </motion.div>
        
  
    );
  }
  
  export default Dashboard;
  