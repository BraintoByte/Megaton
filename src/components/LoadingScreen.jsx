import ReactLoading from "react-loading";
import { Text } from "@tremor/react";
import '../App.css'



const LoadingScreen = () => {
    //#region List of Phrases
    const topLoadingPhrases = [
        "Retrieving data from nvidia-smi, sit tight",
        "Data from your GPU's is being retrieved",
        "Loading data",
        "Gathering data from driver"
    ]

    const bottomLoadingPhrases = [
        "Loading awesomness, one byte at a time.",
        "Gathering cosmic data for your intergalactic journey.",
        "Retrieving the secrets of the digital universe.",
        "Loading the essence of knowledge from the vast expanse.",
        "Bringing you information from the far reaches of cyberspace.",
        "Compiling data like a symphony of ones and zeros.",
        "Synchronizing with the data cosmos for your enlightenment.",
        "Assembling the building blocks of information for your screen.",
        "Harvesting data like a digital farmer in the fields of code.",
        "Unearthing the treasures of the virtual archives.",
        "Summoning the bits and bytes for your viewing pleasure.",
        "Loading the threads of information into the tapestry of your screen.",
        "Transmitting knowledge across the digital waves.",
        "Harnessing the power of electrons to weave data magic.",
        "Unleashing the data minions to fetch the bits and bytes.",
        "Embarking on a digital scavenger hunt for your data delight.",
        "Conjuring data spells to reveal the mysteries of the digital realm.",
        "Awakening the data spirits for a dance of retrieval.",
        "Championing the cause of data liberation for your screen.",
        "Delving into the quantum depths for your information pleasure.",
        "Initiating the data retrieval dance; get ready to groove!",
        "Summoning the digital Phoenix to rise with data in its wings.",
        "Navigating the data currents to bring you a tidal wave of information.",
        "Harmonizing with the servers to orchestrate a symphony of retrieval.",
        "Commanding the digital minions to collect the treasures of knowledge.",
        "Embarking on a quest to unlock the gates of data heaven.",
        "Stirring the data cauldron for a potion of informational brilliance.",
        "Brewing up a storm of data for your enlightenment.",
        "Coordinating the data constellation for a celestial display.",
        "Conducting the digital orchestra to retrieve the melody of information.",
        "Firing up the data engines for a turbocharged retrieval.",
        "Weaving the fabric of knowledge for your screen's attire.",
        "Activating the data receptors to tune into the frequency of wisdom.",
        "Setting sail on the data seas to bring you a tidal wave of facts.",
        "Riding the data lightning to capture the bolts of information.",
        "Coaxing the data phoenix to spread its wings of knowledge.",
        "Sculpting the data mountains for a grand view of information.",
        "Bouncing signals off satellites to fetch you the stars of data.",
        "Flipping switches to illuminate the data pathways for you.",
        "Journeying through the circuits to unveil the data constellations.",
        "Sailing through the binary ocean to bring you a catch of data.",
        "Revving up the data engines for a turbocharged download.",
        "Planting data seeds to cultivate a garden of information.",
        "Kindling the data bonfire to warm your screen with facts.",
        "Spinning the data webs to catch the flies of information.",
        "Striking the data gong to announce the arrival of knowledge.",
        "Sending out data probes to explore the vast frontiers of information.",
        "Wielding the data sword to cut through the digital fog of mystery.",
        "Illuminating the data lanterns to brighten your screen with wisdom.",
        "Crafting a data potion to fuel your thirst for knowledge.",
        "Deploying data drones to soar through the clouds of information.",
        "Constructing the data bridge to connect you with the realm of facts.",
        "Riding the data comet to bring you a spectacular show of information.",
        "Tapping into the data well to quench your thirst for knowledge.",
        "Wielding the data hammer to break open the vaults of information.",
        "Unleashing data butterflies to flutter with the wings of wisdom.",
        "Harvesting data crops for a bountiful harvest of information.",
        "Conjuring data lightning to illuminate the dark corners of mystery.",
        "Blazing through the data trails to retrieve the nuggets of wisdom.",
        "Directing the data traffic to bring you a smooth flow of information.",
        "Coaxing the data fireflies to dance in the night of your screen.",
        "Sculpting data statues to stand as monuments of information.",
        "Constructing a data ladder to climb the heights of knowledge.",
        "Bouncing data echoes off the walls of cyberspace for your hearing.",
        "Guiding data comets to streak across the digital sky of information.",
        "Crafting a data bouquet to infuse your screen with the fragrance of knowledge."
    ];
    //#endregion

    function topLoadingWords() {
        return topLoadingPhrases[Math.floor(Math.random() * topLoadingPhrases.length)];
    }

    function bottomLoadingWords() {
        return bottomLoadingPhrases[Math.floor(Math.random() * bottomLoadingPhrases.length)];
    }

    return (
        <div>
            <ReactLoading className="loading_div" type="bars" color="#FF4D27"
                height={100} width={50} />
            <br />
            <br />
            <br />
            <br />
            <Text className="loading_text">
                {topLoadingWords()}
            </Text>
            <br />
            <br />
            <Text className="loading_text">
                {bottomLoadingWords()}
            </Text>
        </div>
    )
}

export default LoadingScreen