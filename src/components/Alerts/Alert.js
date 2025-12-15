export default function Alert ({ data }) {

    return (

        <li className={`--alert`}>
            <div className='--alert-col'>
                <span className="--alert-sub"></span>
                <h3 className="--alert-tit"></h3>
            </div>
            <span className={`--alert-badge`}></span>
        </li>

    )

}