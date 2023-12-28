export default class InfoCard {
    constructor(name, pci_bus_id, driver_version, pstate, pcie_link_gen_max, pcie_link_gen_current, temperature_gpu, utilization_gpu, utilization_memory, memory_total, memory_free, memory_used, identifier) {
        this.name = name;
        this.pci_bus_id = pci_bus_id;
        this.driver_version = driver_version;
        this.pstate = pstate;
        this.pcie_link_gen_max = pcie_link_gen_max;
        this.pcie_link_gen_current = pcie_link_gen_current;
        this.temperature_gpu = temperature_gpu;
        this.utilization_gpu = utilization_gpu;
        this.utilization_memory = utilization_memory;
        this.memory_total = memory_total;
        this.memory_free = memory_free;
        this.memory_used = memory_used;
        this.identifier = identifier
    }
}