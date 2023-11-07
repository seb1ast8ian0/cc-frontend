import { Anchor, Container, Flex, Grid, Skeleton, Text, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./DashboardScreen.module.css";
import {IconPlus, IconUser} from "@tabler/icons-react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthProvider";
import { decodeToken } from "react-jwt";
import { motion } from "framer-motion";
import { useState } from "react";
import { PostInterface } from "./Post.interface";

interface CognitoToken {
    username: string;
}

const testData: PostInterface[] = [
    {
        caption: 'Erster Beitrag',
        timestamp: new Date('2023-05-01T12:00:00'),
        url: 'https://images.pexels.com/photos/18596173/pexels-photo-18596173/free-photo-of-beautiful-blonde-woman-sitting-in-front-of-the-plants.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        caption: 'Ein weiterer Post',
        timestamp: new Date('2023-05-02T15:30:00'),
        url: 'https://images.pexels.com/photos/14518435/pexels-photo-14518435.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
    },
    {
        caption: 'Mittwochs-Update',
        timestamp: new Date('2023-05-03T08:45:00'),
        url: 'https://images.pexels.com/photos/18882456/pexels-photo-18882456/free-photo-of-suspension-bridge-in-a-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        caption: 'Post Nummer 4',
        timestamp: new Date('2023-05-04T20:15:00'),
        url: 'https://images.pexels.com/photos/12098769/pexels-photo-12098769.jpeg'
    },
    {
        caption: 'Ein Wochenende in der Natur',
        timestamp: new Date('2023-05-06T14:20:00'),
        url: 'https://images.pexels.com/photos/14661918/pexels-photo-14661918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
];
  

function DashboardScreen() {

    let navigate = useNavigate();
    const child = <Skeleton height={140} radius="md" animate={false}/>;
    const { token } = useAuth();
    const [posts, setPosts] = useState(null);


    const decodedToken = decodeToken<CognitoToken>(token);
    const username = decodedToken?.username;

    const po = ["test"]

    return (

        <div>
            <Flex justify="space-between">
                <h1>Meine Beiträge</h1> 
                <div className={classes.userWrapper}>
                    <Flex align="center" gap="xs" className={classes.highlight}>
                        <IconUser style={{ width: 20, height: 20 }} stroke={1.8} />
                        <Text span inherit>{username}</Text>
                    </Flex>
                </div>
            </Flex>
            <Container my="md" pl={0} ml={0} pr={0}>
                <Grid>
                    <Grid.Col span={{ base: 12, xs: 3}}>
                        <Tooltip label={"Neues Bild hinzufügen"} position="right" transitionProps={{ duration: 0 }}>
                            <Anchor onClick={() => {navigate("/add");}} className={classes.link}>
                                <Container className={classes.add} >
                                    <IconPlus stroke={1.5} />
                                </Container>
                            </Anchor>
                        </Tooltip>
                    </Grid.Col>
                    {
                        testData.map((post) => {
                            return (
                                <Grid.Col span={{ base: 12, xs: 3}}>
                                    <Anchor onClick={() => {console.log("click")}} className={classes.link}>
                                        <div className={classes.postPreview} >
                                            <img src={post.url}/>
                                            
                                        </div>
                                    </Anchor>
                                </Grid.Col>
                                
                        )})
                    }
                </Grid>
            </Container>
        </div>
    );
  }
  
  export default DashboardScreen;
  