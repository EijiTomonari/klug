
import { Center, CircularProgress, Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import DashboardLayout from '../components/layouts/dashboardLayout'
import LoadingScreen from '../components/loadingScreen'
import styles from '../styles/Home.module.css'
import { auth, logout } from '../util/firebase'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {

  const [user, loading, error] = useAuthState(auth);



  return (
    <div className={styles.container}>

      <main className={styles.main}>


      </main>


    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Dashboard">{page}</DashboardLayout>
  )
}

export default Home
