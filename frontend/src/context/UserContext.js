import React, { createContext, useState, useEffect, useReducer } from "react"
import axios from "axios"
import validator from "validator";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [emailError, setEmailError] = useState("")
    const [loginError, setLoginError] = useState("")
    const [userError, setUserError] = useState("")
    const [init, setInit] = useState(false)
    const [successfulRegister, setSuccessfulRegister] = useState(false)
    const [successfulLogin, setSuccessfulLogin] = useState(false)
    const [loggedUsername, setLoggedUsername] = useState("")
    const [isChangedSuccessfully, setIsChangedSuccessfully] = useState(false)
    const [file, setFile] = useState()
    const [weakPasswordError, setWeakPasswordError] = useState('')
    const [usernameId, setUsernameId] = useState('')

    useEffect(() => {
        const initial = async () => {
            setInit(true)
            const {
                data: { csrfToken } } = await axios.get('/api/csrf-protection')
            axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
        }
        if (!init) {
            initial()
        }
    })

    const loginUser = async (username, password) => {
        try {
            await axios.post('/api/login', {
                username,
                password,
            })
            setSuccessfulLogin(true)
            setLoggedUsername(username)
            setLoginError("")
            getProfilPicture()
        } catch (err) {
            setLoginError("Wrong credentials")
        }
    }

    const logoutUser = async () => {
        try {
            await axios.get('/api/logout')
            setUsernameId("")
        } catch (err) {
            console.log(err)
        }
    }

    const createUser = async (username, password, gender, email) => {
        if (!isBadEmail(email)) {
            try {
                setEmailError("")
                await axios.post('/api/register', { username, password, gender, email })
                setSuccessfulRegister(true)
                console.log(userError)
            } catch (err) {
                setUserError("Username is not available")
            }
        }
        else {
            setEmailError("Not a valid email address")
            if (userError !== "") {
                setUserError("")
            }
        }
    }

    const isBadEmail = (email) => {
        return (!validator.isEmail(email) || email.length === 0) ? "Not a valid email address" : ""
    }

    const changeSetting = async (value, option) => {
        if (option === "password") {
            await axios.put('/api/user', { password: value, option })
            setIsChangedSuccessfully(true);
        }
        else if (option === "email") {
            if (!isBadEmail(value)) {
                await axios.put('/api/user', { email: value, option })
                setIsChangedSuccessfully(true);
            }
            else {
                setEmailError("Not a valid email address")
            }
        }
    }

    const removeSuccessfulText = () => {
        setIsChangedSuccessfully(false)
    }

    const removeLoggedIn = () => {
        setSuccessfulLogin(false)
    }

    const initEmailError = () => {
        setEmailError("")
    }

    const initSuccessfulRegister = () => {
        setSuccessfulRegister(false)
    }

    const upload = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('example', file)
        await axios.post('/api/upload', formData)
        setIsChangedSuccessfully(true);
    }

    const getProfilPicture = async () => {
        try {
            const { data } = await axios.get('/api/user')
            setUsernameId(data)
        } catch (err) {
            console.log(err)
        }
    }

    const setLocalFile = (e) => {
        setFile(e.target.files[0])
    }

    const changeWeakPasswordError = (value) => {
        setWeakPasswordError(value)
    }

    const changeEmailError = (value) => {
        setEmailError(value)
    }

    const changeUserError = (value) => {
        setUserError(value)
    }

    const errorField = (error) => {
        return (
            <h4 style={{ color: "red", textDecorationLine: "underline" }}>
                {error === "" ? "" : error}
            </h4>
        )
    }

    return (
        <UserContext.Provider
            value={{
                emailError,
                initEmailError,
                userError,
                loginError,
                createUser,
                successfulRegister,
                initSuccessfulRegister,
                loginUser,
                logoutUser,
                successfulLogin,
                removeLoggedIn,
                changeSetting,
                loggedUsername,
                isChangedSuccessfully,
                removeSuccessfulText,
                upload,
                usernameId,
                file,
                setLocalFile,
                weakPasswordError,
                changeWeakPasswordError,
                changeEmailError,
                changeUserError,
                errorField
            }}
            {...props}
        />
    );
};