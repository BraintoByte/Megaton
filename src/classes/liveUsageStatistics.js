//#region Imports
import InfoCard from "../classes/infoCard.js";
//#endregion
const USAGESELECTOR = {
    Temperature: "Gpu Temperature",
    Gpu: "Gpu Usage",
    Memory: "Memory Usage"
}

export default class LiveUsageStatistics {
    constructor(allInfo) {
        this.allInfo = allInfo
    }

    static get USAGESELECTOR() {
        return USAGESELECTOR;
    }

    convertInfoToArray(usageSelector) {
        const dataDictionary = {}
        var dataArray = []

        switch (usageSelector) {
            case USAGESELECTOR.Temperature:
                dataArray = this.getKeys(usageSelector)
                break;
            case USAGESELECTOR.Gpu:
                dataArray = this.getKeys(usageSelector)
                break;
            case USAGESELECTOR.Memory:
                dataArray = this.getKeys(usageSelector)
                break;
        }

        if (dataArray) {
            for (const key of Object.keys(this.allInfo)) {
                dataArray.forEach(element => {
                    if (key === element) {
                        dataDictionary[key] = this.allInfo[key]
                    }
                });
            }

            dataDictionary['time_stamp'] = this.allInfo['time_stamp'].split(' ')[1]
            return dataDictionary
        }

        return null
    }

    extractCardInfo() {
        const cardList = []
        const identifierSignature = "identifier #"
        const identifierList = []

        if (this.allInfo) {
            for (const key of Object.keys(this.allInfo)) {
                if (key != 'time_stamp' &&
                    key != LiveUsageStatistics.USAGESELECTOR.Temperature &&
                    key != LiveUsageStatistics.USAGESELECTOR.Gpu &&
                    key != LiveUsageStatistics.USAGESELECTOR.Memory) {

                    if (key.includes(identifierSignature)) {
                        identifierList.push(this.allInfo[key])
                    }
                }
            }

            identifierList.forEach(element => {
                var card = this.#makeCardInfo(this.allInfo['name ' + element],
                    this.allInfo['pci.bus_id ' + element],
                    this.allInfo['driver_version ' + element],
                    this.allInfo['pstate ' + element],
                    this.allInfo['pcie.link.gen.max ' + element],
                    this.allInfo['pcie.link.gen.current ' + element],
                    this.allInfo['temperature.gpu ' + element],
                    this.allInfo['utilization.gpu ' + element],
                    this.allInfo['utilization.memory ' + element],
                    this.allInfo['memory.total ' + element],
                    this.allInfo['memory.free ' + element],
                    this.allInfo['memory.used ' + element],
                    element)

                cardList.push(card)
            });
        }

        return cardList
    }

    #makeCardInfo(name, pci_bus_id, driver_version, pstate, pcie_link_gen_max, pcie_link_gen_current, temperature_gpu, utilization_gpu, utilization_memory, memory_total, memory_free, memory_used, card_identifier) {
        return new InfoCard(name,
            pci_bus_id,
            driver_version,
            pstate,
            pcie_link_gen_max,
            pcie_link_gen_current,
            temperature_gpu,
            utilization_gpu,
            utilization_memory,
            memory_total,
            memory_free,
            memory_used,
            card_identifier)
    }

    getKeys = (usageSelector) => {
        if (this.allInfo) {
            var list_keys = []

            for (const key of Object.keys(this.allInfo)) {
                if (key !== 'time_stamp' && key.includes(usageSelector)) {
                    list_keys.push(key)
                }
            }

            return list_keys
        }

        return null
    }
}