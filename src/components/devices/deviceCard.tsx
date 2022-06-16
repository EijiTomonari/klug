import { GridItem, Heading, Link, Image, Box, Flex } from "@chakra-ui/react";

type DeviceInfo = {
    name: string,
    iconURL: string,
    [field: string]: any;
}

const DeviceCard = ({ deviceInfo }: { deviceInfo: DeviceInfo }) => {
    return (
        <Link>
            <GridItem w='100%' h='100' bg='linear-gradient(90deg, rgba(74,68,175,1) 0%, rgba(4,148,208,1) 100%)' borderRadius={'5px'} my={2} p={2}>

                <Flex flexDir='row' alignItems={'center'}>
                    <Image
                        boxSize='20'
                        objectFit='cover'
                        src={deviceInfo.iconURL}
                        alt='Smart Bottle'
                    />
                    <Heading size={'sm'} color='white'>{deviceInfo.name}</Heading>
                </Flex>
            </GridItem></Link>
    )
}

export default DeviceCard;