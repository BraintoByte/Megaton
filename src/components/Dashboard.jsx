//#region Imports
import { Card, Title, LineChart, Switch } from "@tremor/react";
import LiveUsageStatistics from "../classes/liveUsageStatistics";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import React, { useState, useEffect } from 'react';
import DisplayCards from "./DisplayCards";
import LoadingScreen from "./LoadingScreen"
import ErrorPage from "./ErrorPage"
import AboutUs from "./AboutUs"
import megaton_config from "../../megaton_configs/megaton_config.json"
//#endregion

//#region Colors
const array_of_colors = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose"
];
//#endregion

//#region Value Formatters and Options
var optionCelsius = {
    style: 'unit',
    unit: 'celsius'
};

var optionPercent = {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
};

const valueFormatterPercentage = (number) => `${new Intl.NumberFormat("en-US", optionPercent).format(number / 100).toString()}`;
const valueFormatterCelcius = (number) => `${new Intl.NumberFormat("en-US", optionCelsius).format(number).toString()}`;
//#endregion

const Dashboard = () => {
    //#region UseStates
    const [allInfo, setAllInfo] = useState(null);
    //#region Main Live Usage Arrays
    const [arrayOfTemperaturesState, setArrayOfTemperaturesState] = useState([])
    const [arrayOfGpuUsageState, setArrayOfGpuUsageState] = useState([])
    const [arrayOfGpuMemoryState, setArrayOfGpuMemoryState] = useState([])
    //#endregion
    //#region Cards Live Usage Arrays
    const [arrayOfCards, setArrayOfCards] = useState([])
    //#endregion
    //#region Keys
    const [temperatureKeys, setTemperatureKeys] = useState([])
    const [gpuUsageKeys, setGpuUsageKeys] = useState([])
    const [gpuMemoryKeys, setGpuMemoryKeys] = useState([])
    //#endregion
    //#region Live Usage Statistics
    const [liveUsageStatistics, setLiveUsageStatistics] = useState(null)
    //#endregion
    const [jsonMessage, setJsonMessage] = useState(null);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [version, setVersion] = useState(null);
    //#endregion

    const ip_address = megaton_config.ip_address

    //#region Websocket
    const WS_URL_ALL_INFO = 'ws://' + ip_address + ':5278/websocket/all_info';
    const socketState = 'OPEN'

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL_ALL_INFO, {
        share: true,
    })

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    //#endregion

    const handleSwitchChange = (value) => {
        setIsSwitchOn(value);
    };

    //#region UseEffect
    useEffect(() => {
        fetch('http://' + ip_address + ':5278/api_info/version')
            .then(response => response.json())
            .then(data => {
                setVersion(data)
            })
    }, []);

    useEffect(() => {
        sendJsonMessage({ "message": socketState })

        if (lastJsonMessage) {
            setAllInfo(lastJsonMessage)
            setLiveUsageStatistics(new LiveUsageStatistics(allInfo))

            if (liveUsageStatistics) {
                const allCardsInfo = liveUsageStatistics.extractCardInfo()
                setArrayOfCards(allCardsInfo)

                const temps = liveUsageStatistics.convertInfoToArray(LiveUsageStatistics.USAGESELECTOR.Temperature)
                const gpu_usage = liveUsageStatistics.convertInfoToArray(LiveUsageStatistics.USAGESELECTOR.Gpu)
                const memory_usage = liveUsageStatistics.convertInfoToArray(LiveUsageStatistics.USAGESELECTOR.Memory)


                if (temps) {
                    if (arrayOfTemperaturesState.length > 7) {
                        const array_copy = Array.from(arrayOfTemperaturesState)
                        array_copy.splice(0, 1)
                        setArrayOfTemperaturesState(array_copy)
                    }

                    setArrayOfTemperaturesState(arrayOfTemperaturesState => [...arrayOfTemperaturesState, temps])
                }

                if (gpu_usage) {
                    if (arrayOfGpuUsageState.length > 7) {
                        const array_copy = Array.from(arrayOfGpuUsageState)
                        array_copy.splice(0, 1)
                        setArrayOfGpuUsageState(array_copy)
                    }

                    setArrayOfGpuUsageState(arrayOfGpuUsageState => [...arrayOfGpuUsageState, gpu_usage])
                }

                if (memory_usage) {
                    if (arrayOfGpuMemoryState.length > 7) {
                        const array_copy = Array.from(arrayOfGpuMemoryState)
                        array_copy.splice(0, 1)
                        setArrayOfGpuMemoryState(array_copy)
                    }

                    setArrayOfGpuMemoryState(arrayOfGpuMemoryState => [...arrayOfGpuMemoryState, memory_usage])
                }
            }
        }
    }, [jsonMessage, lastJsonMessage])

    useEffect(() => {
        if (allInfo) {
            const tempKeys = liveUsageStatistics.getKeys(LiveUsageStatistics.USAGESELECTOR.Temperature)
            const gpuUsageKeys = liveUsageStatistics.getKeys(LiveUsageStatistics.USAGESELECTOR.Gpu)
            const gpuMemoryKeys = liveUsageStatistics.getKeys(LiveUsageStatistics.USAGESELECTOR.Memory)

            setTemperatureKeys(tempKeys)
            setGpuUsageKeys(gpuUsageKeys)
            setGpuMemoryKeys(gpuMemoryKeys)
        }

    }, [allInfo])
    //#endregion

    //#region Other Utils
    function select_random_color(array_lenght) {
        const list_colors = []
        for (i in array_lenght) {
            list_colors.push(array_of_colors[Math.floor(Math.random() * array_lenght)])
        }

        return list_colors
    }
    //#endregion

    //#region Render Details
    function renderDetails() {
        const arrayAcceptableLength = 4
        const arrayAcceptableDisplayLenght = 0


        if (lastJsonMessage == "An error with Nvidia SMI has occurred, check logs or docker logs for more info" && readyState != ReadyState.OPEN) {
            const errorMessage = lastJsonMessage
            return (
                <>
                    <ErrorPage errorMessage={errorMessage} />
                </>
            )
        }

        if (isSwitchOn) {
            return (
                <>
                    <AboutUs isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} version={version} />
                </>
            )
        }

        if (allInfo && liveUsageStatistics && version && arrayOfTemperaturesState.length > arrayAcceptableLength && arrayOfGpuUsageState.length > arrayAcceptableLength && arrayOfGpuMemoryState.length > arrayAcceptableLength && readyState === ReadyState.OPEN) {
            return (
                <>
                    <div className="flex items-center space-x-3 switch_1">
                        <Switch id="switch" name="switch" checked={isSwitchOn} onChange={handleSwitchChange} />
                        <label htmlFor="switch" className="text-l text-white-500">
                            About us
                        </label>
                    </div>
                    <br />
                    <div className='grid grid-cols-1 gap-14'>
                        <Card>
                            <Title>Cards Temperature</Title>
                            <LineChart
                                className="mt-6"
                                data={arrayOfTemperaturesState ? (arrayOfTemperaturesState.length > arrayAcceptableDisplayLenght ? arrayOfTemperaturesState : null) : null}
                                index="time_stamp"
                                categories={temperatureKeys ? temperatureKeys : []}
                                colors={arrayOfTemperaturesState > arrayAcceptableDisplayLenght ? select_random_color(temperatureKeys.length - 1) : ["neutral", "indigo", "orange", "green"]}
                                valueFormatter={valueFormatterCelcius}
                                yAxisWidth={100}
                            />
                        </Card>
                    </div>
                    <br />
                    <br />
                    <div className='grid grid-cols-1 gap-14'>
                        <Card>
                            <Title>Cards Gpu Usage</Title>
                            <LineChart
                                className="mt-6"
                                data={arrayOfGpuUsageState ? (arrayOfGpuUsageState.length > arrayAcceptableDisplayLenght ? arrayOfGpuUsageState : null) : null}
                                index="time_stamp"
                                categories={gpuUsageKeys ? gpuUsageKeys : []}
                                colors={arrayOfGpuUsageState > arrayAcceptableDisplayLenght ? select_random_color(gpuUsageKeys.length - 1) : ["neutral", "indigo", "orange", "green"]}
                                valueFormatter={valueFormatterPercentage}
                                yAxisWidth={100}
                            />
                        </Card>
                    </div>
                    <br />
                    <br />
                    <div className='grid grid-cols-1 gap-14'>
                        <Card>
                            <Title>Cards Memory Usage</Title>
                            <LineChart
                                className="mt-6"
                                data={arrayOfGpuMemoryState ? (arrayOfGpuMemoryState.length > arrayAcceptableDisplayLenght ? arrayOfGpuMemoryState : null) : null}
                                index="time_stamp"
                                categories={gpuMemoryKeys ? gpuMemoryKeys : []}
                                colors={arrayOfGpuMemoryState > arrayAcceptableDisplayLenght ? select_random_color(gpuMemoryKeys.length - 1) : ["neutral", "indigo", "orange", "green"]}
                                valueFormatter={valueFormatterPercentage}
                                yAxisWidth={100}
                            />
                        </Card>
                    </div>
                    <br />
                    <br />
                    <DisplayCards arrayOfCards={arrayOfCards ? arrayOfCards : []} />
                    <div className="license_1_dashboard">
                        <p>
                            MEGATON © BrainToBytes
                        </p>
                        <a rel="license" href="https://github.com/BraintoByte/nvidia-smi-dashboard/blob/master/LICENSE">GNU General Public License v3.0</a>.
                    </div>
                </>
            )
        } else {
            return (
                <LoadingScreen />
            )
        }
    }
    //#endregion

    //#region Main Render
    return (<>
        {renderDetails()}
    </>
    )
    //#endregion
};

export default Dashboard;