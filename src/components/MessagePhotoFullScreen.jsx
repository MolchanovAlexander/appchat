
export default function MessagePhotoFullScreen({ fullScr, img }) {

    return (
        <div className={`messagePhotoFullScreen `}>

            <img src={img} alt="" />
            <button onClick={fullScr}>Close</button>
        </div>
    )
}
