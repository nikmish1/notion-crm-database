import { useState } from "react"


type FilterProps = {
    onApplyFilter: () => void;
}

export const Filter = ({ onApplyFilter }: FilterProps) => {
    const [filter, setFilter] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <input type="text" onChange={handleChange} />
            <p>Filter: {filter}</p>
            <button onClick={onApplyFilter}>Apply</button>
        </div>
    )
}

