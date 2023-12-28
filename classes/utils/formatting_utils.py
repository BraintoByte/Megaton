from classes.utils.formatting_utils_converter import FormatterUtilsConverter

class FormattingUtils:
    def __init__(self, gpu_info):
        self.gpu_info = gpu_info
        self.converter = FormatterUtilsConverter()

    def format_gpu_info(self, gpu_info):
        gpu_info = gpu_info.decode().splitlines()
        count = 0
        json_dict = {}

        for gpu in gpu_info:
            if count == 0:
                count += 1
                continue

            gpu_splitted = gpu.split(",")
            json_dict["GPU " + str(count)] = self.converter.format_to_json(gpu_splitted)
            count += 1

        return json_dict

    def format_for_websocket_info(self, gpu_info):
        gpu_info = gpu_info.decode().splitlines()
        count = 0
        json_dict = {}
        list_of_temperatures = []
        list_of_gpu_usage = []
        list_of_memory_usage = []
        list_of_cards_info = []

        for gpu in gpu_info:
            if count == 0:
                count += 1
                continue

            gpu_splitted = gpu.split(",")

            if count == 1:
                json_dict["time_stamp"] = gpu_splitted[0]

            list_of_temperatures.append(self.converter.temperature_info_formatted(gpu_splitted, count))
            list_of_gpu_usage.append(self.converter.gpu_usage_info_formatted(gpu_splitted, count))
            list_of_memory_usage.append(self.converter.memory_usage_info_formatted(gpu_splitted, count))
            list_of_cards_info.append(self.converter.format_to_json_for_websocket_array(gpu_splitted, count))

            count += 1

        for temp in list_of_temperatures:
            for key in temp:
                json_dict[key] = temp[key]

        for temp in list_of_gpu_usage:
            for key in temp:
                json_dict[key] = temp[key]

        for temp in list_of_memory_usage:
            for key in temp:
                json_dict[key] = temp[key]

        for temp in list_of_cards_info:
            for key in temp:
                json_dict[key] = temp[key]

        print(json_dict)
        return json_dict

    def format_for_temperature_info(self, gpu_info):
        gpu_info = gpu_info.decode().splitlines()
        count = 0
        json_dict = {}
        list_of_temperatures = []

        for gpu in gpu_info:
            if count == 0:
                count += 1
                continue

            gpu_splitted = gpu.split(",")

            if count == 1:
                json_dict["time_stamp"] = gpu_splitted[0]

            list_of_temperatures.append(self.converter.temperature_info_formatted(gpu_splitted, count))

            count += 1


        for temp in list_of_temperatures:
            for key in temp:
                json_dict[key] = temp[key]

        return json_dict

    def format_for_gpu_usage_info(self, gpu_info):
        gpu_info = gpu_info.decode().splitlines()
        count = 0
        json_dict = {}
        list_of_usage = []

        for gpu in gpu_info:
            if count == 0:
                count += 1
                continue

            gpu_splitted = gpu.split(",")

            if count == 1:
                json_dict["time_stamp"] = gpu_splitted[0]

            list_of_usage.append(self.converter.gpu_usage_info_formatted(gpu_splitted, count))

            count += 1


        for temp in list_of_usage:
            for key in temp:
                json_dict[key] = temp[key]

        return json_dict


    def format_for_memory_usage_info(self, gpu_info):
        gpu_info = gpu_info.decode().splitlines()
        count = 0
        json_dict = {}
        list_of_usage = []

        for gpu in gpu_info:
            if count == 0:
                count += 1
                continue

            gpu_splitted = gpu.split(",")

            if count == 1:
                json_dict["time_stamp"] = gpu_splitted[0]

            list_of_usage.append(self.converter.memory_usage_info_formatted(gpu_splitted, count))

            count += 1


        for temp in list_of_usage:
            for key in temp:
                json_dict[key] = temp[key]

        return json_dict