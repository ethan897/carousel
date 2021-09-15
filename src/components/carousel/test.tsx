import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import './progress/style/index.css'

export default function Test ():ReactElement {
    const ref = useRef(0);
    const [percentage, setPercentage] = useState(0);
    let timer: number = 0;
    useEffect(() => {
        if (timer) {
            clearInterval(timer);
        }
        timer = window.setInterval(autoMove, 100);
    }, [])

    useEffect(() => {
        ref.current = percentage;
    }, [percentage])

    const autoMove = () => {
        setPercentage(ref.current + 1);
        if (ref.current >= 20) {
            setPercentage(() => 0);
        }
    }
    return (
        <div className='progress-box'>
            <div className='progress-group'>
                <div className='progress-bg' style={{ width: ref.current }}></div>
            </div>
        </div>
    )
}