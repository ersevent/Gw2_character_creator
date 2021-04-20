import React, { useEffect, useState } from "react"
import useUser from "../hooks/useUser"
import { useHistory } from "react-router-dom"
import axios from "axios";


const InitialPage = () => {
    const { successfulLogin } = useUser();
    const history = useHistory();
    const [heartbeat, setHeartbeat] = useState("")

    useEffect(() => {
        const goToHomePage = () => {
            if (successfulLogin) {
                history.push('/home')
            }
        }
        goToHomePage()
        // eslint-disable-next-line
    }, [successfulLogin])

    useEffect(() => {
        const tryHeartbeat = async () => {
            const { data } = await axios.get('/api/heartbeat')
            setHeartbeat(data)
        }
        tryHeartbeat()
    }, [])

    //TODO userlogin check

    return (
        <form>
            <h1>Need to log in</h1>
            {JSON.stringify(heartbeat)}
        </form>
    )
}

export default InitialPage;