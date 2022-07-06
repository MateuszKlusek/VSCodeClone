import React, { FC, useRef, useEffect } from "react"

// styles
import * as S from "./Alert.styled"

// helper
import gsap from 'gsap'

// hooks
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { setAlertData } from "../../../actions/otherModals";
import { AlertContainer } from "../Alerts.styled";

const Alert: FC<AlertProps> = ({ text, id }) => {
    const dispatch = useDispatch()
    const AlertContainerRef = useRef<HTMLDivElement>(null)
    const alertData = useSelector<any, any>(state => state.alertData)

    useEffect(() => {
        var tl = gsap.timeline({
            onComplete: () => {
                if (AlertContainerRef.current) {
                    AlertContainerRef.current.style.display = "none"
                }
            },
        })
        tl.to(AlertContainerRef.current, {
            y: -60,
            ease: 'power2',
        })

        tl.to(AlertContainerRef.current, {
            x: 500,
            ease: 'power2',
            delay: 1.5,
        })
    }, [])

    return <S.AlertContainer
        ref={AlertContainerRef}
    // panelOpened={panelOpened}
    // backgroundColor={backgroundColor}
    >
        <S.Punctuation code={"'\f06a'"} />
        <S.Text>{text}</S.Text>
    </S.AlertContainer>
};

export default Alert;
