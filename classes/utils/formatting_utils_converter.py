

class FormatterUtilsConverter:
    def __init__(self):
        pass

    def format_to_json(self, info_array):
        dictionary = {
            "timestamp": info_array[0],
            "name": info_array[1].lstrip(),
            "pci.bus_id": info_array[2].replace(" ", ""),
            "driver_version": info_array[3].replace(" ", ""),
            "pstate": info_array[4].replace(" ", ""),
            "pcie.link.gen.max": int(info_array[5].replace(" ", "")),
            "pcie.link.gen.current": int(info_array[6].replace(" ", "")),
            "temperature.gpu": int(info_array[7].replace(" %", "").replace(" ", "")),
            "utilization.gpu": int(info_array[8].replace(" %", "").replace(" ", "")),
            "utilization.memory": int(info_array[9].replace(" %", "").replace(" ", "")),
            "memory.total": int(info_array[10].replace(" MiB", "").replace(" ", "")),
            "memory.free": int(info_array[11].replace(" MiB", "").replace(" ", "")),
            "memory.used": int(info_array[12].replace(" MiB", "").replace(" ", ""))
        }

        return dictionary

    def format_to_json_for_websocket_array(self, info_array, identifier):
        name_identifier = info_array[1].lstrip() + " #" + str(identifier)
        dictionary = {
            "name " + name_identifier: info_array[1].lstrip(),
            "pci.bus_id " + name_identifier: info_array[2].replace(" ", ""),
            "driver_version " + name_identifier: info_array[3].replace(" ", ""),
            "pstate " + name_identifier: info_array[4].replace(" ", ""),
            "pcie.link.gen.max " + name_identifier: int(info_array[5].replace(" ", "")),
            "pcie.link.gen.current " + name_identifier: int(info_array[6].replace(" ", "")),
            "temperature.gpu " + name_identifier: int(info_array[7].replace(" %", "").replace(" ", "")),
            "utilization.gpu " + name_identifier: int(info_array[8].replace(" %", "").replace(" ", "")),
            "utilization.memory " + name_identifier: int(info_array[9].replace(" %", "").replace(" ", "")),
            "memory.total " + name_identifier: int(info_array[10].replace(" MiB", "").replace(" ", "")),
            "memory.free " + name_identifier: int(info_array[11].replace(" MiB", "").replace(" ", "")),
            "memory.used " + name_identifier: int(info_array[12].replace(" MiB", "").replace(" ", "")),
            "identifier #" + str(identifier): info_array[1].lstrip() + " #" + str(identifier)
        }

        return dictionary
    
    def temperature_info_formatted(self, info_array, identifier):
        return { "Gpu Temperature " +  info_array[1].lstrip() + " " + str(identifier): int(info_array[7].replace(" ", "")) }

    def gpu_usage_info_formatted(self, info_array, identifier):
        return { "Gpu Usage " +  info_array[1].lstrip() + " " + str(identifier): int(info_array[8].replace("%", "").replace(" ", "")) }

    def memory_usage_info_formatted(self, info_array, identifier):
        return { "Memory Usage " +  info_array[1].lstrip() + " " + str(identifier): int(info_array[9].replace("%", "").replace(" ", "")) }