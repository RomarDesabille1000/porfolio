
const Alert = ({type, message}) => {
    return (
        <div>
            <div className={`alert alert-${type}`}>{message}</div>
        </div>
    )
}

export default Alert