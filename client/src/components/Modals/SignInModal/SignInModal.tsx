//react
import React, { useEffect, useRef } from 'react'

// hooks
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useDispatch, useSelector } from 'react-redux'

// packages
import gsap from 'gsap'

// styles
import * as S from './SignInModal.styled'

// graphics
import VSIcon from './../../../assets/others/visual-studio-code.png'

// actions
import { hideRegisterModal, hideSigninModal, showLoginModal, showRegisterModal } from '../../../actions/popupsModals'

const SignInModal = () => {
  const dispatch = useDispatch()

  const signInModal = useSelector<any, boolean>(state => state.signInModal)

  const VSIconRef = useRef<HTMLImageElement>(null)

  // supposed to be false to prevent reclicking outsite on mounting, but in react 18.x doesn't need to have this 
  // ref for click outside
  const SignInModalContainerRef = useDetectClickOutside({
    onTriggered: () => {
      dispatch(hideSigninModal())
    },
  })

  useEffect(() => {
    var tl = gsap.timeline({})
    tl.to(SignInModalContainerRef.current, {
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
  }, [signInModal])

  const animateUnmounting = (path: any) => {
    var tl = gsap.timeline({
      onComplete: () => {
        dispatch((hideSigninModal()))
        if (path === 'login') dispatch(showLoginModal())
        if (path === 'register') dispatch(showRegisterModal())
      },
    })
    tl.to(VSIconRef.current, {
      autoAlpha: 0,
      duration: 0,
    }).to(SignInModalContainerRef.current, {
      scale: 1,
      autoAlpha: 0,
      ease: 'back.out(1.4)',
      duration: 0.4,
    })
  }

  const FirstButtonRef = useRef<HTMLDivElement>(null)
  const SecondButtonRef = useRef<HTMLDivElement>(null)
  const ButtonRefFirst = useRef(false)
  useEffect(() => {
    function globalKeyPress(e: Event) {
      // this.style.background = 'rgb(128,125,135'
    }
    if (!ButtonRefFirst.current) {
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
  }, [signInModal])

  return (
    <S.SignInModalContainer ref={SignInModalContainerRef}>
      <S.VSIcon src={VSIcon} ref={VSIconRef} />
      <S.Text> Log in to existing account or create one</S.Text>
      <S.ButtonContainer>
        <S.Button
          ref={FirstButtonRef}
          onClick={() => {
            animateUnmounting('login')
          }}
        >
          Log in
        </S.Button>
        <S.Button
          ref={SecondButtonRef}
          onClick={() => {
            animateUnmounting('register')
          }}
        >
          Register
        </S.Button>
      </S.ButtonContainer>
    </S.SignInModalContainer>
  )
}

export default SignInModal
