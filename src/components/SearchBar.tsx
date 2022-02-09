import { ChangeEvent, useContext, useRef } from "react";
import { SearchResults } from ".";
import { PlacesContext } from "../context";

export const SearchBar = () => {

  const { searchPlacesByTerm } = useContext(PlacesContext)

  const debounceRef = useRef<NodeJS.Timeout>()
  const prevValue = useRef<String>('')

  const onQueryChanged = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      if (value === prevValue.current) return

      searchPlacesByTerm(value)

      prevValue.current = value
    }, 350)

  }


  return (
    <div className="search-container">
      <input
        onChange={onQueryChanged}
        className="form-control"
        placeholder="Buscar lugar..."
        type="text" />

      <SearchResults />
    </div>
  )
};
