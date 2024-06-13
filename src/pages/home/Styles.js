import styled from "@emotion/styled";
import { Button, Card, TextField } from "@mui/material";

export const MainContainer = styled.div({
    display: 'flex',
    backgroundColor: '#E8E8E8',
    height: '100vh',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
});

export const CardContainer = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    filter: `drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.2))`,
    marginTop: 15,
    padding: 25,
    
});

export const TitleCard = styled.p({
    fontWeight: 'bold',
    color: '#000',
    fontSize: '26px',
    fontFamily: 'sans-serif',
    padding: '0px 30px'
});

export const TextCambio = styled.p({
    fontWeight: 'bold',
    color: '#000',
    fontSize: '16px',
    fontFamily: 'sans-serif',
    padding: '0px 5px'
});

export const InputsContainer = styled.div({
    display: 'flex',
    padding: '40px 0px',
    flexDirection: 'row'
});

export const TableContainer = styled.div({
    display: 'flex'
});

export const SearchInput = styled(TextField)({
    minWidth: '350px !important',
    margin: '0px 15px !important'
});

export const ButtonConfirm = styled(Button)({
    width: '60%',
    color: '#FFF !important',
    backgroundColor: '#1E88E5 !important',
    margin: '20px 0px'
});