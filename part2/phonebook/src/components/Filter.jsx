const Filter = ({ filterString, handleFilterChange}) => {
    return (
        <div>
        contains string: <input value={filterString} onChange={handleFilterChange}/>
      </div>
    )
}

export default Filter