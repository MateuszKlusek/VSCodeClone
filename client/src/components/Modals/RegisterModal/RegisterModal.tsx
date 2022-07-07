// react
import React, { useState, useEffect, useRef } from 'react'

// hooks
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useDispatch, useSelector } from 'react-redux'

// packages
import gsap from 'gsap'

// api
import axios from "./../../../api/axios"

// styles
import * as S from './RegisterModal.styled'

// assets
import VSIcon from './../../../assets/others/visual-studio-code.png'

// actions
import { hideRegisterModal, showAlert } from '../../../actions/popupsModals'

const RegisterModal = () => {

  const loginModal = useSelector<any, boolean>(state => state.loginModal)
  const registerModal = useSelector<any, boolean>(state => state.registerModal)

  const [errorMessage, setErrorMessage] = useState<string>("")

  const dispatch = useDispatch()
  // refs
  const VSIconRef = useRef<HTMLImageElement>(null)

  // ref for click outside
  const RegisterModalContainerRef = useDetectClickOutside({
    onTriggered: () => {
      dispatch(hideRegisterModal())
    },
  })

  useEffect(() => {
    var tl = gsap.timeline({})
    tl.to(RegisterModalContainerRef.current, {
      // width: 260,
      // height: 160,
      scale: 1.1,
      autoAlpha: 1,
      ease: 'back.out(1.4)',
      duration: 0.4,
    }).to(
      VSIconRef.current,
      {
        autoAlpha: 1,
        duration: 0,
      },
      '-=0.25',
    )
  }, [loginModal])

  const FirstButtonRef = useRef<HTMLDivElement>(null)
  const SecondButtonRef = useRef<HTMLDivElement>(null)
  const ButtonRefFirst = useRef(false)
  useEffect(() => {
    function globalKeyPress(e: Event) {
      // this.style.background = 'rgb(128,125,135'
    }
    if (ButtonRefFirst.current) {
      FirstButtonRef.current && FirstButtonRef.current.addEventListener('mouseup', globalKeyPress)
      SecondButtonRef.current && SecondButtonRef.current.addEventListener('mouseup', globalKeyPress)
      return () => {
        FirstButtonRef.current &&
          FirstButtonRef.current.removeEventListener('mouseup', globalKeyPress)
        SecondButtonRef.current &&
          SecondButtonRef.current.removeEventListener('mouseup', globalKeyPress)
      }
    } else {
      ButtonRefFirst.current = true
    }
  }, [registerModal])

  const EmailInputRef = useRef<HTMLInputElement>(null)
  const PasswordInputRef = useRef<HTMLInputElement>(null)
  const ErrorMessageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    EmailInputRef.current && EmailInputRef.current.focus()
  }, [])



  // handle disappearing error message after some time 
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(prev => "")
      }, 1000)
    }
  }, [errorMessage])


  // register API
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const registerAccount = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: `/registerUser`,
        data: {
          email,
          password
        },
      })

      setErrorMessage("Account created")
      console.log(response.data);
    } catch (err) {
      if (err.response.status === 409) {
        setErrorMessage("Email is taken")
      } else if (err.response.status === 400) {
        setErrorMessage("All input fields are required")
      } else {
        setErrorMessage("Error")
      }
    }
  }




  return (
    <S.RegisterModalContainer ref={RegisterModalContainerRef}>
      <S.VSIcon src={VSIcon} ref={VSIconRef} />
      <S.Text>Register account</S.Text>
      <S.Input
        ref={EmailInputRef}
        onChange={(e) => {
          setEmail((prev) => e.target.value)
        }}
      />
      <S.Input
        type="password"
        ref={PasswordInputRef}
        onChange={(e) => {
          setPassword((prev) => e.target.value)
        }}
      />
      <S.Button
        onClick={() => {
          registerAccount()
        }}
      >
        Register
      </S.Button>
      <S.ErrorField ref={ErrorMessageRef}>
        {errorMessage}
      </S.ErrorField>
    </S.RegisterModalContainer>
  )
}

export default RegisterModal
