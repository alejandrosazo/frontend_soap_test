import React, {useState} from 'react';
import { dateFormat } from '../../constants/functions';
import LoadingSpinner from '../../components/LoadingSpinner';
import Table from '../../components/Table';
import * as Styled from './Styles';
import AlertElement from '../../components/AlertElement';

export default function Home(){
    const apiUrl = 'http://localhost:5007/testController';
    const [valueDateInit, setValueDateInit] = useState(''),
        [valueDateFin, setValueDateFin] = useState(''),
        [showTable, setShowTable] = useState(false),
        [dataTable, setDataTable] = useState([]),
        [dataCambio, setDataCambio] = useState(null),
        [elementsAlertModal, setElementsAlertModal] = useState({ openModal: false, titleAlert: '', mensajeAlert: '', typeAlert: '' }),
        [loadingSpinner, setLoadingSpinner] = useState({openLoading: false, message: 'Cargando...'}),
        [tableHeader] = useState([
            { headerName: 'Id Petición', field: 'id', type: 'number',   headerAlign: 'center', align: 'center', width: 300},
            { headerName: 'Fecha', field: 'fecha',  headerAlign: 'center', align: 'center', width: 300},        
            { headerName: 'No. Peticion', field: 'numPeticion', headerAlign: 'center', align: 'center', width: 300 },
            { headerName: 'TC Venta', field: 'tasaVenta',  headerAlign: 'center', align: 'center',  width: 300 },        
            { headerName: 'TC Compra', field: 'tasaCompra',  headerAlign: 'center', align: 'center',  width: 300 }]) 

    /* Metodo para obtener el Cambio por el rango de fechas  */
    const getCambioPorRangoFecha = async () => {
        try {
            setLoadingSpinner({...loadingSpinner, openLoading: true, message: 'Obteniendo datos...'});
            let sendData = {fechaInicio: dateFormat(valueDateInit), fechaFin: dateFormat(valueDateFin)}
            fetch(apiUrl+'/solicitarCambioPorFecha', {method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sendData)}).then(response => {
                if (!response.ok) {
                    setLoadingSpinner({...loadingSpinner, openLoading: false});
                    setElementsAlertModal({ ...elementsAlertModal, openModal: true, typeAlert: 'warning', mensajeAlert: 'Error al obtener la información'});         
                }
                return response.json();
            }).then(data => {
                setLoadingSpinner({...loadingSpinner, openLoading: false});
                insertDataCambio(data)
                setDataCambio(data);
                console.log(data);
            });
        } catch (error) {
            setLoadingSpinner({...loadingSpinner, openLoading: false});
            setElementsAlertModal({ ...elementsAlertModal, openModal: true, typeAlert: 'warning', mensajeAlert: error});         
        }   
    }

    /* Metodo para Insertar los datos en la tabla */
    const insertDataCambio = async (data) => {
        try {
            setLoadingSpinner({...loadingSpinner, openLoading: true, message: 'Ingresando datos...'});
            let sendData = {fecha: data.fechaInicio};
            fetch(apiUrl+'/insertarDatoTabla', {method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sendData)}).then(response => {
                if (!response.ok) {
                    setLoadingSpinner({...loadingSpinner, openLoading: false});
                    setElementsAlertModal({ ...elementsAlertModal, openModal: true, typeAlert: 'warning', mensajeAlert: 'Error al obtener la información'});         
                }
                
            }).then(data => {
                setLoadingSpinner({...loadingSpinner, openLoading: false});
                setElementsAlertModal({ ...elementsAlertModal, openModal: true, typeAlert: 'success', mensajeAlert: 'Registro guardado'});         
            });
        } catch (error) {
            setLoadingSpinner({...loadingSpinner, openLoading: false});
            setElementsAlertModal({ ...elementsAlertModal, openModal: true, typeAlert: 'warning', mensajeAlert: error});  
        }
    }

    /* Metodo para obtener las solicitudes de la base de datos */
    const getDataDB = async () => {
        try {
            setLoadingSpinner({...loadingSpinner, openLoading: true, message: 'Obteniendo datos...'});
            fetch(apiUrl+'/obtenerSolicitudes').then(response => {
                if (!response.ok) {
                    setLoadingSpinner({...loadingSpinner, openLoading: false});
                    setElementsAlertModal({ ...elementsAlertModal, openModal: true, typeAlert: 'warning', mensajeAlert: 'Error al obtener la información'});         
                }
                return response.json();
            }).then(data => {
                setLoadingSpinner({...loadingSpinner, openLoading: false});
                setDataTable(data);
                setShowTable(true);
                console.log(data);
            });
        } catch (error) {
            setLoadingSpinner({...loadingSpinner, openLoading: false});
            setElementsAlertModal({ ...elementsAlertModal, openModal: true, typeAlert: 'warning', mensajeAlert: error});         
        }  
    }

    /* Cierra el Modal de Alerta desplegado en la pantalla principal */
    const handleCloseAlertModal = () => {
        setElementsAlertModal({ ...elementsAlertModal, openModal: false });
    }

    return(
        <Styled.MainContainer>
            {loadingSpinner.openLoading && <LoadingSpinner open={loadingSpinner.openLoading} message={loadingSpinner.message}/>}  
            {elementsAlertModal.openModal && <AlertElement typeAlert={elementsAlertModal.typeAlert} openModal={elementsAlertModal.openModal} 
                title={elementsAlertModal.titleAlert} mensaje={elementsAlertModal.mensajeAlert} handCloseModal={handleCloseAlertModal} />}         
            <Styled.CardContainer>
                <Styled.TitleCard>Test SOAP - Genesis Empresarial</Styled.TitleCard>
                <Styled.InputsContainer>
                    <Styled.SearchInput type='date' label='Fecha Inicio' InputLabelProps={{ shrink: true }} 
                        value={valueDateInit} onChange={e => setValueDateInit(e.target.value)} />
                    <Styled.SearchInput type='date' label='Fecha Final' InputLabelProps={{ shrink: true }} 
                        value={valueDateFin} onChange={e => setValueDateFin(e.target.value)} />
                </Styled.InputsContainer>
                {dataCambio && <Styled.TextCambio>Promedio Venta: {dataCambio.promedioVenta} - Promedio Compra: {dataCambio.promedioCompra}</Styled.TextCambio>}
                {showTable && 
                <Styled.TableContainer>
                    <Table header={tableHeader} data={dataTable} />
                </Styled.TableContainer>}                         
                <Styled.ButtonConfirm onClick={getCambioPorRangoFecha} variant="contained" >
                    Consultar
                </Styled.ButtonConfirm>
                <Styled.ButtonConfirm onClick={getDataDB} variant="contained" >
                    Consultar Datos de Solicitudes
                </Styled.ButtonConfirm>
            </Styled.CardContainer>
        </Styled.MainContainer>
    )
}