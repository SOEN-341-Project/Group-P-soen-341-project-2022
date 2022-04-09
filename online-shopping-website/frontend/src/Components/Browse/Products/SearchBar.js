import { TextField } from "@mui/material";

export const SearchBar = (props) => {
    let filters = props.filters;
    const filterData = props.filterData;

    const handleSearchChange = (event) => {
        filters.searchQuery = event.target.value;
        filterData();
    }

    return (
        <div className="SearchBar">
            <TextField
                label={props.label}
                variant="outlined"
                type="search"
                onChange={(e) => handleSearchChange(e)}
            />
        </div>
    );
}