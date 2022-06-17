import { Button, Flex, Heading, Icon, Image, Input, Stack, Text } from '@chakra-ui/react'
import { query, collection, getDocs, where, setDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/dashboardLayout'
import LoadingScreen from '../../components/loadingScreen'
import { db } from '../../util/firebase'
import { NextPageWithLayout } from '../_app'
import { FcFullBattery, FcHighBattery, FcMiddleBattery, FcLowBattery, FcEmptyBattery } from 'react-icons/fc'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { AiOutlinePlusSquare } from 'react-icons/ai'

const DeviceDetails: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    const [device, setDevice] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [newPropertyName, setNewPropertyName] = useState('');
    const [newPropetyValue, setNewPropertyValue] = useState('');

    const fetchDevice = async () => {
        try {
            const q = query(collection(db, "devices"), where("slug", "==", `${id}`));
            const doc = await getDocs(q);
            const data = doc.docs.map(d => d.data());
            setDevice(data[0]);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching device data");
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchDevice();
        setLoading(false);
    }, []);

    useEffect(() => {
        if (device) {
            updateDevice();
        }
    }, [device]);

    const getBatteryIcon = (batteryLevel: number) => {
        if (batteryLevel > 80) {
            return <Icon as={FcFullBattery} />
        } else if (batteryLevel <= 80 && batteryLevel > 50) {
            return <Icon as={FcHighBattery} />
        } else if (batteryLevel <= 50 && batteryLevel > 25) {
            return <Icon as={FcMiddleBattery} />
        } else if (batteryLevel <= 25) {
            return <Icon as={FcLowBattery} />
        } else {
            return <Icon as={FcEmptyBattery} />
        }
    }

    const removeProperty = (key: any) => {
        setDevice((current: any) => {
            const newDevice = { ...current }
            delete newDevice[key];
            return (newDevice);
        })

    };

    const addProperty = () => {
        setDevice((current: any) => {
            const newDevice = { [newPropertyName]: newPropetyValue, ...current }
            return (newDevice);
        })
        setNewPropertyName('');
        setNewPropertyValue('');
    };

    const handleInputChange = (key: any, e: any) => {
        setDevice((current: any) => {
            const newDevice = { ...current }
            if (isNaN(e.target.value)) { newDevice[key] = e.target.value; } else {
                newDevice[key] = parseFloat(e.target.value);
            }

            return (newDevice);
        });
    }

    const updateDevice = async () => {
        const deviceRef = collection(db, "devices");
        await setDoc(doc(deviceRef, `${id}`), { ...device });
    }

    if (loading) {
        return (<LoadingScreen></LoadingScreen>)
    } else
        return (
            <Flex flexDir={'column'} h={'100vh'}>
                <Flex flexDir={'row'} mt={10} alignItems='center'>
                    <Image
                        boxSize='40'
                        objectFit='fill'
                        src={device?.iconURL}
                        alt='Smart Bottle'
                    />
                    <Stack>
                        <Heading>{device?.name}</Heading>
                        <Flex flexDir={'row'} alignItems={'center'}>
                            {getBatteryIcon(device?.batteryLevel)}
                            <Text ml={2}>{`Battery level: ${device?.batteryLevel + "%" ?? "N/A"}`}</Text>
                        </Flex>
                    </Stack>
                </Flex>
                <Stack mt={10} ml={10}>
                    <Heading size={'md'}>Device Settings</Heading>
                    <Stack spacing={5} maxH={'70vh'} overflow='auto' px={2}>
                        {Object.keys(device ?? {}).map((key: string) => {


                            return (<Flex flexDir={'row'} key={key} alignItems={'center'} background={'gray.100'} p={3} borderRadius={10}>
                                <Text mr={5}>{`${key}`}</Text>
                                <Input value={device[key]} onChange={(e) => handleInputChange(key, e)} variant={'filled'} background='white'></Input>
                                <Button ml={4} colorScheme={'red'} onClick={() => {
                                    removeProperty(key);
                                }}><Icon as={MdOutlineDeleteOutline}></Icon></Button>
                            </Flex>)

                        }
                        )}
                        <Flex flexDir={'row'} alignItems={'center'} background={'gray.100'} p={3} borderRadius={10}>
                            <Input value={newPropertyName} placeholder='Name' onChange={(e) => setNewPropertyName(e.target.value)} variant={'filled'} background='white'></Input>
                            <Input value={newPropetyValue} placeholder='Value' ml={4} onChange={(e) => setNewPropertyValue(e.target.value)} variant={'filled'} background='white'></Input>
                            <Button ml={4} colorScheme={'green'} onClick={() => {
                                addProperty()
                            }}><Icon as={AiOutlinePlusSquare}></Icon></Button>
                        </Flex>
                    </Stack>
                </Stack>
            </Flex>
        )
}

DeviceDetails.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout title={`Devices`}>{page}</DashboardLayout>
    )
}

export default DeviceDetails