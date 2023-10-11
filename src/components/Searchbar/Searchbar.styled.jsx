import styled from "@emotion/styled";

export const SearchHeader = styled.header`
    background: #242729;

    button{
        width: 72px;
        border-radius: 50px;
        color: #242729;
        border-radius: 50px;
        border: 2px solid #95BD27;
        box-shadow: 2px 2px 10px 0px #95BD27, -2px -2px 10px 0px #95BD27; 
        &:hover,
        &:focus{
            background: #95BD27;
            color: white;
        }  
    }

    input{
        background-color:inherit;
        width:160px;
        color: white;
        border: 1px solid #96a274;
    }
`;

export const Form = styled.form`
    display:flex;
    padding:16px;
    gap:16px;
    justify-content:center;
`