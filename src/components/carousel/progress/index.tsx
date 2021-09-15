import react, { useState, useEffect, useRef, FC, ReactElement } from "react";
import './style/index.css'

interface Iprops {
    // percentage: number;
    active: boolean;
}

const Progress: FC<Iprops> = (props): ReactElement => {
    const ref = useRef(0);
    const [percentage, setPercentage] = useState(0);
    let timer: number = 0;
    let progressTimer: NodeJS.Timeout | null = null;


    useEffect(() => {
        if (timer) {
            clearInterval(timer);
        }
    }, [])

    useEffect(() => {
        if (percentage>=22) {
            setPercentage(()=>0);
        }
        ref.current = percentage;
    }, [percentage])

    useEffect(() => {
        progressTimer = setInterval(autoMove, 135);
        return () => {
            clearInterval(progressTimer!);
        };
    }, [props.active]);


    const autoMove = () => {
        setPercentage(ref.current + 1);
    }
    return (
        <div className='progress-box'>
            <div className='progress-group'>
                {
                    props.active ? <div className='progress-bg' style={{ width: ref.current }}></div> : <div className='progress-bg' style={{ width: 0 }}></div>
                }
            </div>
        </div>
    )
}

export default Progress