const FindCountry = ({targetCountry, setTargetCountry}) => {
    return (
        <div>
            find country: 
                <input value={targetCountry} onChange={setTargetCountry}/>
        </div>
    )
}

export default FindCountry