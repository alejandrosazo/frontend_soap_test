
import React from 'react';
//import { GridToolbarQuickFilter, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, } from '@mui/x-data-grid';
import { GridToolbarQuickFilter} from '@mui/x-data-grid';
//import Pagination from '@mui/material/Pagination';
/********** STYLES **********/
import * as Styled from './Styles';

export default function Table(props) {
/********** VARIABLES **********/
    const [pageSize, setPageSize] = React.useState(10);
/********** FUNCTIONS **********/

   
    return(
        <Styled.DataGridCustom
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            styleCustom={props.style}      
            getRowHeight={() => 'auto'}
            checkboxSelection={props.checkbox}          
            autoHeight={true}           
            rows={props.data}
            columns={props.header}
            initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10, 20, 30]}
           
        />
    )
}