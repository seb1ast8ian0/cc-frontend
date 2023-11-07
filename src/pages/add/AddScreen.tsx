import { useRef } from 'react';
import { Text, Group, Button, rem, useMantineTheme, TextInput, Container, Flex } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload, IconPlus } from '@tabler/icons-react';
import classes from './AddScreen.module.css'

function AddScreen() {

    const theme = useMantineTheme();
    const openRef = useRef<() => void>(null);

    return (
        <Container pl={0} ml={0}>
            <h1>Neuer Beitrag</h1>
            <div className={classes.wrapper}>
                <Dropzone
                    openRef={openRef}
                    onDrop={() => {}}
                    className={classes.dropzone}
                    radius="md"
                    maxSize={30 * 1024 ** 2}
                >
                    <div style={{ pointerEvents: 'none' }}>
                    <Group justify="center">
                        <Dropzone.Accept>
                        <IconDownload
                            style={{ width: rem(50), height: rem(50) }}
                            color={theme.colors.blue[6]}
                            stroke={1.5}
                        />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                        <IconX
                            style={{ width: rem(50), height: rem(50) }}
                            color={theme.colors.red[6]}
                            stroke={1.5}
                        />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                        <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                        </Dropzone.Idle>
                    </Group>

                    <Text ta="center" fw={700} fz="lg" mt="xl">
                        <Dropzone.Accept>Drop Dateien hier</Dropzone.Accept>
                        <Dropzone.Reject>Dateien weniger als 30mb</Dropzone.Reject>
                        <Dropzone.Idle>Hochladen</Dropzone.Idle>
                    </Text>
                    </div>
                </Dropzone>
                <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
                    Wähle Bilder
                </Button>
            </div>
            <TextInput
                label="Beschreibung"
                placeholder="Was gib es zu sehen?"
            />
            <Flex justify="flex-end">
                <Button
                    justify="right"
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'blue', deg: 52 }}
                    radius="xl"
                    mt="md">
                    Hinzufügen
                </Button>
            </Flex>
            
        </Container>
    );
  }
  
  export default AddScreen;