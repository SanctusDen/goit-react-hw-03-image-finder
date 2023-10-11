import React, { Component } from "react";
import { Form, SearchHeader } from "./Searchbar.styled";

export class Searchbar extends Component {
    render() {
        return (
            <SearchHeader>
            <Form class="form" onSubmit={this.onSubmit}>
                <button type="submit" class="button">
                    <span class="button-label">Search</span>
                </button>

                <input
                    name="input"
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                />
            </Form>
            </SearchHeader>)
    }
};