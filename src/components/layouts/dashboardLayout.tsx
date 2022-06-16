import { Flex } from "@chakra-ui/react"
import Head from "next/head"
import { ReactElement } from "react"
import Sidebar from "../home/sideBar"

const DashboardLayout = ({ children, title, description }: { children: ReactElement, title: string, description?: string }) => {
    return (
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