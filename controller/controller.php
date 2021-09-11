<?php
// Report all errors
error_reporting(E_ALL);

//Importo clases de model.php
require '../model/model.php';

//Preparo el objeto que tiene acceso al modelo
$oModel = new c_model();

// Obtengo las peticiones
extract($_REQUEST);


if (!$act) die("ACT === void in Controller");

    $act = preg_replace('/[^a-zA-Z]/', '',trim($act)); //Sanitizo act.

    switch ($act) {

    case 'fnCargarOficinas':
        $oModel->fnCargarOficinas();
        break;

    case 'fnConsultarSolicitantes':
        $oModel->fnConsultarSolicitantes();
        break;  

    case 'fnInsertarPeticion':
        $oModel->fnInsertarPeticion();
        break;  

    case 'fnInsertarPeticionBe':
        $oModel->fnInsertarPeticionBe();
        break; 

    case 'fnConsultarPeticion':
        $oModel->fnConsultarPeticion();
        break;

    case 'fnMostrarCuadroDetallesSolicitud':
        $oModel->fnMostrarCuadroDetallesSolicitud();
        break;

    case 'fnMostrarCuadroDetallesArticulos':
        $oModel->fnMostrarCuadroDetallesArticulos();
        break;

    case 'fnSalvarCamposEditablesFichaArticulosBB':
        $oModel->fnSalvarCamposEditablesFichaArticulosBB();
        break;

    case 'fnSalvarCamposEditablesFichaArticulosBE':
        $oModel->fnSalvarCamposEditablesFichaArticulosBE();
        break;

    case 'fnSalvarCamposEditablesFichaDetallesPeticion':
        $oModel->fnSalvarCamposEditablesFichaDetallesPeticion();
        break;

    case 'fnAddNewArt':
        $oModel->fnAddNewArticulo();
        break;

    case 'fnEliminarArticulo':
        $oModel->fnEliminarArticulo();
        break;  
           
    case 'fnCargarEstados':
        $oModel->fnCargarEstados();
        break;   

    case 'fnCargarLicencias':
        $oModel->fnCargarLicencias();
        break;   

    case 'fnCargarMicro':
        $oModel->fnCargarMicro();
        break;

    case 'fnCargarTipoEnvioBe':
        $oModel->fnCargarTipoEnvioBe();
        break;     

    case 'fnCargarNegocioAlInicio':
        $oModel->fnCargarNegocioAlInicio();
        break; 

    case 'fnCargarLicenciasBe':
        $oModel->fnCargarLicenciasBe();
        break; 

    case 'fnBusquedaAuto':
        $oModel->fnBusquedaAuto($keyword);
        break; 

    case 'fnCompleteEanIsbn':
        $oModel->fnCompleteEanIsbn();
        break;

    case 'fnCargarCursosBeEsp':
        $oModel->fnCargarCursosBeEsp();
        break;

    case 'fnCargarCursosBeGen':
        $oModel->fnCargarCursosBeGen();
        break;
         
    case 'fnComponentesCursoBe':
        $oModel->fnComponentesCursoBe();
        break;
         
    case 'fnEnviarUrl':
        $oModel->fnEnviarUrl();
        break;

    case 'fnSincroTablaLibros':
        $oModel->fnSincroTablaLibros();
        break;
        
    case 'fnSincroBdTablaColegio':
        $oModel->fnSincroBdTablaColegio();
        break;

    case 'fnBuscarPorSpain':
        $oModel->fnBuscarPorSpain();
        break;
      
    case 'fnMarcarUrgenciaPeticion':
        $oModel->fnMarcarUrgenciaPeticion();
        break;
      
    case 'fnConsultarRegistroCambios':
        $oModel->fnConsultarRegistroCambios();
        break;
      
    case 'fnSalvarRegistroPeticion':
        $oModel->fnSalvarRegistroPeticion();
        break;

    case 'fnCargarCursosBeWordlist':
        $oModel->fnCargarCursosBeWordlist();
        break;

    case 'fnDuplicarPeticion':
        $oModel->fnDuplicarPeticion();
        break;

    case 'fnCargarAsign':
        $oModel->fnCargarAsign();
        break;   
    
    default:
        echo "None coincidence in Controller";
    }