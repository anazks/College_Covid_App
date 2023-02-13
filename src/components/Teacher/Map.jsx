import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/AuthContext'
import "./map.css"

function Map() {

    const [cs, setCs] = useState('')
    const [cm, setCm] = useState('')
    const [mba, setMba] = useState('')
    const [mth, setMth] = useState('')
    const [en, setEn] = useState('')
    const [chem, setChem] = useState('')

    const { getAllUsers } = useAuth()

    const fetchAllCounts = async () => {

        try {
            let result = await getAllUsers();
            result.forEach((u) => {
                let obj = u.data();
                if (obj.covidStatus == "yes") {
                    switch (obj.department) {
                        case "CS":
                            count.CS++;
                            break;
                        case "CHEMISTRY":
                            count.CHEMISTRY++;
                            break;
                        case "MBA":
                            count.MBA++;
                            break;
                        case "MATHS":
                            count.MATHS++;
                            break;
                        case "COMMERCE":
                            count.COMMERCE++;
                            break;
                        case "ENGLISH":
                            count.ENGLISH++;
                            break;
                    }
                }
                console.log(count)
            })
            if (count.CS >= 5) setCs('red-bg')
            else if (count.CS >= 1) setCs('orange-bg')

            if (count.CHEMISTRY >= 5) setChem('red-bg')
            else if (count.CHEMISTRY >= 1) setChem('orange-bg')

            if (count.MBA >= 5) setMba('red-bg')
            else if (count.MBA >= 1) setMba('orange-bg')

            if (count.MATH >= 5) setMth('red-bg')
            else if (count.MATH >= 1) setMth('orange-bg')

            if (count.ENGLISH >= 5) setEn('red-bg')
            else if (count.ENGLISH >= 1) setEn('orange-bg')

            if (count.COMMERCE >= 5) setCm('red-bg')
            else if (count.COMMERCE >= 1) setCm('orange-bg')
        } catch (error) {
            console.log(error)
        }
    }
    let count = {
        CS: 0,
        MBA: 0,
        MATHS: 0,
        CHEMISTRY: 0,
        COMMERCE: 0,
        ENGLISH: 0
    };
    useEffect(() => {
        fetchAllCounts();
    }, [])
    return (
        <div className='map-container'>
            <h2 style={{ marginTop: '20px' }}>Covid Map</h2>
            <div className="span-group">
                <div> <span className="red-bg circle"></span> <p className="text-md">High</p></div>
                <div> <span className="orange-bg circle"></span> <p className="text-md">Medium</p></div>
                <div> <span className="green-bg circle"></span> <p className="text-md">Low</p></div>
            </div>
            <div className="map">
                <div className="map-ctn">

                    <div className="map">
                        <img src="/map-img.png" className="map-img" alt="map" />
                        <div>
                            <span className={`rounds round1 `} id={cs && cs}>CS</span>

                        </div>

                        <div>
                            <span className={"rounds round2 "} id={cm && cm}>Commerce</span>

                        </div>

                        <div>
                            <span className={"rounds round3 "} id={mba && mba}>MBA</span>

                        </div>

                        <div>
                            <span className={"rounds round4 "} id={mth && mth}>Maths</span>
                        </div>

                        <div>
                            <span className={"rounds round5 "} id={en && en}>English</span>
                        </div>

                        <div>
                            <span className={"rounds round6 "} id={chem && chem}>Chemistry</span>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Map