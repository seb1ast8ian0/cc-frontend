import { useRef } from 'react';
import { motion } from "framer-motion"
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './Add.module.css'

function Add() {

    const theme = useMantineTheme();
    const openRef = useRef<() => void>(null);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <h1>Neue Bilder</h1>
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
                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                        Drag&apos;n&apos;drop deine Dateien hier um sie hochzuladen. Wir können nur Dateien mit weniger als 30mb Größe akzeptieren.
                    </Text>
                    </div>
                </Dropzone>

                <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
                    Wähle Dateien
                </Button>
            </div>
        </motion.div>
    );
  }
  
  export default Add;