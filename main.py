#region Imports
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from classes.utils.nvdia_smi_utils import NvidiaSmiUtils
from classes.utils.formatting_utils import FormattingUtils
from classes.metadata.metadata_api import MetadataApi
from classes.connection_utils.connection_manager import ConnectionManager
from fastapi import FastAPI, status, WebSocket, WebSocketDisconnect
#endregion


#region Api Metadata
metadata_api = MetadataApi()

description = """
### MAGATON OPEN SOURCE API

## Restful API's

* **Get cards information (all)**
* **Get temperature information**
* **Get gpu memory information**
* **Get gpu usage information**
* **Get version**
* **Health check**

## Websockets
* **Get cards information (all)**
* **Get temperature information**
* **Get gpu memory information**
* **Get gpu usage information**
"""

version = metadata_api.get_version()
tags_metadata = metadata_api.get_tags_metadata()
contact = metadata_api.get_contact()
license_info = metadata_api.get_license_info()


summary = "A simple ui for nvidia-smi"
api_title = "Megaton"
documenation_url = "/documentation"
openapi_url = "/api/" + version + "/openapi.json"
redoc_url = "/logs"
#endregion

standard_connection_message_error = "Connection error"
connection_manager = ConnectionManager()
nsmi_utils = NvidiaSmiUtils()

app = FastAPI(
    title=api_title,
    description=description,
    summary=summary,
    version=version,
    openapi_tags=tags_metadata,
    docs_url=documenation_url,
    redoc_url=redoc_url,
    openapi_url=openapi_url,
    license_info=license_info,
    contact=contact)

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#region Main API
@app.get("/api_info/version", tags=["Versioning"], summary="Versioning")
async def version():
    return JSONResponse(content=metadata_api.get_version(), status_code=200)


@app.get("/nvidia_cards_info", tags=["Card Info"], summary="Get Card Info")
async def nvidia_cards_info():
    print("Getting cards info")

    try:
        gpu_info = nsmi_utils.get_gpu_info()
    except Exception as e:
        print(standard_connection_message_error)
        print(e)

    formatting_utils = FormattingUtils(gpu_info)
    output = formatting_utils.format_gpu_info(gpu_info)

    print("Video Cards info retrieved")

    return JSONResponse(content=output, status_code=200)

@app.get("/temperature_info", tags=["Card Info"], summary="Get Card Info")
async def temperature_info():
    print("Getting cards info")

    try:
        gpu_info = nsmi_utils.get_gpu_info()
    except Exception as e:
        print(standard_connection_message_error)
        print(e)

    formatting_utils = FormattingUtils(gpu_info)
    output = formatting_utils.format_for_temperature_info(gpu_info)

    print("Video Cards info retrieved")

    return JSONResponse(content=output, status_code=200)

@app.get("/gpu_usage_info", tags=["Card Info"], summary="Get Card Info")
async def gpu_usage_info():
    print("Getting gpu usage info")

    try:
        gpu_info = nsmi_utils.get_gpu_info()
    except Exception as e:
        print(standard_connection_message_error)
        print(e)

    formatting_utils = FormattingUtils(gpu_info)
    output = formatting_utils.format_for_gpu_usage_info(gpu_info)

    print("Video Cards gpu usage info retrieved")

    return JSONResponse(content=output, status_code=200)

@app.get("/memory_usage_info", tags=["Card Info"], summary="Get Card Info")
async def memory_usage_info():
    print("Getting gpu memory info")

    try:
        gpu_info = nsmi_utils.get_gpu_info()
    except Exception as e:
        print(standard_connection_message_error)
        print(e)

    formatting_utils = FormattingUtils(gpu_info)
    output = formatting_utils.format_for_memory_usage_info(gpu_info)

    print("Video Cards gpu memory info retrieved")

    return JSONResponse(content=output, status_code=200)

@app.websocket("/websocket/temperature_info")
async def temperature_info(websocket: WebSocket):
    print("Getting cards info")
    await websocket.accept()
    try:
        while True:
            print('waiting')
            
            try:
                gpu_info = nsmi_utils.get_gpu_info()
            except Exception as e:
                print(standard_connection_message_error)
                print(e)

            formatting_utils = FormattingUtils(gpu_info)
            output = formatting_utils.format_for_temperature_info(gpu_info)
            data = await websocket.receive_text()
            await websocket.send_json(output)

            if data == 'close':
                await websocket.close()
                break

            print('data sent')
            print(output)
    except WebSocketDisconnect:
        connection_manager.disconnect(websocket)
        await connection_manager.broadcast('Client has left')

    print("Video Cards info retrieved")


@app.websocket("/websocket/gpu_info")
async def gpu_info(websocket: WebSocket):
    print("Getting cards info")
    await websocket.accept()
    try:
        while True:
            print('waiting')

            try:
                gpu_info = nsmi_utils.get_gpu_info()
            except Exception as e:
                print(standard_connection_message_error)
                print(e)

            formatting_utils = FormattingUtils(gpu_info)
            output = formatting_utils.format_for_gpu_usage_info(gpu_info)
            data = await websocket.receive_text()
            await websocket.send_json(output)

            if data == 'close':
                await websocket.close()
                break

            print('data sent')
            print(output)
    except WebSocketDisconnect:
        connection_manager.disconnect(websocket)
        await connection_manager.broadcast('Client has left')

    print("Video Cards info retrieved")


@app.websocket("/websocket/memory_info")
async def memory_info(websocket: WebSocket):
    print("Getting cards info")
    await websocket.accept()
    try:
        while True:
            print('waiting')

            try:
                gpu_info = nsmi_utils.get_gpu_info()
            except Exception as e:
                print(standard_connection_message_error)
                print(e)

            formatting_utils = FormattingUtils(gpu_info)
            output = formatting_utils.format_for_memory_usage_info(gpu_info)
            data = await websocket.receive_text()
            await websocket.send_json(output)

            if data == 'close':
                await websocket.close()
                break

            print('data sent')
            print(output)
    except WebSocketDisconnect:
        connection_manager.disconnect(websocket)
        await connection_manager.broadcast('Client has left')

    print("Video Cards info retrieved")


@app.websocket("/websocket/all_info")
async def all_info(websocket: WebSocket):
    print("Getting cards info")
    await websocket.accept()
    is_error = False
    is_first_time = True
    try:
        while True:
            print('waiting')

            gpu_info = nsmi_utils.get_gpu_info(is_first_time)
            
            try:
                formatting_utils = FormattingUtils(gpu_info)
                output = formatting_utils.format_for_websocket_info(gpu_info)
            except Exception as e:
                is_error = True

            if is_error == False:
                data = await websocket.receive_text()
                await websocket.send_json(output)

                if data == 'close':
                    await websocket.close()
                    break
            else:
                await websocket.send_json("An error with Nvidia SMI has occurred, check logs or docker logs for more info")
                await websocket.close()
                break

            is_first_time = False

            print('data sent')
    except WebSocketDisconnect:
        await connection_manager.broadcast('Client has left')

    print("Video Cards info retrieved")

#region Health Check
@app.get("/health_check/get_health", tags=["Health Check"], summary="Simple get health check")
async def get_health():
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Healthy"})
#endregion
#endregion