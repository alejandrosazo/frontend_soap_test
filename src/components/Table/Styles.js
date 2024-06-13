import styled from "@emotion/styled";
import { DataGrid } from "@mui/x-data-grid";

export const DataGridCustom = styled(DataGrid)(props => ({
    "& .MuiDataGrid-row":{
        
        textAlign: 'center',
        fontSize: 14
    },    
    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#fff",
        color: '#000',                
        fontSize: props.styleCustom?.fontSizeCol ? props.styleCustom.fontSizeCol : 16 
    },
    "& .MuiDataGrid-columnHeaderTitle": {
        textOverflow: "clip",
        fontWeight: '550',
        textAlign: 'center',
        whiteSpace: "break-spaces",
        lineHeight: 1
    }
}));

export const CustomToolbar = styled.div({
    display: "flex",
    alignItems: 'center',
    justifyContent: 'flex-end'
});