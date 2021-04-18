import React, { useEffect } from "react"
import useUser from "../hooks/useUser"
import { useHistory } from "react-router-dom"


const InitialPage = () => {
    const { successfulLogin } = useUser();
    const history = useHistory();

    useEffect(() => {
        const goToHomePage = () => {
            if (successfulLogin) {
                history.push('/home')
            }
        }
        goToHomePage()
        // eslint-disable-next-line
    }, [successfulLogin])

    //TODO userlogin check

    return (
        <form>
            <h1>Need to log in</h1>
        </form>
    )
}

export default InitialPage;