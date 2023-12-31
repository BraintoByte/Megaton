
```
██████╗ ██████╗  █████╗ ██╗███╗   ██╗    ████████╗ ██████╗     ██████╗ ██╗   ██╗████████╗███████╗███████╗
██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║    ╚══██╔══╝██╔═══██╗    ██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝██╔════╝
██████╔╝██████╔╝███████║██║██╔██╗ ██║       ██║   ██║   ██║    ██████╔╝ ╚████╔╝    ██║   █████╗  ███████╗
██╔══██╗██╔══██╗██╔══██║██║██║╚██╗██║       ██║   ██║   ██║    ██╔══██╗  ╚██╔╝     ██║   ██╔══╝  ╚════██║
██████╔╝██║  ██║██║  ██║██║██║ ╚████║       ██║   ╚██████╔╝    ██████╔╝   ██║      ██║   ███████╗███████║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝       ╚═╝    ╚═════╝     ╚═════╝    ╚═╝      ╚═╝   ╚══════╝╚══════╝
```


<br />
<br />
<p align="center">
    <h1 align="center">
        MEGATON v0.0.1
    </h1>
</p>

<p align="center">
  <img width="460" height="300" src="https://github.com/BraintoByte/Megaton/assets/24713877/e40f6f35-ed2b-4af1-98fb-d609483be38f">
</p>

A simple UI for NVIDIA SMI, we did not make nvidia-smi please check out [NVIDIA-Smi nvidia webpage](https://developer.nvidia.com/nvidia-system-management-interface). Megaton is 100% OPEN-SOURCE and free!

## Description

Simple lightweight UI for nvidia-smi that can be run as docker containers (back and front end) or locally. Megaton allows for temperature and GPU information monitoring in real time. It will detect automatically your video cards and pick up the info from nvidia-smi.

![Readme image 1](https://github.com/BraintoByte/Megaton/blob/master/readme_images/readme_image_1.png)
![Readme image 2](https://github.com/BraintoByte/Megaton/blob/master/readme_images/readme_image_2.png)


## System Requirements & Dependencies

- Nvidia Enterprise Video Cards compatible with nvidia-smi
- nvidia-smi installed
- nvidia-container-toolkit
- Up to date nvidia drivers
- Docker
- Python 3.12 (if running outside a docker container)

This is not compatible with ARM with these docker files, if you want to make it compatible with ARM please feel free to fork or clone and change the docker image

- [Ubuntu download nvidia drivers](https://ubuntu.com/server/docs/nvidia-drivers-installation) (this should install nvidia-smi)
- [NVIDIA-Smi documentation](https://developer.nvidia.com/nvidia-system-management-interface)
- [Nvidia container toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)

## Installation


### Container based

1. Check system requirements
2. Clone this repo
3. Modify megaton_configs/megaton_config.json and add your internal IP_ADDRESS
```json
{
    "ip_address": "YOUR_INTERNAL_IP_ADDRESS"
}
```
4. In docker compose change the following to the amount of video cards you have
```yaml
    - driver: nvidia
      count: your_gpu_count
```
5. ```docker compose up -d```
6. In your webbrowser ```your_ip_address:5279``` for the ui
7. (Optional) Change docker ports in the docker-compose.yaml file
8. (Optional) Check out the swagger UI for additional API's at: ```your_ip_address:5278/documentation```
9. (Optional) Check out the swagger logs at: ```your_ip_address:5278/logs```
10.(Optional) Check out the about page in Megaton or [our webpage at braintobytes](https://www.braintobytes.com)

## Available APIs

- Get cards information (all)
- Get temperature information
- Get gpu memory information
- Get gpu usage information
- Get version
- Health check

## Available Websockets

- Get cards information (all)
- Get temperature information
- Get gpu memory information
- Get gpu usage information

<br />
<br />
<p align="center">
    <h1 align="center">
        ❤️ WE LOVE FEEDBACK! ❤️
    </h1>
    <h3 align="center">
        Please report any bugs or issues you find on in the issue tab of this repository.
    </h3>
</p>


<br />
<br />
<p align="center">
    <h1 align="center">
        🧠🛸 HELP US GROW! 🛸🧠
    </h1>
        <h3 align="center">
        Fork the project and help us throw more code in the pot!
    </h3>
</p>


<br />
<br />
<h1 align="center">
    🚀🌌🛰️👾 CONTRIBUTING GUIDELINES 👾🛰️🌌🚀
</h1>
<p align="center">
    <a href="https://github.com/BraintoByte/Megaton/blob/master/.github/CONTRIBUTING.md">To contribute, help us grow, or give feedback here are the contributing guidelines!</a>
</p>

<br />
<br />
<br />
<br />
<p align="center">
  Check out our website, 
  <a href="https://www.braintobytes.com/">braintobytes.com</a>
  for more!
</p>
