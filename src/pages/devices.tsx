
import { Center, CircularProgress, Flex, Grid, GridItem, Heading } from '@chakra-ui/react'
import { query, collection, where, getDocs, DocumentData } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import DeviceCard from '../components/devices/deviceCard'
import DashboardLayout from '../components/layouts/dashboardLayout'
import LoadingScreen from '../components/loadingScreen'
import styles from '../styles/Home.module.css'
import { auth, logout, db } from '../util/firebase'
import { NextPageWithLayout } from './_app'

const Devices: NextPageWithLayout = () => {

  const [user, loading, error] = useAuthState(auth);
  const [devices, setDevices] = useState<DocumentData[]>([]);

  const fetchDevices = async () => {
    try {
      const q = query(collection(db, "devices"));
      const doc = await getDocs(q);
      const data = doc.docs.map(d => d.data());
      setDevices(data);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    fetchDevices();
  }, [user, loading]);

  return (
    <Flex flexDir={'column'} h='100vh' px={50} py={25} w={'75vw'}>
      <Heading>Devices</Heading>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        {devices.map((device, index) => {
          const { name, iconURL } = devices[index];
          return (<DeviceCard key={index} deviceInfo={{ name, iconURL, ...devices[index] }} />)
        })}
      </Grid>
    </Flex>
  )
}

Devices.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Devices">{page}</DashboardLayout>
  )
}

export default Devices
