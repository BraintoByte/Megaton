import { Card, Metric, CategoryBar, Flex, Text, AreaChart, ProgressBar, Title, LineChart } from "@tremor/react";
import '../App.css'



function DisplayCards({ arrayOfCards }) {
    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    function renderGPUName(cardName) {
        return (
            <div key={uuidv4()}>
                <h2 className='text-2xl font-bold'>
                    Gpu Name
                </h2>
                <br />
                <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                    <Metric className="text_1">{cardName}</Metric>
                </Card>
            </div>
        )
    }

    function renderBox() {
        return (
            <div className={color}>
            </div>
        )
    }

    function renderCards() {
        const cards = []
        var div_top_black = 'black'
        var div_top_blue = 'grid grid-cols-5 gap-14 blue'
        const list_colors = [div_top_black, div_top_blue]
        var count = 0

        if (arrayOfCards) {
            for (const card of arrayOfCards) {
                var color = ''

                if (count == 0) {
                    color = list_colors[0]
                    count += 1
                } else {
                    color = list_colors[1]
                    count = 0
                }

                cards.push(
                    <div key={uuidv4()}>
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                )
                cards.push(
                    <div className={color} key={uuidv4()}>
                    </div>
                )
                cards.push(renderGPUName(card.identifier))
                cards.push(
                    <div key={uuidv4()}>
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                )
                cards.push(
                    <div className='grid grid-cols-5 gap-14' key={uuidv4()}>
                        <div>
                            <h2 className='text-2xl font-bold'>
                                Driver Version
                            </h2>
                            <br />
                            <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                                <Metric className="text_1">{card.driver_version}</Metric>
                            </Card>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>
                                P State
                            </h2>
                            <br />
                            <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                                <Metric className="text_1">{card.pstate}</Metric>
                            </Card>
                        </div>
                        <div>
                            <h2 className='text-lg font-bold'>
                                Pcie Link Gen Max
                            </h2>
                            <br />
                            <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                                <Metric className="text_1">{card.pcie_link_gen_max}</Metric>
                            </Card>
                        </div>
                        <div>
                            <h2 className='text-lg font-bold'>
                                Pcie Link Gen Current
                            </h2>
                            <br />
                            <Card className="max-w-xs mx-auto text_1" decoration="top" decorationColor="indigo">
                                <Metric className="text_1">{card.pcie_link_gen_current}</Metric>
                            </Card>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>
                                Temperature
                            </h2>
                            <br />
                            <Card className="max-w-sm mx-auto">
                                <Flex>
                                    <Text>0 &bull; {card.temperature_gpu}C</Text>
                                    <Text>200</Text>
                                </Flex>
                                <ProgressBar value={card.temperature_gpu} color="red" className="mt-3" />
                            </Card>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>
                                Utilization Gpu
                            </h2>
                            <br />
                            <Card className="max-w-sm mx-auto">
                                <Flex>
                                    <Text>0 &bull; {card.utilization_gpu} %</Text>
                                    <Text>100%</Text>
                                </Flex>
                                <ProgressBar value={card.utilization_gpu} color="red" className="mt-3" />
                            </Card>
                        </div>
                        <div>
                            <h2 className='text-xl font-bold'>
                                Utilization Memory
                            </h2>
                            <br />
                            <Card className="max-w-sm mx-auto">
                                <Flex>
                                    <Text>0 &bull; {card.utilization_memory}%</Text>
                                    <Text>100%</Text>
                                </Flex>
                                <ProgressBar value={card.utilization_memory} color="red" className="mt-3" />
                            </Card>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>
                                Memory Total
                            </h2>
                            <br />
                            <Card className="max-w-sm mx-auto">
                                <Flex>
                                    <Text>0 &bull; {card.memory_total} MiB</Text>
                                    <Text>{card.memory_total}</Text>
                                </Flex>
                                <ProgressBar value={card.memory_total} color="red" className="mt-3" />
                            </Card>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>
                                Memory Free
                            </h2>
                            <br />
                            <Card className="max-w-sm mx-auto">
                                <Flex>
                                    <Text>0 &bull; {card.memory_free} MiB</Text>
                                    <Text>{card.memory_total}</Text>
                                </Flex>
                                <ProgressBar value={card.memory_free / card.memory_total * 100} color="red" className="mt-3" />
                            </Card>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>
                                Memory Used
                            </h2>
                            <br />
                            <Card className="max-w-sm mx-auto">
                                <Flex>
                                    <Text>0 &bull; {card.memory_used} MiB</Text>
                                    <Text>{card.memory_total}</Text>
                                </Flex>
                                <ProgressBar value={card.memory_used / card.memory_total * 100} color="green" className="mt-3" />
                            </Card>
                            <br />
                            <br />
                        </div>
                    </div>
                )
            }

            return cards
        }
    }

    return (
        <div>
            {renderCards()}
        </div>
    )
}

export default DisplayCards