import logo from '../assets/images/atomic_bomb_1_logo.png'


const ErrorPage = ({ errorMessage }) => {
    return (
        <div>
            <img src={logo} alt="logo" className="logo_1" />
            <div>
                <div className="error_1">
                    BOOM, ONE BIG MEGATON HAS BLOWN UP!
                </div>
                <div className="error_4">
                    The error message from the backend was:
                    <div className="error_5">
                    {errorMessage}
                    </div>
                </div>
                <br />
                <br />
                <div className="error_4">
                    Please check the following:
                </div>
                <div className="error_3">
                    <ul>
                        <li>Nvidia-smi driver is installed and working properly, you can check this by using the command nvidia-smi, output should be listing your cards and usage</li>
                        <li>You do not own nvidia enteprise video cards (meaning you will not have access to nvidia-smi)</li>
                        <li>If you are running docker, you need to install nvidia-smi in the container to run this, check ReadMe for instructions or see our dockerfile</li>
                        <li>Check the logs or the docker logs</li>
                    </ul>
                </div>
            </div>
            <br />
            <br />
            <div className="error_4">
                For more info check out the repo page at or www.braintobytes.com
            </div>
            <div className="error_4">
                If you think this is a bug, please report it at:
            </div>
        </div>
    )
}

export default ErrorPage