<?php
class c_model { //creamos la clase base del modelo
  private $attr00;

  function __construct() { // funcion constructora
    require '../config/c_db_connection.php';
      $this->attr00 = new c_db_connection(); // Tenemos los atributos y funciones de la clase que conecta con el sql

}
  public function fnCargarOficinas() { // Query para cargar oficinas
    $vQuery;
    $vQueryResult;
    $rawdata = array();
    $i=0;
    $row;

    try {
        $vQuery="SELECT * FROM sucursal;";
        $vQueryResult = $this->attr00->link->query($vQuery);

        while($row = mysqli_fetch_array($vQueryResult))
        {
            $rawdata[$i] = $row;
            $i++;
        }
        echo json_encode($rawdata);
        $this->attr00->link->close();
    }
    catch (exception $e){
        echo $e->getMessage();
        die();
    }
  }
  public function fnCargarEstados(){ // Consulta con los Estados que puede tener una solicitud
    $vQuery;
    $vQueryResult;
    $rawdata = array();
    $i=0;
    $row;
    try {
      $vQuery = "SELECT *
              FROM estado
              ORDER BY orden_estado;";
      $vQueryResult = $this->attr00->link->query($vQuery);

      while($row = mysqli_fetch_array($vQueryResult))
      {
          $rawdata[$i] = $row;
          $i++;
      }
      echo json_encode($rawdata);
      $this->attr00->link->close();
    }
    catch (exception $e){
      echo $e->getMessage();
      die();
    }
  }

  public function fnConsultarSolicitantes(){ //Query sobre solicitantes dependiendo de la sucursal

    $vQuery;
    $vQueryResult;
    $aData = [];
    $vLinea;
    $vIndex = 0;
    $vSucursal = 0;

    if(isset($_POST['pFiltro'])){$vSucursal = fnSanitizarNum($_POST['pFiltro']);}

    try {

      $vQuery = "SELECT *
              FROM solicitante
              WHERE fk_id_sucursal = '$vSucursal'
              ORDER BY nombre_sol, apellidos_sol;";

      $vQueryResult = $this->attr00->link->query($vQuery);

      while($vLinea = mysqli_fetch_array($vQueryResult))
      {
          $aData[$vIndex] = $vLinea;
          $vIndex++;
      }
      echo json_encode($aData);
      $this->attr00->link->close();
    }
    catch (exception $e){
      echo $e->getMessage();
      die();
    }
  }

public function fnInsertarPeticion(){ // FN Para insertar los datos de una nueva solicitud de tienda para BB
  $vOficina;
  $vSolicitante;
  $vFechaSolicitud;
  $vSpain;
  $vNombreCentro;
  $vObsSol;
  $vNumeroCentro;

  $vLicencia;
  $vEan;
  $vIsbn;
  $vBookCode;
  $vTitulocursobb;
  $vTitulocursowebbb;
  $vPreciosindtobb;
  $vDtobb;
  $vAlumnosbb;
  $vObsBb;

  $vQuery;
  $aQueryResult = array();
  $vQueryResult = FALSE;
  $aStatus = array();
  $vStatus;
  $vLastId;
  $vLastIdSub;
  $vIndex = 0;
  $vArray = array();
  $vObj = new stdclass();
  $vArrayLenght;
  $item;

  try {

    if(isset($_POST['pOficina'])){$vOficina = fnSanitizarTxt($_POST['pOficina']);}
    if(isset($_POST['pSolicitante'])){$vSolicitante = fnSanitizarTxt($_POST['pSolicitante']);}
    $vFechaSolicitud = ($_POST['pFechaSolicitud']);
    if(isset($_POST['pSpain'])){$vSpain = fnSanitizarNum($_POST['pSpain']);}
    if(isset($_POST['pNombreCentro'])){$vNombreCentro = fnSanitizarTxt($_POST['pNombreCentro']);}
    if(isset($_POST['pNumeroCentro']) && !empty($_POST['pNumeroCentro'])){$vNumeroCentro = fnSanitizarNum($_POST['pNumeroCentro']);}else{$vNumeroCentro="null";}//Modo ESTRICTO en SQl, int no acepta void y mas... Php convierte los null en void en una sentencia sql. Hay que pasar null en string.
    if(isset($_POST['pObsSol'])){$vObsSol = fnSanitizarTxt($_POST['pObsSol']);}


    $this->attr00->link->autocommit(false);
    $vQuery = "INSERT INTO SOLICITUD (spain_centro, fecha_solicitud, nombre_centro, numero_oficial_centro, fk_id_sol, fk_id_estado, fk_id_area_negocio, obs_solicitud)
                VALUES ('$vSpain',NOW(),'$vNombreCentro',$vNumeroCentro,'$vSolicitante','1','1', '$vObsSol');";//sin comillas en la var que puede ser null

    array_push($aQueryResult,($this->attr00->link->query($vQuery)));

    $vLastId = $this->attr00->link->insert_id;

    if(isset($_POST['pArray'])){$vArray = json_decode($_POST['pArray']);}

    foreach ($vArray as $vObj){
      $vLicencia = fnSanitizarNum($vObj->licencia);
      $vEan = fnSanitizarNum($vObj->ean);
      $vIsbn = fnSanitizarTxt($vObj->isbn);
      $vBookCode = fnSanitizarNum($vObj->bookcode);
      $vTitulocursowebbb = fnSanitizarTxt($vObj->titulocursowebbb);
      $vPreciosindtobb = fnSanitizarNumDecimal($vObj->preciosindtobb);

      if (empty($vObj->dtobb)) {
        $vDtobb=0;
      } else {
        $vDtobb = fnSanitizarNumDecimal($vObj->dtobb);
      }

      $vAlumnosbb = fnSanitizarNum($vObj->alumnosbb);
      $vObsBb = fnSanitizarTxt($vObj->obsBb);

      $vQuery = "INSERT INTO ARTICULOS_SOLICITUD ( nombre_art_web, alumnos_art, obs_art, fk_id_solicitud )
              VALUES ( '$vTitulocursowebbb','$vAlumnosbb','$vObsBb', '$vLastId' );";

      array_push($aQueryResult,($this->attr00->link->query($vQuery)));

      $vLastIdSub = $this->attr00->link->insert_id;

      $vQuery = "INSERT INTO ARTICULOS_SOLICITUD_BB ( fk_id_art,fk_id_licencia_bb,ean_bb,isbn_bb,dto_bb, fk_id_libro_bb, precio_art )
                VALUES ( '$vLastIdSub','$vLicencia','$vEan','$vIsbn','$vDtobb', '$vBookCode', '$vPreciosindtobb' );";
      array_push($aQueryResult,($this->attr00->link->query($vQuery)));
    }

    $vArrayLenght = count($aQueryResult);

    foreach ($aQueryResult as $item){ //Por cada TRUE me cuento una
      if ($item){
        $vIndex++;
      }
    }
    if ($vArrayLenght == $vIndex){ //Si el Nº de TRUE es igual al Nº de Elementos todo ha ido OK
      $vQueryResult = TRUE;
    }

    if ($vQueryResult) {
      $vStatus=1;
      $this->attr00->link->commit();
      $this->fnPrepararMail($vLastId);  //Mail de aviso a usuarios
    }
    else {
      $vStatus=0;
      $this->attr00->link->rollback();
    }
  $this->attr00->link->autocommit(true);
  $this->attr00->link->close();
      $aStatus = array(
        'resultado'=>$vStatus
      );
      echo json_encode($aStatus);
  }
  catch (exception $e){
    echo $e->getMessage();
    die();
  }
}

public function fnInsertarPeticionBe(){ // FN Para insertar los datos de una nueva solicitud de tienda para BE
  $vOficina;
  $vSolicitante;
  $vFechaSolicitud;
  $vSpain;
  $vNombreCentro;
  $vObsSol;

  $aCodesList;
  $vTitulocursowebbe;
  $vTipoLicenciaBe;
  $vAlumnosbe;
  $vMicroBe;
  $vEnvioCentroBe;
  $vFechaInicioBe;
  $vFechaFinBe;
  $vFechaFinTemp;
  $vObsBe;

  $vQuery;
  $aQueryResult = array();
  $vQueryResult = FALSE;
  $aStatus = array();
  $vStatus;
  $vLastId;
  $vLastIdSub;
  $vArray;
  $vObjBe;
  $vIndex = 0;
  $vArrayLenght;
  $item;
  $vCode;

    try{
        if(isset($_POST['pOficina'])){$vOficina = fnSanitizarTxt($_POST['pOficina']);}
        if(isset($_POST['pSolicitante'])){$vSolicitante = fnSanitizarTxt($_POST['pSolicitante']);}
        $vFechaSolicitud = ($_POST['pFechaSolicitud']);
        if(isset($_POST['pSpain'])){$vSpain = fnSanitizarNum($_POST['pSpain']);}
        if(isset($_POST['pNombreCentro'])){$vNombreCentro = fnSanitizarTxt($_POST['pNombreCentro']);}
        if(isset($_POST['pObsSol'])){$vObsSol = fnSanitizarTxt($_POST['pObsSol']);}

        $this->attr00->link->autocommit(false);
        $vQuery = "INSERT INTO SOLICITUD (spain_centro, fecha_solicitud, nombre_centro, fk_id_sol, fk_id_estado, fk_id_area_negocio, obs_solicitud)
                    VALUES ('$vSpain',NOW(),'$vNombreCentro','$vSolicitante','1','2', '$vObsSol');";
        array_push($aQueryResult,($this->attr00->link->query($vQuery)));
        $vLastId = $this->attr00->link->insert_id;

        if(isset($_POST['pArray'])){$vArray = json_decode($_POST['pArray']);}
        foreach ($vArray as $vObjBe){

          $vTitulocursowebbe = fnSanitizarTxt($vObjBe->titulocursowebbe);
          $vTipoLicenciaBe = fnSanitizarNum($vObjBe->tipolicenciabe);
          $vAlumnosbe = fnSanitizarNum($vObjBe->alumnosbe);
          $vMicroBe = fnSanitizarNum($vObjBe->microfonobe);
          $vEnvioCentroBe = fnSanitizarNum($vObjBe->enviocentrobe);
          $vFechaInicioBe = $vObjBe->fechainiciobe;
          $vFechaFinBe = $vObjBe->fechafinbe;
          if (empty($vObjBe->fechainiciobe)){$vFechaInicioBe = "0000-00-00 00:00:00";}//Si está vacio construyo el formato vacio de fecha admitido por tipo date y modo estricto de mySql
          if (empty($vObjBe->fechafinbe)){$vFechaFinBe = "0000-00-00 00:00:00";}

          else{
            $vFechaFinTemp = new Datetime($vFechaFinBe);//Instancio Datetime
            $vFechaFinTemp->modify("+23 hour");$vFechaFinTemp->modify("+59 minutes");$vFechaFinTemp->modify("+59 seconds");//Añado tiempo para que salgan las querys
            $vFechaFinBe=$vFechaFinTemp->format('Y-m-d H:i:s');//Paso a string para el array
          }

          $vObsBe = fnSanitizarTxt($vObjBe->obsBe);

          $vQuery = "INSERT INTO ARTICULOS_SOLICITUD ( nombre_art_web, alumnos_art, obs_art, fk_id_solicitud )
                  VALUES ( '$vTitulocursowebbe', '$vAlumnosbe','$vObsBe', '$vLastId' );";

          array_push($aQueryResult,($this->attr00->link->query($vQuery)));
          $vLastIdSub = $this->attr00->link->insert_id;

          $vQuery = "INSERT INTO ARTICULOS_SOLICITUD_BE(fk_id_art, fk_id_micro, fk_id_envio_be, fecha_inicio_be, fecha_fin_be, fk_id_licencia_be)
          VALUES('$vLastIdSub','$vMicroBe','$vEnvioCentroBe', '$vFechaInicioBe','$vFechaFinBe','$vTipoLicenciaBe');";

          array_push($aQueryResult,($this->attr00->link->query($vQuery)));

          $aCodesList = ($vObjBe->titulocursobe);  // <<==  Array de componentes de un curso.


          foreach ($aCodesList as $vCode) {

              $vCode = intval($vCode);

              $vQuery = "INSERT INTO art_sol_be_libro_be
              (pk_fk_id_combinacion, pk_fk_id_curso)
              VALUES('$vLastIdSub', '$vCode');";

              array_push($aQueryResult,($this->attr00->link->query($vQuery)));

          }

        }

        $vArrayLenght = count($aQueryResult);
        foreach ($aQueryResult as $item){//Por cada TRUE me cuento una
          if ($item){
            $vIndex++;
          }
        }
        if ($vArrayLenght == $vIndex){//Si el Nº de TRUE es igual al Nº de Elementos todo ha ido OK
          $vQueryResult = TRUE;
        }
        if ($vQueryResult) {
          $vStatus=1;
          $this->attr00->link->commit();
          $this->fnPrepararMail($vLastId); //Mail de aviso a usuarios
        }
        else {
          $vStatus=0;
          $this->attr00->link->rollback();
        }
      $this->attr00->link->autocommit(true);
      $this->attr00->link->close();
          $aStatus = array(
            'resultado'=>$vStatus
          );
          echo json_encode($aStatus);
      }
  catch (exception $e){
    echo $e->getMessage();
    die();
  }
}

public function fnConsultarPeticion(){ // Consulta de datos de una solicitud (Formulario Gestión)
  $vOficina ="";
  $vNegocio ="";
  $vSpain ="";
  $aFiltros = array();
  $aFiltroFecha = array();
  $i=0;
  $aFiltrosLenght;
  $aFiltroFechaLenght;
  $key="";
  $value="";
  $filtro="";
  $vWhereFiltro="";
  $vQueryChunk="";
  $aData = array();
  $vLinea;
  $j=0;
  $vFechaFinTemp;
  $vQueryTail="GROUP BY ID_SOLICITUD ORDER BY s.id_solicitud DESC;";
      try {

       if(isset($_POST['seOficina']) && !empty($_POST['seOficina'])){
          $vOficina = fnSanitizarNum($_POST['seOficina']);
          $aFiltros += array(
            'su.id_sucursal' => $vOficina
          );
        }
       if(isset($_POST['seNegocio']) && !empty($_POST['seNegocio'])){
          $vNegocio = fnSanitizarNum($_POST['seNegocio']);
          $aFiltros += array(
            's.fk_id_area_negocio ' => $vNegocio
          );
        }
        if(isset($_POST['inSpain']) && !empty($_POST['inSpain'])){
          $vSpain = fnSanitizarNum($_POST['inSpain']);
          $aFiltros += array(
            's.spain_centro' => $vSpain
          );
        }
        if(isset($_POST['inEstado']) && !empty($_POST['inEstado'])){
          $vEstado = fnSanitizarNum($_POST['inEstado']);
          $aFiltros += array(
            's.fk_id_estado' => $vEstado
          );
        }

        if(isset($_POST['inFechaInicio']) && !empty($_POST['inFechaInicio']) && isset($_POST['inFechaFin']) && !empty($_POST['inFechaFin'])){
          $vFechaInicio = fnSanitizar01(($_POST['inFechaInicio']));
          $vFechaFin = fnSanitizar01(($_POST['inFechaFin']));
          $vFechaFinTemp = new Datetime($vFechaFin);//Instancio Datetime
          $vFechaFinTemp->modify("+23 hour");$vFechaFinTemp->modify("+59 minutes");$vFechaFinTemp->modify("+59 seconds");//Añado tiempo para que salgan las querys
          $vFechaFin=$vFechaFinTemp->format('Y-m-d H:i:s');//Paso a string para el array
          $aFiltroFecha = array('s.fecha_solicitud', $vFechaInicio, $vFechaFin);
        }

        $aFiltrosLenght = count($aFiltros);
        $aFiltroFechaLenght = count($aFiltroFecha);

        if (isset($aFiltrosLenght)){
          if (!empty($aFiltrosLenght)){

              foreach($aFiltros as $key => $value){
                $i++;
                $vWhereFiltro=$key;
                $filtro=$value;
                if($i == 1){
                  $vQueryChunk .= "WHERE $vWhereFiltro='$filtro' ";
                }else{
                  $vQueryChunk .= "AND $vWhereFiltro='$filtro' ";
                }
            }
          }
        }

        if (isset($aFiltroFechaLenght)){
          if (!empty($aFiltroFechaLenght)){
            if (!empty($aFiltrosLenght)){
              $vQueryChunk .= "AND $aFiltroFecha[0] >= '$aFiltroFecha[1]' AND $aFiltroFecha[0] <= '$aFiltroFecha[2]' ";
            }
            else{
              $vQueryChunk .= "WHERE $aFiltroFecha[0] >= '$aFiltroFecha[1]' AND $aFiltroFecha[0] <= '$aFiltroFecha[2]' ";
            }
          }
        }



        $vQuery="SELECT S.ID_SOLICITUD, S.SPAIN_CENTRO,SU.NOMBRE_SUCURSAL, S.NOMBRE_CENTRO, S.FECHA_SOLICITUD,
                  E.NOMBRE_ESTADO, S.FK_ID_AREA_NEGOCIO, S.urgente_solicitud,
                  SOL_ASIG.NOMBRE_SOL nombre_asign, SOL_ASIG.APELLIDOS_SOL apellidos_asign
                  FROM SOLICITUD AS S
                  INNER JOIN ARTICULOS_SOLICITUD AS A ON A.FK_ID_SOLICITUD = S.ID_SOLICITUD
                  INNER JOIN SOLICITANTE AS SOL ON SOL.ID_SOL = S.FK_ID_SOL
                  INNER JOIN SUCURSAL AS SU ON SU.ID_SUCURSAL = SOL.FK_ID_SUCURSAL
                  INNER JOIN ESTADO AS E ON E.ID_ESTADO = S.FK_ID_ESTADO
                  LEFT JOIN SOLICITANTE AS SOL_ASIG ON S.fk_id_sol_asign = SOL_ASIG.ID_SOL ";

        $vQuery .= $vQueryChunk;

        $vQuery .= $vQueryTail;
        $vQueryResult = $this->attr00->link->query($vQuery);

        while($vLinea = mysqli_fetch_array($vQueryResult))
        {
            $aData[$j] = $vLinea;
            $j++;
        }
        echo json_encode($aData);
        $this->attr00->link->close();
      }
      catch (exception $e){
        echo $e->getMessage();
        die();
      }
}
  public function fnMostrarCuadroDetallesSolicitud(){ // Consulta sobre los detalles de una solicitude para el Form Gestión
    $vOficina ="";
    $vNegocio ="";
    $vSpain ="";
    $aFiltros = array();
    $aFiltroFecha = array();
    $i=0;
    $aFiltrosLenght;
    $aFiltroFechaLenght;
    $key="";
    $value="";
    $filtro="";
    $vWhereFiltro="";
    $vQueryChunk="";
    $aData = array();
    $vLinea;
    $j=0;
    $vFechaFinTemp;
    //$vQueryTail="GROUP BY ID_SOLICITUD ORDER BY s.id_solicitud DESC;";
        try {

          if(isset($_POST['pFiltro'])){$vFiltro = fnSanitizarNum($_POST['pFiltro']);}
/* //Query previa, BD old, sin la asignación del técnico a la tienda
      $vQuery="SELECT S.ID_SOLICITUD, S.SPAIN_CENTRO,SU.NOMBRE_SUCURSAL, S.NOMBRE_CENTRO, S.FECHA_SOLICITUD, E.NOMBRE_ESTADO, E.id_estado, S.NUMERO_OFICIAL_CENTRO, N.NOMBRE_AREA_NEGOCIO, S.NUM_TIENDA, S.WEB_TIENDA, SOL.NOMBRE_SOL, SOL.APELLIDOS_SOL, S.OBS_SOLICITUD, S.urgente_solicitud
                  FROM SOLICITUD AS S
                  INNER JOIN ARTICULOS_SOLICITUD AS A ON A.FK_ID_SOLICITUD = S.ID_SOLICITUD
                  INNER JOIN SOLICITANTE AS SOL ON SOL.ID_SOL = S.FK_ID_SOL
                  INNER JOIN SUCURSAL AS SU ON SU.ID_SUCURSAL = SOL.FK_ID_SUCURSAL
                  INNER JOIN ESTADO AS E ON E.ID_ESTADO = S.FK_ID_ESTADO
                  INNER JOIN NEGOCIO AS N ON N.ID_AREA_NEGOCIO = S.FK_ID_AREA_NEGOCIO
                  WHERE S.ID_SOLICITUD = $vFiltro
						      GROUP BY S.ID_SOLICITUD;";
          **/

          $vQuery="SELECT S.ID_SOLICITUD, S.SPAIN_CENTRO,SU.NOMBRE_SUCURSAL, S.NOMBRE_CENTRO, S.FECHA_SOLICITUD, E.NOMBRE_ESTADO,
                          s.fk_id_sol_asign,  SOL_ASIG.NOMBRE_SOL nombre_asign,SOL_ASIG.APELLIDOS_SOL apellidos_asign,
                          E.id_estado, S.NUMERO_OFICIAL_CENTRO, N.NOMBRE_AREA_NEGOCIO, S.NUM_TIENDA, S.WEB_TIENDA, SOL.NOMBRE_SOL,
                          SOL.APELLIDOS_SOL, S.OBS_SOLICITUD, S.urgente_solicitud
                    FROM SOLICITUD AS S
                          INNER JOIN ARTICULOS_SOLICITUD AS A ON A.FK_ID_SOLICITUD = S.ID_SOLICITUD
                          INNER JOIN SOLICITANTE AS SOL ON SOL.ID_SOL = S.FK_ID_SOL
                          INNER JOIN SUCURSAL AS SU ON SU.ID_SUCURSAL = SOL.FK_ID_SUCURSAL
                          INNER JOIN ESTADO AS E ON E.ID_ESTADO = S.FK_ID_ESTADO
                          INNER JOIN NEGOCIO AS N ON N.ID_AREA_NEGOCIO = S.FK_ID_AREA_NEGOCIO
                          LEFT JOIN SOLICITANTE AS SOL_ASIG ON S.fk_id_sol_asign = SOL_ASIG.ID_SOL
                    WHERE S.ID_SOLICITUD = $vFiltro
						        GROUP BY S.ID_SOLICITUD;";


          $vQuery .= $vQueryChunk;
          $vQueryResult = $this->attr00->link->query($vQuery);

          while($vLinea = mysqli_fetch_array($vQueryResult))
          {
              $aData[$j] = $vLinea;
              $j++;
          }
          echo json_encode($aData);
          $this->attr00->link->close();
        }
        catch (exception $e){
          echo $e->getMessage();
          die();
        }
  }
  public function fnMostrarCuadroDetallesArticulos(){

    $vFiltro;
    $vQuery="";
    $vQueryResult;
    $aData = array();
    $vLinea;
    $j=0;
    $vAreaNegocioConsulta;

        try {

          if(isset($_POST['pFiltro'])){$vFiltro = fnSanitizarNum($_POST['pFiltro']);}

          $vQuery="SELECT fk_id_area_negocio
                  FROM solicitud AS S
                  WHERE id_solicitud = $vFiltro;";

          $vQueryResult = $this->attr00->link->query($vQuery);
          $vAreaNegocioConsulta = mysqli_fetch_array($vQueryResult);

          if ($vAreaNegocioConsulta[0] == 1){//Depediendo del area de negocio BB o BE los atributos especificos del articulo están en una tabla o en otra

            $vQuery="SELECT *
            FROM articulos_solicitud AS a
            INNER JOIN articulos_solicitud_bb AS a_bb ON a.id_art = a_bb.fk_id_art
            INNER JOIN solicitud AS s ON a.fk_id_solicitud = s.id_solicitud
            INNER JOIN licencia_bb AS l ON a_bb.fk_id_licencia_bb = l.id_licencia_bb
            INNER JOIN libro_bbb as li ON a_bb.fk_id_libro_bb = li.id_libro_bb
            WHERE a.fk_id_solicitud = $vFiltro
            ORDER BY a.id_art;";

          }

          else {

            $vQuery="SELECT *
            FROM articulos_solicitud AS a
            INNER JOIN articulos_solicitud_be AS a_be ON a.id_art = a_be.fk_id_art
            INNER JOIN solicitud AS s ON a.fk_id_solicitud = s.id_solicitud
            INNER JOIN microfono AS m ON a_be.fk_id_micro = m.id_micro
            INNER JOIN envio_be AS e ON a_be.fk_id_envio_be = e.id_envio_be
            INNER JOIN licencia_be AS l ON a_be.fk_id_licencia_be = l.id_licencia_be
            WHERE a.fk_id_solicitud = $vFiltro
            ORDER BY a.id_art;";

          }

          $vQueryResult = $this->attr00->link->query($vQuery);

          while($vLinea = mysqli_fetch_array($vQueryResult))
          {
              $aData[$j] = $vLinea;
              $j++;
          }
          echo json_encode($aData);
          $this->attr00->link->close();
        }
        catch (exception $e){
          echo $e->getMessage();
          die();
        }
  }

public function fnSalvarCamposEditablesFichaArticulosBB(){ // Guardar cambios sobre un articulo de BB

  $vFiltro;
  $vCdKey;
  $vIdGroup;
  $vObsBb;
  $vEan;
  $vIsbn;

  $vDto;
  $vNombreWeb;
  $vLicenciaId;

  $vQuery="";
  $aQueryResult = array();
  $vQueryResult = FALSE;
  $vArrayLenght;
  $item;
  $vIndex = 0;
  $vStatus;

  try {

    if(isset($_POST['pFiltro'])){$vFiltro = fnSanitizarNum($_POST['pFiltro']);}
    if(isset($_POST['pEan'])){$vEan = fnSanitizarNum($_POST['pEan']);}
    if(isset($_POST['pIsbn'])){$vIsbn = fnSanitizarTxt($_POST['pIsbn']);}
    if(isset($_POST['pDto'])){$vDto = fnSanitizarNumDecimal($_POST['pDto']);}
    if(isset($_POST['pNombreWeb'])){$vNombreWeb = fnSanitizarTxt($_POST['pNombreWeb']);}
    if(isset($_POST['pCdKey'])){$vCdKey = fnSanitizarNum($_POST['pCdKey']);}
    if(isset($_POST['pIdGroup'])){$vIdGroup = fnSanitizarNum($_POST['pIdGroup']);}
    if(isset($_POST['pObsBb'])){$vObsBb = fnSanitizarTxt($_POST['pObsBb']);}
    if(isset($_POST['pLicenciaId'])){$vLicenciaId = fnSanitizarNum($_POST['pLicenciaId']);}

    if (empty($vCdKey)){$vCdKey = "null";}//Si está vacio, null en string y en query var sin comillas. (Sql Strict Mode)
    if (empty($vIdGroup)){$vIdGroup = "null";}
    if (empty($vDto)){$vDto = 0;}

    $this->attr00->link->autocommit(false);

    $vQuery ="UPDATE articulos_solicitud_bb SET id_cdkey_group_bb = $vCdKey, ean_bb = '$vEan', isbn_bb = '$vIsbn', id_product_bb = $vIdGroup, dto_bb = '$vDto', fk_id_licencia_bb = $vLicenciaId WHERE fk_id_art = '$vFiltro'";
    array_push($aQueryResult,($this->attr00->link->query($vQuery)));

    $vQuery ="UPDATE articulos_solicitud SET obs_art = '$vObsBb', nombre_art_web = '$vNombreWeb' WHERE id_art = '$vFiltro'";
    array_push($aQueryResult,($this->attr00->link->query($vQuery)));

    $vArrayLenght = count($aQueryResult);
    foreach ($aQueryResult as $item){//Por cada TRUE me cuento una
      if ($item){
        $vIndex++;
      }
    }
    if ($vArrayLenght == $vIndex){//Si el Nº de TRUE es igual al Nº de Elementos todo ha ido OK
      $vQueryResult = TRUE;
    }

    if ($vQueryResult) {// Valido la transaccion
      $vStatus=1;
      $this->attr00->link->commit();
    }
    else {
      $vStatus=0;
      $this->attr00->link->rollback();
    }

    $this->attr00->link->autocommit(true); // Dejo valores de autoenvio activados para finalizar la transacción.
    $this->attr00->link->close();

      $aStatus = array(
        'resultado'=>$vStatus
      );
      echo json_encode($aStatus); //Devuelvo info con el resultado del proceso
  }
  catch (exception $e){
    echo $e->getMessage();
    die();
  }
}
public function fnSalvarCamposEditablesFichaArticulosBE(){ // Guardar cambios sobre un articulo de BE
  $vFiltro;
  $vTituloCursoWebBE;
  $vObsBe = "";
  $vAlumnosBe = 0;
  $vQuery = "";
  $vQueryResult = FALSE;
  $vStatus = false;
  $vLicenciaBe = 0;
  $aQueryResult = [];
  $vArrayLenght = 0;
  $vIndex = 0;

  try {

    if(isset($_POST['pFiltro'])){$vFiltro = fnSanitizarNum($_POST['pFiltro']);}
    if(isset($_POST['pTituloCursoWebBE'])){$vTituloCursoWebBE = fnSanitizarTxt($_POST['pTituloCursoWebBE']);}
    if(isset($_POST['pObsBe'])){$vObsBe = fnSanitizarTxt($_POST['pObsBe']);}
    if(isset($_POST['pLicenciaBe'])){$vLicenciaBe = fnSanitizarTxt($_POST['pLicenciaBe']);}
    if(isset($_POST['pAlumnosBe'])){$vAlumnosBe = fnSanitizarNum($_POST['pAlumnosBe']);}

    $this->attr00->link->autocommit(false);
    $vQuery ="UPDATE articulos_solicitud SET nombre_art_web = '$vTituloCursoWebBE', obs_art ='$vObsBe', alumnos_art = '$vAlumnosBe' WHERE id_art = '$vFiltro'";
    array_push($aQueryResult,($this->attr00->link->query($vQuery)));

    $vQuery ="UPDATE articulos_solicitud_be SET fk_id_licencia_be = '$vLicenciaBe' WHERE fk_id_art = '$vFiltro'";
    array_push($aQueryResult,($this->attr00->link->query($vQuery)));

    $vArrayLenght = count($aQueryResult);
    foreach ($aQueryResult as $item){
      if ($item){
        $vIndex++;
      }
    }
    if ($vArrayLenght == $vIndex){
      $vQueryResult = TRUE;
    }

    if ($vQueryResult) {
      $vStatus=1;
      $this->attr00->link->commit();
    }
    else {
      $vStatus=0;
      $this->attr00->link->rollback();
    }

    $this->attr00->link->autocommit(true);
    $this->attr00->link->close();

      $aStatus = array(
        'resultado'=>$vStatus
      );
      echo json_encode($aStatus);
  }
  catch (exception $e){
    echo $e->getMessage();
    die();
  }
}
public function fnSalvarCamposEditablesFichaDetallesPeticion(){ // Guardamos cambios en los detalles de una petición
  $vFiltro;
  $vWeb;
  $vNumTienda;
  $vEstado;
  $vObsGen;
  $vAsign;
  $vQuery="";
  $vQueryResult = FALSE;
  $vStatus;
  $oDataPre;
  try {
    if(isset($_POST['pFiltro'])){$vFiltro = fnSanitizarNum($_POST['pFiltro']);}
    if(isset($_POST['pWeb'])){$vWeb = fnSanitizarWeb($_POST['pWeb']);}
    if(isset($_POST['pNumTienda']) && !empty($_POST['pNumTienda'])){$vNumTienda = fnSanitizarNum($_POST['pNumTienda']);}else{$vNumTienda="null";}//Modo ESTRICTO en SQl, int no acepta void y mas... Php convierte los null en void en una sentencia sql. Hay que pasar null en string.
    if(isset($_POST['pEstado'])){$vEstado = fnSanitizarNum($_POST['pEstado']);}
    if(isset($_POST['pObsGen'])){$vObsGen = fnSanitizarTxt($_POST['pObsGen']);}

    if(isset($_POST['pAsign']) && !empty($_POST['pAsign'])){$vAsign = fnSanitizarNum($_POST['pAsign']);}else{$vAsign="null";}//Modo ESTRICTO en SQl, int no acepta void y mas... Php convierte los null en void en una sentencia sql. Hay que pasar null en string.

    $oDataPre = $this->fnConsultarDatosPeticion($vFiltro); // Guardo datos actuales de la solicitud;

    $this->attr00->link->autocommit(false);
    $vQuery ="UPDATE solicitud
              SET web_tienda = '$vWeb', num_tienda = $vNumTienda, fk_id_estado='$vEstado',  obs_solicitud = '$vObsGen', fk_id_sol_asign = $vAsign
              WHERE id_solicitud = '$vFiltro'";//Opción 2)Inline sin comillas en la var que puede ser null ???

    $vQueryResult = $this->attr00->link->query($vQuery);
    if ($vQueryResult) {
      $vStatus=1;
      $this->attr00->link->commit();
      $this->fnCheckIfSendMail($oDataPre, $vEstado, $vFiltro);//Compruebo si hace falta enviar  mail de aviso.
    }
    else {
      $vStatus=0;
      $this->attr00->link->rollback();
    }

    $this->attr00->link->autocommit(true);
    $this->attr00->link->close();

      $aStatus = array(
        'resultado'=>$vStatus
      );
      echo json_encode($aStatus);
  }
  catch (exception $e){
    echo $e->getMessage();
    die();
  }
}
public function fnAddNewArt(){ //Fn para añadir un nuevo articulo a una solicitud ya hecha. Versión básica. Sin uso.
  $vQuery;
  $aQueryResult = array();
  $vQueryResult = FALSE;
  $aStatus = array();
  $vStatus;
  $vIndex = 0;
  $vArray = array();
  $vObj = new stdclass();
  $vArrayLenght;
  $item;
  $vLastIdSub;

  $vIdSolicitud;
  $vIdNegocio;
  try{
    if(isset($_POST['pSol'])){$vIdSolicitud = fnSanitizarNum($_POST['pSol']);}
    if(isset($_POST['pIdNego'])){$vIdNegocio = fnSanitizarNum($_POST['pIdNego']);}
    if(isset($_POST['pArray'])){$vArray = json_decode($_POST['pArray']);}

    $this->attr00->link->autocommit(false);
    if ($vIdNegocio == 1){
      $vLicencia;
      $vEan;
      $vIsbn;
      $vBookCode;
      $vTitulocursobb;
      $vTitulocursowebbb;
      $vPreciosindtobb;
      $vDtobb;
      $vAlumnosbb;
      $vObsBb;

      foreach ($vArray as $vObj){
        $vLicencia = fnSanitizarNum($vObj->licencia);
        $vEan = fnSanitizarNum($vObj->ean);
        $vIsbn = fnSanitizarTxt($vObj->isbn);
        $vBookCode = fnSanitizarNum($vObj->bookcode);
        $vTitulocursowebbb = fnSanitizarTxt($vObj->titulocursowebbb);
        $vPreciosindtobb = fnSanitizarNumDecimal($vObj->preciosindtobb);
        $vDtobb = fnSanitizarNumDecimal($vObj->dtobb);
        $vAlumnosbb = fnSanitizarNum($vObj->alumnosbb);
        $vObsBb = fnSanitizarTxt($vObj->obsBb);

        $vQuery = "INSERT INTO ARTICULOS_SOLICITUD ( nombre_art_web, alumnos_art, obs_art, fk_id_solicitud)
                VALUES ( '$vTitulocursowebbb','$vAlumnosbb','$vObsBb', '$vIdSolicitud');";
        array_push($aQueryResult,($this->attr00->link->query($vQuery)));

        $vLastIdSub = $this->attr00->link->insert_id;

        $vQuery = "INSERT INTO ARTICULOS_SOLICITUD_BB ( fk_id_art, fk_id_licencia_bb, ean_bb, isbn_bb,dto_bb, fk_id_libro_bb, precio_art )
                  VALUES( '$vLastIdSub', '$vLicencia', '$vEan', '$vIsbn', '$vDtobb', '$vBookCode', '$vPreciosindtobb' );";
        array_push($aQueryResult,($this->attr00->link->query($vQuery)));
      }
    }

    else if ($vIdNegocio == 2){

      $aCodesList;
      $vTitulocursobe;
      $vTitulocursowebbe;
      $vTipoLicenciaBe;
      $vAlumnosbe;
      $vMicroBe;
      $vEnvioCentroBe;
      $vFechaInicioBe;
      $vFechaFinBe;
      $vFechaFinTemp;
      $vObsBe;
      $vCode;

      foreach ($vArray as $vObj){

        $vTitulocursowebbe = fnSanitizarTxt($vObj->titulocursowebbe);
        $vTipoLicenciaBe = fnSanitizarNum($vObj->tipolicenciabe);
        $vAlumnosbe = fnSanitizarNum($vObj->alumnosbe);
        $vMicroBe = fnSanitizarNum($vObj->microfonobe);
        $vEnvioCentroBe = fnSanitizarNum($vObj->enviocentrobe);
        $vFechaInicioBe = $vObj->fechainiciobe;
        $vFechaFinBe = $vObj->fechafinbe;

        if (empty($vObj->fechainiciobe)){$vFechaInicioBe = "0000-00-00 00:00:00";}//Si está vacio lo vuelco con el formato permitido por la conf de la BD (Restrictive mode?)
        if (empty($vObj->fechafinbe)){$vFechaFinBe = "0000-00-00 00:00:00";}

        else{
          $vFechaFinTemp = new Datetime($vFechaFinBe);//Instancio Datetime
          $vFechaFinTemp->modify("+23 hour");$vFechaFinTemp->modify("+59 minutes");$vFechaFinTemp->modify("+59 seconds");//Añado tiempo para que salgan las querys
          $vFechaFinBe=$vFechaFinTemp->format('Y-m-d H:i:s');//Paso a string para el array
        }
        $vObsBe = fnSanitizarTxt($vObj->obsBe);


        $vQuery = "INSERT INTO ARTICULOS_SOLICITUD ( nombre_art_web, alumnos_art, obs_art, fk_id_solicitud )
        VALUES ( '$vTitulocursowebbe', '$vAlumnosbe','$vObsBe', '$vIdSolicitud' );";

        array_push($aQueryResult,($this->attr00->link->query($vQuery)));

        $vLastIdSub = $this->attr00->link->insert_id;


        $vQuery = "INSERT INTO ARTICULOS_SOLICITUD_BE(fk_id_art, fk_id_micro, fk_id_envio_be, fecha_inicio_be, fecha_fin_be, fk_id_licencia_be)
        VALUES('$vLastIdSub','$vMicroBe','$vEnvioCentroBe', '$vFechaInicioBe','$vFechaFinBe','$vTipoLicenciaBe');";

        array_push($aQueryResult,($this->attr00->link->query($vQuery)));


        $aCodesList = ($vObj->titulocursobe);  // <<==  Array de componentes de un curso.


        foreach ($aCodesList as $vCode) {

            $vCode = intval($vCode);

            $vQuery = "INSERT INTO art_sol_be_libro_be
            (pk_fk_id_combinacion, pk_fk_id_curso)
            VALUES('$vLastIdSub', '$vCode');";

            array_push($aQueryResult,($this->attr00->link->query($vQuery)));

        }

      }

    }
    else{
      array_push($aQueryResult,false);
    }

    $vArrayLenght = count($aQueryResult);
    foreach ($aQueryResult as $item){
      if ($item){
        $vIndex++;
      }
    }
    if ($vArrayLenght == $vIndex){
      $vQueryResult = TRUE;
    }

    if ($vQueryResult) {
      $vStatus=1;
      $this->attr00->link->commit();
    }
    else {
      $vStatus=0;
      $this->attr00->link->rollback();
    }
    $this->attr00->link->autocommit(true);
    $this->attr00->link->close();
      $aStatus = array(
        'resultado'=>$vStatus
      );
      echo json_encode($aStatus);
  }
  catch (exception $e){
    echo $e->getMessage();
    die();
  }
}

public function fnAddNewArticulo(){//Fn para añadir artículos a solicitudes ya creadas. Versión modular.

  $vIdSolicitud = 0;
  $vIdNegocio = 0;
  $aDatos = [];
  $vCheck = 0;
  $vStatus = false;
  $vResult = 0;
  $aResult = [];

  if(isset($_POST['pSol'])){$vIdSolicitud = fnSanitizarNum($_POST['pSol']);$vCheck++;}
  if(isset($_POST['pIdNego'])){$vIdNegocio = fnSanitizarNum($_POST['pIdNego']);$vCheck++;}
  if(isset($_POST['pArray'])){$aDatos = json_decode($_POST['pArray']);$vCheck++;}

  if ( intval($vCheck) === 3 ){

    if ( +$vIdNegocio === 1 ){

      $vStatus = $this->fnAddNewArticuloBb($vIdSolicitud, $vIdNegocio, $aDatos);

    }

    else if ( +$vIdNegocio === 2 ){

      $vStatus = $this->fnAddNewArticuloBe($vIdSolicitud, $vIdNegocio, $aDatos);

    }
  }

  if ( $vStatus == true ){

    $vResult = 1;

  }

  $aResult = array(
    'resultado'=>$vResult
  );

  echo json_encode($aResult);

}

private function fnAddNewArticuloBb($pIdSolicitud, $pIdNegocio, $pDatos){

  $vQueryResult = false;
  $vStatus = false;
  $aQueryResult = [];

  if ($pIdNegocio == 1){
    $vLicencia;
    $vEan;
    $vIsbn;
    $vBookCode;
    $vTitulocursobb;
    $vTitulocursowebbb;
    $vPreciosindtobb;
    $vDtobb;
    $vAlumnosbb;
    $vObsBb;

    $this->attr00->link->autocommit(false);

    foreach ($pDatos as $vObj){
      $vLicencia = fnSanitizarNum($vObj->licencia);
      $vEan = fnSanitizarNum($vObj->ean);
      $vIsbn = fnSanitizarTxt($vObj->isbn);
      $vBookCode = fnSanitizarNum($vObj->bookcode);
      $vTitulocursowebbb = fnSanitizarTxt($vObj->titulocursowebbb);
      $vPreciosindtobb = fnSanitizarNumDecimal($vObj->preciosindtobb);

      if (empty($vObj->dtobb)) {
        $vDtobb = 0;
      } else {
        $vDtobb = fnSanitizarNumDecimal($vObj->dtobb);
      }

      $vAlumnosbb = fnSanitizarNum($vObj->alumnosbb);
      $vObsBb = fnSanitizarTxt($vObj->obsBb);


      $vQuery = "INSERT INTO ARTICULOS_SOLICITUD ( nombre_art_web, alumnos_art, obs_art, fk_id_solicitud)
              VALUES ( '$vTitulocursowebbb','$vAlumnosbb','$vObsBb', '$pIdSolicitud');";
      array_push($aQueryResult,($this->attr00->link->query($vQuery)));

      $vLastIdSub = $this->attr00->link->insert_id;

      $vQuery = "INSERT INTO ARTICULOS_SOLICITUD_BB ( fk_id_art, fk_id_licencia_bb, ean_bb, isbn_bb,dto_bb, fk_id_libro_bb, precio_art )
                VALUES( '$vLastIdSub', '$vLicencia', '$vEan', '$vIsbn', '$vDtobb', '$vBookCode', '$vPreciosindtobb' );";
      array_push($aQueryResult,($this->attr00->link->query($vQuery)));
    }
  }

  if ( $this->fnComprobarArrayResultados($aQueryResult) && ( count($aQueryResult) >= 2 ) ) { //El número minimo de insert para ser correcto es de 3
        $vStatus = true;
        $this->attr00->link->commit();
    }
    else {
        $this->attr00->link->rollback();
    }

    $this->attr00->link->autocommit(true);
    $this->attr00->link->close();

    return $vStatus;
}

private function fnAddNewArticuloBe($pIdSolicitud, $pIdNegocio, $pDatos){

  $vQueryResult = false;
  $vStatus = false;
  $aQueryResult = [];

  if ($pIdNegocio == 2){

    $aCodesList;
    $vTitulocursobe;
    $vTitulocursowebbe;
    $vTipoLicenciaBe;
    $vAlumnosbe;
    $vMicroBe;
    $vEnvioCentroBe;
    $vFechaInicioBe;
    $vFechaFinBe;
    $vFechaFinTemp;
    $vObsBe;
    $vCode;

    $this->attr00->link->autocommit(false);

    foreach ($pDatos as $vObj){

      $vTitulocursowebbe = fnSanitizarTxt($vObj->titulocursowebbe);
      $vTipoLicenciaBe = fnSanitizarNum($vObj->tipolicenciabe);
      $vAlumnosbe = fnSanitizarNum($vObj->alumnosbe);
      $vMicroBe = fnSanitizarNum($vObj->microfonobe);
      $vEnvioCentroBe = fnSanitizarNum($vObj->enviocentrobe);
      $vFechaInicioBe = $vObj->fechainiciobe;
      $vFechaFinBe = $vObj->fechafinbe;

      if (empty($vObj->fechainiciobe)){$vFechaInicioBe = "0000-00-00 00:00:00";}//Si está vacio lo vuelco con el formato permitido por la conf de la BD (Restrictive mode?)
      if (empty($vObj->fechafinbe)){$vFechaFinBe = "0000-00-00 00:00:00";}

      else{
        $vFechaFinTemp = new Datetime($vFechaFinBe);//Instancio Datetime
        $vFechaFinTemp->modify("+23 hour");$vFechaFinTemp->modify("+59 minutes");$vFechaFinTemp->modify("+59 seconds");//Añado tiempo para que salgan las querys
        $vFechaFinBe=$vFechaFinTemp->format('Y-m-d H:i:s');//Paso a string para el array
      }
      $vObsBe = fnSanitizarTxt($vObj->obsBe);


      $vQuery = "INSERT INTO ARTICULOS_SOLICITUD ( nombre_art_web, alumnos_art, obs_art, fk_id_solicitud )
      VALUES ( '$vTitulocursowebbe', '$vAlumnosbe','$vObsBe', '$pIdSolicitud' );";

      array_push($aQueryResult,($this->attr00->link->query($vQuery)));

      $vLastIdSub = $this->attr00->link->insert_id;


      $vQuery = "INSERT INTO ARTICULOS_SOLICITUD_BE(fk_id_art, fk_id_micro, fk_id_envio_be, fecha_inicio_be, fecha_fin_be, fk_id_licencia_be)
      VALUES('$vLastIdSub','$vMicroBe','$vEnvioCentroBe', '$vFechaInicioBe','$vFechaFinBe','$vTipoLicenciaBe');";

      array_push($aQueryResult,($this->attr00->link->query($vQuery)));


      $aCodesList = ($vObj->titulocursobe);  // <<==  Array de componentes de un curso.


      foreach ($aCodesList as $vCode) {

          $vCode = intval($vCode);

          $vQuery = "INSERT INTO art_sol_be_libro_be
          (pk_fk_id_combinacion, pk_fk_id_curso)
          VALUES('$vLastIdSub', '$vCode');";

          array_push($aQueryResult,($this->attr00->link->query($vQuery)));

      }

    }

  }

  if ( $this->fnComprobarArrayResultados($aQueryResult) && ( count($aQueryResult) >= 3 ) ) { //El número minimo de insert para ser correcto es de 3
    $vStatus = true;
    $this->attr00->link->commit();
  }
  else {
    $this->attr00->link->rollback();
  }

$this->attr00->link->autocommit(true);
$this->attr00->link->close();

return $vStatus;

}

public function fnEliminarArticulo(){
  $vIdSolicitud;
  $vArt;
  $vIdNegocio;
  $vQuery;
  $aQueryResult=array();
  $vQueryResult=false;
  $aStatus= array();
  $vStatus = 0;
  $vArrayLenght=array();
  $vIndex = 0;
  $vCheck = 0;
  $vCheckSol = false;
  try{
    if(isset($_POST['pIdSol']) && !empty($_POST['pIdSol'])){$vIdSolicitud = fnSanitizarNum($_POST['pIdSol']);$vCheck++;}
    if(isset($_POST['pIdArt']) && !empty($_POST['pIdArt'])){$vArt = fnSanitizarNum($_POST['pIdArt']);$vCheck++;}
    if(isset($_POST['pIdNego']) && !empty($_POST['pIdNego'])){$vIdNegocio = fnSanitizarNum($_POST['pIdNego']);$vCheck++;}
    $vCheckSol = $this->fnHayMasDeUnArticulo($vIdSolicitud); // Comprobamos si hay más de un articulo para no dejar solicitudes sin arts

    $this->attr00->link->autocommit(false);

    if ( $vCheck == 3 && ($vCheckSol) ){

        if ($vIdNegocio == 1){
        $vQuery="DELETE FROM articulos_solicitud_bb
                WHERE fk_id_art='$vArt';";
        array_push($aQueryResult,($this->attr00->link->query($vQuery)));
        }
        else if ($vIdNegocio == 2){
        $vQuery="DELETE FROM articulos_solicitud_be
                WHERE fk_id_art='$vArt';";
        array_push($aQueryResult,($this->attr00->link->query($vQuery)));
        }
        else{
        array_push($aQueryResult,false);
        }

        $vQuery="DELETE FROM articulos_solicitud
        WHERE id_art='$vArt';";
        array_push($aQueryResult,($this->attr00->link->query($vQuery)));

        $vArrayLenght = count($aQueryResult);
        foreach ($aQueryResult as $item){
            if ($item){
                $vIndex++;
            }
        }
        if ($vArrayLenght == $vIndex){
            $vQueryResult = TRUE;
        }
        if ($vQueryResult) {
            $vStatus=1;
            $this->attr00->link->commit();
        }
        else {
            $vStatus=0;
            $this->attr00->link->rollback();
        }
    }
    else {
        $vStatus=0;
    }

  $this->attr00->link->autocommit(true);
  $this->attr00->link->close();

    $aStatus = array(
      'resultado'=>$vStatus
    );

    echo json_encode($aStatus);

  }

  catch (exception $e){
    echo $e->getMessage();
    die();
  }

  unset($vIdSolicitud,$vArt,$vIdNegocio,$vQuery,$aQueryResult,$vQueryResult,$aStatus,$vStatus,$vArrayLenght,$vIndex,$vCheck);
}

  public function fnHayMasDeUnArticulo($pIdSol){ // Comprobamos si hay más de un articulo en una petición dada

    $vIdSol = 0;
    $vQueryResult;
    $vLinea;
    $aData = [];
    $vIndex = 0;
    $vCountArts = 0;
    $vResult = false;
    $vQuery = "SELECT COUNT(id_art) as n
                FROM articulos_solicitud
                WHERE fk_id_solicitud = $pIdSol";
  try {
    $vQueryResult = $this->attr00->link->query($vQuery);
  }
  catch (exception $e){
    echo $e->getMessage();
    die();
  }

  while($vLinea = mysqli_fetch_array($vQueryResult)){
      $aData[$vIndex] = $vLinea;
      $vIndex++;
  }

  $vCountArts = intval($aData[0][0]);


    if ($vCountArts > 1){

      $vResult = true;
    }

    return $vResult;
  }

public function fnCargarLicencias(){ // Query de licencias bb
  $vQuery;
  $vQueryResult;
  $vIndex = 0;
  $aData = [];
  $vLinea;
  try {
    $vQuery = "SELECT *
            FROM licencia_bb;";
    $vQueryResult = $this->attr00->link->query($vQuery);

    while($vLinea = mysqli_fetch_array($vQueryResult))
    {
        $aData[$vIndex] = $vLinea;
        $vIndex++;
    }
    echo json_encode($aData);
    $this->attr00->link->close();
  }
  catch (exception $e){
    echo $e->getMessage();
    die();
  }
  unset($vQuery,$vQueryResult,$aData,$vIndex,$vLinea);
}

public function fnCargarMicro(){ // Consulta de Tipos de Micro BE
  $vQuery;
  $vQueryResult;
  $vIndex = 0;
  $aData = [];
  $vLinea;
  try {
    $vQuery = "SELECT *
            FROM microfono;";
    $vQueryResult = $this->attr00->link->query($vQuery);

    while($vLinea = mysqli_fetch_array($vQueryResult))
    {
        $aData[$vIndex] = $vLinea;
        $vIndex++;
    }
    echo json_encode($aData);
    $this->attr00->link->close();
  }
  catch (exception $e){
    echo $e->getMessage();
    die();
  }
  unset($vQuery,$vQueryResult,$aData,$vIndex,$vLinea);
}

public function fnCargarTipoEnvioBe(){ // Query de tipos de envio BE
  $vQuery;
  $vQueryResult;
  $vIndex = 0;
  $aData = [];
  $vLinea;
  try {
    $vQuery = "SELECT *
            FROM envio_be
            ORDER BY tipo_envio_be;";
    $vQueryResult = $this->attr00->link->query($vQuery);

    while($vLinea = mysqli_fetch_array($vQueryResult))
    {
        $aData[$vIndex] = $vLinea;
        $vIndex++;
    }
    echo json_encode($aData);
    $this->attr00->link->close();
  }
  catch (exception $e){
    echo $e->getMessage();
    die();
  }
  unset($vQuery,$vQueryResult,$aData,$vIndex,$vLinea);
}

public function fnCargarNegocioAlInicio(){ // Query de tipos de negocios
  $vQuery;
  $vQueryResult;
  $vIndex = 0;
  $aData = [];
  $vLinea;
  try {
    $vQuery = "SELECT *
            FROM negocio
            ORDER BY id_area_negocio;";
    $vQueryResult = $this->attr00->link->query($vQuery);

    while($vLinea = mysqli_fetch_array($vQueryResult))
    {
        $aData[$vIndex] = $vLinea;
        $vIndex++;
    }
    echo json_encode($aData);
    $this->attr00->link->close();
  }
  catch (exception $e){
    echo $e->getMessage();
    die();
  }
  unset($vQuery,$vQueryResult,$aData,$vIndex,$vLinea);
}

public function fnCargarLicenciasBe(){ // Fn Consulta los tipos de licencias de BE
  $vQuery;
  $vQueryResult;
  $vIndex = 0;
  $aData = [];
  $vLinea;
  $vPrivacidad = 0;
  $vCheck = 0;

  if(isset($_POST['pPrivacidad']) && !empty($_POST['pPrivacidad'])){$vPrivacidad = intval(fnSanitizarNum($_POST['pPrivacidad']));$vCheck++;}

  try {

    $vQuery = "SELECT *
    FROM licencia_be l
    WHERE l.privada_licencia_be = $vPrivacidad
    ORDER BY l.id_licencia_be;";

      if ($vPrivacidad === 1 ) {
        $vQuery = "SELECT *
        FROM licencia_be l
        ORDER BY l.id_licencia_be;";
      }


    $vQueryResult = $this->attr00->link->query($vQuery);

    while($vLinea = mysqli_fetch_array($vQueryResult))
    {
        $aData[$vIndex] = $vLinea;
        $vIndex++;
    }
    echo json_encode($aData);
    $this->attr00->link->close();
  }
  catch (exception $e){
    echo $e->getMessage();
    die();
  }
  unset($vQuery,$vQueryResult,$aData,$vIndex,$vLinea);
}

  public function fnCargarCursosBeEsp(){ // Consulta con los cursos de BE de categoría Especialidad

    $vQuery;
    $vQueryResult;
    $vIndex = 0;
    $aData = [];
    $vLinea;

    try {
      $vQuery = "SELECT *
              FROM curso_be c
              INNER JOIN tipo_curso_be t ON c.fk_id_tipo_curso_be = t.id_tipo_curso_be
              WHERE (fk_id_tipo_curso_be = 2 or fk_id_tipo_curso_be = 4) AND c.activo_curso_be = 1
              ORDER BY c.nombre_curso_be;";

      $vQueryResult = $this->attr00->link->query($vQuery);

      while($vLinea = mysqli_fetch_array($vQueryResult))
      {
          $aData[$vIndex] = $vLinea;
          $vIndex++;
      }
      echo json_encode($aData);
      $this->attr00->link->close();
    }
    catch (exception $e){
      echo $e->getMessage();
      die();
    }
    unset($vQuery,$vQueryResult,$aData,$vIndex,$vLinea);
  }

  public function fnCargarCursosBeGen(){ // Consulta con los cursos de BE de categoría General

    $vQuery;
    $vQueryResult;
    $vIndex = 0;
    $aData = [];
    $vLinea;

    try {
      $vQuery = "SELECT *
              FROM curso_be c
              INNER JOIN tipo_curso_be t ON c.fk_id_tipo_curso_be = t.id_tipo_curso_be
              WHERE fk_id_tipo_curso_be = 1 AND c.activo_curso_be = 1;";

      $vQueryResult = $this->attr00->link->query($vQuery);

      while($vLinea = mysqli_fetch_array($vQueryResult))
      {
          $aData[$vIndex] = $vLinea;
          $vIndex++;
      }
      echo json_encode($aData);
      $this->attr00->link->close();
    }
    catch (exception $e){
      echo $e->getMessage();
      die();
    }
    unset($vQuery,$vQueryResult,$aData,$vIndex,$vLinea);
  }

  public function fnCargarCursosBeWordlist(){

    $vQuery;
    $vQueryResult;
    $vIndex = 0;
    $aData = [];
    $vLinea;


      $vQuery = "SELECT *
              FROM curso_be c
              INNER JOIN tipo_curso_be t ON c.fk_id_tipo_curso_be = t.id_tipo_curso_be
              WHERE fk_id_tipo_curso_be = 3 AND c.activo_curso_be = 1;";

    try {

      $vQueryResult = $this->attr00->link->query($vQuery);

    }
    catch (exception $e){
      echo $e->getMessage();
      die();
    }

    while($vLinea = mysqli_fetch_array($vQueryResult))
      {
          $aData[$vIndex] = $vLinea;
          $vIndex++;
      }

      $this->attr00->link->close();
      echo json_encode($aData);

    unset($vQuery,$vQueryResult,$aData,$vIndex,$vLinea);

  }

  public function fnPrepararMail($pId){ // Init para enviar un mail; Recopilo datos.
    $vQuery="";
    $vQueryResult="";
    $vEstado="";
    $oData = $this->fnConsultarDatosPeticion($pId);
    $aMensaje = $this->fnPrepararTextoMail($oData);
    $aDestinatarios = $this->fnPrepararDestinatarios($oData);

    if (!empty($aDestinatarios)){
      $this->fnEnviarMail($aMensaje,$aDestinatarios);
    }
  }

  public function fnConsultarDatosPeticion($pId){ // Datos de una petición según su id_peticion

    $vQuery;
    $vQueryResult;
    $oData;

    try {

      $vQuery ="SELECT *
                FROM solicitud as s
                INNER JOIN solicitante As sol ON sol.id_sol = s.fk_id_sol
                INNER JOIN estado AS e ON e.id_estado = s.fk_id_estado
                WHERE s.id_solicitud = $pId;";
      $vQueryResult = $this->attr00->link->query($vQuery);
      $oData = mysqli_fetch_object($vQueryResult);

      return $oData;

      //$this->attr00->link->close();
    }
    catch (exception $e){

      echo $e->getMessage();

      die();
    }
  }

  public function fnPrepararTextoMail($pData){ // Preparo mail con los datos de una consulta
    $oData = $pData;
    $aTextos = [];
    $vAsunto = 'Solicitud Personalizada: ' . $oData->nombre_centro . ' Solicitada por ' . $oData->nombre_sol . ' ' . $oData->apellidos_sol;
    $vMensaje ='<div><h1> ==- Detalles de la petición -== </h1><p>Solicitante: ' . $oData->nombre_sol . " " . $oData->apellidos_sol . '</p><p>Fecha: ' . $oData->fecha_solicitud . ' </p><p>ID de petición: ' . $oData->id_solicitud . '</p><p>SPAIN: ' . $oData->spain_centro . '</p><p>Centro: ' . $oData->nombre_centro . '</p><h2>Estado actual de la solicitud: ' . $oData->nombre_estado . '</h2><p>Aclaración: ' . $oData->descripcion_estado . '</p><p>Si la Dirección Web ha sido creada aparecerá a continuación</p><p><a href="' .  $oData->web_tienda . '" target="_blank">' . $oData->web_tienda . '</a></p></div>';
    array_push($aTextos,$vAsunto);
    array_push($aTextos,$vMensaje);
    return $aTextos;
  }

  public function fnPrepararDestinatarios($pData){ //Eligo los destinatarios según el Area de negocio y el estado de la solicitud
    $oData = $pData;
    $vNego = intval($oData->fk_id_area_negocio);
    $vEstado = intval($oData->fk_id_estado);
    $vMailSolicitante = $oData->mail_sol;
    $vMailBe = "mb@midominio.com";
    $vMailBeDistri = "maild@midominio.com";
    $vMailBb = "ped@midominio.com";
    //$vMailIt = "it.spain@midominio.com";
    $aMailIt = array("1@midominio.com","2@midominio.com","3@midominio.com","4@midominio.com");
    $aDestinatarios = [];

    if ($vNego === 1){ // BB

        switch ($vEstado){

          case 1: // Solicitado
            $aDestinatarios = [$vMailSolicitante, $vMailBb];
          break;

          case 2: // Aprobado
            $aDestinatarios = $aMailIt;
          break;

          case 3: // En progreso
            $aDestinatarios = [$vMailSolicitante];
          break;

          case 4: // Revisar
            $aDestinatarios = [$vMailBb];
          break;

          case 5: //Finalizado
            $aDestinatarios = array_merge([$vMailSolicitante, $vMailBb],$aMailIt);
          break;

          case 6: //Cancelado
            $aDestinatarios = array_merge([$vMailSolicitante, $vMailBb],$aMailIt);
          break;
          //default:
        }
    }

    else if ($vNego === 2){ // BE

      switch ($vEstado){

        case 1: //Solicitado
          $aDestinatarios = [$vMailSolicitante, $vMailBe];
        break;

        case 2: //Aprobado
          $aDestinatarios = [$vMailBb, $aMailIt];
        break;

        case 3: //En progreso
          $aDestinatarios = [$vMailSolicitante];
        break;

        case 4: //Revisar
          $aDestinatarios = [$vMailBe, $vMailBeDistri];
        break;

        case 5: //Finalizado
          $aDestinatarios =  array_merge([$vMailSolicitante, $vMailBe],$aMailIt);
        break;

        case 6: //Cancelado
          $aDestinatarios =  array_merge([$vMailSolicitante, $vMailBe],$aMailIt);
        break;
        //default:
      }
    }
                      // Else clause missing!!!!!
    return $aDestinatarios;

  }
public function fnCheckIfSendMail($pDataPre, $pEstado, $pId){ // Si no hay un cambio de estado no envio mail.
  $vEstadoPre=intval($pDataPre->fk_id_estado);
  $vEstadoPost=intval($pEstado);

  if ($vEstadoPre !== $vEstadoPost){
    $this->fnPrepararMail($pId); //Mail de aviso a usuarios
    $this->fnInsertFechaCambioEstado($pId, $vEstadoPost);
  }

}

public function fnEnviarMail($pM,$pD){

  $aMensaje = $pM;
  $aDestinatarios = $pD;

  require  '../config/PHPMailer5.2/class.phpmailer.php';
  require  '../config/PHPMailer5.2/class.smtp.php';

  $mail = new PHPMailer;
  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = 'mail.midominio.com;';  // Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = 'pet@midominio.com';                 // SMTP username
  $mail->Password = '***************';                           // SMTP password
  $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
  $mail->Port = 465;

  $mail->setFrom('Personalizadas@midominio.com', 'Solicitud Personalizadas');

  foreach($aDestinatarios as $vMail){
    $mail->addAddress($vMail);
  }

  $mail->setLanguage('es', '../config/PHPMailer5.2/language');
  $mail->CharSet = 'UTF-8';

  $mail->Subject = $aMensaje[0];
  $mail->Body =  $aMensaje[1];
  $mail->AltBody = $aMensaje[1]; // Mensaje sin formato que en zimbra aparece en la misma linea del mail (pero más claro) en la bandeja de entrada

  $mail->send();
}

public function fnBusquedaAuto($pKeyWord){ // Función para el plugin autocomplete de jQuery que busca los libros en el form de petición
    try{
      $sql = "SELECT *
              FROM libro_bbb
              WHERE nombre_libro_bb like '%$pKeyWord%'
              ORDER BY nombre_libro_bb;";

      $vQueryResult = $this->attr00->link->query($sql);

        $return_array = array(); //creamos un array

        while ($row = $vQueryResult->fetch_array(MYSQLI_ASSOC))
          {
              $rawdata['id_libro_bb'] = $row['id_libro_bb'];
              $rawdata['nombre_libro_bb'] = $row['nombre_libro_bb'];
              $rawdata['isbn'] = $row['isbn'];
              $rawdata['ean'] = $row['ean'];
              $rawdata['precio_bb'] = $row['precio_bb'];

             array_push($return_array, $rawdata);
          }

        echo json_encode($return_array);


      $this->attr00->link->close();
    }

    catch (exception $e){
      echo $e->getMessage();
      die();
    }

  }

    public function fnCompleteEanIsbn(){  // Sin uso

    $vIdProdAttr = 0;
    $vCheck = 0;
    $vQuery;
    $vQueryResult;
    $aData = [];
    $vLinea;
    $vIndex = 0;

    try{

      if(isset($_POST['pIdProAttr']) && !empty($_POST['pIdProAttr'])){$vIdProdAttr= fnSanitizarNum($_POST['pIdProAttr']);$vCheck++;};

      if ($vCheck === 1){
        $vQuery = "SELECT *
                    FROM libro_bbb
                    WHERE id_libro_bb = $vIdProdAttr;";

        $vQueryResult = $this->attr00->link->query($vQuery);

        while($vLinea = mysqli_fetch_array($vQueryResult))
        {
          $aData[$vIndex] = $vLinea;
          $vIndex++;
        }
      }

      echo json_encode($aData);
      $this->attr00->link->close();

    }
    catch (exception $e){
      echo $e->getMessage();
      die();
    }

  }

  public function fnComponentesCursoBe(){ // Query para ver los cursos que componen un articulo de BE

    $vIdArt = 0;
    $vCheck = 0;
    $vQuery;
    $vQueryResult;
    $aData = [];
    $vLinea;
    $vIndex = 0;

    try{

        if(isset($_POST['pIdArt']) && !empty($_POST['pIdArt'])){$vIdArt= fnSanitizarNum($_POST['pIdArt']);$vCheck++;};

        if ($vCheck === 1){

            $vQuery = "SELECT *
              FROM art_sol_be_libro_be AS a
              INNER JOIN curso_be AS c ON a.pk_fk_id_curso = c.id_curso_be
              WHERE a.pk_fk_id_combinacion = $vIdArt
              ORDER BY c.id_curso_be;";

              $vQueryResult = $this->attr00->link->query($vQuery);

              while($vLinea = mysqli_fetch_array($vQueryResult))  {
                  $aData[$vIndex] = $vLinea;
                  $vIndex++;
              }
          }

          echo json_encode($aData);
          $this->attr00->link->close();
    }

    catch (exception $e){
      echo $e->getMessage();
      die();
    }
  }

  public function fnEnviarUrl(){ // Enviar por mail la URL de una tienda

    $vIdSol = 0;
    $vUrl = "";
    $vCheck = 0;
    $vNego = 0;
    $aMensaje = [];
    $aDestinatarios = [];
    $aStatus = [];
    $vStatus = 1;

    $vMailBe = "mb@midominio.com";
    $vMailBb = "ped@midominio.com";
    $vMailIt = "i@midominio.com";
    $vMailPrueba = "";

    if(isset($_POST['pIdSol']) && !empty($_POST['pIdSol'])){$vIdSol = fnSanitizarNum($_POST['pIdSol']);$vCheck++;}
    if(isset($_POST['pUrl']) && !empty($_POST['pUrl'])){$vUrl = fnSanitizarWeb($_POST['pUrl']);$vCheck++;}

    $oData = $this->fnConsultarDatosPeticion($vIdSol);
    $vMailSolicitante = $oData->mail_sol;

    $aMensaje[0] = 'Envio de Dirección Web (URL)  personalizadas: ' . $oData->nombre_centro . ' Solicitada por ' . $oData->nombre_sol . ' ' . $oData->apellidos_sol;
    $aMensaje[1] = '<div><h1> ==- Detalles de la petición -== </h1><p>Solicitante: ' . $oData->nombre_sol . " " . $oData->apellidos_sol . '</p><p>Fecha: ' . $oData->fecha_solicitud . ' </p><p>ID de petición: ' . $oData->id_solicitud . '</p><p>SPAIN: ' . $oData->spain_centro . '</p><p>Centro: ' . $oData->nombre_centro . '</p><h2>Estado actual de la solicitud: ' . $oData->nombre_estado . '</h2><p>Aclaración: ' . $oData->descripcion_estado . '</p><p>Si la Dirección Web (URL) ha sido creada aparecerá a continuación</p><p><a href="' .  $oData->web_tienda . '" target="_blank">' . $oData->web_tienda . '</a></p></div>';

    $vNego = intval($oData->fk_id_area_negocio);

    if ($vNego === 1){ // BB
      $aDestinatarios = [$vMailBb, $vMailSolicitante];
    }

    else if ($vNego === 2){ // BE
      $aDestinatarios = [$vMailBe, $vMailSolicitante];
    }

    else { // fail
      $aDestinatarios = [$vMailIt];
    }

    $this->fnEnviarMail($aMensaje,$aDestinatarios);

      // Habría que comprobar si el mail ha sido enviado correctamente

    $aStatus = array(
      'resultado'=>$vStatus
    );

    echo json_encode($aStatus);

  }

  public function fnInsertFechaCambioEstado($pId, $pIdEstado){

      $vQueryResult;
      $vQuery = "INSERT INTO cambioestado
                  (fk_id_solicitud, fk_id_estado, fecha_cambioestado)
                  VALUES ($pId, $pIdEstado, NOW() );";

      try {
        //$this->attr00->link->autocommit(false);

        $vQueryResult = $this->attr00->link->query($vQuery);

      }

      catch (exception $e){
        echo $e->getMessage();
        die();
      }

      finally {
        //$this->attr00->link->autocommit(true);
        //$this->attr00->link->close();
      }

  }

  public function fnSincroBd(){ // Lanzamos las varias sincronizaciones // Sin uso

    $this->fnSincroTablaLibros();
    $this->fnSincroBdTablaColegio();

  }

public function fnSincroTablaLibros(){ //Sincronizamos los precios

  $vRemoteHost = "1.1.1.1";
  $vRemoteUser = "usuarioparaconectaraBDremota";
  $vRemotePass = "escogemos un password";
  $vRemoteBd = "basededatosremota";
  $vRemotePort = "1111";

  $vQueryEshop = "";
  $vQueryEshopResult;
  $vQueryUpdate = "";
  $vQueryCheckExist = "";
  $vQueryInsert = "";
  $vFila;

  $vReference = "";
  $vPvpSinIva = "";
  $vPvp = "";
  $vTitle = "";
  $vIdProduct = "";
  $vIdProductAttribute = "";
  $vEan = "";
  $vType = "";

  $vQueryUpdateResult;
  $vQueryCheckExistResult;
  $vQueryInsertResult;
  $vLastQueryAffectedRows = 0;

  $aStatus= array();
  $vStatus = 0;

  try {

    $cEshopBd = new mysqli($vRemoteHost, $vRemoteUser, $vRemotePass, $vRemoteBd, $vRemotePort);
    $cEshopBd->query( "SET NAMES 'utf8'");

  } catch (\mysqli_sql_exception $e) {

    throw new \mysqli_sql_exception($e->getMessage(), $e->getCode());

  }


    if ($cEshopBd->connect_error) {

          echo " -- ERROR conexión --  ";
          die(" Ha fallado la conexión: ");

    } else {

          $vQueryEshop = "   ";


          $vQueryEshopResult = $cEshopBd->query($vQueryEshop);


          while ($vFila = $vQueryEshopResult->fetch_array(MYSQLI_ASSOC)) {

                $vReference = $vFila['1'];
                $vPvpSinIva = $vFila['2'];
                $vPvp = $vFila['3'];
                $vTitle = $this->attr00->link->real_escape_string(trim($vFila['4']));
                $vIdProduct = $vFila['5'];
                $vIdProductAttribute = $vFila['6'];
                $vEan = $vFila['7'];
                $vType = $vFila['8'];


                $vQueryCheckExist = "SELECT l.isbn
                                    FROM libro_bbb l
                                    WHERE l.isbn = '$vReference'";

                $vQueryCheckExistResult = $this->attr00->link->query($vQueryCheckExist);

                $vLastQueryAffectedRows = mysqli_affected_rows($this->attr00->link);
                $vLastQueryAffectedRows = $this->attr00->link->affected_rows;

                if( $vLastQueryAffectedRows >= 1 ){

                    $vQueryUpdate = "UPDATE libro_bbb l
                                  SET l.precio_bb = '$vPvp'
                                  WHERE l.isbn = '$vReference';";

                    $vQueryUpdateResult = $this->attr00->link->query($vQueryUpdate);

                }else{

                  $vQueryInsert = "INSERT INTO libro_bbb
                                  (nombre_libro_bb, precio_bb,id_product,id_product_attribute,isbn,ean,TYPE)
                                  VALUES('$vTitle','$vPvp','$vIdProduct','$vIdProductAttribute','$vReference','$vEan','$vType');";


                  $vQueryInsertResult = $this->attr00->link->query($vQueryInsert);

                }


                $vReference = "";
                $vPvp = "";

                $vQueryCheckExist = "";
                $vQueryCheckExistResult = "";
                $vQueryUpdate = "";
                $vQueryUpdateResult = "";
                $vQueryInsert = "";
                $vQueryInsertResult = "";
                $vLastQueryAffectedRows = 0;

          }

          $cEshopBd->close(); //Me cierra todas las conexiones y me borra variables en el debug
          $this->attr00->link->close();

          $vStatus = 1;

          $aStatus = array(
            'resultado'=>$vStatus
          );

          echo json_encode($aStatus);

    }

}


public function fnSincroBdTablaColegio(){

  $vRemoteHost = "1.1.1.1";
  $vRemoteUser = "usuarioparaconectaraBDremota";
  $vRemotePass = "escogemos un password";
  $vRemoteBd = "basededatosremota";
  $vRemotePort = "1111";

  $vQueryEshop = "";
  $vQueryEshopResult;
  $vQueryUpdate = "";
  $vQueryCheckExist = "";
  $vQueryInsert = "";
  $vFila;

  $vId = 0;
  $vSpainId = 0;
  $vSchoolName = "";
  $vPostalCode = "";
  $vOfficialNumber = "";
  $vIdShop = 0;
  $vBranch = "";

  $vQueryUpdateResult;
  $vQueryCheckExistResult;
  $vQueryInsertResult;
  $vLastQueryAffectedRows = 0;

  $aStatus= array();
  $vStatus = 0;

  $vIndexUpdates = 0;
  $vIndexCreate = 0;
  $vIndexFinal = 0;
  $vQueryInsertResultFalses = false;
  $vQueryInsertResultFalsesCount = 0;
  $vQueryUpdateResultFalses = false;
  $vQueryUpdateResultFalsesCount = 0;

  try {

    $cEshopBd = new mysqli($vRemoteHost, $vRemoteUser, $vRemotePass, $vRemoteBd, $vRemotePort);
    $cEshopBd->query( "SET NAMES 'utf8'");

  } catch (\mysqli_sql_exception $e) {

    throw new \mysqli_sql_exception($e->getMessage(), $e->getCode());

  }


    if ($cEshopBd->connect_error) {

          echo " -- ERROR conexión --  ";
          die(" Ha fallado la conexión: ");

    } else {

          //echo " == Conectado correctamente == ";

          $vQueryEshop = " ";

          $vQueryEshopResult = $cEshopBd->query($vQueryEshop);


          while ($vFila = $vQueryEshopResult->fetch_array(MYSQLI_ASSOC)) {

                $vId = $vFila['1'];
                $vSpainId = $vFila['2'];
                $vSchoolName = $this->attr00->link->real_escape_string(trim($vFila['3'])); //Problema con los apostrofes
                $vPostalCode = $vFila['4'];
                $vOfficialNumber = $vFila['5'];
                $vIdShop = $vFila['6'];
                $vBranch = $vFila['7'];


                $vQueryCheckExist = "SELECT c.id_colegio
                                    FROM colegio c
                                    WHERE c.id_colegio = '$vId';";

                $vQueryCheckExistResult = $this->attr00->link->query($vQueryCheckExist);

                $vLastQueryAffectedRows = mysqli_affected_rows($this->attr00->link);
                $vLastQueryAffectedRows = $this->attr00->link->affected_rows;

                if( $vLastQueryAffectedRows >= 1 ){

                  $vIndexUpdates++;

                    $vQueryUpdate = "UPDATE colegio c
                                    SET c.branch = '$vBranch'
                                    WHERE c.id_colegio = '$vId';";

                    $vQueryUpdateResult = $this->attr00->link->query($vQueryUpdate);

                    if (!$vQueryUpdateResult){

                      $vQueryUpdateResultFalsesCount++;

                    }

                }else{
                  $vIndexCreate++;

                  $vQueryInsert = "INSERT INTO colegio
                                  (id_colegio, spain_colegio, n_colegio, cp_colegio, num_ofi_colegio, id_shop, branch)
                                  VALUES('$vId','$vSpainId','$vSchoolName','$vPostalCode','$vOfficialNumber','$vIdShop','$vBranch');";


                  $vQueryInsertResult = $this->attr00->link->query($vQueryInsert);

                  if (!$vQueryInsertResult){

                    $vQueryInsertResultFalsesCount++;

                  }

                }


                $vIndexFinal++;

                $vQueryCheckExist = "";
                $vQueryCheckExistResult = "";
                $vQueryUpdate = "";
                $vQueryUpdateResult = "";
                $vQueryInsert = "";
                $vQueryInsertResult = "";
                $vLastQueryAffectedRows = 0;

          }


            // Si es mayor que 0 es que alguna update ha fallado
          if ( $vQueryInsertResultFalsesCount == 0){
              $vQueryInsertResultFalses = true;
            }
          // Si es mayor que 0 es que alguna insert ha fallado
          if ( $vQueryUpdateResultFalsesCount == 0){
              $vQueryUpdateResultFalses = true;
            }

          if ($vQueryInsertResultFalses + $vQueryUpdateResultFalses){

            $vStatus = 1;

          }


          $aStatus = array(
            'resultado'=>$vStatus
          );

          $cEshopBd->close(); //Me cierra todas las conexiones y me borra variables en el debug
          $this->attr00->link->close();
          echo json_encode($aStatus);

    }

}

  public function fnBuscarPorSpain(){

    $vSpain = null;
    $vCheck = 0;
    $vQuery = "";
    $vQueryResult = false;
    $vLinea = null;
    $aData = [];
    $vIndex = 0;

    if(isset($_POST['pSpain']) && !empty($_POST['pSpain'])){$vSpain= fnSanitizarNum($_POST['pSpain']);$vCheck++;};

    if ($vCheck === 1){

      $vQuery = "SELECT *
                FROM colegio c
                WHERE c.spain_colegio = $vSpain;";

          try {

              $vQueryResult = $this->attr00->link->query($vQuery);

          } catch (\Throwable $th) {
              echo $e->getMessage();
              die();
          }

          while($vLinea = mysqli_fetch_array($vQueryResult))
              {
                $aData[$vIndex] = $vLinea;
                $vIndex++;
              }

    }

      $this->attr00->link->close();
      echo json_encode($aData);


  }

  public function fnMarcarUrgenciaPeticion(){

    $vIdPeticion = 0;
    $vUrgente = 0;
    $vCheck = 0;
    $vQuery = "";
    $vQueryResult = false;
    $vStatus = 0;
    $aStatus = [];

    if(isset($_POST['pUrgente']) && !empty($_POST['pUrgente'])){$vUrgente= fnSanitizarNum($_POST['pUrgente']);$vCheck++;};
    if(isset($_POST['pIdPeticion']) && !empty($_POST['pIdPeticion'])){$vIdPeticion= fnSanitizarNum($_POST['pIdPeticion']);$vCheck++;};

    if ($vCheck >= 1){

      $vQuery = "UPDATE solicitud
                  SET urgente_solicitud = '$vUrgente'
                  WHERE id_solicitud = $vIdPeticion;";

          try {
              $this->attr00->link->autocommit(false);
              $vQueryResult = $this->attr00->link->query($vQuery);

          } catch (\Throwable $th) {
              echo $e->getMessage();
              die();
          }

          if ($vQueryResult) {// Valido la transaccion
              $vStatus=1;
              $this->attr00->link->commit();
          }
          else {
              $vStatus=0;
              $this->attr00->link->rollback();
          }

          $this->attr00->link->autocommit(true); // Dejo valores de autoenvio activados para finalizar la transacción.
          $this->attr00->link->close();


    }

      $aStatus = array(
        'resultado'=>$vStatus
      );
      echo json_encode($aStatus);

  }

  public function fnConsultarRegistroCambios(){

    $vIdSol = 0;
    $vCheck = 0;
    $vQuery = "";
    $vQueryResult = 0;
    $vIndex = 0;
    $aData = [];
    $vLinea;
    $vCapCom;

    if(isset($_POST['pIdSol']) && !empty($_POST['pIdSol'])){$vIdSol= fnSanitizarNum($_POST['pIdSol']);$vCheck++;};


    if ($vCheck == 1){

       $vQuery = "SELECT s.id_solicitud, s.registro_solicitud
                  FROM solicitud s
                  WHERE s.id_solicitud = ?;";

          try {

                 $vCapCom = $this->attr00->link->prepare($vQuery);

                 if ($vCapCom){ // Si hubiera un error en ->prepare devolveria false

                    $vCapCom->bind_param("i",$vIdSol); // i de interger
                    $vCapCom->execute();
                    $vQueryResult = $vCapCom->get_result();
                    $vCapCom->close();
                 }

          } catch (\Throwable $e) {
              echo $e->getMessage();
              die();
          }


          while($vLinea = mysqli_fetch_array($vQueryResult))
          {
              $aData[$vIndex] = $vLinea;
              $vIndex++;
          }


          $this->attr00->link->close();

    }

    echo json_encode($aData);

  }

  public function fnSalvarRegistroPeticion(){

    $vIdSol = 0;
    $vRegistroCambios = "";
    $vCheck = 0;
    $vQuery = "";
    $vQueryResult = false;
    $aStatus = [];
    $vStatus = 2; // Valor 2, el js devolvería otro tipo de mensaje.
    $vCapCom = null;

    if(isset($_POST['pIdSol']) && !empty($_POST['pIdSol'])){$vIdSol= fnSanitizarNum($_POST['pIdSol']);$vCheck++;};
    if(isset($_POST['pRegistroCambios'])){$vRegistroCambios= fnSanitizarTxt($_POST['pRegistroCambios']);$vCheck++;};


    if ($vCheck == 2){

      $vStatus = 0; // reseteamos resultado de la query

        $vQuery="UPDATE solicitud
                 SET registro_solicitud = ?
                 WHERE id_solicitud = ?;";

        try {

          $this->attr00->link->autocommit(false);

          $vCapCom = $this->attr00->link->prepare($vQuery);

          if ($vCapCom){

              $vCapCom->bind_param("si", $vRegistroCambios, $vIdSol);
              $vQueryResult = $vCapCom->execute();
              $vCapCom->close();

          }

        } catch (\Throwable $e) {
          echo $e->getMessage();
          die();
        }

        if ($vQueryResult) {
          $vStatus=1;
          $this->attr00->link->commit();
        }
        else {
            $vStatus=0;
            $this->attr00->link->rollback();
        }

        $this->attr00->link->autocommit(true);
        $this->attr00->link->close();

    }

    $aStatus = array(
        'resultado'=>$vStatus
      );

    echo json_encode($aStatus);

  }

  public function fnDuplicarPeticion(){

    $vIdSol;
    $vIdNegocio ;
    $vCheck = 0;
    $aDatos = [];
    $aDatosArtsAdded = [];
    $vStatus = 2;
    $aStatus = [];


    if(isset($_POST['pIdSolicitud']) && !empty($_POST['pIdSolicitud'])){$vIdSol= fnSanitizarNum($_POST['pIdSolicitud']);$vCheck++;};
    if(isset($_POST['pIdNegocio']) && !empty($_POST['pIdNegocio'])){$vIdNegocio= fnSanitizarNum($_POST['pIdNegocio']);$vCheck++;};
    if(isset($_POST['pDatos'])){$aDatos= json_decode($_POST['pDatos']);$vCheck++;};
    if(isset($_POST['pDatosArtsAdded'])){$aDatosArtsAdded= json_decode($_POST['pDatosArtsAdded']);};


    if ( intval($vCheck) === 3 ){

      if ( intval($vIdNegocio) === 1 ){

        $vStatus = $this->fnDuplicarPeticionBb($vIdSol, $vIdNegocio, $aDatos, $aDatosArtsAdded);

      }
      else if ( intval($vIdNegocio) === 2 ){

        $vStatus = $this->fnDuplicarPeticionBe($vIdSol, $vIdNegocio, $aDatos, $aDatosArtsAdded);

      }

  }

  $aStatus = array(
    'resultado'=>$vStatus
  );

  echo json_encode($aStatus);


  }

  private function fnDuplicarPeticionBb($pIdSol, $pIdNegocio, $pDatos, $pDatosArtsAdded){

    $aQueryResult = [];
    $vQueryResult = false;
    $vCapCom = null;
    $vStatus = 0;
    $vIndex = 0;
    $vArrayLenght = 0;
    $item;
    $vQuery = "";
    $vLastId = 0;
    $vObs = "";

    $vResultQuerySolicitud = $this->fnDameDatosSolicitud($pIdSol);

    try {

      $this->attr00->link->autocommit(false);

      $vQuery = "INSERT INTO SOLICITUD (spain_centro, fecha_solicitud, nombre_centro, numero_oficial_centro, fk_id_sol, fk_id_estado, fk_id_area_negocio, obs_solicitud)
      VALUES (?,NOW(),?,?,?,'1','1',?);";


      $vCapCom = $this->attr00->link->prepare($vQuery);

      if ($vCapCom){

        $vNombreCentro = $this->attr00->link->real_escape_string(trim($vResultQuerySolicitud['nombre_centro']));

        $vCapCom->bind_param("isiis", $vResultQuerySolicitud['spain_centro'], $vNombreCentro, $vResultQuerySolicitud['numero_oficial_centro'],$vResultQuerySolicitud['fk_id_sol'], $vObs);
          $vQueryResult = $vCapCom->execute();
          array_push($aQueryResult,$vQueryResult);
          $vLastId = $this->attr00->link->insert_id;



          if ($vQueryResult){

            $vQueryArt = "INSERT INTO ARTICULOS_SOLICITUD ( nombre_art_web, alumnos_art, fk_id_solicitud, obs_art )
            VALUES ( ?,?,?,? );";


            $vQueryArtBb = "INSERT INTO ARTICULOS_SOLICITUD_BB ( fk_id_art, fk_id_licencia_bb, ean_bb, isbn_bb, dto_bb, fk_id_libro_bb, precio_art )
            VALUES ( ?,?,?,?,?,?,? );";


            foreach ($pDatos as $oArt){

              $vIdArt = fnSanitizarNum($oArt->idArt);
              $vAlumnosbb = fnSanitizarNum($oArt->alums);
              $vTitulocursowebbb = fnSanitizarTxt($oArt->nombreArtWeb);
              $vObs = fnSanitizarTxt($oArt->obs);
              $vBorrar = filter_var(($oArt->borrar), FILTER_VALIDATE_BOOLEAN);

              if (empty($oArt->dto)) {
                $vDtobb = 0;
              } else {
                $vDtobb = fnSanitizarNumDecimal($oArt->dto);
              }

              if (!$vBorrar){

                $aResultQueryArtSol = $this->fnDameDatosArticulosSolicitud($vIdArt);
                $aResultQueryArtSolBb = $this->fnDameDatosArticulosSolicitudBb($vIdArt);
                $aResultQueryLibroBb = $this->fnDameDatosLibrosBb($aResultQueryArtSolBb['fk_id_libro_bb']);

                $vCapCom1 = $this->attr00->link->prepare($vQueryArt);

                  if ($vCapCom1){
                    $vCapCom1->bind_param("siis", $vTitulocursowebbb, $vAlumnosbb, $vLastId, $vObs);
                    $vQueryResult = $vCapCom1->execute();
                    array_push($aQueryResult,$vQueryResult);
                    $vLastIdSub = $this->attr00->link->insert_id;

                  }

                  if ($vQueryResult){

                      $vCapCom2 = $this->attr00->link->prepare($vQueryArtBb);

                      if ($vCapCom2){
                        $vCapCom2->bind_param("iissdid", $vLastIdSub, $aResultQueryArtSolBb['fk_id_licencia_bb'], $aResultQueryLibroBb['ean'], $aResultQueryLibroBb['isbn'], $vDtobb, $aResultQueryArtSolBb['fk_id_libro_bb'], $aResultQueryLibroBb['precio_bb']);
                        $vQueryResult = $vCapCom2->execute();
                        array_push($aQueryResult,$vQueryResult);

                      }
                  }
              }
            }
          }


          if( ($vQueryResult) && (count( $pDatosArtsAdded ) > 0 ) ){

            $vLicencia;
            $vEan;
            $vIsbn;
            $vBookCode;
            $vTitulocursobb;
            $vTitulocursowebbb;
            $vPreciosindtobb;
            $vDtobb;
            $vAlumnosbb;
            $vObsBb;

           foreach ($pDatosArtsAdded as $vObj){
              $vLicencia = fnSanitizarNum($vObj->licencia);
              $vEan = fnSanitizarNum($vObj->ean);
              $vIsbn = fnSanitizarTxt($vObj->isbn);
              $vBookCode = fnSanitizarNum($vObj->bookcode);
              $vTitulocursowebbb = fnSanitizarTxt($vObj->titulocursowebbb);
              $vPreciosindtobb = fnSanitizarNumDecimal($vObj->preciosindtobb);

              if (empty($vObj->dtobb)) {
                $vDtobb = 0;
              } else {
                $vDtobb = fnSanitizarNumDecimal($vObj->dtobb);
              }

              $vAlumnosbb = fnSanitizarNum($vObj->alumnosbb);
              $vObsBb = fnSanitizarTxt($vObj->obsBb);


              $vQuery = "INSERT INTO ARTICULOS_SOLICITUD ( nombre_art_web, alumnos_art, obs_art, fk_id_solicitud)
                      VALUES ( '$vTitulocursowebbb','$vAlumnosbb','$vObsBb', '$vLastId');";
              array_push($aQueryResult,($this->attr00->link->query($vQuery)));

              $vLastIdSub = $this->attr00->link->insert_id;

              $vQuery = "INSERT INTO ARTICULOS_SOLICITUD_BB ( fk_id_art, fk_id_licencia_bb, ean_bb, isbn_bb,dto_bb, fk_id_libro_bb, precio_art )
                        VALUES( '$vLastIdSub', '$vLicencia', '$vEan', '$vIsbn', '$vDtobb', '$vBookCode', '$vPreciosindtobb' );";
              array_push($aQueryResult,($this->attr00->link->query($vQuery)));
            }

          }

      }

    } catch (\Throwable $e) {
      echo $e->getMessage();
      die();
    }



    if ( $this->fnComprobarArrayResultados($aQueryResult) && ( count($aQueryResult) >= 3 ) ) { //El número minimo de insert para ser correcto es de 3
      $vStatus=1;
      $this->attr00->link->commit();
      $this->fnPrepararMail($vLastId);
    }
    else {
        $this->attr00->link->rollback();
    }

    $this->attr00->link->autocommit(true);
    $this->attr00->link->close();

    return $vStatus;

  }

  private function fnDuplicarPeticionBe($pIdSol, $pIdNegocio, $pDatos, $pDatosArtsAdded){

    $aQueryResult = [];
    $vQueryResult = false;
    $vCapCom = null;
    $vStatus = 0;
    $vIndex = 0;
    $vArrayLenght = 0;
    $item;
    $vQuery = "";
    $vLastId = 0;
    $vObs = "";
    $vResultQuerySolicitud = $this->fnDameDatosSolicitud($pIdSol);

    try {

      $this->attr00->link->autocommit(false);

      $vQuery = "INSERT INTO SOLICITUD (spain_centro, fecha_solicitud, nombre_centro, numero_oficial_centro, fk_id_sol, fk_id_estado, fk_id_area_negocio, obs_solicitud)
      VALUES (?,NOW(),?,?,?,'1','2', ?);";

      $vCapCom = $this->attr00->link->prepare($vQuery);

      if ($vCapCom){
        $vNombreCentro = $this->attr00->link->real_escape_string(trim($vResultQuerySolicitud['nombre_centro']));
        $vCapCom->bind_param("isiis", $vResultQuerySolicitud['spain_centro'], $vNombreCentro, $vResultQuerySolicitud['numero_oficial_centro'],$vResultQuerySolicitud['fk_id_sol'], $vObs);
        $vQueryResult = $vCapCom->execute();
        array_push($aQueryResult,$vQueryResult);
        $vLastId = $this->attr00->link->insert_id;


        if ($vQueryResult){

          $vQueryArt = "INSERT INTO ARTICULOS_SOLICITUD
          ( nombre_art_web, alumnos_art, fk_id_solicitud, obs_art )
            VALUES ( ?,?,?,? );";

          $vQueryArtBe = "INSERT INTO ARTICULOS_SOLICITUD_BE
          (fk_id_art, fk_id_micro, fk_id_envio_be, fecha_inicio_be, fecha_fin_be, fk_id_licencia_be)
          VALUES( ?,?,?,?,?,? );";

          $vQueryArtBeCombinaciones = "INSERT INTO art_sol_be_libro_be
              (pk_fk_id_combinacion, pk_fk_id_curso)
              VALUES( ?, ? );";

          foreach ($pDatos as $oArt){
            $vIdArt = fnSanitizarNum($oArt->idArt);
            $vAlumnosbb = fnSanitizarNum($oArt->alums);
            $vTitulocursowebbb = fnSanitizarTxt($oArt->nombreArtWeb);
            $vFechaBe = "0000-00-00 00:00:00";
            $vBorrar = filter_var(($oArt->borrar), FILTER_VALIDATE_BOOLEAN);

            if (!$vBorrar){

              $aResultQueryArtSolBe = $this->fnDameDatosArticulosSolicitudBe($vIdArt);
              $aResultQueryArtSolBeLibroBe = $this->fnDameDatosArticulosCombinacionBe($vIdArt);

              $vCapCom1 = $this->attr00->link->prepare($vQueryArt);

              if ($vCapCom1){
                $vCapCom1->bind_param("siis", $vTitulocursowebbb, $vAlumnosbb, $vLastId, $vObs);
                $vQueryResult = $vCapCom1->execute();
                array_push($aQueryResult,$vQueryResult);
                $vLastIdSub = $this->attr00->link->insert_id;

              }

              if ($vQueryResult){

                $vCapCom2 = $this->attr00->link->prepare($vQueryArtBe);

                if ($vCapCom2){
                  $vCapCom2->bind_param("iiissi", $vLastIdSub, $aResultQueryArtSolBe['fk_id_micro'], $aResultQueryArtSolBe['fk_id_envio_be'], $vFechaBe, $vFechaBe, $aResultQueryArtSolBe['fk_id_licencia_be']);
                  $vQueryResult = $vCapCom2->execute();
                  array_push($aQueryResult,$vQueryResult);

                }

                if ($vQueryResult){

                  while ($vFila = $aResultQueryArtSolBeLibroBe->fetch_array(MYSQLI_ASSOC)) {

                    $vCapCom3 = $this->attr00->link->prepare($vQueryArtBeCombinaciones);

                    if ($vCapCom3){

                      $vCapCom3->bind_param("ii", $vLastIdSub, $vFila['pk_fk_id_curso']);
                      $vQueryResult = $vCapCom3->execute();
                      array_push($aQueryResult,$vQueryResult);

                    }

                  }
                }
              }
            }
          }
        }

        if( ($vQueryResult) && (count( $pDatosArtsAdded ) > 0 ) ){

          $aCodesList;
          $vTitulocursobe;
          $vTitulocursowebbe;
          $vTipoLicenciaBe;
          $vAlumnosbe;
          $vMicroBe;
          $vEnvioCentroBe;
          $vFechaInicioBe;
          $vFechaFinBe;
          $vFechaFinTemp;
          $vObsBe;
          $vCode;

          foreach ($pDatosArtsAdded as $vObj){

            $vTitulocursowebbe = fnSanitizarTxt($vObj->titulocursowebbe);
            $vTipoLicenciaBe = fnSanitizarNum($vObj->tipolicenciabe);
            $vAlumnosbe = fnSanitizarNum($vObj->alumnosbe);
            $vMicroBe = fnSanitizarNum($vObj->microfonobe);
            $vEnvioCentroBe = fnSanitizarNum($vObj->enviocentrobe);
            $vFechaInicioBe = $vObj->fechainiciobe;
            $vFechaFinBe = $vObj->fechafinbe;

            if (empty($vObj->fechainiciobe)){$vFechaInicioBe = "0000-00-00 00:00:00";}//Si está vacio lo vuelco con el formato permitido por la conf de la BD (Restrictive mode?)
            if (empty($vObj->fechafinbe)){$vFechaFinBe = "0000-00-00 00:00:00";}

            else{
              $vFechaFinTemp = new Datetime($vFechaFinBe);//Instancio Datetime
              $vFechaFinTemp->modify("+23 hour");$vFechaFinTemp->modify("+59 minutes");$vFechaFinTemp->modify("+59 seconds");//Añado tiempo para que salgan las querys
              $vFechaFinBe=$vFechaFinTemp->format('Y-m-d H:i:s');//Paso a string para el array
            }
            $vObsBe = fnSanitizarTxt($vObj->obsBe);


            $vQuery = "INSERT INTO ARTICULOS_SOLICITUD ( nombre_art_web, alumnos_art, obs_art, fk_id_solicitud )
            VALUES ( '$vTitulocursowebbe', '$vAlumnosbe','$vObsBe', '$vLastId' );";

            array_push($aQueryResult,($this->attr00->link->query($vQuery)));

            $vLastIdSub = $this->attr00->link->insert_id;


            $vQuery = "INSERT INTO ARTICULOS_SOLICITUD_BE(fk_id_art, fk_id_micro, fk_id_envio_be, fecha_inicio_be, fecha_fin_be, fk_id_licencia_be)
            VALUES('$vLastIdSub','$vMicroBe','$vEnvioCentroBe', '$vFechaInicioBe','$vFechaFinBe','$vTipoLicenciaBe');";

            array_push($aQueryResult,($this->attr00->link->query($vQuery)));


            $aCodesList = ($vObj->titulocursobe);  // <<==  Array de componentes de un curso.


            foreach ($aCodesList as $vCode) {

                $vCode = intval($vCode);

                $vQuery = "INSERT INTO art_sol_be_libro_be
                (pk_fk_id_combinacion, pk_fk_id_curso)
                VALUES('$vLastIdSub', '$vCode');";

                array_push($aQueryResult,($this->attr00->link->query($vQuery)));

            }
          }
        }
      }

    }catch (\Throwable $e) {
      echo $e->getMessage();
      die();
    }


    if ( $this->fnComprobarArrayResultados($aQueryResult) && ( count($aQueryResult) >= 4 ) ) { //El número minimo de insert para ser correcto es de 3
      $vStatus=1;
      $this->attr00->link->commit();
      $this->fnPrepararMail($vLastId);
    }
    else {
        $this->attr00->link->rollback();
    }

    $this->attr00->link->autocommit(true);
    $this->attr00->link->close();

    return $vStatus;

}

  private function fnDameDatosSolicitud($pIdSol){

    $aDatos = [];
    $vQueryResult;
    $vQuery = "SELECT s.*
    FROM solicitud s
    WHERE s.id_solicitud = ?;";
    $vResult = null;

    try {

      $vCapCom = $this->attr00->link->prepare($vQuery);

      if ($vCapCom){

          $vCapCom->bind_param("i", $pIdSol);
          $vCapCom->execute();
          $vQueryResult = $vCapCom->get_result();
          $vCapCom->close();
          $vResult = $vQueryResult->fetch_array(MYSQLI_ASSOC);
      }

    } catch (\Throwable $e ) {
      echo $e->getMessage();
      die();
    }

    return $vResult;

  }


  private function fnDameDatosArticulosSolicitud($pIdArt){

    $aDatos = [];
    $vQueryResult;
    $vQuery = "SELECT a.*
    FROM articulos_solicitud a
    WHERE a.id_art = ?;";
    $vResult = null;

    try {

      $vCapCom = $this->attr00->link->prepare($vQuery);

      if ($vCapCom){

          $vCapCom->bind_param("i", $pIdArt);
          $vCapCom->execute();
          $vQueryResult = $vCapCom->get_result();
          $vCapCom->close();
          $vResult = $vQueryResult->fetch_array(MYSQLI_ASSOC);
      }

    } catch (\Throwable $e) {
      echo $e->getMessage();
      die();
    }

    return $vResult;

  }

  private function fnDameDatosArticulosSolicitudBb($pIdArt){

    $aDatos = [];
    $vQueryResult;
    $vQuery = "SELECT a.*
    FROM articulos_solicitud_bb a
    WHERE a.fk_id_art = ?;";
    $vResult = null;

    try {

      $vCapCom = $this->attr00->link->prepare($vQuery);

      if ($vCapCom){

          $vCapCom->bind_param("i", $pIdArt);
          $vCapCom->execute();
          $vQueryResult = $vCapCom->get_result();
          $vCapCom->close();
          $vResult = $vQueryResult->fetch_array(MYSQLI_ASSOC);
      }

    } catch (\Throwable $e) {
      echo $e->getMessage();
      die();
    }

    return $vResult;

  }

  private function fnDameDatosLibrosBb($pIdLibro){

    $aDatos = [];
    $vQueryResult;
    $vQuery = "SELECT l.*
    FROM libro_bbb l
    WHERE l.id_libro_bb = ?;";
    $vResult = null;

    try {

      $vCapCom = $this->attr00->link->prepare($vQuery);

      if ($vCapCom){

          $vCapCom->bind_param("i", $pIdLibro);
          $vCapCom->execute();
          $vQueryResult = $vCapCom->get_result();
          $vCapCom->close();
          $vResult = $vQueryResult->fetch_array(MYSQLI_ASSOC);
      }

    } catch (\Throwable $e) {
      echo $e->getMessage();
      die();
    }

    return $vResult;

  }

  private function fnDameDatosArticulosSolicitudBe($pIdArt){

    $aDatos = [];
    $vQueryResult;
    $vQuery = "SELECT a.*
    FROM articulos_solicitud_be a
    WHERE a.fk_id_art = ?;";
    $vResult = null;

    try {

      $vCapCom = $this->attr00->link->prepare($vQuery);

      if ($vCapCom){

          $vCapCom->bind_param("i", $pIdArt);
          $vCapCom->execute();
          $vQueryResult = $vCapCom->get_result();
          $vCapCom->close();
          $vResult = $vQueryResult->fetch_array(MYSQLI_ASSOC);

      }

    } catch (\Throwable $e) {
      echo $e->getMessage();
      die();
    }

    return $vResult;

  }

  private function fnDameDatosArticulosCombinacionBe($pIdArt){

    $aDatos = [];
    $vQueryResult;
    $vQuery = "SELECT a.*
    FROM art_sol_be_libro_be a
    WHERE a.pk_fk_id_combinacion = ?;";
    $vResult = null;

    try {

      $vCapCom = $this->attr00->link->prepare($vQuery);

      if ($vCapCom){

          $vCapCom->bind_param("i", $pIdArt);
          $vCapCom->execute();
          $vQueryResult = $vCapCom->get_result();
          $vCapCom->close();
          //$vResult = $vQueryResult->fetch_array(MYSQLI_ASSOC);
          $vResult = $vQueryResult;
      }

    } catch (\Throwable $e) {
      echo $e->getMessage();
      die();
    }

    return $vResult;

  }

  private function fnComprobarArrayResultados($pResultados){
    $item = 0;
    $vIndex = 0;
    $vArrayLenght = count($pResultados);
    $vQueryResult = false;

    foreach ($pResultados as $item){
      if ($item){
        $vIndex++;
      }
    }

    if ($vArrayLenght == $vIndex){
      $vQueryResult = true;
    }

    return $vQueryResult;

  }


  public function fnCargarAsign(){

    $aDatos = [];
    $vQueryResult;
    $vQuery = "SELECT s.*
    FROM solicitante s
    WHERE s.fk_id_sucursal = ?
    AND s.activo_sol = 1;";
    $vResult = null;
    $vDpto = 4;

    try {

      $vCapCom = $this->attr00->link->prepare($vQuery);

      if ($vCapCom){

          $vCapCom->bind_param("i", $vDpto);
          $vCapCom->execute();
          $vQueryResult = $vCapCom->get_result();
          while ($vResult = $vQueryResult->fetch_array(MYSQLI_ASSOC)) {
            array_push($aDatos,$vResult);
          }

          $vCapCom->close();

      }

    } catch (\Throwable $e) {
      echo $e->getMessage();
      die();
    }

    echo json_encode($aDatos);

  }



}
function fnSanitizar01($pItem){//Eliminamos espacios al principio y al final & caracteres especiales anti XSS, esto ultimo me dio un error si introducen comillas
  return trim(htmlspecialchars($pItem));
  //return trim($pItem);
}
function fnSanitizarTxt($pInput) {//Permite letras, numeros y algunos símbolos. (Ningún tipo de comillas)
  $vSustitucion="";
  $vOutput = "";
  $vPatron = '([^a-zA-Z0-9áéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜñÑ\s\:\.\,\;\-\¿\?\!\¡\@\(\)\€\_\º\ª\+])';
  $vOutput = preg_replace("$vPatron", "$vSustitucion", "$pInput");
  return trim($vOutput);
}
function fnSanitizarNum($pInput) {//Permite solo Números
  $vSustitucion='';
  $vOutput = "";
  $vPatron = '([^0-9])';
  $vOutput = preg_replace("$vPatron", "$vSustitucion", "$pInput");
  return trim($vOutput);
}
function fnSanitizarNumDecimal($pInput) {//Números y los simbolos de la coma y el punto
  $vSustitucion='';
  $vOutput = "";
  $vPatron = '([^0-9\,\.])';
  $vOutput = preg_replace('/,/', ".", preg_replace("$vPatron", "$vSustitucion", "$pInput"));//Además sustituimos comas por puntos para el formato SQL

  return trim($vOutput);
}
function fnSanitizarWeb($pInput) {//Números, letras y simbolos de una dirección web
  $vSustitucion='';
  $vOutput = "";
  $vPatron = '([^a-zA-Z0-9\:\.\-\_\/])';
  $vOutput = preg_replace("$vPatron", "$vSustitucion", "$pInput");
  return trim($vOutput);
}
//   var_dump($item);
//   print_r($item);
// var_export($item);
