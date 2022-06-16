import { Center, CircularProgress, Flex } from "@chakra-ui/react";

const LoadingScreen = () => {
    return (
        <Flex h={"100vh"} justifyContent='center'>
            <Center>
                <CircularProgress size={'120px'} isIndeterminate />
            </Center>
        </Flex>
    );
}
export default LoadingScreen