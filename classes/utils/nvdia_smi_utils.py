import subprocess

class NvidiaSmiUtils:
    def __init__(self):
        pass

    def fake_gpu_info(self, is_first_time):
        print('fake gpu info')
        if (is_first_time):
            try:
                output = subprocess.check_call(['nvidia-smi --query-gpu=something,something --format=csv -l 1 | head -n 5'],
                                                shell=True)
            except subprocess.CalledProcessError as e:
                return e.output
            
        try:
            print('here')
            output = subprocess.check_output(['nvidia-smi --query-gpu=something,something --format=csv -l 1 | head -n 5'],
                                            shell=True, stderr=subprocess.STDOUT)
            print(output)
        except subprocess.CalledProcessError as e:
            print(e.output)
            raise Exception(e.output)

    def get_gpu_info(self, is_first_time):
        if (is_first_time):
            try:
                subprocess.check_call(['nvidia-smi --query-gpu=timestamp,name,pci.bus_id,driver_version,pstate,pcie.link.gen.max,pcie.link.gen.current,temperature.gpu,utilization.gpu,utilization.memory,memory.total,memory.free,memory.used --format=csv -l 1 | head -n 5'],
                                                shell=True)
            except subprocess.CalledProcessError as e:
                return e.output

        return subprocess.check_output(['nvidia-smi --query-gpu=timestamp,name,pci.bus_id,driver_version,pstate,pcie.link.gen.max,pcie.link.gen.current,temperature.gpu,utilization.gpu,utilization.memory,memory.total,memory.free,memory.used --format=csv -l 1 | head -n 5'],
                                                shell=True)