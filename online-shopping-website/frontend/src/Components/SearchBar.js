import { TextField } from "@mui/material";

export const SearchBar = (props) => {
    let filters = props.filters;
    const filterProducts = props.filterProducts;

    const handleSearchChange = (event) => {
        filters.searchQuery = event.target.value;
        filterProducts();
    }

    return (
        <div classaName="SearchBar">
            <TextField
                label="Search Products"
                variant="outlined"
                type="search"
                onChange={(e) => handleSearchChange(e)}
            />
        </div>
    );
}