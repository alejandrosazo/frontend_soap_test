import React from 'react';
import { Dialog, DialogContent, Slide, DialogTitle, DialogContentText } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useStyles } from './style';
import './style.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/* Componente REUTILIZABLE despliega una alerta momentanea en el centro de la pantalla con un titulo, mensaje y un
    icono informativo, para su funcionamiento necesita los siguientes props: openModal: Abre el modal en pantalla
    handCloseModal: Función para controlar el cierre del modal, typeAlert: Indica el tipo de Icono que mostrara según
    el tipo de Alerta, title: Muestra el titulo de la alerta, mensaje: Muestra un texto mas pequeño debajo del titulo.  */
export default function AlertElement({openModal, handCloseModal, typeAlert, title, mensaje}) {
    const classes = useStyles();
    const [menuActive, setMenuState] = React.useState(false);

    React.useEffect(() => {
        if (openModal === true) {
            changeAnimationStatus();
            setTimeout(function () { closeModal() }, 4000);
        }
    }, [openModal])

    const closeModal = () => {
        handCloseModal();
    }

    const changeAnimationStatus = () => {
        setMenuState(!menuActive)
        setTimeout(function () { setMenuState(false) }, 10);
    }
    
    return (
        <div>
            <Dialog open={openModal} TransitionComponent={Transition} keepMounted onClose={closeModal}
                aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                <Close className={classes.closeIcon} onClick={closeModal} />
                {(typeAlert === 'success') ? (
                    <div className={menuActive ? "hide" : "check_mark"}>
                        <div className="sa-icon sa-success animate">
                            <span className="sa-line sa-tip animateSuccessTip"></span>
                            <span className="sa-line sa-long animateSuccessLong"></span>
                            <div className="sa-placeholder"></div>
                            <div className="sa-fix"></div>
                        </div>
                    </div>
                ) : ('')
                }
                {(typeAlert === 'error') ? (
                    <div className={menuActive ? "hide" : "check_mark"}>
                        <div className="sa-icon sa-delete animate">
                            <span className="sa-line sa-tipDelete animateErrorTip"></span>
                            <span className="sa-line sa-longDelete animateErrorLong"></span>
                            <div className="sa-placeholderDelete"></div>
                            <div className="sa-fixDelete"></div>
                        </div>
                    </div>
                ) : ('')
                }
                {(typeAlert === 'warning') ? (
                    <div className={menuActive ? "hide" : "check_mark"}>
                        <div className="sa-icon sa-warning animate">
                            <span className="sa-line sa-tipWarning animateWarningTip"></span>
                            <span className="sa-line sa-longWarning animateWarningLong"></span>
                            <div className="sa-placeholderWarning"></div>
                            <div className="sa-fixWarning"></div>
                        </div>
                    </div>
                ) : ('')
                }
                {(typeAlert === 'question') ? (
                    <div className={menuActive ? "hide" : "check_mark"}>
                        <div className="sa-icon sa-confirmation animate">
                            <div className="sa-line-box sa-circleConfirmation animateConfirmationCircle"></div>
                            <span className="sa-line sa-tipConfirmation animateConfirmationTip"></span>
                            <span className="sa-line sa-longConfirmation animateConfirmationLong"></span>
                            <div className="sa-placeholderConfirmation"></div>
                            <div className="sa-fixConfirmation"></div>
                        </div>
                    </div>
                ) : ('')
                }
                <DialogTitle className={classes.title} id="alert-dialog-slide-title">
                    {title}
                </DialogTitle>
                <DialogContent className={classes.description}>
                    <DialogContentText className={classes.messageModal} id="alert-dialog-slide-description">
                        {mensaje}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}