import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import Progress from './progress'
import './style/css/index.css'

const requireContext = require.context("./style/img", true, /^\.\/.*\.jpg$/);
const _data = requireContext.keys().map(requireContext);

const Carousel: FC = (): ReactElement => {
    const [data, setData] = useState(_data);
    const [options, setOptions] = useState({
        delay: 3000,
        speed: 300,
    });
    const [activeIndex, setActiveIndex] = useState(0);
    const [wraper, setWrap] = useState({
        left: - activeIndex * 520 + "px",
        transition: `left 300ms linear 0ms`
    })
    const [percentage, setPercentage] = useState(0);
    const showData = [...data, data[0]];

    const warpRef = useRef<HTMLDivElement>(null);
    let autoTimer: NodeJS.Timeout | null = null;
    let progressTimer: NodeJS.Timeout | null = null;

    useEffect(() => {
        progressTimer = setInterval(frame, 140);
        autoTimer = setInterval(() => {
            autoMove();
        },
            options.delay)
        return () => {
            clearInterval(autoTimer!);
        };
    }, [activeIndex]);

    useEffect(() => {
        if (activeIndex === 0) {
            setWrap({
                left: 0 + "px",
                transition: `left 0ms linear 0ms`
            })
        }
        else {
            setWrap({
                left: - activeIndex * 520 + "px",
                transition: `left 300ms linear 0ms`
            })
        }
    }, [activeIndex])

    const autoMove = () => {
        setActiveIndex(activeIndex => activeIndex + 1);
        if (activeIndex >= 4) {
            setActiveIndex(0);
            setActiveIndex(1);
        }
        let a = warpRef.current!.offsetLeft;
        setOptions({
            delay: 3000,
            speed: 300,
        })
    };

    const frame = () => {
        if (percentage >= 20) {
            setPercentage(0);
            clearInterval(progressTimer!);
        }
        else setPercentage(data => data + 1)
    }


    return (
        <div className="container">
            <div className="warp" ref={warpRef} style={wraper}>
                {
                    showData.map((item:any, index) => {
                        return (
                            <div className="slide" key={index}>
                                <img src={item.default} alt="test" />
                            </div>
                        );
                    })
                }
            </div>
            <div className="pageNagation">
                {
                    [1, 2, 4, 5].map((item, index) => {
                        let tempIndex = activeIndex;
                        if (tempIndex >= 4) {
                            tempIndex = 0
                        }
                        return <Progress key={index}  active={tempIndex === index ? true : false} />
                    })
                }
            </div>

        </div>
    )
}

export default Carousel