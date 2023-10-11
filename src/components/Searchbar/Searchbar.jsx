import { Form, SearchHeader } from "./Searchbar.styled";

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchHeader>
      <Form onSubmit={onSubmit}>
        <button type="submit" className="button">
          <span>Search</span>
        </button>

        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchHeader>
  );
};