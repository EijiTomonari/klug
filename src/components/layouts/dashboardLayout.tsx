import { Flex } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { ReactElement, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../util/firebase"
import Sidebar from "../home/sideBar"
import LoadingScreen from "../loadingScreen"

const DashboardLayout = ({ children, title, description }: { children: ReactElement, title: string, description?: string }) => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    useEffect(() => {
        if (!loading && !user) router.push("/login");
    }, [user, loading, router]);
    if (loading || !user) {
        return (<LoadingScreen></LoadingScreen>)
    } else return (
        <Flex>
            <Head>
                <title>Klug | {title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex>
                <Sidebar></Sidebar>
            </Flex>
            {children}
        </Flex>
    )
}
export default DashboardLayout