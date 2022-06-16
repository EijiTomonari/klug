import { Button, Center, CircularProgress, Flex, Input, InputGroup, InputLeftAddon, InputLeftElement, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingScreen from "../components/loadingScreen";
import { auth, logInWithEmailAndPassword } from "./util/firebase";
import { FaUser } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'

const Login: NextPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (user) router.push("/");
    }, [user, loading]);

    if (loading) {
        return (<LoadingScreen></LoadingScreen>)
    } else
        return (

            <Flex>
                <Head>
                    <title>Klug | Login</title>
                </Head>
                <Flex flexDir={'column'} w='100vw' h='100vh' justifyContent='center'>
                    <Center>
                        <Stack spacing={'5'} maxW='15vw'>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<FaUser color='gray.300' />}
                                />
                                <Input type='text' value={email}
                                    onChange={(e) => setEmail(e.target.value)} placeholder='User' />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<MdPassword color='gray.300' />}
                                />
                                <Input type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                            </InputGroup>
                            <Button colorScheme='blue'
                                onClick={() => logInWithEmailAndPassword(email, password)}>Login</Button>
                        </Stack>
                    </Center>
                </Flex>
            </Flex >
        );
}

export default Login