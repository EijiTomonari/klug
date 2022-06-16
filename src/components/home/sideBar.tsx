import { Flex, List, ListIcon, ListItem, UnorderedList, Text, Link, Heading, Button, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { MdOutlineDashboard } from "react-icons/md"
import { BiDevices } from "react-icons/bi"
import { signOut } from "firebase/auth"
import { auth } from "../../util/firebase"

const Sidebar = () => {
    const router = useRouter();
    const path = router.pathname;
    return (
        <Flex flexDir='column' maxW={'25vw'} minW={'15vw'} p={10} textAlign='center' borderRight={'1px solid #ededed'}>
            <Image src='/logo.png' alt='Klug - Smart home management' width={150} alignSelf='center'
                objectFit='contain'></Image>
            <List spacing={4} pt={10}>
                <ListItem  >
                    <Link href='/'>
                        <Flex flexDir={'row'} alignItems='center' color={path == "/" ? 'blue' : ''}>
                            <ListIcon as={MdOutlineDashboard} />
                            <Text pl={4}>Dashboard</Text>
                        </Flex>
                    </Link>
                </ListItem>
                <ListItem >
                    <Link href='/devices'>
                        <Flex flexDir={'row'} alignItems='center' color={path == "/devices" ? 'blue' : ''}>
                            <ListIcon as={BiDevices} />
                            <Text pl={4}>Devices</Text>
                        </Flex>
                    </Link>
                </ListItem>

            </List>
            <Button colorScheme='blue' mb={10} mt={'auto'} onClick={() => signOut(auth)}>Sign Out</Button>
        </Flex>
    )
}
export default Sidebar