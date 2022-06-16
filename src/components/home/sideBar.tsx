import { Flex, List, ListIcon, ListItem, UnorderedList, Text, Link, Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { MdOutlineDashboard } from "react-icons/md"
import { BiDevices } from "react-icons/bi"

const Sidebar = () => {
    const router = useRouter();
    const path = router.pathname;
    return (
        <Flex flexDir='column' maxW={'25vw'} minW={'15vw'} p={10} textAlign='center' borderRight={'1px solid #ededed'}>
            <Heading fontSize={'x-large'} fontWeight='bold'>Klug</Heading>
            <List spacing={3} pt={20} pl={25}>
                <ListItem p={4} >
                    <Link href=''>
                        <Flex flexDir={'row'} alignItems='center' color={path == "/" ? 'blue' : ''}>
                            <ListIcon as={MdOutlineDashboard} />
                            <Text pl={4}>Dashboard</Text>
                        </Flex>
                    </Link>
                </ListItem>
                <ListItem p={4}>
                    <Link href='/devices'>
                        <Flex flexDir={'row'} alignItems='center' color={path == "/devices" ? 'blue' : ''}>
                            <ListIcon as={BiDevices} />
                            <Text pl={4}>Devices</Text>
                        </Flex>
                    </Link>
                </ListItem>

            </List>
        </Flex>
    )
}
export default Sidebar