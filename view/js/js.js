function fnActivateTabsFormPeticion(){ // Activacion del plugin jQuery UI para info en tabs
  $( function() {
    $( "#diTabsPeticion" ).tabs();
  } );
}

function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
  }

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
  }

function fnBurguerMenu(){ // Eventos del menu lateral
    $(document).on('click', '.js-my-burguer01--open', function(){
          w3_open() ;
    });
    $(document).on('click', '.js-my-burguer01--close', function(){
        w3_close();
    });
}

function fnCargarOficinas(){//Carga oficinas en su select
  $.ajax({
      type: 'post',
      url: '../controller/controller.php',
      dataType: 'json',
      data: {'act':'fnCargarOficinas'},
      success: function(r){
          $('#seOficina').append('<option value="" disabled selected>Sucursal</option>');
          $.each(r, function (index, item){
              $('#seOficina').append('<option value="' + item.id_sucursal + '">' + item.nombre_sucursal + '</option>');
          });
      }
  });
}
function fnConsultarSolicitantes(pItemSeleccionado){//Consulta los solicitante por dpto y rellena el input correspondiente
  $.ajax({
      type: 'post',
      url: '../controller/controller.php',
      dataType: 'json',
      data: {'act':'fnConsultarSolicitantes', 'pFiltro': pItemSeleccionado},
      success: function(r){
          $('#seSolicitante').append('<option value="" disabled selected>Escoge una opción</option>');
          $.each(r, function (index, item){
              $('#seSolicitante').append('<option value="' + item.id_sol + '">' + item.nombre_sol + " " + item.apellidos_sol + '</option>');
          });
      }
  });
}
function fnCargarSolicitantes(){//Consulta los solicitantes al cambiar el select de sucursal llamando a otra función
  $('#seOficina').change(function (){
      if ($('#seOficina').val() == ""){
          $('#seSolicitante').html('');$('#seSolicitante').append('<option value="" disabled selected>Escoge una opción</option>');
    }
      else {
            $('#seSolicitante').html('');
            var vItemSeleccionado = $('#seOficina').val();
            fnConsultarSolicitantes(vItemSeleccionado);
        }
  });
}
function fnCargarEstadosAlInicio(){//Carga Estados en su select al inicio
  var vElement=$('#inEstado');
  if ($(vElement).length > 0) {//Si el elemento existe...
      $.ajax({
          type: 'post',
          url: '../controller/controller.php',
          dataType: 'json',
          data: {'act':'fnCargarEstados'},
          success: function(r){
              $(vElement).append('<option value="" disabled selected>Estado</option>');
              $.each(r, function (index, item){
                $(vElement).append('<option value="' + item.id_estado + '">' + item.nombre_estado + '</option>');
              });
          }
      });
    }
}
function fnCargarLicenciasAlInicio(){//Carga licencias en su select al inicio
  var vElement=$('#inLicencia');
  if ($(vElement).length > 0) {//Si el elemento existe...
        try {
          $.ajax({
            type: 'post',
            url: '../controller/controller.php',
            dataType: 'json',
            data: {'act':'fnCargarLicencias'},
            success: function(r){
                $(vElement).append('<option value="" disabled selected>Pincha primero aquí para escoger el tipo de Licencia</option>');
                $.each(r, function (index, item){
                  $(vElement).append('<option value="' + item.id_licencia_bb + '">' + item.tipo_licencia_bb + '</option>');
                });
            }
        });
        } catch (error) {
            fnShowMsgBox(6);
        }
  }
}
function fnCargarLicenciasAlInicioNoDup(){//Carga licencias en su select al inicio
  var vElement=$('.se__licenciabb');
  if ($(vElement).length > 0 && $(vElement).attr('data-desplegado') != 'si') {//Si el elemento existe...
        try {
          $.ajax({
            type: 'post',
            url: '../controller/controller.php',
            dataType: 'json',
            data: {'act':'fnCargarLicencias'},
            success: function(r){

              $(vElement).attr('data-info-desplegado','si'); //Cambiamos attr para indicar que ya hemos añadido los posibles estados al select
              $(vElement).empty(); //Vaciamos contenido para que no haya duplicados

                $(vElement).append('<option value="" disabled selected>Pincha primero aquí para escoger el tipo de Licencia</option>');
                $.each(r, function (index, item){
                  $(vElement).append('<option value="' + item.id_licencia_bb + '">' + item.tipo_licencia_bb + '</option>');
                });
            }
        });
        } catch (error) {
            fnShowMsgBox(6);
        }
  }
}
function fnCargarMicrofonoAlInicio(){//Carga tipos de micro en su select al inicio
  var vElement=$('#inMicroBe');
  if ($(vElement).length > 0) {
    try {
      $.ajax({
        type: 'post',
        url: '../controller/controller.php',
        dataType: 'json',
        data: {'act':'fnCargarMicro'},
        success: function(r){
            $(vElement).append('<option value="" disabled selected>Indicar modelo de Micro</option>');
            $.each(r, function (index, item){
              $(vElement).append('<option value="' + item.id_micro + '">' + item.nombre_micro + '</option>');
            });
        }
    });
    } catch (error) {
      fnShowMsgBox(6);
    }
  }
}
function fnCargarTipoEnvioBeAlInicio(){//Carga tipos de envio BE en su select al inicio
  var vElement=$('#inEnvioBe');
  if ($(vElement).length > 0) {
      try {
        $.ajax({
          type: 'post',
          url: '../controller/controller.php',
          dataType: 'json',
          data: {'act':'fnCargarTipoEnvioBe'},
          success: function(r){
              $(vElement).append('<option value="" disabled selected>Tipo de envío</option>');
              $.each(r, function (index, item){
                $(vElement).append('<option value="' + item.id_envio_be + '">' + item.tipo_envio_be + '</option>');
              });
          }
      });
      } catch (error) {
        fnShowMsgBox(6);
      }
    }
}
function fnCargarNegocioAlInicio(){//Carga tipos de envio BE en su select al inicio
  var vElement=$('#seNegocio');
  if ($(vElement).length > 0) {
      try {
          $.ajax({
            type: 'post',
            url: '../controller/controller.php',
            dataType: 'json',
            data: {'act':'fnCargarNegocioAlInicio'},
            success: function(r){
                $(vElement).append('<option value="" disabled selected>Escoge BB o BE</option>');
                $.each(r, function (index, item){
                  $(vElement).append('<option value="' + item.id_area_negocio + '">' + item.nombre_area_negocio + '</option>');
                });
            }
        });
      } catch (error) {
        fnShowMsgBox(6);
      }
    }
}

function fnCargarLicenciasBe(){//Carga tipos de licencias BE en su select al inicio
  var vElement=$('#seLicenciaBe');
  if ($(vElement).length > 0) {
      try {
          $.ajax({
            type: 'post',
            url: '../controller/controller.php',
            dataType: 'json',
            data: {'act':'fnCargarLicenciasBe'},
            success: function(r){
                $(vElement).append('<option value="" disabled selected>Pincha primero aquí para escoger el tipo de licencia</option>');
                $.each(r, function (index, item){
                  $(vElement).append('<option value="' + item.id_licencia_be + '">' + item.tipo_licencia_be + ' [' +  item.componentes_licencia_be + ']   Meses:' + item.duracion_licencia_be + '   Pvp:' + item.precio_licencia_be + '€</option>');
                });
            }
        });
      } catch (error) {
        fnShowMsgBox(6);
      }
    }
}

function fnCargarLicenciasBef(){//Carga tipos de licencias BE en su select al inicio
  var vElement=$('#seLicenciaBe');
  if ($(vElement).length > 0) {
      try {
          $.ajax({
            type: 'post',
            url: '../controller/controller.php',
            dataType: 'json',
            data: {'act':'fnCargarLicenciasBe'},
            success: function(r){
                $(vElement).append('<option value="" disabled selected>Pincha primero aquí para escoger el tipo de licencia</option>');
                $.each(r, function (index, item){
                  $(vElement).append('<option value="' + item.id_licencia_be + '">' + item.tipo_licencia_be + ' [' +  item.componentes_licencia_be + ']   Meses:' + item.duracion_licencia_be + '   Pvp:' + item.precio_licencia_be + '€</option>');
                });
            }
        });
      } catch (error) {
        fnShowMsgBox(6);
      }
    }
}

function fnCargarCursosBeAlInicioEsp(){//Carga tipos de cursos_be en su select al inicio

  var vElement=$('#seCursosEspecialidades');
  if ($(vElement).length > 0) {

    try {
      $.ajax({
        type: 'post',
        url: '../controller/controller.php',
        dataType: 'json',
        data: {'act':'fnCargarCursosBeEsp'},
        success: function(r){
            $(vElement).append('<option value="" disabled selected>Escoge Curso Especialidad</option>');
            $.each(r, function (index, item){
              $(vElement).append('<option value="' + item.id_curso_be + '">' + item.nombre_curso_be + '</option>');
            });
        }
    });
    } catch (error) {
      fnShowMsgBox(6);
    }
  }
}

function fnCargarCursosBeAlInicioGen(){//Carga tipos de cursos_be en su select al inicio

  var vElement=$('#seCursosGenerales');
  if ($(vElement).length > 0) {
    try {
      $.ajax({
        type: 'post',
        url: '../controller/controller.php',
        dataType: 'json',
        data: {'act':'fnCargarCursosBeGen'},
        success: function(r){
            $(vElement).append('<option value="" disabled selected>Escoge Curso General</option>');
            $.each(r, function (index, item){
              $(vElement).append('<option value="' + item.id_curso_be + '">' + item.nombre_curso_be + '</option>');
            });
        }
    });
    } catch (error) {
      fnShowMsgBox(6);
    }
  }
}
function fnCargarCursosBeAlInicioWordlist(){//Carga tipos de cursos_be en su select al inicio

  var vElement=$('#seWordlist');
  if ($(vElement).length > 0) {
    try {
      $.ajax({
        type: 'post',
        url: '../controller/controller.php',
        dataType: 'json',
        data: {'act':'fnCargarCursosBeWordlist'},
        success: function(r){
            $(vElement).append('<option value="" disabled selected>Escoge Wordlist</option>');
            $.each(r, function (index, item){
              $(vElement).append('<option value="' + item.id_curso_be + '">' + item.nombre_curso_be + '</option>');
            });
        }
    });
    } catch (error) {
      fnShowMsgBox(6);
    }
  }
}

function fnAddDiaFecha(){//Añadir la fecha actual al input fecha
    'use strict';
    var vDate = new Date(), vYear = vDate.getFullYear(), vMes = vDate.getMonth() + 1, vDia = vDate.getDate();
    $("#inFechaSolicitud").val(vDia +"/" + vMes + "/" + vYear);
}

function fnAñadirLibroBb(){ // Fn Enviar Peticion Solicitud BB Parte 1: Va añadiendo libros BB a la lista

  var vArray = new Array();//El objeto Array de JS es un obj global
  var vObj = new Object();
  vObj.licencia;
  vObj.ean;
  vObj.isbn;
  vObj.titulocursobb;
  vObj.titulocursowebbb;
  vObj.preciosindtobb;
  vObj.dtobb;
  vObj.alumnosbb;
  vObj.obsBb;

  var i = 0;

  $(document).on('click','#btAddBookBb',function(){

    if ((fnValidarSumatorioRequired(0)) === true){

      i++;

      vObj.licencia = $('#inLicencia').val();
      vObj.ean = $('#inEan').val();
      vObj.isbn = $('#inIsbn').val();
      vObj.bookcode = $('#inSearch').attr("data-info");
      vObj.titulocursowebbb = $('#inTituloCursoWebBb').val();
      vObj.preciosindtobb = $('#inPrecioSinDtoBb').val();
      vObj.preciofinalcondtobb = $('#inPrecioConDtoBb').val();
      vObj.dtobb = $('#inDtoBb').val();
      vObj.alumnosbb = $('#inAlumnosBb').val();
      vObj.obsBb = $('#inObsBb').val();

    //Los objetos mantienen su referencia en memoria así que hay que clonarlos o pasarlos por otros metodos
      vArray.push(JSON.parse(JSON.stringify(vObj)));

      fnVaciarFormSolicitud(0);//revisar que vacie todos inputs y selects de esa peticion
      fnShowMsgBox(2);

      var vElement=$('#taCursos tr');
      if (!$(vElement).length > 0) {//Si la cabezera de la tabla resumen no existe la añado.

        fnAñadirCabeceraCursoTablaResumen(1);

      }

      fnAñadirCursoTablaResumen(1,i,vObj.titulocursowebbb,vObj.alumnosbb,vObj.dtobb,vObj.preciofinalcondtobb);//vaciar objeto y sus propiedades??
      fnActivamosEnvioPeticionBb(vArray);
    }
    else {
      fnShowMsgBox(1);
    }
  });
}

function fnActivamosEnvioPeticionBb(pArray){ // Fn Enviar Peticion Solicitud BB Parte 2 :Activamos boton para envio de peticiones BB. Previamente borramos los eventos que hubiera sobre ese botón.
  $('#btAddPeticionBb').off('click').on('click',function(){
    fnEnviarPeticionBb(pArray); // Se sobreescribe el array cada vez que el usuario añade un libro
  });
};

function fnDesactivarEnvioPeticionBb(){ // Fn Enviar Peticion Solicitud BB Parte 4: Desactivamos el evento del botón para enviar peticiones BB.
  $('#btAddPeticionBb').off("click"); // REvisar!!
};

function fnEnviarPeticionBb(pArray){  // Fn Enviar Peticion Solicitud BB Parte 3: Envia la peticion de una tienda para BB al controller
  var vOficina, vSolicitante, vFechaSolicitud, vSpain, vNombreCentro, vNumCentro, vObsSol, vCheck = 0, vArray = pArray, vArrayLenght = 0, vValidate = fnValidarDatosGenerales();

  vArrayLenght = vArray.length;
  if (((vValidate) === true) && (vArrayLenght > 0)){
      var vArrayString = JSON.stringify(vArray);
      vArray.length = 0;// VACIAR ARRAY!!
      vOficina = $('#seOficina').val();
      vSolicitante = $('#seSolicitante').val();
      vFechaSolicitud = $('#inFechaSolicitud').val();
      vSpain = $('#inSpain').val();
      vNombreCentro = $('#inNombreCentro').val();
      vNumCentro = $('#inNumeroCentro').val();
      vObsSol = $('#inObsSol').val();

      var vMsgBox ='<div id="dialog-confirm" title="Cuadro de confirmación" style="display:none;"><p>Confirme el envio de la petición</p></div>';
      $('body').append(vMsgBox);
      $( "#dialog-confirm" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Enviar petición": function() {
            $( this ).dialog( "close" );
            $("#dialog-confirm").remove();

                $.ajax({
                  type:'post',
                  url:'../controller/controller.php',
                  dataType:'json',
                  data:{'act':'fnInsertarPeticion', pArray:vArrayString, pOficina:vOficina,pSolicitante:vSolicitante,pFechaSolicitud:vFechaSolicitud,pSpain:vSpain,pNombreCentro:vNombreCentro,pNumeroCentro:vNumCentro,pObsSol:vObsSol},
                  beforeSend:function(){fnLoadingGifToggle();},
                  error:function(e){fnShowMsgBox(7);},
                  success:function(data){
                      vCheck = data.resultado;
                      if (vCheck === 1){fnShowMsgBox(3);}
                      else {fnShowMsgBox(0);}
                  },
                  complete:function(){
                    fnLoadingGifToggle();
                    fnVaciarFormSolicitudGenerales();
                    fnVaciarFormSolicitud(0);
                    fnEliminarCursoTablaResumen();
                    fnDesactivarEnvioPeticionBb();
                  }
              });

          },
          Cancel: function() {
            $( this ).dialog( "close" );
            $("#dialog-confirm").remove();
          }
        }
      });

    }

    else if(((vValidate) === false) && (vArrayLenght > 0)){
      fnShowMsgBox(5);
    }

    else{
      fnShowMsgBox(10);
    }

}
function fnEnviarLibroBe(){ //Envia la peticion de una tienda para BE
  var vArrayBe = new Array();//El objeto Array de JS es un obj global
  var vArrayLenght = 0;
  var vObjBe = new Object();
  vObjBe.titulocursobe;
  vObjBe.titulocursowebbe;
  vObjBe.tipolicenciabe
  vObjBe.alumnosbe;
  vObjBe.microfonobe;
  vObjBe.enviocentrobe;
  vObjBe.fechainiciobe;
  vObjBe.fechafinbe;
  vObjBe.obsBe;

  var vOficina;
  var vSolicitante;
  var vFechaSolicitud;
  var vSpain;
  var vNombreCentro;
  var vObsSol;

  var vCheck = 0;
  var i = 0;

  $(document).on('click','#btAddBookBe',function(){

    if ( (fnValidarSumatorioRequired(1)) && (fnValidarTaCursosBe()) ) {  // <<== Validar Lista #taCursosBe

        i++;
        vObjBe.titulocursobe = fnAddCombinacionCursosToArray();
        vObjBe.titulocursowebbe = $('#inTituloCursoWebBe').val();
        vObjBe.tipolicenciabe = $('#seLicenciaBe').val();
        vObjBe.tipolicenciabetxt = $('#seLicenciaBe option:selected').html();
        vObjBe.alumnosbe = $('#inAlumnosBe').val();
        vObjBe.microfonobe = $('#inMicroBe').val();
        vObjBe.enviocentrobe = $('#inEnvioBe').val();
        vObjBe.fechainiciobe = $('#inFechaInicioBe').val();
        vObjBe.fechafinbe = $('#inFechaFinBe').val();
        vObjBe.obsBe = $('#inObsBe').val();

      //Los objetos mantienen su referencia en memoria así que hay que clonarlos o pasarlos por otros metodos
        vArrayBe.push(JSON.parse(JSON.stringify(vObjBe)));
        fnVaciarFormSolicitud(1);fnBorrarTablaCursosListBe();
        fnShowMsgBox(2);

        var vElement=$('#taCursos tr');
        if (!$(vElement).length > 0) {//Si la cabezera de la tabla resumen no existe la añado.

          fnAñadirCabeceraCursoTablaResumen(2);

        }

        fnAñadirCursoTablaResumen(2,i,vObjBe.titulocursowebbe,vObjBe.tipolicenciabetxt,vObjBe.alumnosbe);
    }
    else{
      fnShowMsgBox(1);
  }});

  $(document).on('click','#btAddPeticionBe',function(){
    var vValidate = fnValidarDatosGenerales();
    vArrayLenght = vArrayBe.length;
    if ((vValidate === true) && (vArrayLenght > 0)){
      var vArrayString = JSON.stringify(vArrayBe);//Paso previo a pasarlo por AJAX
      vArrayBe.length = 0;// VACIAR ARRAY!!
      vOficina = $('#seOficina').val();
      vSolicitante = $('#seSolicitante').val();
      vFechaSolicitud = $('#inFechaSolicitud').val();
      vSpain = $('#inSpain').val();
      vNombreCentro = $('#inNombreCentro').val();
      vObsSol = $('#inObsSol').val();


      var vMsgBox ='<div id="dialog-confirm" title="Cuadro de confirmación" style="display:none;"><p>Confirme el envio de la petición</p></div>';
      $('body').append(vMsgBox);
      $( "#dialog-confirm" ).dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Enviar petición": function() {
            $( this ).dialog( "close" );
            $("#dialog-confirm").remove();


            $.ajax({
              type:'post',
              url:'../controller/controller.php',
              dataType:'json',
              data:{'act':'fnInsertarPeticionBe', pArray:vArrayString, pOficina:vOficina,pSolicitante:vSolicitante,pFechaSolicitud:vFechaSolicitud,pSpain:vSpain,pNombreCentro:vNombreCentro,pObsSol:vObsSol},
              beforeSend:function(){fnLoadingGifToggle();},
              error:function(e){
                fnShowMsgBox(7);
                fnEliminarCursoTablaResumen();
              },
              success:function(data){
                vCheck = data.resultado;
                if (vCheck === 1){//Valido si la petición devuelve success(1) o fail(0)
                  fnVaciarFormSolicitudGenerales();
                  fnEliminarCursoTablaResumen();
                  fnShowMsgBox(3);
                }
                else {
                  fnShowMsgBox(0);
                }
              },
              complete: function(){
                fnLoadingGifToggle();
                fnVaciarFormSolicitud(1);
                fnBorrarTablaCursosListBe();}
            });
          },
          Cancel: function() {
            $( this ).dialog( "close" );
            $("#dialog-confirm").remove();
          }
        }
      });



    }
    else if( ( vValidate === false ) && ( vArrayLenght > 0 ) ){
      fnShowMsgBox(5);
    }
    else{
      fnShowMsgBox(10);
    }
  });
}
function fnVaciarFormSolicitud(pr01){
    var aListInput = new Array();
    aListInput[0]=$('fieldset input'); //Vacio BB
    aListInput[1]=$('#diTab-BE input'); //Vacio BE
    var aListSelect = new Array();
    aListSelect[0]=$('fieldset select'); //Vacio BB
    aListSelect[1]=$('#diTab-BE select'); //Vacio BE

        var vInputsList = $('fieldset input');
        var vSelectsList =$('fieldset select');

            $(aListInput[pr01]).each(function(e){ //Vacio tabla
                if ($(this).is('input')){
                    $(this).val(null);
                    $(this).attr("data-info", "");
                    $(this).next().val(null); //Vaciar hiddens
                }
                else if ($(this).is('input:checkbox')){
                    $(this).prop("checked",false);
                }
                else if ($(this).is('.in__date')){
                    $(this).val(null);
                }
            });
            $(aListSelect[pr01]).each(function(e){
                    $(this).val("");
            });
            fnAddDiaFecha();
}

function fnVaciarFormSolicitudGenerales(){

    var vInputsList = $('#diDatosGenerales input');
    var vSelectsList =$('#diDatosGenerales select');

        $(vInputsList).each(function(e){ //Vacio tabla
          if ($(this).is('input')){
              $(this).val(null);
              $(this).attr("data-info", "");
              $(this).next().val(null); //Vaciar hiddens
          }
          else if ($(this).is('input:checkbox')){
              $(this).prop("checked",false);
          }
          else if ($(this).is('.in__date')){
              $(this).val(null);
          }
      });

    $(vSelectsList).each(function(e){
            $(this).val("");
    });

    fnAddDiaFecha();

    $('#inNumeroCentro').val("");

}
function fnValidarSelectsRequired(pr01){//Vemos si los select[required] estan vacios o con valores no validos.
    var i=0;
    var aElement = new Array();
    aElement[0]=$('fieldset select[data-required]'); //Valido BB
    aElement[1]=$('.di__be select[data-required]'); //Valido BE
    $(aElement[pr01]).each(function(e){
        if ( $(this).val() === "" || $(this).val() === null ){
            i++;
        }
    });
    if ( i > 0 ) {
        return 0;
    }
    else {
        return 1;
    }
}

function fnValidarInputsRequired(pr01){//Comprobamos si los input[required] estan vacios.
    var vIndex = 0;
    var aElement = new Array();
    aElement[0]=$('fieldset input[data-required]'); //Valido BB
    aElement[1]=$('.di__be input[data-required]'); //Valido BE
    $(aElement[pr01]).each(function(e){
        if ($(this).val() === ""){
          vIndex++;
        }
    });
    if ( vIndex > 0 ) {return 0;}
    else {return 1;}
}

function fnValidateNumOficialCentro(pr01){

  let vReturn = 1; // Valor de entrada OK para ambos
  let vNumCentro = $('#inNumeroCentro').val();
  let vLicencia = $('#inLicencia').val();

  if ( pr01 == 0 && vLicencia == 8 && vNumCentro === ""){

        vReturn = 0;

      }

  return vReturn;

}
function fnValidarSumatorioRequiredPlus(pr01){ //Según en negocio validamos más o menos

  var vResult = false;

  if (pr01 == 0){

    vResult = fnValidarSumatorioRequired(pr01);

  } else{

    if( (fnValidarTaCursosBe()) &&  (fnValidarSumatorioRequired(pr01)) ){

      vResult = true;

    }
  }

  return vResult;
}

function fnValidarSumatorioRequired(pr01){//Comprobamos todas las validaciones.
  var vSentry=0;
  vSentry = (fnValidarSelectsRequired(pr01) + fnValidarInputsRequired(pr01) + fnValidateNumOficialCentro(pr01));
      if ( vSentry === 3 ){return true;}
      else{return false;}
}

function fnValidarDatosGenerales(){ // Comprobamos que los inputs de los datos generales no estén vacios. OJO!!: un espacio cuenta como dato valido
  var vSentry = 0;
  var vReturn = false;
  var vListInput = $('#diDatosGenerales input[data-required]');
  var vListSelect = $('#diDatosGenerales select');
  $(vListInput).each(function(e){
    //if ( $(this).val().replace(/ /g,"")  === "" ){//no puedes poner un unico espacio vacio pero si palabras con espacios entremedias, desarrollo pendiente.
    if ( $(this).val().replace(/ /g,"")  === "" ){

      vSentry++;
      }
  });
  $(vListSelect).each(function(e){
    if ( ( $(this).val() === "" ) ||  ( $(this).val() === null ) ){
      vSentry++;
    }
  });

  if ( vSentry === 0 ){
    vReturn=true;
  }
  return vReturn;
}

function fnValidarTaCursosBe(){

  let vResult = false;
  let vTaCursosBe = $('#taCursosBe td');

  $(vTaCursosBe).each(function (e){

      if ( $(this).html() ) {

        vResult = true;

      }
  });

  return vResult;

}

function fnValidarFechas() { // En desarrollo

   let vInit = $("#inFechaInicioBe").val();
   let vFin = $("#inFechaFinBe").val();
   let vReturn = false;


   if(Date.parse(vInit) && Date.parse(vFin)) {

      if(Date.parse(vInit) < Date.parse(vFin)) {


        vReturn = true;

      }
   }

  return vReturn;
}

function fnAñadirCabeceraCursoTablaResumen(p00){ // Añadimos el libro/curso que hemos incluido en la petición a la tabla-lista que aparece en la página de solicitud

  var vCodeChunk = "";

if ( p00 == 1){

  vCodeChunk = '<tr class="w3-amber"><th>Número</th><th>Nombre del Curso en la Web</th><th>Alumnos</th><th>Descuento</th><th>Precio Final</th></tr>';
}
else {

  vCodeChunk = '<tr class="w3-amber"><th>Nombre del Curso en la Web</th><th>Licencia</th><th>Alumnos</th></tr>';

}

$('#taCursos').append(vCodeChunk);
}

function fnAñadirCursoTablaResumen(p00,p01,p02,p03,p04,p05){ // Añadimos el libro/curso que hemos incluido en la petición a la tabla-lista que aparece en la página de solicitud

    var vCodeChunk = "";

  if ( p00 == 1){

    vCodeChunk = '<tr><td>' + p01 + '</td><td>' + p02 +'</td><td>' + p03 +'</td><td>' + p04 +'</td><td>' + p05 +'</td></tr>';
  }
  else {

    vCodeChunk = '<tr><td>' + p02 +'</td><td>' + p03 +'</td><td>' + p04 +'</td></tr>';

  }

  $('#taCursos').append(vCodeChunk);
}

function fnEliminarCursoTablaResumen(){ // Eliminamos la tabla que crea fnAñadirCursoTablaResumen
  var vElement = $('#taCursos');
  $(vElement).empty();
}

function fnConsultaBasica(){ // Consulta por filtros del interfaz de gestión.
    $('#inSubmitFormGestion').click(function(e){

      $.ajax({
          type:'post',
          url:'../controller/controller.php',
          data:$("#fConsulta").serialize(),
          dataType: 'json',
          type: 'post',
          beforeSend:function(){
            fnLoadingGifToggle();
            fnBorrarTablaFormGestion();
          },
          error:function(e){
            fnShowMsgBox(6);
          },
          success:function(data){

              if ($.trim(data)){ //Comprobamos si los datos están vacios
                var $vI=0;

                  $.each(data, function (index, item){
                      var $vUrgente = 0; // Dentro del each porque por encima queda fuera del ámbito.
                      $vI++
                      if( parseInt(item.urgente_solicitud) === 1 ){ $vUrgente="w3-deep-orange" } // Si es urgente la linea sale naranja.
                      $('#taFormGestion').append('<tr class="'+ $vUrgente +'"><td data-info="' + item.FK_ID_AREA_NEGOCIO + '">' + item.ID_SOLICITUD + '</td><td>' + item.NOMBRE_SUCURSAL
                      + '</td><td>' + item.SPAIN_CENTRO + '</td><td>' + item.NOMBRE_CENTRO + '</td><td>' + fnFormatDateYear(item.FECHA_SOLICITUD) + '</td><td class="td__estado">'
                      + item.NOMBRE_ESTADO +'</td><td class="td__asign">' + fnIfNullOrZeroReturnVoid(item.nombre_asign) + " " + fnIfNullOrZeroReturnVoid(item.apellidos_asign)
                      + '</td><td><div class="w3-button w3-teal w3-padding-small w3-hover-lime bt__articulo--line w3-ripple" data-info="">Artículos</div></td><td><div class="w3-button w3-teal w3-padding-small w3-hover-lime w3-margin-left w3-ripple bt__detail--line js-bt__detail--line" data-info="">Detalles</div></td></tr>');
                  });
                  $('#taFormGestion').parent().append('<span class="w3-tag w3-padding w3-round-large w3-teal w3-center sp__total--resultados">Total: ' + $vI + '</span>');
              }
              else {
                fnShowMsgBox(11);
              }
          },
          complete:function(){fnLoadingGifToggle();}
    });
  });
}
function fnFichaDetallesPeticion(){ //Tras los resultados de una consulta el botón Detalles mostrará los datos de esa petición
  var vElement;
  var vIndex=0;
  $(document).on("click",".js-bt__detail--line",function(){
    vElement = $(this).closest('tr');
    vIndex++;
    var vIdSolicitud = $(this).closest('tr').find('td').html();
    $.ajax({
      type:'post',
      url:'../controller/controller.php',
      data: {'act':'fnMostrarCuadroDetallesSolicitud', 'pFiltro': vIdSolicitud},
      dataType: 'json',
      beforeSend:function(){
        $('.di__img--loading').show();
      },
      error:function(e){fnShowMsgBox(6);
      },
      success:function(data){
        var vCodeChunk;
            $.each(data, function (index, item){
                var vNUMERO_OFICIAL_CENTRO = fnIfNullOrZeroReturnVoid(item.NUMERO_OFICIAL_CENTRO)
                var vNUM_TIENDA = fnIfNullOrZeroReturnVoid(item.NUM_TIENDA);
                var vUrgente = parseInt(item.urgente_solicitud);
                var vUrgenteCheckAttribute = " ";
                if (vUrgente === 1){vUrgenteCheckAttribute = " checked";}

                $(vElement).next('tr.js-tr__ficha').remove(); //Vaciamos elemento para que no se duplique la ficha.

                vCodeChunk='<tr id="trFicha' + vIndex + '" data-info="trFicha' + vIndex + '" class="my-table__backhover--no js-tr__ficha--tienda js-tr__ficha"><td colspan="9"><div class="w3-container"><div class="w3-row-padding"><div class="w3-quarter"><input class="w3-input w3-hover-grey" type="text" placeholder="Sucursal" title="Sucursal" value="' + item.NOMBRE_SUCURSAL + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey" type="text" placeholder="Solicitante" title="Solicitante" value="' + item.NOMBRE_SOL + " " + item.APELLIDOS_SOL + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey" type="text" placeholder="Fecha"  title="Fecha de Solicitud" value="' + fnFormatDateYearHour(item.FECHA_SOLICITUD) + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey" type="text" placeholder="Nº Ficha Spain" title="Nº Ficha Spain" value="' + item.SPAIN_CENTRO + '" readonly></div><div class="w3-half"><input class="w3-input w3-hover-grey" type="text" placeholder="Nombre del Centro" title="Nombre del Centro"value="' + item.NOMBRE_CENTRO + '" readonly></div><div class="w3-half"><input class="w3-input w3-hover-grey" type="text" placeholder="Nombre Area Negocio" title="Nombre Area Negocio" value="' + item.NOMBRE_AREA_NEGOCIO + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey" type="text" placeholder="Nº Oficial del Centro" title="Nº Oficial del Centro" value="' + vNUMERO_OFICIAL_CENTRO + '" readonly></div><!--<div class="w3-third"><input class="w3-input w3-hover-grey" type="text" placeholder="Estado" title="Estado" value="' + item.NOMBRE_ESTADO + '" readonly></div>--><div class="w3-third"><select  class="w3-select js-in__editable se__estado" title="Estado" data-info-desplegado="no"><option  value="' + item.id_estado + '" disabled selected>' + item.NOMBRE_ESTADO + '</option></select></div><div class="w3-third"><input class="w3-input w3-hover-grey js-in__numtienda js-in__editable js-val__num--only" type="text" maxlength="4" placeholder="Número de tienda" title="Número de tienda" value="' + vNUM_TIENDA + '" readonly></div><div class="w3-col l11"><input class="w3-input w3-hover-grey in__web js-in__web js-in__editable" type="text" placeholder="Dirección Web" title="Dirección Web" value="' + fnIfNullOrZeroReturnVoid(item.WEB_TIENDA) + '"readonly></div><div class="w3-col l1"><div class="w3-button w3-teal w3-ripple w3-hover-lime bt__mail-url js-bt__mail--url"  title="Mail con la URL al Solicitante y al Gestor">Mail</div></div><div class="w3-col l11"><input class="w3-input w3-hover-grey in__obs--gen js-in__obs--gen js-in__editable" type="text" placeholder="Observaciones" title="Observaciones" value="' + fnIfNullOrZeroReturnVoid(item.OBS_SOLICITUD) + '"readonly></div><div class="w3-col l1"><div class="w3-button w3-teal w3-ripple w3-hover-lime bt__registro js-bt__registro"  title="Registro de cambios" data-info="' + item.ID_SOLICITUD + '">Registro</div></div>'
                        + '<div class="w3-third"><select class="w3-select js-in__editable se__asign" title="Asignado" data-info-desplegado="no"><option  value="' + fnIfNullOrZeroReturnVoid(item.fk_id_sol_asign) + '" disabled selected>' + fnIfNullOrZeroReturnVoid(item.nombre_asign) + " " + fnIfNullOrZeroReturnVoid(item.apellidos_asign) + '</option></select></div>'
                        + '<div class="w3-col m12 w3-margin"><label class="w3-margin" for="inUrgente">Marcar para Urgentes</label><input class="w3-margin-top in__urgente js-in__urgente" type="checkbox" name="inUrgente" id="inUrgente" ' + vUrgenteCheckAttribute + '></div><div class="w3-bar"><div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left js-bt__edit--fichadetalles">Editar</div><div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left bt__save--fichadetalles js-bt__save--fichadetalles" data-info="' + item.ID_SOLICITUD + '">Salvar</div><div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left bt__close--line js-bt__close--line">Cerrar</div></div></div></div></td></tr>';


                $(vElement).closest('tr').after(vCodeChunk);

                vNUMERO_OFICIAL_CENTRO=undefined;vNUM_TIENDA=undefined;

            });
         vCodeChunk=undefined;
      },
      complete:function(){
        $('.di__img--loading').hide();
      }
 });
    vIdSolicitud=undefined;
  });
  vElement=undefined;
}

function fnBorrarTablaFormConsultaOnBorrar(){
  $('#inVaciarTablaQuery').click(function(e){
      var vElement = $(this);
      fnBorrarTablaConsulta();
      fnBorrarTagSumatorioResultados();
      fnResetCamposBusqueda(vElement);
  });
}
function fnBorrarTablaConsulta(){
  $('.js-ta--query tr:not(:first-child)').remove();
  fnBorrarTagSumatorioResultados();
}
function fnBorrarTablaFormGestion(){
  $('#taFormGestion tr:not(:first-child)').remove();
  fnBorrarTagSumatorioResultados();
}
function fnBorrarTablaFormConsulta(){
  $('#taFormConsulta tr:not(:first-child)').remove();
  fnBorrarTagSumatorioResultados();
}

function fnBorrarTagSumatorioResultados(){
  $('.sp__total--resultados').remove();
}

function fnResetCamposBusqueda(pElement){

  var vInputsList = $(pElement).parent().parent().prev('div').find('input');
  var vSelectsList = $(pElement).parent().parent().prev('div').find('select');

      $(vInputsList).each(function(e){ //Vacio tabla
        if ($(this).is('input')){
            $(this).val(null);

        }
        else if ($(this).is('input:checkbox')){
            $(this).prop("checked",false);
        }
        else if ($(this).is('.in__date')){
            $(this).val(null);
        }
    });

  $(vSelectsList).each(function(e){
          $(this).val("");
  });
}

function fnBorrarTablaCursosListBe(){

  let vTable = $('#taCursosBe td');

  $(vTable).each(function(e){

      $(this).html("");
      $(this).attr('data-info','');

  });
}

function fnCerrarFichaDetallesTienda(){
    $(document).on('click','.bt__close--line',function(){
      $(this).closest('tr').remove();
    });
}
function fnActivateAccordFormGestion(pElementId){ // Activar el plugin de jQuery UI para la info en accordeones (ficha de articulos)
    $(function() {
      $(pElementId).accordion({
        collapsible: true,
        active: false,
      });
    } );
}
function fnMostrarFichaArticulos1(){ // Muestra los articulos de una solicitud en una lista acordeon de jQuery UI
  var vIdSolicitud;
  var vIdAreaNegocio;
  var vElement;
  var j=0;
  var vCodeChunkContainer='';
  var vCodeChunk;
  var vIdContainerAccordArt;
  var vDiButton;
  var vIdAreaNegocio;
  $(document).on("click",".bt__articulo--line",function(){
    j++;
    vElement = $(this).closest('tr');
    vIdSolicitud = $(this).closest('tr').find('td').html();
    vIdAreaNegocio = $(this).closest('tr').find('td').attr("data-info");
    vDiButton = '<div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left w3-left w3-small w3-round-xxlarge js-in__add--art" data-info="' + vIdSolicitud + '" data-info-negocio="' + vIdAreaNegocio + '">Añadir</div><div class="w3-button w3-teal w3-hover-lime bt__close--line js-bt__close--line w3-margin-top w3-ripple" data-info="">Cerrar</div>';
    vCodeChunkContainer='<tr id="trContainerAccordArt' + j + '" data-info="' + vIdSolicitud + '" class="js-tr__ficha--articulo js-tr__ficha my-table__backhover--no"><td colspan="9"><div id="diDummyAccord' + j + '"></div></td></tr>';
    vCodeChunk = "";
    vIdContainerAccordArt="";
    $.ajax({
      type:'post',
      url:'../controller/controller.php',
      data: {'act':'fnMostrarCuadroDetallesArticulos', 'pFiltro': vIdSolicitud},
      dataType: 'json',
      beforeSend:function(){
        $('.di__img--loading').show();
      },
      error:function(e){
        fnShowMsgBox(6);
      },
      success:function(data){
      var i=0;

      $(vElement).next('tr.js-tr__ficha').remove();//Eliminamos elementos contenedor para que no se duplique la info.

        $.each(data, function (index, item){
            i++;
            vIdAreaNegocio=item.fk_id_area_negocio;

            if (item.fk_id_area_negocio == 1){

              vCodeChunk = vCodeChunk + '<h3>Nº ' + i + ' / ' + item.isbn_bb + ' / ' + item.nombre_art_web +' / ' + fnFormatNumToESP(((item.precio_art * (100 - item.dto_bb))/100 ).toFixed(2)) + ' / ' + item.nombre_libro_bb +'</h3><div class="w3-container" id="diTab' + j + '-Bb-' + i + '"><div class="w3-row-padding"><fieldset><div class="w3-col"><select  class="w3-select js-in__editable se__licenciabb js-se__licenciabb" title="Tipo de Licencia" data-info-desplegado="no"><option  value="' + item.id_licencia_bb + '" disabled selected>' + item.tipo_licencia_bb + '</option></select></div><div class="w3-col l12"><input class="w3-input w3-hover-grey" type="text" placeholder="Título Curso" title="Título Curso" value="' + item.nombre_libro_bb + '"  data-info="' + item.id_libro_bb + '" readonly></div><div class="w3-half"><input class="w3-input w3-hover-grey js-in__editable in__ean js-in__ean js-val__num--only" type="text" maxlength="13" placeholder="EAN" title="EAN:Solo número, sin guiones ni espacios" value="' + item.ean_bb + '" readonly></div><div class="w3-half"><input class="w3-input w3-hover-grey js-in__editable in__isbn js-in__isbn js-val__numyletras--guion" type="text" maxlength="13" placeholder="ISBN" title="ISBN, Patrón Recomendado: XXXX-XX-XXX-X" value="' + item.isbn_bb + '" readonly></div><div class="w3-col l12"><input class="w3-input w3-hover-grey in__nombreweb js-in__nombreweb js-in__editable" type="text" placeholder="Nombre del Curso para la Eshop" title="Nombre del Curso para la Eshop" value="' + item.nombre_art_web + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__precio js-in__precio" type="text" maxlength="6" max="150" placeholder="Precio Sin Dto IVA inc." title="Precio Sin Dto IVA inc." value="' + fnFormatNumToESP(item.precio_art) + '€" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__dto js-in__dto js-val__num js-val__num--max js-in__editable" type="text" placeholder="Descuento" title="Descuento" maxlength="5" max="100" value="' + fnFormatNumToESP(fnIfNullOrZeroReturnVoid(item.dto_bb)) + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__pvp--condto js-in__pvp--condto" type="text" placeholder="Precio Final Con Dto" title="Precio Final Con Dto" value="' + fnFormatNumToESP(((item.precio_art * (100 - item.dto_bb))/100 ).toFixed(2)) + '€" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey" type="text" placeholder="Nº de Alumnos (" title="Nº de Alumnos (+30% para licencias)" value="' + item.alumnos_art + ' (+30% para licencias = ' +  Math.round(item.alumnos_art * 1.30) + ')" readonly></div><div class=""><input class="w3-input w3-hover-grey in__inObsBb js-in__inObsBb js-in__editable" type="text" placeholder="Observaciones" title="Observaciones" value="' + item.obs_art + '" readonly></div></fieldset><div class="w3-third"><input class="w3-input w3-hover-grey in__idproduct js-in__idproduct js-val__num js-in__editable" type="text" maxlength="5" placeholder="ID Product" title="ID Product" value="' + fnIfNullOrZeroReturnVoid(item.id_product_bb) + '" readonly></div><div class="w3-third"><input id="inCdkeyGroup' + j + '-Bb-' + i + '" class="w3-input w3-hover-grey in__cdkeygroup js-in__cdkeygroup js-in__editable js-val__num" type="text" maxlength="5" placeholder="Id CD-Key Group" title="Id CD-Key Group" value="' + fnIfNullOrZeroReturnVoid(item.id_cdkey_group_bb) + '" readonly></div>   <div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left bt__edit--line js-bt__edit--lineBB">Editar</div><div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left bt__save--line js-bt__save--lineBB" data-info="' + item.fk_id_art + '" data-info-nego="' + vIdAreaNegocio + '">Salvar</div><div class="w3-button w3-teal w3-hover-red w3-ripple w3-margin-top w3-margin-left w3-right w3-small w3-round-xxlarge js-bt__delete--art">Eliminar</div>  </div></div></div>';

            }
            else{

            vCodeChunk = vCodeChunk + '<h3>Artículo ' + i + ' / ' + item.nombre_art_web + '</h3><div class="w3-container" id="diTab' + j + '-Be-' + i + '"><div class="w3-row"><div class="w3-col s12 m12 l12"><select  class="w3-select js-in__editable se__licenciabe" title="Tipo de licencia" data-info-desplegado="no"><option  value="' + item.id_licencia_be + '" disabled selected>' + item.tipo_licencia_be + ' (' + item.componentes_licencia_be + ') Meses:' + item.duracion_licencia_be + ' Pvp:' + item.precio_licencia_be + '€ //  ' + fnIfNullOrZeroReturnVoid(item.cod_a3_licencia_be) + '</option></select></div>' + fnComponentesCursoBe(item.id_art) + '<div class="w3-col l12"><input class="w3-input w3-hover-grey w3-col js-in__editable in__titulocursoweb js-in__titulocursoweb" type="text" maxlength="75" placeholder="Nombre del Curso para la Eshop" title="Campo ObligatorioNombre del Curso para la Eshop" data-required value="' + item.nombre_art_web + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey in__alumnosbe js-in__alumnosbe js-in__editable js-val__num js-val__num--max" type="text" maxlength="3" max="1000" placeholder="Nº de Alumnos" title="Campo Obligatorio:Nº de Alumnos" data-required value="' + item.alumnos_art + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey" type="text" maxlength="20" placeholder="Micrófono" title="Campo Obligatorio:Indicar modelo" data-required value="' + item.nombre_micro + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey" type="text" title="Campo Obligatorio:¿Envío al Centro?" value="' + item.tipo_envio_be + '" readonly></div><div class="w3-"><input class="w3-input w3-hover-grey" type="text" placeholder="Fecha Inicio" title="Fecha Inicio:Opcional" value="' + fnFormatDateForInputTypeDate(item.fecha_inicio_be) + '" readonly></div><div class="w3-"><input class="w3-input w3-hover-grey" type="text" placeholder="Fecha Fin" title="Fecha Fin:Opcional" value="' + fnFormatDateForInputTypeDate(item.fecha_fin_be) + '" readonly></div><div class="w3-col"><input class="w3-input w3-hover-grey in__inObsBe js-in__inObsBe js-in__editable" type="text" maxlength="144" placeholder="Observaciones" title="Observaciones referentes a este título/curso" value="' + item.obs_art + '" readonly></div><div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left bt__edit--line js-bt__edit--lineBE">Editar</div><div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left bt__save--line js-bt__save--lineBE" data-info="' + item.fk_id_art + '" data-info-nego="' + vIdAreaNegocio + '">Salvar</div><div class="w3-button w3-teal w3-hover-red w3-ripple w3-margin-top w3-margin-left w3-right w3-small w3-round-xxlarge js-bt__delete--art">Eliminar</div></div></div>';

            }
          });

        $(vElement).closest('tr').after(vCodeChunkContainer);
        vIdContainerAccordArt = "#diDummyAccord" + j;
        $(vIdContainerAccordArt).append(vCodeChunk);
        $(vIdContainerAccordArt).parent().append(vDiButton);
        fnActivateAccordFormGestion(vIdContainerAccordArt);

        },
        complete:function(){
          $('.di__img--loading').hide();
        }
      });
    });
}

function fnComponentesCursoBe(pIdArt) {

  var vTableBase = '<div class="w3-col l12 w3-center w3-margin-top"><div class="w3-responsive"><table class="w3-table-all w3-hoverable w3-centered w3-card-2 ta__cursos--be"><tr class="w3-amber"><th>Conjunto de Cursos que componen esta licencia.</th></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></table></div></div>';
  var vTableHeading ='<div class="w3-col l12 w3-center w3-margin-top"><div class="w3-responsive"><table class="w3-table-all w3-hoverable w3-centered w3-card-2 ta__cursos--be"><tr class="w3-amber"><th>Conjunto de Cursos que componen esta licencia.</th></tr>';
  var vTableEnding = '</table></div></div>';
  var vTablePiece = '<tr><td>Sin datos</td></tr>';

  try {

        $.ajax({

            type:'post',
            url:'../controller/controller.php',
            data:{'act':'fnComponentesCursoBe', 'pIdArt':pIdArt},
            dataType:'json',
            async: false, // El código se ve forzado a parar hasta que esta petición sea resuelta. Si no fnMostrarFichaArticulos sigue pintando sin esperar. Desaprobado por Mozilla. XMLHttpRequest sincrono.
            beforeSend:function(){
            },

            error:function(e){
              fnShowMsgBox(6);
            },

            success:function(d){

            vTablePiece = '';

                $.each( d, function (index, item ){

                  vTablePiece +=  '<tr><td>' + item.nombre_curso_be + '</td></tr>';

                });

            },
            complete:function(){}

        });

  } catch (error) {
    fnShowMsgBox(6);
  }

  return vTableHeading + vTablePiece + vTableEnding;

}

function fnMarcarCamposEditablesFichaArticulosBB(){ //Marca que campos son editables en la ficha de articulos de BB
    $(document).on('click','.js-bt__edit--lineBB', function(){
          var vElement = $(this);
          var v01 = $(this).parent().find('div input.js-in__editable');

          $(v01).each(function(e){
              $(this).css({"background-color": "#ffe8a3"});
              $(this).prop("readonly",false);
          });

          var vListSelects=$(this).parent().find('div select.js-in__editable');

          $(vListSelects).each(function(e){

              $(this).css({"background-color": "#ffe8a3"});
              $(this).find('option').prop("disabled",false);

              if (!$(this).filter('.se__licenciabb').hasClass('js-se__licenciabb')){
                    $(this).filter('.se__licenciabb').addClass('js-se__licenciabb');
                };
          })
          fnCargarLicenciasCompatibility(vElement); //Por compatibilidad con Chrome
    });
    v01 = undefined;
}
function fnSalvarCamposEditablesFichaArticulosBB(){ // Salva los campos editables de la ficha de articulos de BB
  $(document).on('click','.js-bt__save--lineBB',function(){

    var v01Val = fnReturnSoloNumero($(this).parent().find('div input.js-in__cdkeygroup').val());
    var v02Val = $(this).parent().find('div input.js-in__idproduct').val();
    var v03Val = $(this).parent().find('div input.js-in__inObsBb').val();
    var v04Val = $(this).parent().find('div input.in__ean').val();
    var v05Val = $(this).parent().find('div input.in__isbn').val();

    var v07Val = $(this).parent().find('div input.in__nombreweb').val();
    var v08Val = $(this).parent().find('div input.in__dto').val();
    var vLicenciaId = $(this).parent().find('div select.se__licenciabb').val()
    var vIdArt = $(this).attr("data-info");
    var vEditables = $(this).parent().find('.js-in__editable');

      $.ajax({
        type:'post',
        url:'../controller/controller.php',
        data:{'act':'fnSalvarCamposEditablesFichaArticulosBB','pCdKey':v01Val,'pIdGroup':v02Val,'pObsBb':v03Val,'pEan':v04Val,'pIsbn':v05Val,'pNombreWeb':v07Val,'pDto':v08Val,'pFiltro':vIdArt, 'pLicenciaId':vLicenciaId},
        dataType: 'json',
        type: 'post',
        indexValue: {pEditables:vEditables},
        beforeSend:function(){
          $('.di__img--loading').show();
        },
        error:function(e){
          fnShowMsgBox(7);
        },
        success:function(data){
          var vListEditablesInputs = this.indexValue.pEditables;
          var vCheck = data.resultado;
          if (vCheck === 1){
            fnShowMsgBox(3);

            fnDesmarcarCamposEditablesFichaDetallesPeticion(vListEditablesInputs);

          }
          else {
            fnShowMsgBox(0);
          }
          vListEditablesInputs=undefined;vCheck=undefined;
        },
        complete:function(){
          $('.di__img--loading').hide();
        }
      });
      v01Val=undefined;v02Val=undefined;v03Val=undefined;;v04Val=undefined;;v05Val=undefined;vIdArt=undefined;vEditables=undefined;
  });
}
function fnMarcarCamposEditablesFichaArticulosBE(){ // Marca que campos son editables en la ficha de articulos de BE

  $(document).on('click','.js-bt__edit--lineBE', function(){

  var v01 = $(this).parents('div.ui-accordion-content').find('.js-in__editable');
  var vElement = $(this);

      $(v01).each(function(e){
        $(this).css({"background-color": "#ffe8a3"});
        $(this).prop("readonly",false);
      })


      var vListSelects=$(this).parents('div.ui-accordion-content').find('div select.js-in__editable');
      $(vListSelects).each(function(e){
        $(this).css({"background-color": "#ffe8a3"});
        $(this).find('option').prop("disabled",false);

        if (!$(this).filter('.se__licenciabe').hasClass('js-se__licenciabe')){
              $(this).filter('.se__licenciabe').addClass('js-se__licenciabe');
        };
      })

      fnCargarLicenciasBeFormGestionCompatibility(vElement); // Cargo select de licencia de BE en articulo form gestión

    }
  );
  v01 = undefined;
}
function fnSalvarCamposEditablesFichaArticulosBE(){  // Salva los campos editables de la ficha de articulos de BE

  $(document).on('click','.js-bt__save--lineBE',function(){
  var v01Val = $(this).parents('div.ui-accordion-content').find('input.js-in__titulocursoweb').val();
  var v02Val = $(this).parents('div.ui-accordion-content').find('input.js-in__inObsBe').val();
  var vIdArt = $(this).attr("data-info");
  var vEditables = $(this).parents('div.ui-accordion-content').find('.js-in__editable');
  var vLicenciaBe = $(this).parents('div.ui-accordion-content').find('select.se__licenciabe').val();
  var vAlumnosBe = $(this).parents('div.ui-accordion-content').find('input.in__alumnosbe').val();

    $.ajax({
        type:'post',
        url:'../controller/controller.php',
        data:{'act':'fnSalvarCamposEditablesFichaArticulosBE','pTituloCursoWebBE':v01Val,'pObsBe':v02Val,'pLicenciaBe':vLicenciaBe, 'pFiltro':vIdArt, 'pAlumnosBe':vAlumnosBe},
        dataType: 'json',
        type: 'post',
        indexValue: {pEditables:vEditables},

        beforeSend:function(){$('.di__img--loading').show();},

        error:function(e){
            fnShowMsgBox(7);
        },

        success:function(data){
            var vListEditablesInputs = this.indexValue.pEditables;
            var vCheck = data.resultado;
            if (vCheck === 1){
              fnShowMsgBox(3);

              fnDesmarcarCamposEditablesFichaDetallesPeticion(vListEditablesInputs);

            }
            else {
                fnShowMsgBox(0);
            }
            vCheck = undefined;vListEditablesInputs= undefined;
          },

        complete:function(){$('.di__img--loading').hide();}
    });

    v01Val = undefined;vEditables = undefined;vIdArt= undefined;v02Val = undefined;
  });
}
function fnCrearModalAddArt(pIdSol, pIdNegocio){ // Crea el modal para añadir un nuevo articulo a una peticion pero sin mostrarlo.

  var aModalAddArt = [];
  aModalAddArt[1] = '<div id="id01" class="w3-modal"><div class="w3-modal-content w3-card-4"><header class="w3-container w3-teal"><span id="spClose" class="w3-button w3-display-topright">&times;</span><h2>Añade el nuevo artículo</h2></header><div class="w3-row-padding"><fieldset><div class="w3-col w3-margin-bottom"><select id="inLicencia" name="inLicencia" class="w3-select" title="Campo Obligatorio:Tipo de Licencia" data-required></select></div><div class="w3-col l12 w3-margin-top"><div class="ui-widget"><input class="w3-input w3-border w3-padding" type="text" id="inSearch" name="inSearch" placeholder="Escribe AQUI al menos 5 caracteres para la busqueda automática por NOMBRE, despues elige." data-required></div></div><div class="w3-half"><input id="inEan" name="inEan" class="w3-input w3-hover-grey js-val__num--only" type="text" maxlength="13" placeholder="EAN" title="EAN" data-required readonly></div><div class="w3-half"><input id="inIsbn" name="inIsbn" class="w3-input w3-hover-grey js-val__numyletras--guion" type="text" maxlength="13" placeholder="ISBN" title="ISBN" data-required readonly></div><div class="w3-third"><input id="inPrecioSinDtoBb" name="inPrecioSinDtoBb" class="w3-input w3-hover-grey in__precio--sdto js-val__num js-val__num--max" type="text" maxlength="6" max="150" placeholder="Precio Sin Dto IVA inc." title="Precio Sin Dto IVA inc." data-required readonly></div><div class="w3-third"><input id="inDtoBb" name="inDtoBb" class="w3-input w3-hover-grey in__dto js-val__num js-val__num--max" type="text" maxlength="5" max="100" placeholder="Descuento" title="Dto. en tanto por ciento sin el símbolo"></div><div class="w3-col l3"><input id="inPrecioConDtoBb" name="inPrecioConDtoBb" class="w3-input w3-hover-grey in__precio--cdto js-val__num js-val__num--max" type="text" maxlength="6" max="150" placeholder="Precio Final Con Dto" title="Precio Final Con Dto" readonly></div><div class="w3-col l2"><input id="inAlumnosBb" name="inAlumnosBb" class="w3-input w3-hover-grey js-val__num--only js-val__num--max" type="text" maxlength="4" max="1000" placeholder="Nº de Alumnos" title="Nº de Alumnos" data-required></div><div class="w3-col l10"><input id="inTituloCursoWebBb" name="inTituloCursoWebBb" class="w3-input w3-hover-grey" type="text" maxlength="75" placeholder="Nombre del Curso para la Eshop" title="Nombre del Curso para la Eshop" data-required></div><div class="w3-col l12"><input id="inObsBb" name="inObsBb" class="w3-input w3-hover-grey" type="text" maxlength="144" placeholder="Observaciones referentes a este título/curso. Por ejemplo para indicar si el libro no lleva IVA o si forma parte de un pack con el siguiente artículo." title="Observaciones referentes a este título/curso."></div></fieldset></div><footer class="w3-container w3-center w3-teal"><div id="" class="w3-button w3-white w3-border w3-margin js-bt__save--newart" data-info="' + pIdSol + '" data-info-negocio="' + pIdNegocio + '">Salvar</div><div id="btCerrarDetalles" class="w3-button w3-white w3-border w3-margin">Cerrar</div></footer></div></div>';
  aModalAddArt[2] = '<div id="id01" class="w3-modal"><div class="w3-modal-content w3-card-4"><header class="w3-container w3-teal"><span id="spClose" class="w3-button w3-display-topright">&times;</span><h2>Añade el nuevo artículo</h2></header><div class="w3-row di__be"><div class="w3-col s12 m12 l12"><select id="seLicenciaBe" name="seLicenciaBe" class="w3-select" title="Campo Obligatorio:Elige tipo de licencia" data-required></select></div><div class="w3-col l4"><select id="seCursosEspecialidades" name="seCursosEspecialidades" class="w3-select" title="Especialidades"></select></div><div class="w3-col l1"><div id="btAddCursoEspBe" class=" w3-button w3-teal w3-ripple">+</div></div><div class="w3-col l2"><select id="seCursosGenerales" name="seCursosGenerales" class="w3-select" title="Cursos Generales"></select></div><div class="w3-col l1"><div id="btAddCursoGenBe" class="w3-button w3-teal w3-ripple">+</div></div>  <div class="w3-col l3"><select id="seWordlist" name="seWordlist" class="w3-select" title="Elige WordList y pulsa en + para añadir"></select></div><div class="w3-col l1"><div id="btAddWordlist" class="w3-button w3-teal w3-ripple">+</div></div>     <div class="w3-col l12 w3-center w3-margin-top"><div class="w3-responsive"><table class="w3-table-all w3-hoverable w3-centered w3-card-2 ta__cursos--be" id="taCursosBe"><tr class="w3-amber"><th>Conjunto de Cursos que componen esta licencia.</th></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></table></div></div><div class="w3-col l12"><input id="inTituloCursoWebBe" name="inTituloCursoWebBe" class="w3-input w3-hover-grey w3-col" type="text" maxlength="75" placeholder="Nombre del Curso para la Eshop" title="Campo Obligatorio:Nombre del Curso para la Eshop" data-required></div><div class="w3-third"><input id="inAlumnosBe" name="inAlumnosBe" class="w3-input w3-hover-grey js-val__num js-val__num--max" type="text" maxlength="3" max="1000" placeholder="Nº de Alumnos" title="Campo Obligatorio:Nº de Alumnos" data-required></div><div class="w3-third"><select id="inMicroBe" name="inMicroBe" class="w3-select" title="Campo Obligatorio:Indicar modelo del micro" data-required></select></div><div class="w3-third"><select id="inEnvioBe" name="inEnvioBe" class="w3-select" title="Campo Obligatorio:¿Envío al Centro o a domicilio?" data-required></select></div><div class="w3-col l12"><input id="inFechaInicioBe" name="inFechaInicioBe" class="w3-input w3-hover-grey" type="date" title="Fecha Inicio:Opcional"></div><div class="w3-col l12"><input id="inFechaFinBe" name="inFechaFinBe" class="w3-input w3-hover-grey" type="date" title="Fecha Fin:Opcional"></div><div class="w3-col l12"><input id="inObsBe" name="inObsBe" class="w3-input w3-hover-grey" type="text" maxlength="144" placeholder="Observaciones" title="Observaciones referentes a este título/curso"></div></div><footer class="w3-container w3-center w3-teal"><div id="" class="w3-button w3-white w3-border w3-margin js-bt__save--newart" data-info="' + pIdSol + '" data-info-negocio="' + pIdNegocio + '">Salvar</div><div id="btCerrarDetalles" class="w3-button w3-white w3-border w3-margin">Cerrar</div></footer></div></div>';

  $( "body" ).append(aModalAddArt[pIdNegocio]);
  $( document ).one("click", "#spClose", function() {$( '#id01' ).fadeOut(300);setTimeout(() => {$( '#id01' ).remove();},400)});
  $( document ).one("click", "#btCerrarDetalles", function() {$( '#id01').fadeOut(300);setTimeout(() => {$( '#id01' ).remove();},400)});

  if ( +pIdNegocio === 1 ){ //Llamo a las fn que cargan los select. El símbolo + es la forma corta de un parseInt

    fnCargarLicenciasAlInicio();

  } else {

    fnCargarMicrofonoAlInicio();  //Llamamos a las funciones de carga de selects
    fnCargarTipoEnvioBeAlInicio();
    fnCargarLicenciasBe();
    fnCargarCursosBeAlInicioEsp();
    fnCargarCursosBeAlInicioGen();
    fnCargarCursosBeAlInicioWordlist();
  }

}
function fnCuadroAddArt(){ // Muestra cuadro modal de nuevo articulo.
  $( document ).on('click', '.js-in__add--art', function(){
    var vIdSol = $(this).attr( "data-info" ), vIdNegocio = $(this).attr( "data-info-negocio" );
    fnCrearModalAddArt( vIdSol, vIdNegocio );
    $( '#id01' ).fadeIn( 150 );
  });
}
function fnSalvarNuevoArt(){ // Añadir / Salvar el nuevo articulo a una solicitud ya hecha.

  $(document).on('click','.js-bt__save--newart',function(){

      var vIdSol = $(this).attr("data-info");
      var vIdNego = $(this).attr("data-info-negocio");
      var vArray = new Array();//El objeto Array de JS es un obj global
      var vObj = new Object();
      var vArrayString;
      var vNegocio = 0;

      if (vIdNego == 2){vNegocio = 1;};//Según el negocio necesito llamar a la función de validar con un parametro diferente

        if ((fnValidarSumatorioRequiredPlus(vNegocio)) === true){

          if (vIdNego == 1){

            vObj.licencia = $('#inLicencia').val();
            vObj.ean = $('#inEan').val();
            vObj.isbn = $('#inIsbn').val();
            vObj.bookcode = $('#inSearch').attr("data-info");
            vObj.titulocursowebbb = $('#inTituloCursoWebBb').val();
            vObj.preciosindtobb = $('#inPrecioSinDtoBb').val();
            vObj.dtobb = $('#inDtoBb').val();
            vObj.alumnosbb = $('#inAlumnosBb').val();
            vObj.obsBb = $('#inObsBb').val();

          }
          else{

            vObj.titulocursobe = fnAddCombinacionCursosToArray();
            vObj.titulocursowebbe = $('#inTituloCursoWebBe').val();
            vObj.tipolicenciabe = $('#seLicenciaBe').val();
            vObj.alumnosbe = $('#inAlumnosBe').val();
            vObj.microfonobe = $('#inMicroBe').val();
            vObj.enviocentrobe = $('#inEnvioBe').val();
            vObj.fechainiciobe = $('#inFechaInicioBe').val();
            vObj.fechafinbe = $('#inFechaFinBe').val();
            vObj.obsBe = $('#inObsBe').val();

          }

        vArray.push(JSON.parse(JSON.stringify(vObj)));//Los objetos mantienen su referencia en memoria así que hay que clonarlos o pasarlos por otros metodos
        vArrayString = JSON.stringify(vArray);

        $.ajax({
          type:'post',
          url:'../controller/controller.php',
          dataType:'json',
          data:{'act':'fnAddNewArt','pArray':vArrayString,'pSol':vIdSol,'pIdNego':vIdNego},
          beforeSend:function(){},
          error:function(e){},
          success:function(d){
            if (d.resultado === 1){fnShowMsgBox(8);}
            else {fnShowMsgBox(0)}
          },
          complete:function(){$('#id01').fadeOut(300);setTimeout(() => {$('#id01').remove();},400);}
        });
    }
    else{
        fnShowMsgBox(1);
    }
     vIdSol=undefined;vIdNego =undefined;vArray =undefined;vObj =undefined;vArrayString=undefined;vNegocio=undefined;
  });
}
function fnModalForEliminarArticulo(){ //Lanzamos modal para confirmar si elimina un articulo de una solicitud ya realizada
  $(document).on('click','.js-bt__delete--art',function(){
    var vElement = $(this);
    var vIdSolicitud = $(this).closest('tr.js-tr__ficha--articulo').attr("data-info");
    var vIdAreaNegocio = $(this).prev().attr("data-info-nego");
    var vIdArt=$(this).prev().attr("data-info");
    var vMsgBox ='<div id="dialog-confirm" title="Cuadro de confirmación" style="display:none;"><p>Va a eliminar el artículo seleccionado</p></div>';
    $('body').append(vMsgBox);
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "Borrar Artículo": function() {
          $( this ).dialog( "close" );
          $("#dialog-confirm").remove();
          fnEliminarArticulo(vIdSolicitud,vIdArt,vIdAreaNegocio,vElement);
        },
        Cancel: function() {
          $( this ).dialog( "close" );
          $("#dialog-confirm").remove();
        }
      }
    });
  });
}
function fnEliminarArticulo(pIdSolicitud,pIdArt,pIdAreaNegocio,pElement){ // Elimina el articulo de una solicitud ya realizada
  try {
    $.ajax({
      type:'post',
      url:'../controller/controller.php',
      dataType:'json',
      data:{'act':'fnEliminarArticulo','pIdSol':pIdSolicitud,'pIdArt':pIdArt,'pIdNego':pIdAreaNegocio},
      beforeSend:function(){},
      error:function(e){},
      success:function(d){
        if (d.resultado === 1){fnShowMsgBox(3);}
        else {fnShowMsgBox(0)}
      },
      complete:function(){$(pElement).closest('tr.js-tr__ficha--articulo').find(".js-bt__close--line" ).trigger( "click" )}
    });
  } catch (error) {
    fnShowMsgBox(6);
  }
}
function fnMarcarCamposEditablesFichaDetallesPeticion(){ // En la ficha de los detalles de una petición habilitamos y marcamos la info que SI podemos cambiar.
    $(document).on('click','.js-bt__edit--fichadetalles', function(){
        var vElement = $(this);
        var vListInputs = $(this).parents('tr').find('div input.js-in__editable');
            $(vListInputs).each(function(e){
              $(this).css({"background-color": "#ffe8a3"});
              $(this).prop("readonly",false);
            })

        var vListSelects=$(this).parents('tr').find('div select.js-in__editable');

            $(vListSelects).each(function(e){

              $(this).css({"background-color": "#ffe8a3"});
              $(this).find('option').prop("disabled",false);

            })

            if (!$(this).filter('.se__estado').hasClass('js-se__estado')){
              $(this).filter('.se__estado').addClass('js-se__estado');
              fnCargarEstadosCompatibility(vElement); //Por compatibilidad con Chrome
           };

           if (!$(this).filter('.se__asign').hasClass('js-se__asign')){
            $(this).filter('.se__asign').addClass('js-se__asign');
            fnCargarAsignCompatibility(vElement); //Por compatibilidad con Chrome
         };

    });
  vListInputs=undefined;vListSelects=undefined;
}

function fnDesmarcarCamposEditablesFichaDetallesPeticion(pList){ // Cuando el cambio se ha hecho marcamos en verde los campos editables
  $(pList).filter('input').each(function(e){
    $(this).css({"background-color": "#dce674"});
    $(this).prop("readonly",true);
  })
  $(pList).filter('select').each(function(e){
    $(this).css({"background-color": "#dce674"});
    $(this).find('option').prop("disabled",false);
  })
}

function fnSalvarCamposEditablesFichaDetallesPeticion(){  // Enviamos la orden para actualizar los datos de la peticion desde la ficha de Detalles de la petición
    $(document).on('click','.js-bt__save--fichadetalles',function(){
      var vWeb = $(this).parents('tr').find('input.js-in__web').val(),
       vNumTienda = $(this).parents('tr').find('input.js-in__numtienda').val(),
        vEstado = $(this).parents('tr').find('select.se__estado').val(),
        vEstadoTxt = $(this).parents('tr').find('select.se__estado option:selected').text(),
         vIdSol = $(this).attr("data-info"),
          vEditables = $(this).parents('tr').find('.js-in__editable'),
           vObsGen = $(this).parents('tr').find('input.in__obs--gen').val(),
           vAsign = $(this).parents('tr').find('select.se__asign').val(),
           vAsignTxt = $(this).parents('tr').find('select.se__asign option:selected').text(),
           vElement = $(this);
      try {
          $.ajax({
              type:'post',
              url:'../controller/controller.php',
              dataType: 'json',
              data:{'act':'fnSalvarCamposEditablesFichaDetallesPeticion','pWeb':vWeb,'pNumTienda':vNumTienda,'pEstado':vEstado, 'pObsGen':vObsGen, 'pFiltro':vIdSol, 'pAsign':vAsign},
              indexValue: {pEditables:vEditables, pAsignTxt:vAsignTxt, pElement:vElement, pEstadoTxt:vEstadoTxt},//Propiedad usada para pasar info a callbacks
              beforeSend:function(){fnLoadingGifToggle();
              },
              error:function(e){
                fnShowMsgBox(7);
              },
              success:function(data){
                var vListEditablesInputs = this.indexValue.pEditables;
                var vCheck = data.resultado;
                if (vCheck === 1){
                  fnShowMsgBox(3);
                  fnDesmarcarCamposEditablesFichaDetallesPeticion(vListEditablesInputs);
                  fnActualizarAsignTxt(this.indexValue.pElement, this.indexValue.pAsignTxt);
                  fnActualizarEstadoTxt(this.indexValue.pElement, this.indexValue.pEstadoTxt);
                }
                else {
                  fnShowMsgBox(0);
                }
                vCheck = undefined;vListEditablesInputs=undefined;
              },
              complete:function(){fnLoadingGifToggle();

                $.each($(".se__estado").find("option selected[value='false']"), function (index, item){ //WTF
                  $(item).remove();
                });
              }
            });
        } catch (error) {
            fnShowMsgBox(6);
        }
      vWeb=undefined;vEditables=undefined;vIdSol=undefined;vNumTienda=undefined;
      });
}
function fnCargarEstados(){ //Cargamos en un select determinado la lista de estados posibles de una solicitud
  var vElement;
  $(document).on('click','.js-se__estado',function(){
      vElement=$(this);
      if ($(vElement).attr('data-info-desplegado') == 'no'){ //El atributo nos dice si el campo ha sido deplegado
          try {
            $.ajax({
              type: 'post',
              url: '../controller/controller.php',
              dataType: 'json',
              data: {'act':'fnCargarEstados'},
              success: function(d){
                  $(vElement).attr('data-info-desplegado','si'); //Cambiamos attr para indicar que ya hemos añadido los posibles estados al select
                  $.each(d, function (index, item){
                      $(vElement).append('<option value="' + item.id_estado + '">' + item.nombre_estado + ': ' + item.descripcion_estado + '</option>');
                  });
                }
            });
          } catch (error) {
            fnShowMsgBox(6);
          }
      $(vElement).removeClass('js-se__estado');
      }
  });
  vElement=null;
}

function fnCargarEstadosCompatibility(pElement){ //Cargamos en un select determinado la lista de estados posibles de una solicitud. Compatibilidad con Chrome que no carga el select hasta el segundo click.

  var vElement = $(pElement).parent().siblings('div.w3-third').find('.se__estado');

  if ($(vElement).attr('data-info-desplegado') == 'no'){ //El atributo nos dice si el campo ha sido deplegado
          try {
            $.ajax({
              type: 'post',
              url: '../controller/controller.php',
              dataType: 'json',
              data: {'act':'fnCargarEstados'},
              success: function(d){

                  $(vElement).attr('data-info-desplegado','si'); //Cambiamos attr para indicar que ya hemos añadido los posibles estados al select

                  $.each(d, function (index, item){
                      $(vElement).append('<option value="' + item.id_estado + '">' + item.nombre_estado + ': ' + item.descripcion_estado + '</option>');
                  });
                }
            });
          } catch (error) {
            fnShowMsgBox(6);
          }
      $(vElement).removeClass('js-se__estado');
      }

}

function fnCargarAsignCompatibility(pElement){ //Cargamos en un select determinado la lista de asignados Compatibilidad con Chrome que no carga el select hasta el segundo click.

  var vElement = $(pElement).parent().siblings('div.w3-third').find('.se__asign');

  if ($(vElement).attr('data-info-desplegado') == 'no'){ //El atributo nos dice si el campo ha sido deplegado
          try {
            $.ajax({
              type: 'post',
              url: '../controller/controller.php',
              dataType: 'json',
              data: {'act':'fnCargarAsign'},
              success: function(d){

                  $(vElement).attr('data-info-desplegado','si'); //Cambiamos attr para indicar que ya hemos añadido los posibles

                  $.each(d, function (index, item){
                      $(vElement).append('<option value="' + item.id_sol + '">' + item.nombre_sol + ' ' + item.apellidos_sol + '</option>');
                  });
                }
            });
          } catch (error) {
            fnShowMsgBox(6);
          }
      $(vElement).removeClass('js-se__asign');
      }

}

function fnCargarLicenciasCompatibility(pElement){ //Cargamos en un select determinado la lista de estados posibles de una solicitud. Compatibilidad con Chrome que no carga el select hasta el segundo click.

  var vElement = $(pElement).parent().find('.se__licenciabb');

  if ($(vElement).attr('data-info-desplegado') == 'no'){ //El atributo nos dice si el campo ha sido deplegado
          try {
            $.ajax({
              type: 'post',
              url: '../controller/controller.php',
              dataType: 'json',
              data: {'act':'fnCargarLicencias'},
              success: function(r){

                  $(vElement).attr('data-info-desplegado','si'); //Cambiamos attr para indicar que ya hemos añadido los posibles estados al select

                  $.each(r, function (index, item){
                      $(vElement).append('<option value="' + item.id_licencia_bb + '">' + item.tipo_licencia_bb + '</option>');
                    });
                }
            });
          } catch (error) {
            fnShowMsgBox(6);
          }
      $(vElement).removeClass('js-se__licenciabb');
      }

}

function fnCargarLicenciasBeFormGestion(){ //Cargamos en un select determinado la lista de estados posibles de una solicitud
  var vElement;
  $(document).on('click','.js-se__licenciabe',function(){
      vElement=$(this);
      if ($(vElement).attr('data-info-desplegado') == 'no'){
          try {
            $.ajax({
              type: 'post',
              url: '../controller/controller.php',
              dataType: 'json',
              data: {'act':'fnCargarLicenciasBe','pPrivacidad':1},
              beforeSend: function(){fnLoadingGifToggle(); },
              success: function(d){

                  $(vElement).attr('data-info-desplegado','si'); //Cambiamos attr para indicar que ya hemos añadido los posibles estados al select
                  let vLicencia = parseInt($(vElement).val());  //Nos Quedamos con el valor del select
                  $(vElement).empty(); //Vaciamos contenido para que no haya duplicados

                  $.each(d, function (index, item){

                      if ( vLicencia == item.id_licencia_be ){ //Si coincide con el valor que había seleccionado, lo dejo con el attr selected
                        $(vElement).append('<option  value="' + item.id_licencia_be + '" selected>' + item.tipo_licencia_be + ' (' + item.componentes_licencia_be + ') Meses:' + item.duracion_licencia_be + ' Pvp:' + item.precio_licencia_be + '</option>');
                      }
                      else{
                        $(vElement).append('<option  value="' + item.id_licencia_be + '">' + item.tipo_licencia_be + ' (' + item.componentes_licencia_be + ') Meses:' + item.duracion_licencia_be + ' Pvp:' + item.precio_licencia_be + '</option>');
                      }

                  });
                },
                complete: function(){fnLoadingGifToggle();}
            });
          } catch (error) {
            fnShowMsgBox(6);
          }
      $(vElement).removeClass('js-se__licenciabe');
      }
  });
  vElement=null;
}

function fnCargarLicenciasBeFormGestionCompatibility(pElement){ //Cargamos en un select determinado la lista de estados posibles de una solicitud, fn compatibilidad select Chrome

  var vElement = $(pElement).parent().find('select.se__licenciabe');

  if ($(vElement).attr('data-info-desplegado') == 'no'){

          try {
            $.ajax({
              type: 'post',
              url: '../controller/controller.php',
              dataType: 'json',
              data: {'act':'fnCargarLicenciasBe','pPrivacidad':1},
              beforeSend: function(){fnLoadingGifToggle(); },
              success: function(d){

                  $(vElement).attr('data-info-desplegado','si'); //Cambiamos attr para indicar que ya hemos añadido los posibles estados al select
                  let vLicencia = parseInt($(vElement).val());  //Nos Quedamos con el valor del select
                  $(vElement).empty(); //Vaciamos contenido para que no haya duplicados

                  $.each(d, function (index, item){

                      if ( vLicencia == item.id_licencia_be ){ //Si coincide con el valor que había seleccionado, lo dejo con el attr selected
                        $(vElement).append('<option  value="' + item.id_licencia_be + '" selected>' + item.tipo_licencia_be + ' (' + item.componentes_licencia_be + ') Meses:' + item.duracion_licencia_be + ' Pvp:' + item.precio_licencia_be + '€ //  ' + fnIfNullOrZeroReturnVoid(item.cod_a3_licencia_be) + '</option>');
                      }
                      else{
                        $(vElement).append('<option  value="' + item.id_licencia_be + '">' + item.tipo_licencia_be + ' (' + item.componentes_licencia_be + ') Meses:' + item.duracion_licencia_be + ' Pvp:' + item.precio_licencia_be + '€ //  ' + fnIfNullOrZeroReturnVoid(item.cod_a3_licencia_be) + '</option>');
                      }

                  });
                },
                complete: function(){fnLoadingGifToggle();}
            });
          } catch (error) {
            fnShowMsgBox(6);
          }
      $(vElement).removeClass('js-se__licenciabe');

      }
}

function fnActualizarAsignTxt(pElement, pAsignTxt){
  $(pElement).parents('tr').prev().find('.td__asign').html(pAsignTxt);
}
function fnActualizarEstadoTxt(pElement, pEstadoTxt){
  $(pElement).parents('tr').prev().find('.td__estado').html(pEstadoTxt.split(':').shift());
}
function fnBusquedaAuto(){ //Función para el plugin de jQueryUI Autocomplete (Cuadro de busqueda de libros)

  $("body").on("click", "#inSearch", function(){
           $(this).autocomplete({
              source: function(request, response){
                  $.ajax({
                      url:'../controller/controller.php',
                      contentType: "application/json; charset=utf-8",
                      dataType:'json',
                      data:{'act':'fnBusquedaAuto', 'keyword':request.term}, // El objeto request tiene los caracteres a buscar.
                      beforeSend: function(){fnLoadingGifToggle(); },
                      success: function(data){ //Opción de cache o coger de un Json en la documentación del plugin.
                          response(data);
                      },
                      complete: function(){fnLoadingGifToggle(); }
                  });
                },      //Número de caracteres mínimo para que la busqueda empiece
                  minLength:5,
                  select: function (event, ui){ //Conf que pasa tras seleccionar un elemento.
                      this.value = (ui.item.nombre_libro_bb);
                      $('#inSearch').attr("data-info", ui.item.id_libro_bb);
                      $('#inEan').val(ui.item.ean);
                      $('#inIsbn').val(ui.item.isbn);
                      $('#inPrecioSinDtoBb').val(fnFormatNumToESP(ui.item.precio_bb));
                      $('#inPrecioConDtoBb').val(fnFormatNumToESP(ui.item.precio_bb));
                      $('#inPrecioConDtoBb').attr('max', ui.item.precio_bb); // Ajusto el valor máximo de este campo, igual a su pvp.

                      return false;
                  },
                  focus: function(event, ui){ //Cuando hover sobre un elemento de la lista, que es lo que pasa en el cuadro de busqueda.
                      $('#inSearch').val(ui.item.nombre_libro_bb );
                  },
            })
            .autocomplete("instance")._renderItem = function(ul, item){ //Conf del menú emergente
                return $("<li>")
                .append("<div>" + item.nombre_libro_bb + "</div>")
                .appendTo(ul);
            };
    })
}


function fnAutoCompleteEanIsbn(){ // Autocompleta al darle a un botón. // Sin uso.

  $(document).on('click','.js-bt__complete--ean', function(){

    let vIdProAttr = $("#inSearch").attr('data-info');

    if (typeof(vIdProAttr) == "number"){ // Check si el atributo es numerico
      try {
          $.ajax({
            type:'post',
            url:'../controller/controller.php',
            dataType:'json',
            data:{'act':'fnCompleteEanIsbn', 'pIdProAttr': vIdProAttr},
            beforeSend:function(){
              fnLoadingGifToggle();
            },
            error:function(e){
              fnShowMsgBox(7);
            },
            success:function(d){

              if ($.trim(d)){ //Comprobamos si los datos están vacios
                  $.each(d, function (index, item){
                    $('#inEan').val(item.ean);
                    $('#inIsbn').val(item.isbn);
                  });
              }
              else {
                fnShowMsgBox(0);
              }

            },
            complete:function(){
              fnLoadingGifToggle();
            }
          })
      } catch (e) {
        fnShowMsgBox(6);
      }

    } else{
      alert("Escoge un Libro antes de autocompletar");
    }
  });
}

function fnLoadingGif(){ // Crea el gif típico de "cargando, espere."

  let vLoadingBox = '<div class="di__img--loading"><img src="css/images/ajax_loader_gray_512.gif"></div>';

  $("body").append(vLoadingBox);

  vLoadingBox = null;
}

function fnLoadingGifToggle(){ // Evento del gif típico de "cargando, espere." para mostrar u ocultar.
  $('.di__img--loading').toggle();
}

function fnAddCursoEspBe(){ // Añadimos a una tabla html un curso Especialidad de be

  $(document).on('click', '#btAddCursoEspBe', function(){

    var vCursoEspBeVal = $('#seCursosEspecialidades').val();
    var vCursoEspBeName = $('#seCursosEspecialidades option:selected').text();
    var vEmptyTdList = $('#taCursosBe td');
    var i = 0;

    if ( vCursoEspBeVal !== null ){

      $(vEmptyTdList).each(function (e){

        if (( !$(this).html() ) && ( i < 1 )) {

            $(this).attr("data-info", vCursoEspBeVal);
            $(this).html(vCursoEspBeName);
            i++;

        }
      });
    }
  });
}

function fnBorrarCursoDeListaEspBe(){

  $(document).on('click', '#btBorrarCursoDeListaEspBe', function(){

    let vTaCursosBe = $('#taCursosBe td');

    $(vTaCursosBe).each(function(){

        $(this).attr("data-info", "");
        $(this).empty();
    });

  });

}


function fnAddCursoGenBe(){ // Añadimos a una tabla html un curso general de be

  $(document).on('click', '#btAddCursoGenBe', function(){

    var vCursoGenBeVal = $('#seCursosGenerales').val();
    var vCursoGenBeName = $('#seCursosGenerales option:selected').text();
    var vEmptyTdList = $('#taCursosBe td');
    var i = 0;

    if ( vCursoGenBeVal !== null ){

        $(vEmptyTdList).each(function (e){

            if (( !$(this).html() ) && ( i < 1 )) {

                $(this).attr("data-info", vCursoGenBeVal);
                $(this).html(vCursoGenBeName);
                i++;
            }
        });
      }
  });
}

function fnAddCursoWordlistBe(){ // Añadimos a una tabla html un curso wordlist de be

  $(document).on('click', '#btAddWordlist', function(){

    var vCursoWordlistBeVal = $('#seWordlist').val();
    var vCursoWordlistBeName = $('#seWordlist option:selected').text();
    var vEmptyTdList = $('#taCursosBe td');
    var i = 0;

    if ( vCursoWordlistBeVal !== null ){

        $(vEmptyTdList).each(function (e){

            if (( !$(this).html() ) && ( i < 1 )) {

                $(this).attr("data-info", vCursoWordlistBeVal);
                $(this).html(vCursoWordlistBeName);
                i++;
            }
        });
      }
  });
}

function fnAddCombinacionCursosToArray(){ // Guardamos en un array los cursos que hemos añadido en BE

  var aListCodes = [];
  var vEmptyTdList = $('#taCursosBe td');

  $(vEmptyTdList).each(function (e){

    if ( $(this).html() ) {

        aListCodes.push($(this).attr("data-info"));
    }
  });

    return aListCodes;
}

function fnEnviarUrl(){ // Evento y conf del boton para enviar la URL por mail

    $(document).on('click','.js-bt__mail--url',function(){

      let vUrl = $(this).parent().prev().find('input.in__web').val();
      let vIdSol = $(this).parent().siblings('div.w3-bar').find('.bt__save--fichadetalles').attr('data-info');



      if ( vUrl !== "" && vUrl !== null ){
          try{
              $.ajax({
                type:'post',
                url:'../controller/controller.php',
                dataType:'json',
                data:{'act':'fnEnviarUrl','pUrl':vUrl, 'pIdSol':vIdSol},
                beforeSend:function(){fnLoadingGifToggle();},

                error:function(e){
                    fnShowMsgBox(7);
                },
                success:function(d){

                  let vCheck = d.resultado;

                    if (+vCheck === 1){
                      fnShowMsgBox(12);
                    }
                    else {
                      fnShowMsgBox(11);
                    }

                  vCheck = undefined;

                },
                complete:function(){fnLoadingGifToggle();
              }
            });

          } catch (error) {
            fnShowMsgBox(6);
          }
      }
      vUrl = null, vIdSol = null;
    });

}


function fnShowMsgBox(pMsg){ // FN para mostrar mensajes en pantalla con un cuadro con la opción OK.

  let aMsg = new Array(), vMsgBox = "";

  aMsg.push("Error en la operación. Solicitud/Cambio no realizado");  // 0
  aMsg.push("Campos obligatorios vacios");
  aMsg.push("Libro/curso añadido");
  aMsg.push("La petición ha sido procesada correctamente"); //3
  aMsg.push("Campos Generales obligatorios vacios");
  aMsg.push("Campos Generales obligatorios vacios o Ningún Curso Añadido");
  aMsg.push("Error indeterminado"); //6
  aMsg.push("Error en la operación. Fallo al enviar/procesar datos");
  aMsg.push("Articulo añadido. Vueva a abrir la ficha.");
  aMsg.push("AlCaNzAdO MeNsAjE pArA DeBuG");               //9
  aMsg.push("Revise todos los datos de la petición");
  aMsg.push("Sin resultados");
  aMsg.push("Mail enviado");     //12
  aMsg.push("Nada que actualizar");
  aMsg.push("Petición Duplicada con exito");

  vMsgBox ='<div id="diMessagePredet" title="Información" style="display:none;"><p> ' + aMsg[pMsg] + ' </p></div>';

  $('body').append(vMsgBox);
  $( function() {
      $( "#diMessagePredet" ).dialog({
        modal: true,
        buttons: {
          Ok: function() {
            $( this ).dialog( "close" );
            $("#diMessagePredet").remove();
          }
        }
      });
    });
    aMsg.length = 0; aMsg = null; vMsgBox = null;
}

function fnInputSoloNumero() {//Borra los datos, en tiempo real, que no sean números
  $(document).on('keyup','.js-val__num--only',function(){
      this.value = (this.value + '').replace(/[^0-9]/g, '');
    });
}
function fnReturnSoloNumero(p01){ //Elimina lo que no sea un número.
  return (p01).replace(/[^0-9]/g, '');
}

function fnInputSoloNumeroComa() {//Borra los datos, en tiempo real, que no sean números o comas. Solo permite una coma.
  $(document).on('keyup','.js-val__num',function(){
      this.value = (this.value + '').replace(/[^0-9,\,]/g, '').replace(/([^,]*\,[^,]*)\,/g, '$1');
    });
}
function fnReturnSoloNumeroComa(p01){ //Elimina lo que no sea un número o coma.
  return (p01).replace(/[^0-9,\,]/g, '').replace(/([^,]*\,[^,]*)\,/g, '$1');
}

function fnInputSoloNumeroGuiones() {//Borra los datos, en tiempo real, que no sean números o un guión
  $(document).on('keyup','.js-val__numguion',function(){
      this.value = (this.value + '').replace(/[^0-9,-]/g, '');
    });
}
function fnInputSoloNumeroLetrasGuion() {//Borra los datos, en tiempo real, que no sean números
  $(document).on('keyup','.js-val__numyletras--guion',function(){
      this.value = (this.value + '').replace(/[^0-9a-zA-Z,-]/g, '');
    });
}
function fnInputNumMaxDependiendoAttr() {//Borra el dato numérico de un input text/num dependiendo del attr
  $(document).on('keyup','.js-val__num--max',function(){
      if (($(this).val()) > (parseInt($(this).attr("max")))){
        $(this).val($(this).val().slice(0, -1));
      }
    });
}
function fnPrecioConDto(){ // Aplico el dto a un precio y pego en un input el resultado. // Sin USO

    $(document).on('click','.js-bt__complete--dtopvp',function(){

        let vPvSinDto = ($('#inPrecioSinDtoBb').val());
        let vDto = ($("#inDtoBb").val());
        let vPvConDto = 0;


        if ( ($.trim(vPvSinDto)) && ($.trim(vDto)) ){

          vPvSinDto = parseFloat(vPvSinDto);
          vDto = parseFloat(vDto);

          if (typeof(vPvSinDto) == "number" && typeof(vDto) == "number") {

              vPvConDto = fnFormatNumToESP(((vPvSinDto * (100 - vDto))/100 ).toFixed(2));
            }
        }

        $('#inPrecioConDtoBb').val(vPvConDto);

    });
}

function fnCalcularPvpSegunDto(){ // Calcular el PVP según el campo dto

  $(document).on('keyup','#inDtoBb',function(){

    let vPvSinDto = ($('#inPrecioSinDtoBb').val()).replace(',', '.');
    let vDto = ($("#inDtoBb").val()).replace(',', '.');
    let vPvConDto = 0;


    if ( ($.trim(vPvSinDto)) && ($.trim(vDto)) ){

      vPvSinDto = parseFloat(vPvSinDto);
      vDto = parseFloat(vDto);

      if (typeof(vPvSinDto) == "number" && typeof(vDto) == "number") {

          vPvConDto = fnFormatNumToESP(((vPvSinDto * (100 - vDto))/100 ).toFixed(2));
        }
    }

    $('#inPrecioConDtoBb').val(vPvConDto);


  });
}
function fnCalcularPvpSegunDtoRel(){ // Calcular el PVP según el campo dto con rutas relativas. Para ficha artículos de form gestion.

  $(document).on('keyup','.js-in__dto',function(){

    let vPvSinDto = ($(this).parent().siblings('div').find('.in__precio').val()).replace(',', '.');
    let vDto = ($(this).val()).replace(',', '.');
    let vPvConDto = ($(this).parent().siblings('div').find('.in__pvp--condto').val()).replace(',', '.');
    let vElementPvConDto = ($(this).parent().siblings('div').find('.in__pvp--condto'));
    vPvConDto = vPvSinDto; // Si se deja el cuadro dto vacio el precio final se iguala al default

    if ( ($.trim(vPvSinDto)) && ($.trim(vDto)) ){

      vPvSinDto = parseFloat(vPvSinDto);
      vDto = parseFloat(vDto);

      if (typeof(vPvSinDto) == "number" && typeof(vDto) == "number") {

          vPvConDto = fnFormatNumToESP(((vPvSinDto * (100 - vDto))/100 ).toFixed(2));
        }
    }


    $(vElementPvConDto).val(vPvConDto);


  });
}
function fnCalcularDtoSegunPvp(){ // Calcular el PVP según el campo dto

  $(document).on('keyup','#inPrecioConDtoBb',function(){

    let vPvSinDto = ($('#inPrecioSinDtoBb').val()).replace(',', '.');
    let vDto = 0;
    let vPvConDto = $('#inPrecioConDtoBb').val().replace(',', '.');


    if ( ($.trim(vPvSinDto)) && ($.trim(vPvConDto)) ){

      vPvSinDto = parseFloat(vPvSinDto);
      vPvConDto = parseFloat(vPvConDto);

      if (typeof(vPvSinDto) == "number" && typeof(vPvConDto) == "number") {

        vDto = ((( vPvConDto * 100)/vPvSinDto) - 100 ).toFixed(2);

        }
    }

    $('#inDtoBb').val(fnFormatNumToESP(vDto.toString().replace('-','')));


  });
}
function fnCalcularDtoSegunPvpRel(){ // Calcular el PVP según el campo dto con rutas relativas

  $(document).on('keyup','.js-in__pvp--condto',function(){

    let vPvSinDto = ($(this).parent().siblings('div').find('.in__precio').val()).replace(',', '.');
    let vPvConDto = ($(this).val()).replace(',', '.');
    let vDto = "0";
    let vElementDto = ($(this).parent().siblings('div').find('.in__dto'));


    if ( ($.trim(vPvSinDto)) && ($.trim(vPvConDto)) ){

      vPvSinDto = parseFloat(vPvSinDto);
      vPvConDto = parseFloat(vPvConDto);

      if (typeof(vPvSinDto) == "number" && typeof(vPvConDto) == "number") {

        vDto = ((( vPvConDto * 100)/vPvSinDto) - 100 ).toFixed(2);

        }
    }

    $(vElementDto).val(fnFormatNumToESP(vDto.replace('-','')));


  });
}
function fnSincroTablaLibros(){

  $(document).on('click','#bSincroBd',function(){

    $.ajax({
      type:'post',
      url:'../controller/controller.php',
      dataType:'json',
      data:{'act':'fnSincroTablaLibros'},
      beforeSend:function(){fnLoadingGifToggle();},

      error:function(e){
          fnShowMsgBox(7);
      },
      success:function(d){


        let vCheck = 0;
        vCheck = d.resultado;

          if (+vCheck === 1){
            fnShowMsgBox(3);
          }
          else {
            fnShowMsgBox(11);
          }

        vCheck = undefined;

      },
      complete:function(){fnLoadingGifToggle();
    }
  });

  });
}

function fnSincroBdTablaColegio(){

  $(document).on('click','#bSincroColegios',function(){

    $.ajax({
      type:'post',
      url:'../controller/controller.php',
      dataType:'json',
      data:{'act':'fnSincroBdTablaColegio'},
      beforeSend:function(){fnLoadingGifToggle();},

      error:function(e){
          fnShowMsgBox(7);
      },
      success:function(d){


        let vCheck = 0;
        vCheck = d.resultado;

          if (+vCheck === 1){
            fnShowMsgBox(3);
          }
          else {
            fnShowMsgBox(11);
          }

        vCheck = undefined;

      },
      complete:function(){fnLoadingGifToggle();
    }
  });

  });
}

function fnShowModalInfoInSearch(){

  $(document).on('click','.js-bt__info--inSearch',function(){

    let vMsg01 ='<h4>Para buscar un digital:</h4> <p>Titulo (Soporte)Curso%Palabra clave</p>';
    let vMsg02 = '';
    let vMsg03 = '';
    let vMsg07 = '';
    let vMsg04 ='<h4>Para buscar un libro físico:</h4> <p>TituloCurso%Palabra clave</p>';
    let vMsg05 = '';
    let vMsg06 = '';

    let vMsg = vMsg01+ vMsg02 + vMsg03 + vMsg07 + vMsg04 + vMsg05 + vMsg06;

    let vModalConfirmacion ='<div id="diMessageInfo" title="Recomendaciones de busqueda" style="display:none;"> ' + vMsg + ' </div>';


    $('body').append(vModalConfirmacion);

    $("#diMessageInfo").dialog({
      resizable: true,
      height: "auto",
      width: 500,
      modal: true,
      buttons: {
        "OK": function() {
          $( this ).dialog( "close" );
          $("#diMessageInfo").remove();
        }
      }
    })

  });
}

function fnBuscarPorSpain(){ //Botón en el form de petición para buscar por spain y rellenar otros datos

    $(document).on('click','.js-bt__buscar--spain', function(){

      let vSpain = fnReturnSoloNumero($('#inSpain').val());

        $.ajax({
          type:'post',
          url:'../controller/controller.php',
          dataType:'json',
          data:{'act':'fnBuscarPorSpain', 'pSpain':vSpain},
          beforeSend:function(){fnLoadingGifToggle();},

          error:function(e){
              fnShowMsgBox(7);
          },
          success:function(d){

            if ($.trim(d)){ //Comprobamos si los datos están vacios
              let $vI=0;
                $.each(d, function (index, item){
                    $vI++
                  $('#inNombreCentro').val(item.n_colegio);
                  $('#inNumeroCentro').val(item.num_ofi_colegio);
                });
            }
            else {
              fnShowMsgBox(11);
            }


          },
          complete:function(){fnLoadingGifToggle();
        }
      });

    });

}

function fnMarcarUrgente(){ //Marca las peticion como urgentes en la BD. También cambia el color de la linea.

  $(document).on('click','.js-in__urgente',function(){

    let vInUrgenteVal = $(this).prop('checked');
    let vUrgente = 0;
    let vIdPeticion = $(this).parent().siblings('div.w3-bar').find('.bt__save--fichadetalles').attr('data-info');
    let vLineaDetalles = $(this).parents('tr').prev('tr');

    if (vInUrgenteVal){vUrgente = 1}

    $.ajax({
      type:'post',
      url:'../controller/controller.php',
      dataType:'json',
      data:{'act':'fnMarcarUrgenciaPeticion', 'pIdPeticion':vIdPeticion, 'pUrgente':vUrgente},
      beforeSend:function(){fnLoadingGifToggle();},

      error:function(e){
          fnShowMsgBox(6);
      },
      success:function(d){

        let vCheck = d.resultado;

        if (+vCheck === 1){

          $(vLineaDetalles).toggleClass('w3-deep-orange');

          fnShowMsgBox(3);
        }
        else {
          fnShowMsgBox(7);
        }

      vCheck = undefined;


      },
      complete:function(){fnLoadingGifToggle();
    }
  });

  });
}

function fnRegistroCambios(){

  $(document).on("click",".js-bt__registro",function(){

    var vIdSol = $(this).attr("data-info");
    var vModal='<div id="modalRegistro" class="w3-modal di__modal--registro js__modal--registro w3-center"><div class="w3-modal-content w3-card-4"><header class="w3-container w3-teal"><span id="spClose" class="w3-button w3-display-topright">&times;</span><h2>Información extendida de Petición</h2></header><div class="w3-container"><label class="w3-col l12"><p>Registro de Cambios</p><textarea id="inRegistroCambios" class="in__textarea--registro" placeholder="Recuerda salvar antes de cerrar si quieres guardar cambios."></textarea></label><div id="btSalvarRegistroPeticion" class="w3-button w3-teal w3-padding-smal w3-hover-lime w3-margin bt__save--registrocambios js-bt__save--registrocambios" data-info="' + vIdSol + '">Salvar</div></div><footer class="w3-container w3-teal"><div id="btCerrarDetalles" class="w3-button w3-white w3-ripple w3-hover-lime w3-margin">Cerrar</div></footer></div></div>';
    var vR01;

    $('body').append(vModal);
    $('body').one("click", "#spClose",function() {$('.js__modal--registro').fadeOut(300);setTimeout(() => {$('.js__modal--registro').remove();},400)});
    $('body').one("click", "#btCerrarDetalles",function() {$('.js__modal--registro').fadeOut(300);setTimeout(() => {$('.js__modal--registro').remove();},400)});


    $.when(

        $.ajax({
          type: 'post',
          url: '../controller/controller.php',
          data: {'act':'fnConsultarRegistroCambios', 'pIdSol': vIdSol},
          dataType: 'json',
          success: function(r1){
              vR01 = r1;
              $.each(vR01, function (index, item){

                $('#inRegistroCambios').val(item.registro_solicitud);

              });
          }
      })


    ).done(function(){

      $('#modalRegistro').fadeIn(150);


    });


  });
}

function fnGuardarDatosRegistroCambiosFormGestion(){ // Guardar las observaciones del form gestión dentro de la ventana de detalles.

  $(document).on("click", "#btSalvarRegistroPeticion", function(){

        var vRegistroCambios = $(this).parents('div.w3-container').find('.in__textarea--registro').val();
        var vIdSol = $(this).attr("data-info");

        $.ajax({
            type:'post',
            url:'../controller/controller.php',
            dataType: 'json',
            data: {'act':'fnSalvarRegistroPeticion', 'pRegistroCambios': vRegistroCambios, 'pIdSol': vIdSol},
            beforeSend:function(){
            },
            error:function(e){
                fnErrorMessage();
            },
            success:function(data){
                vCheck = data.resultado;
                    if (+vCheck === 1){//Valido si la petición devuelve success(1) o fail(0)
                        fnShowMsgBox(3);
                   }
                   else if (+vCheck === 2){
                        fnShowMsgBox(13);
                   }
                   else {
                        fnShowMsgBox(7);
                   }
            }});
    });
}




function fnConsultaBasicaFormConsulta(){ // Consulta por filtros del form de consulta.
  $('#inSubmitFormConsulta').click(function(e){

    $.ajax({
        type:'post',
        url:'../controller/controller.php',
        data:$("#fConsulta").serialize(),
        dataType: 'json',
        type: 'post',
        beforeSend:function(){
          fnLoadingGifToggle();
          fnBorrarTablaFormConsulta();
        },
        error:function(e){
          fnShowMsgBox(6);
        },
        success:function(data){

            if ($.trim(data)){ //Comprobamos si los datos están vacios
              var $vI=0;

                $.each(data, function (index, item){
                    var $vUrgente = 0; // Dentro del each porque por encima queda fuera del ámbito.
                    $vI++
                    if( parseInt(item.urgente_solicitud) === 1 ){ $vUrgente="w3-deep-orange" } // Si es urgente la linea sale naranja.
                    $('#taFormConsulta').append('<tr class="'+ $vUrgente +'"><td class="w3-teal" data-info="' + item.FK_ID_AREA_NEGOCIO + '">' + item.ID_SOLICITUD + '</td><td>' + item.SPAIN_CENTRO
                    + '</td><td>' + item.NOMBRE_CENTRO + '</td><td>' + fnFormatDateYear(item.FECHA_SOLICITUD)
                    + '</td><td>' + item.NOMBRE_ESTADO +'</td><td><div class="w3-button w3-teal w3-padding-small w3-hover-lime bt__articulo--line w3-ripple" data-info="">Artículos</div></td> '
                    + '<td><div class="w3-button w3-teal w3-padding-small w3-hover-lime w3-margin-left w3-ripple bt__duplicar--line js-bt__duplicar--line" data-info="' + item.ID_SOLICITUD
                    + '" data-info-negocio="' + item.FK_ID_AREA_NEGOCIO + '">Duplicar</div></td></tr>');
                });


                $('#taFormConsulta').parent().append('<span class="w3-tag w3-padding w3-round-large w3-teal w3-center sp__total--resultados">Total: ' + $vI + '</span>');
            }
            else {
              fnShowMsgBox(11);
            }
        },
        complete:function(){fnLoadingGifToggle();}
  });
});
}


function fnMostrarFichaArticulos(){ // Muestra los articulos de una solicitud en una lista acordeon de jQuery UI
  var vIdSolicitud;
  var vIdAreaNegocio;
  var vElement;
  var j=0;
  var vCodeChunkContainer='';
  var vCodeChunk;
  var vIdContainerAccordArt;
  var vDiButton;
  var vIdAreaNegocio;
  var vUrl;
  $(document).on("click",".bt__articulo--line",function(){
    vUrl= window.location.href.indexOf("/consulta.php") //Saco la url desde donde se llama a la fn, luego busco si aparece la palabra pasada como parametro
    j++;
    vElement = $(this).closest('tr');
    vIdSolicitud = $(this).closest('tr').find('td').html();
    vIdAreaNegocio = $(this).closest('tr').find('td').attr("data-info");

    if ( vUrl >= 0 ){//Si la URL desde la que se llama es la de consulta, monto una plantilla diferente sin botones más propios del form gestion
      vDiButton = '<div class="w3-button w3-teal w3-hover-lime bt__close--line js-bt__close--line w3-margin-top w3-ripple" data-info="">Cerrar</div>';
    }else{
      vDiButton = '<div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left w3-left w3-small w3-round-xxlarge js-in__add--art" data-info="' + vIdSolicitud + '" data-info-negocio="' + vIdAreaNegocio + '">Añadir</div><div class="w3-button w3-teal w3-hover-lime bt__close--line js-bt__close--line w3-margin-top w3-ripple" data-info="">Cerrar</div>';
     }

    vCodeChunkContainer='<tr id="trContainerAccordArt' + j + '" data-info="' + vIdSolicitud + '" class="js-tr__ficha--articulo js-tr__ficha my-table__backhover--no"><td colspan="9"><div id="diDummyAccord' + j + '"></div></td></tr>';
    vCodeChunk = "";
    vIdContainerAccordArt="";
    $.ajax({
      type:'post',
      url:'../controller/controller.php',
      data: {'act':'fnMostrarCuadroDetallesArticulos', 'pFiltro': vIdSolicitud},
      dataType: 'json',
      beforeSend:function(){
        $('.di__img--loading').show();
      },
      error:function(e){
        fnShowMsgBox(6);
      },
      success:function(data){
      var i=0;

      $(vElement).next('tr.js-tr__ficha').remove();//Eliminamos elementos contenedor para que no se duplique la info.

        $.each(data, function (index, item){
            i++;
            vIdAreaNegocio=item.fk_id_area_negocio;

          if ( vUrl >= 0 ){ //Si la URL desde la que se llama es la de consulta, monto una plantilla diferente sin botones save ni edit

            if (item.fk_id_area_negocio == 1){

              vCodeChunk = vCodeChunk + '<h3>Nº ' + i + ' / ' + item.isbn_bb + ' / ' + item.nombre_art_web +' / ' + fnFormatNumToESP(((item.precio_art * (100 - item.dto_bb))/100 ).toFixed(2)) + ' / ' + item.nombre_libro_bb +'</h3><div class="w3-container" id="diTab' + j + '-Bb-' + i + '"><div class="w3-row-padding"><fieldset><div class="w3-col"><select  class="w3-select js-in__editable se__licenciabb js-se__licenciabb" title="Tipo de Licencia" data-info-desplegado="no"><option  value="' + item.id_licencia_bb + '" disabled selected>' + item.tipo_licencia_bb + '</option></select></div><div class="w3-col l12"><input class="w3-input w3-hover-grey" type="text" placeholder="Título Curso" title="Título Curso" value="' + item.nombre_libro_bb + '"  data-info="' + item.id_libro_bb + '" readonly></div><div class="w3-half"><input class="w3-input w3-hover-grey js-in__editable in__ean js-in__ean js-val__num--only" type="text" maxlength="13" placeholder="EAN" title="EAN:Solo número, sin guiones ni espacios" value="' + item.ean_bb + '" readonly></div><div class="w3-half"><input class="w3-input w3-hover-grey js-in__editable in__isbn js-in__isbn js-val__numyletras--guion" type="text" maxlength="13" placeholder="ISBN" title="ISBN, Patrón Recomendado: XXXX-XX-XXX-X" value="' + item.isbn_bb + '" readonly></div><div class="w3-col l12"><input class="w3-input w3-hover-grey in__nombreweb js-in__nombreweb js-in__editable" type="text" placeholder="Nombre del Curso para la Eshop" title="Nombre del Curso para la Eshop" value="' + item.nombre_art_web + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__precio js-in__precio" type="text" maxlength="6" max="150" placeholder="Precio Sin Dto IVA inc." title="Precio Sin Dto IVA inc." value="' + fnFormatNumToESP(item.precio_art) + '€" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__dto js-in__dto js-val__num js-val__num--max js-in__editable" type="text" placeholder="Descuento" title="Descuento" maxlength="5" max="100" value="' + fnFormatNumToESP(fnIfNullOrZeroReturnVoid(item.dto_bb)) + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__pvp--condto js-in__pvp--condto" type="text" placeholder="Precio Final Con Dto" title="Precio Final Con Dto" value="' + fnFormatNumToESP(((item.precio_art * (100 - item.dto_bb))/100 ).toFixed(2)) + '€" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey" type="text" placeholder="Nº de Alumnos (" title="Nº de Alumnos (+30% para licencias)" value="' + item.alumnos_art + ' (+30% para licencias = ' +  Math.round(item.alumnos_art * 1.30) + ')" readonly></div><div class=""><input class="w3-input w3-hover-grey in__inObsBb js-in__inObsBb js-in__editable" type="text" placeholder="Observaciones" title="Observaciones" value="' + item.obs_art + '" readonly></div></fieldset><div class="w3-third"><input class="w3-input w3-hover-grey in__idproduct js-in__idproduct js-val__num js-in__editable" type="text" maxlength="5" placeholder="ID Product" title="ID Product" value="' + fnIfNullOrZeroReturnVoid(item.id_product_bb) + '" readonly></div><div class="w3-third"><input id="inCdkeyGroup' + j + '-Bb-' + i + '" class="w3-input w3-hover-grey in__cdkeygroup js-in__cdkeygroup js-in__editable js-val__num" type="text" maxlength="5" placeholder="Id CD-Key Group" title="Id CD-Key Group" value="' + fnIfNullOrZeroReturnVoid(item.id_cdkey_group_bb) + '" readonly></div>   </div></div></div>';

            }
            else{

            vCodeChunk = vCodeChunk + '<h3>Artículo ' + i + ' / ' + item.nombre_art_web + '</h3><div class="w3-container" id="diTab' + j + '-Be-' + i + '"><div class="w3-row"><div class="w3-col s12 m12 l12"><select  class="w3-select js-in__editable se__licenciabe" title="Tipo de licencia" data-info-desplegado="no"><option  value="' + item.id_licencia_be + '" disabled selected>' + item.tipo_licencia_be + ' (' + item.componentes_licencia_be + ') Meses:' + item.duracion_licencia_be + ' Pvp:' + item.precio_licencia_be + '€ //  ' + fnIfNullOrZeroReturnVoid(item.cod_a3_licencia_be) + '</option></select></div>' + fnComponentesCursoBe(item.id_art) + '<div class="w3-col l12"><input class="w3-input w3-hover-grey w3-col js-in__editable in__titulocursoweb js-in__titulocursoweb" type="text" maxlength="75" placeholder="Nombre del Curso para la Eshop" title="Campo ObligatorioNombre del Curso para la Eshop" data-required value="' + item.nombre_art_web + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey in__alumnosbe js-in__alumnosbe js-in__editable js-val__num js-val__num--max" type="text" maxlength="3" max="1000" placeholder="Nº de Alumnos" title="Campo Obligatorio:Nº de Alumnos" data-required value="' + item.alumnos_art + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey" type="text" maxlength="20" placeholder="Micrófono" title="Campo Obligatorio:Indicar modelo" data-required value="' + item.nombre_micro + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey" type="text" title="Campo Obligatorio:¿Envío al Centro?" value="' + item.tipo_envio_be + '" readonly></div><div class="w3-"><input class="w3-input w3-hover-grey" type="text" placeholder="Fecha Inicio" title="Fecha Inicio:Opcional" value="' + fnFormatDateForInputTypeDate(item.fecha_inicio_be) + '" readonly></div><div class="w3-"><input class="w3-input w3-hover-grey" type="text" placeholder="Fecha Fin" title="Fecha Fin:Opcional" value="' + fnFormatDateForInputTypeDate(item.fecha_fin_be) + '" readonly></div><div class="w3-col"><input class="w3-input w3-hover-grey in__inObsBe js-in__inObsBe js-in__editable" type="text" maxlength="144" placeholder="Observaciones" title="Observaciones referentes a este título/curso" value="' + item.obs_art + '" readonly></div>   </div></div>';

            }

          }
          else{

              if (item.fk_id_area_negocio == 1){

                vCodeChunk = vCodeChunk + '<h3>Nº ' + i + ' / ' + item.isbn_bb + ' / ' + item.nombre_art_web +' / ' + fnFormatNumToESP(((item.precio_art * (100 - item.dto_bb))/100 ).toFixed(2)) + ' / ' + item.nombre_libro_bb +'</h3><div class="w3-container" id="diTab' + j + '-Bb-' + i + '"><div class="w3-row-padding"><fieldset><div class="w3-col"><select  class="w3-select js-in__editable se__licenciabb js-se__licenciabb" title="Tipo de Licencia" data-info-desplegado="no"><option  value="' + item.id_licencia_bb + '" disabled selected>' + item.tipo_licencia_bb + '</option></select></div><div class="w3-col l12"><input class="w3-input w3-hover-grey" type="text" placeholder="Título Curso" title="Título Curso" value="' + item.nombre_libro_bb + '"  data-info="' + item.id_libro_bb + '" readonly></div><div class="w3-half"><input class="w3-input w3-hover-grey js-in__editable in__ean js-in__ean js-val__num--only" type="text" maxlength="13" placeholder="EAN" title="EAN:Solo número, sin guiones ni espacios" value="' + item.ean_bb + '" readonly></div><div class="w3-half"><input class="w3-input w3-hover-grey js-in__editable in__isbn js-in__isbn js-val__numyletras--guion" type="text" maxlength="13" placeholder="ISBN" title="ISBN, Patrón Recomendado: XXXX-XX-XXX-X" value="' + item.isbn_bb + '" readonly></div><div class="w3-col l12"><input class="w3-input w3-hover-grey in__nombreweb js-in__nombreweb js-in__editable" type="text" placeholder="Nombre del Curso para la Eshop" title="Nombre del Curso para la Eshop" value="' + item.nombre_art_web + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__precio js-in__precio" type="text" maxlength="6" max="150" placeholder="Precio Sin Dto IVA inc." title="Precio Sin Dto IVA inc." value="' + fnFormatNumToESP(item.precio_art) + '€" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__dto js-in__dto js-val__num js-val__num--max js-in__editable" type="text" placeholder="Descuento" title="Descuento" maxlength="5" max="100" value="' + fnFormatNumToESP(fnIfNullOrZeroReturnVoid(item.dto_bb)) + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__pvp--condto js-in__pvp--condto" type="text" placeholder="Precio Final Con Dto" title="Precio Final Con Dto" value="' + fnFormatNumToESP(((item.precio_art * (100 - item.dto_bb))/100 ).toFixed(2)) + '€" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey" type="text" placeholder="Nº de Alumnos (" title="Nº de Alumnos (+30% para licencias)" value="' + item.alumnos_art + ' (+30% para licencias = ' +  Math.round(item.alumnos_art * 1.30) + ')" readonly></div><div class=""><input class="w3-input w3-hover-grey in__inObsBb js-in__inObsBb js-in__editable" type="text" placeholder="Observaciones" title="Observaciones" value="' + item.obs_art + '" readonly></div></fieldset><div class="w3-third"><input class="w3-input w3-hover-grey in__idproduct js-in__idproduct js-val__num js-in__editable" type="text" maxlength="5" placeholder="ID Product" title="ID Product" value="' + fnIfNullOrZeroReturnVoid(item.id_product_bb) + '" readonly></div><div class="w3-third"><input id="inCdkeyGroup' + j + '-Bb-' + i + '" class="w3-input w3-hover-grey in__cdkeygroup js-in__cdkeygroup js-in__editable js-val__num" type="text" maxlength="5" placeholder="Id CD-Key Group" title="Id CD-Key Group" value="' + fnIfNullOrZeroReturnVoid(item.id_cdkey_group_bb) + '" readonly></div>   <div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left bt__edit--line js-bt__edit--lineBB">Editar</div><div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left bt__save--line js-bt__save--lineBB" data-info="' + item.fk_id_art + '" data-info-nego="' + vIdAreaNegocio + '">Salvar</div><div class="w3-button w3-teal w3-hover-red w3-ripple w3-margin-top w3-margin-left w3-right w3-small w3-round-xxlarge js-bt__delete--art">Eliminar</div>  </div></div></div>';

              }
              else{

              vCodeChunk = vCodeChunk + '<h3>Artículo ' + i + ' / ' + item.nombre_art_web + '</h3><div class="w3-container" id="diTab' + j + '-Be-' + i + '"><div class="w3-row"><div class="w3-col s12 m12 l12"><select  class="w3-select js-in__editable se__licenciabe" title="Tipo de licencia" data-info-desplegado="no"><option  value="' + item.id_licencia_be + '" disabled selected>' + item.tipo_licencia_be + ' (' + item.componentes_licencia_be + ') Meses:' + item.duracion_licencia_be + ' Pvp:' + item.precio_licencia_be + '€ //  ' + fnIfNullOrZeroReturnVoid(item.cod_a3_licencia_be) + '</option></select></div>' + fnComponentesCursoBe(item.id_art) + '<div class="w3-col l12"><input class="w3-input w3-hover-grey w3-col js-in__editable in__titulocursoweb js-in__titulocursoweb" type="text" maxlength="75" placeholder="Nombre del Curso para la Eshop" title="Campo ObligatorioNombre del Curso para la Eshop" data-required value="' + item.nombre_art_web + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey in__alumnosbe js-in__alumnosbe js-in__editable js-val__num js-val__num--max" type="text" maxlength="3" max="1000" placeholder="Nº de Alumnos" title="Campo Obligatorio:Nº de Alumnos" data-required value="' + item.alumnos_art + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey" type="text" maxlength="20" placeholder="Micrófono" title="Campo Obligatorio:Indicar modelo" data-required value="' + item.nombre_micro + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey" type="text" title="Campo Obligatorio:¿Envío al Centro?" value="' + item.tipo_envio_be + '" readonly></div><div class="w3-"><input class="w3-input w3-hover-grey" type="text" placeholder="Fecha Inicio" title="Fecha Inicio:Opcional" value="' + fnFormatDateForInputTypeDate(item.fecha_inicio_be) + '" readonly></div><div class="w3-"><input class="w3-input w3-hover-grey" type="text" placeholder="Fecha Fin" title="Fecha Fin:Opcional" value="' + fnFormatDateForInputTypeDate(item.fecha_fin_be) + '" readonly></div><div class="w3-col"><input class="w3-input w3-hover-grey in__inObsBe js-in__inObsBe js-in__editable" type="text" maxlength="144" placeholder="Observaciones" title="Observaciones referentes a este título/curso" value="' + item.obs_art + '" readonly></div><div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left bt__edit--line js-bt__edit--lineBE">Editar</div><div class="w3-button w3-teal w3-hover-lime w3-ripple w3-margin-top w3-margin-left bt__save--line js-bt__save--lineBE" data-info="' + item.fk_id_art + '" data-info-nego="' + vIdAreaNegocio + '">Salvar</div><div class="w3-button w3-teal w3-hover-red w3-ripple w3-margin-top w3-margin-left w3-right w3-small w3-round-xxlarge js-bt__delete--art">Eliminar</div></div></div>';

              }

          }

          });

        $(vElement).closest('tr').after(vCodeChunkContainer);
        vIdContainerAccordArt = "#diDummyAccord" + j;
        $(vIdContainerAccordArt).append(vCodeChunk);
        $(vIdContainerAccordArt).parent().append(vDiButton);
        fnActivateAccordFormGestion(vIdContainerAccordArt);

        },
        complete:function(){
          $('.di__img--loading').hide();
        }
      });
    });
}


function fnPedirVentanaDuplicacion(){

  $( document ).on('click', '.js-bt__duplicar--line', function(){

    var vIdSol = $(this).attr( "data-info" );
    var vIdNegocio = $(this).attr( "data-info-negocio" );

    fnCrearVentanaModalDuplicacion( vIdSol, vIdNegocio );
    fnConsultarDatosParaModalDuplicacion(vIdSol, vIdNegocio );

  });
}


function fnCrearVentanaModalDuplicacion (pIdSol, pIdNegocio){


  var menuInterior = '  <div class="w3-row modal__duplicated--main">  <div class="w3-col modal__duplicated--left" style=""><div class="w3-bar w3-center"> </div></div>  <div class="w3-col modal__duplicated--center" style=""> </div>  <div class="w3-col modal__duplicated--right w3-center" style=""></div>  </div> ';

  var aModalDuplicated = [];
  aModalDuplicated[1] = '<div id="diModalDuplicated" class="w3-modal modal__duplicated"><div class="w3-modal-content w3-card-4"><header class="w3-container w3-teal"><span id="dupModalCloseSign" class="w3-button w3-display-topright">&times;</span><h2>BB Duplicar Petición </h2></header> ' +  menuInterior +  ' <footer class="w3-container w3-center w3-teal"><div id="" class="w3-button w3-white w3-border w3-margin js-bt__save--duplicated" data-info-solicitud="' + pIdSol + '" data-info-negocio="' + pIdNegocio + '">Duplicar Petición</div><div id="dupModalCloseButton" class="w3-button w3-white w3-border w3-margin">Cerrar</div></footer></div></div>';
  aModalDuplicated[2] = '<div id="diModalDuplicated" class="w3-modal modal__duplicated"><div class="w3-modal-content w3-card-4"><header class="w3-container w3-teal"><span id="dupModalCloseSign" class="w3-button w3-display-topright">&times;</span><h2>BE Duplicar Petición</h2></header>  ' +  menuInterior + '  <footer class="w3-container w3-center w3-teal"><div id="" class="w3-button w3-white w3-border w3-margin js-bt__save--duplicated" data-info-solicitud="' + pIdSol + '" data-info-negocio="' + pIdNegocio + '">Duplicar Petición</div><div id="dupModalCloseButton" class="w3-button w3-white w3-border w3-margin">Cerrar</div></footer></div></div>';

  $( "body" ).append(aModalDuplicated[pIdNegocio]);
  $( document ).one("click", "#dupModalCloseSign", function() {$( '#diModalDuplicated' ).fadeOut(300);setTimeout(() => {$( '#diModalDuplicated' ).remove();},400)});
  $( document ).one("click", "#dupModalCloseButton", function() {$( '#diModalDuplicated').fadeOut(300);setTimeout(() => {$( '#diModalDuplicated' ).remove();},400)});
  fnAddArtDuplicatedToListOn();

// Para posible futúro desarrollo
  if ( +pIdNegocio === 1 ){ //El símbolo + es la forma corta de un parseInt

    //console.log("fnCrearVentanaModalDuplicacion BB");

  } else {

   // console.log("fnCrearVentanaModalDuplicacion BE");

  }

}

function fnConsultarDatosParaModalDuplicacion(pIdSol, pIdNegocio){

  $.ajax({
    type:'post',
    url:'../controller/controller.php',
    data: {'act':'fnMostrarCuadroDetallesArticulos', 'pFiltro': pIdSol},
    dataType: 'json',
    beforeSend:function(){
      $('.di__img--loading').show();
    },
    error:function(e){
      fnShowMsgBox(6);
    },
    success:function(d){
      fnPintarDatosParaModalDuplicacion(d);
    },
    complete:function(){
      $('.di__img--loading').hide();
    }
  });

}

function fnPintarDatosParaModalDuplicacion(pd){

  var vContenidoIzq = "";
  var vContenidoCent = "";
  var vContenidoDer = "";
  var vBotonAddArt = '<button id="dupAddArts" class="w3-bar-item w3-button w3-teal w3-padding-small w3-hover-lime w3-ripple dup__add--art js-dup__add--arts" data-id="' + pd[0].id_solicitud + '" data-negocio="' + pd[0].fk_id_area_negocio + '">Add</button>';
  var i = 0;
  var vBotonFichaCentro = '<button class="w3-button tablink js-articulito" data-target="trFicha">Centro</button>';
  var vFichaCentro ='<div id="trFicha" data-info="trFicha" data-id="' + pd[0].id_solicitud + '" class="w3-row-padding city"><div class="w3-quarter"><input class="w3-input w3-hover-grey js-in__numtienda js-in__editable js-val__num--only" type="text" maxlength="4" placeholder="Número de tienda" title="Número de tienda" value="' + fnIfNullOrZeroReturnVoid(pd[0].num_tienda) + '" readonly></div><div class="w3-rest"><input class="w3-input w3-hover-grey" type="text" placeholder="Fecha"  title="Fecha de Solicitud" value="' + pd[0].fecha_solicitud + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey" type="text" placeholder="Nº Ficha Spain" title="Nº Ficha Spain" value="' + pd[0].spain_centro + '" readonly></div><div class="w3-rest"><input class="w3-input w3-hover-grey" type="text" placeholder="Nombre del Centro" title="Nombre del Centro"value="' + pd[0].nombre_centro + '" readonly></div> <div class="w3-col l12"><input class="w3-input w3-hover-grey in__web js-in__web js-in__editable" type="text" placeholder="Dirección Web" title="Dirección Web" value="' + fnIfNullOrZeroReturnVoid(pd[0].web_tienda) + '"readonly></div>   </div>';
  var vIdAreaNegocio= +pd[0].fk_id_area_negocio;

  $.each(pd, function (index, item){
    i++;
    vContenidoIzq += '<button class="w3-button tablink js-articulito" data-target="art' + i + '" data-art="'+  item.id_art + '">Art-' + i + '</button>';

    if (vIdAreaNegocio === 1){

        vContenidoCent += '<div class="w3-row-padding city tabs__art tabs__art--bb" id="art' + i + '" data-art="' +  item.id_art + '" style="display:none"><fieldset><div class="w3-col m11"><input type="text" class="w3-input w3-hover-grey js-in__editable se__licenciabb js-se__licenciabb" value="' + item.tipo_licencia_bb + '"></div>  <div class="w3-col m1"><span id="" class="w3-button dup__bt--nodup js-dup__bt--nodup">X</span><input type="hidden" class="dup__hidden--nodup js-dup__hidden--nodup" value="false"></div>  <div class="w3-col l12"><input class="w3-input w3-hover-grey" type="text" placeholder="Título Curso" value="' + item.nombre_libro_bb + '"  data-info="' + item.id_libro_bb + '" readonly></div><div class="w3-half"><input class="w3-input w3-hover-grey js-in__editable in__ean js-in__ean js-val__num--only" type="text" maxlength="13" placeholder="EAN"  value="' + item.ean + '" readonly></div><div class="w3-half"><input class="w3-input w3-hover-grey js-in__editable in__isbn js-in__isbn js-val__numyletras--guion" type="text" maxlength="13" placeholder="ISBN"  value="' + item.isbn + '" readonly></div><div class="w3-col l12"><input class="w3-input w3-hover-grey in__nombreweb js-in__nombreweb js-in__editable modal__duplicated--revise" type="text" placeholder="Nombre del Curso para la Eshop"  value="' + item.nombre_art_web + '" data-required></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__precio js-in__precio" type="text" maxlength="6" max="150" placeholder="Precio Actual Sin Dto IVA inc." title="Precio Actual Sin Dto IVA inc." value="' + fnFormatNumToESP(item.precio_bb) + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__dto js-in__dto js-val__num js-val__num--max js-in__editable modal__duplicated--revise" type="text" placeholder="Descuento" title="Descuento" maxlength="5" max="100" value="' + fnFormatNumToESP(fnIfNullOrZeroReturnVoid(item.dto_bb)) + '" ></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__pvp--condto js-in__pvp--condto js-val__num js-val__num--max modal__duplicated--revise" type="text" maxlength="6" max="' + fnFormatNumToESP(item.precio_bb) + '" placeholder="Precio Final Con Dto" title="Precio Final Con Dto" value="' + fnFormatNumToESP(((item.precio_bb * (100 - item.dto_bb))/100 ).toFixed(2)) + '" ></div><div class="w3-quarter"><input type="text" class="w3-input w3-hover-grey js-val__num--only js-val__num--max in__alums--bb modal__duplicated--revise" maxlength="4" max="1000" placeholder="Nº de Alumnos" title="Nº de Alumnos" value="' + item.alumnos_art + '"  data-required></div>  <div class="w3-col l12"><input id="" class="w3-input w3-hover-grey in__obs--bb modal__duplicated--revise" type="text" maxlength="144" placeholder="Observaciones referentes a este título/curso." title="Observaciones referentes a este título/curso. Por ejemplo para indicar si el libro no lleva IVA o si forma parte de un pack con el siguiente artículo." value="' + item.obs_art + '"></div>  </fieldset>  </div>';
    }
    else{

        vContenidoCent += '<div class="w3-row-padding city tabs__art tabs__art--be" id="art' + i + '" data-art="'+  item.id_art + '" style="display:none"><div class="w3-col s11"><input type="text"  class="w3-input w3-hover-grey js-in__editable se__licenciabe"  value="' + item.tipo_licencia_be + ' (' + item.componentes_licencia_be + ') Meses:' + item.duracion_licencia_be + ' Pvp:' + item.precio_licencia_be + '€ //  ' + fnIfNullOrZeroReturnVoid(item.cod_a3_licencia_be) + '"></div>     <div class="w3-col m1"><span id="" class="w3-button dup__bt--nodup js-dup__bt--nodup">X</span><input type="hidden" class="dup__hidden--nodup js-dup__hidden--nodup" value="false"></div> ' + fnComponentesCursoBe(item.id_art) + '<div class="w3-col l12"><input class="w3-input w3-hover-grey js-in__editable in__titulocursoweb js-in__titulocursoweb modal__duplicated--revise" type="text" maxlength="75" placeholder="Nombre del Curso para la Eshop" data-required value="' + item.nombre_art_web + '"></div><div class="w3-third"><input class="w3-input w3-hover-grey in__alumnosbe js-in__alumnosbe in__alums--be js-in__editable js-val__num js-val__num--max modal__duplicated--revise" type="text" maxlength="3" max="1000" placeholder="Nº de Alumnos" title="Nº de Alumnos" data-required value="' + item.alumnos_art + '" ></div><div class="w3-third"><input class="w3-input w3-hover-grey " type="text" maxlength="20" placeholder="Micrófono" title="Micrófono" data-required value="' + item.nombre_micro + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey " type="text" title="¿Envío al Centro?" value="' + item.tipo_envio_be + '" readonly></div>  </div>';

    }


  });

      $('#diModalDuplicated .modal__duplicated--left>div').append(vBotonFichaCentro);
      $('#diModalDuplicated .modal__duplicated--left>div').append(vContenidoIzq);
      $('#diModalDuplicated .modal__duplicated--center').append(vFichaCentro);
      $('#diModalDuplicated .modal__duplicated--center').append(vContenidoCent);
      $('#diModalDuplicated .modal__duplicated--right').append(vBotonAddArt);

      fnActivarLinksArtsModalDuplicated();
      fnActivarBotonAddArts();
      fnLanzarDuplicarOn();

      $( '#diModalDuplicated' ).fadeIn( 150 );

}

function fnActivarLinksArtsModalDuplicated(){

  $( document ).on('click', '.js-articulito', function(){
    var vElemento = $(this);
    var vTarget = $(this).attr("data-target");


    var i, x, tablinks;
    x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-amber", "");
    }

    document.getElementById(vTarget).style.display = "block";
    $(vElemento).toggleClass("w3-amber");

  });

}

function fnActivarBotonAddArts(){
  $( document ).off('click', '.js-dup__add--arts');//si no se eliminan los on-click se van duplicando
  $( document ).on('click', '.js-dup__add--arts', function(){

    var vIdSol = $(this).attr( "data-id" );
    var vIdNegocio = $(this).attr( "data-negocio" );

    fnCrearModalDupAddArts( vIdSol, vIdNegocio );
    $( '#id01' ).fadeIn( 150 );

  });
}

function fnActivarEliminarArtListaDuplicar(){

  $( document ).on('click','.js-dup__bt--nodup',function(){
      var vContenedorCentArt = $( this ).closest('.tabs__art');
      var vContenedorCentArtDataArt = $( this ).closest('.tabs__art').attr('data-art');
      var vContenedorIzqArt = $('.modal__duplicated--left').find('.w3-button[data-art="' + vContenedorCentArtDataArt + '"]');
      var vHiddenInput = $( this ).next(".dup__hidden--nodup");
      var vWarning = "";
      vWarning += '<span class="w3-tag w3-xlarge w3-padding w3-red w3-display-middle dup__tag--remove" style="transform:rotate(-5deg)">';
      vWarning += ' Eliminar </span>';

      if ($(vHiddenInput).val() == "true"){
          $(vHiddenInput).val(false);
          $(vContenedorCentArt).find('.dup__tag--remove').each(function(){
            $( this ).remove()});
          $(vContenedorIzqArt).css('text-decoration', 'auto');
      } else{
          $(vHiddenInput).val(true)
          $(vContenedorCentArt).append(vWarning);
          $(vContenedorIzqArt).css('text-decoration', 'line-through');
      }

  });
}

function fnCrearModalDupAddArts(pIdSol, pIdNegocio){ // Crea el modal para añadir articulos a una duplicación de tiendas

  var aModalAddArt = [];
  aModalAddArt[1] = '<div id="id01" class="w3-modal" data-nego="1"><div class="w3-modal-content w3-card-4"><header class="w3-container w3-teal"><span id="spClose" class="w3-button w3-display-topright">&times;</span><h2>Añade el nuevo artículo</h2></header><div class="w3-row-padding"><fieldset><div class="w3-col w3-margin-bottom"><select id="inLicencia" class="w3-select se__licenciabb js-se__licenciabb" title="Campo Obligatorio:Tipo de Licencia" data-desplegado="" data-required></select></div><div class="w3-col l12 w3-margin-top"><div class="ui-widget"><input class="w3-input w3-border w3-padding" type="text" id="inSearch" placeholder="Escribe AQUI al menos 5 caracteres para la busqueda automática por NOMBRE, despues elige." data-required></div></div><div class="w3-half"><input id="inEan" class="w3-input w3-hover-grey js-val__num--only" type="text" maxlength="13" placeholder="EAN" title="EAN" data-required readonly></div><div class="w3-half"><input id="inIsbn" class="w3-input w3-hover-grey js-val__numyletras--guion" type="text" maxlength="13" placeholder="ISBN" title="ISBN" data-required readonly></div><div class="w3-third"><input id="inPrecioSinDtoBb" class="w3-input w3-hover-grey in__precio--sdto js-val__num js-val__num--max" type="text" maxlength="6" max="150" placeholder="Precio Sin Dto IVA inc." title="Precio Sin Dto IVA inc." data-required readonly></div><div class="w3-third"><input id="inDtoBb"  class="w3-input w3-hover-grey in__dto js-val__num js-val__num--max" type="text" maxlength="5" max="100" placeholder="Descuento" title="Dto. en tanto por ciento sin el símbolo"></div><div class="w3-col l3"><input id="inPrecioConDtoBb" class="w3-input w3-hover-grey in__precio--cdto js-val__num js-val__num--max" type="text" maxlength="6" max="150" placeholder="Precio Final Con Dto" title="Precio Final Con Dto"></div><div class="w3-col l2"><input id="inAlumnosBb" class="w3-input w3-hover-grey js-val__num--only js-val__num--max" type="text" maxlength="4" max="1000" placeholder="Nº de Alumnos" title="Nº de Alumnos" data-required></div><div class="w3-col l10"><input id="inTituloCursoWebBb" class="w3-input w3-hover-grey" type="text" maxlength="75" placeholder="Nombre del Curso para la Eshop" title="Nombre del Curso para la Eshop" data-required></div><div class="w3-col l12"><input id="inObsBb" class="w3-input w3-hover-grey" type="text" maxlength="144" placeholder="Observaciones referentes a este título/curso. Por ejemplo para indicar si el libro no lleva IVA o si forma parte de un pack con el siguiente artículo." title="Observaciones referentes a este título/curso."></div></fieldset></div><footer class="w3-container w3-center w3-teal"><div class="w3-button w3-white w3-border w3-margin js-dup__save--art" data-info="' + pIdSol + '" data-info-negocio="' + pIdNegocio + '">Salvar</div><div id="btCerrarDetalles" class="w3-button w3-white w3-border w3-margin">Cerrar</div></footer></div></div>';
  aModalAddArt[2] = '<div id="id01" class="w3-modal" data-nego="2"><div class="w3-modal-content w3-card-4"><header class="w3-container w3-teal"><span id="spClose" class="w3-button w3-display-topright">&times;</span><h2>Añade el nuevo artículo</h2></header><div class="w3-row di__be"><div class="w3-col s12 m12 l12"><select id="seLicenciaBe" class="w3-select" title="Campo Obligatorio:Elige tipo de licencia" data-required></select></div><div class="w3-col l4"><select id="seCursosEspecialidades" class="w3-select" title="Especialidades"></select></div><div class="w3-col l1"><div id="btAddCursoEspBe" class="w3-button w3-teal w3-ripple">+</div></div><div class="w3-col l2"><select id="seCursosGenerales" class="w3-select" title="Cursos Generales"></select></div><div class="w3-col l1"><div id="btAddCursoGenBe" class="w3-button w3-teal w3-ripple">+</div></div>  <div class="w3-col l3"><select id="seWordlist" class="w3-select" title="Elige WordList y pulsa en + para añadir"></select></div><div class="w3-col l1"><div id="btAddWordlist" class="w3-button w3-teal w3-ripple">+</div></div>     <div class="w3-col l12 w3-center w3-margin-top"><div class="w3-responsive"><table class="w3-table-all w3-hoverable w3-centered w3-card-2 ta__cursos--be" id="taCursosBe"><tr class="w3-amber"><th>Conjunto de Cursos que componen esta licencia.</th></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></table></div></div><div class="w3-col l12"><input id="inTituloCursoWebBe" class="w3-input w3-hover-grey w3-col" type="text" maxlength="75" placeholder="Nombre del Curso para la Eshop" title="Campo Obligatorio:Nombre del Curso para la Eshop" data-required></div><div class="w3-third"><input id="inAlumnosBe" class="w3-input w3-hover-grey js-val__num js-val__num--max" type="text" maxlength="3" max="1000" placeholder="Nº de Alumnos" title="Campo Obligatorio:Nº de Alumnos" data-required></div><div class="w3-third"><select id="inMicroBe" class="w3-select" title="Campo Obligatorio:Indicar modelo del micro" data-required></select></div><div class="w3-third"><select id="inEnvioBe" class="w3-select" title="Campo Obligatorio:¿Envío al Centro o a domicilio?" data-required></select></div><div class="w3-col l12"><input id="inFechaInicioBe" class="w3-input w3-hover-grey" type="date" title="Fecha Inicio:Opcional"></div><div class="w3-col l12"><input id="inFechaFinBe" class="w3-input w3-hover-grey" type="date" title="Fecha Fin:Opcional"></div><div class="w3-col l12"><input id="inObsBe" class="w3-input w3-hover-grey" type="text" maxlength="144" placeholder="Observaciones" title="Observaciones referentes a este título/curso"></div></div><footer class="w3-container w3-center w3-teal"><div id="" class="w3-button w3-white w3-border w3-margin js-dup__save--art" data-info="' + pIdSol + '" data-info-negocio="' + pIdNegocio + '">Salvar</div><div id="btCerrarDetalles" class="w3-button w3-white w3-border w3-margin">Cerrar</div></footer></div></div>';

  $( "body" ).append(aModalAddArt[pIdNegocio]);
  $( document ).one("click", "#spClose", function() {$( '#id01' ).fadeOut(300);setTimeout(() => {$( '#id01' ).remove();},400)});
  $( document ).one("click", "#btCerrarDetalles", function() {$( '#id01').fadeOut(300);setTimeout(() => {$( '#id01' ).remove();},400)});

  if ( +pIdNegocio === 1 ){ //Llamo a las fn que cargan los select. El símbolo + es la forma corta de un parseInt

    fnCargarLicenciasAlInicioNoDup();

  } else {

    fnCargarMicrofonoAlInicio();  //Llamamos a las funciones de carga de selects
    fnCargarTipoEnvioBeAlInicio();

    fnCargarCursosBeAlInicioEsp();
    fnCargarCursosBeAlInicioGen();
    fnCargarCursosBeAlInicioWordlist();
    fnCargarLicenciasBe();
  }
}

function fnAddArtDuplicatedToListOff(){

  $( document ).off('click','.js-dup__save--art');//Elimino eventos del boton de salvar el articulo añadido a una duplicación

}

function fnAddArtDuplicatedToListOn(){
  fnAddArtDuplicatedToListOff();
  var vIndex = 0; //Si duplico varias tiedas este número sigue subiendo por lanzar la fn al inicio. Corregido!!
  $( document ).on('click','.js-dup__save--art', function(){

    var vModalArt = $(this).closest('.w3-modal');
    var vIdNego = $(vModalArt).attr('data-nego');
    var vBlockListArts = $('#diModalDuplicated .modal__duplicated--right');
    var vBotonAddArt = '<button id="" class="w3-bar-item w3-button w3-amber w3-padding-small w3-hover-lime w3-ripple">NewArt-' + vIndex +'</button>';
    var vContenidoCent = "";

    if (vIdNego == 1){
      if ( fnValidarSumatorioRequiredPlus(0) ) {
        vIndex++;
        vlicencia = $('#inLicencia').val();
        vlicenciatxt = $('#inLicencia option:selected').text();
        vsearch = $('#inSearch').val();//Está vacio porque no coge el dato del input aunque se ve en pantalla
        vean = $('#inEan').val();
        visbn = $('#inIsbn').val();
        vbookcode = $('#inSearch').attr("data-info");
        vtitulocursowebbb = $('#inTituloCursoWebBb').val();
        vpreciosindtobb = $('#inPrecioSinDtoBb').val();
        vdtobb = $('#inDtoBb').val();
        vpreciocondtobb = $('#inPrecioConDtoBb').val();
        valumnosbb = $('#inAlumnosBb').val();
        vobsBb = $('#inObsBb').val();

        vBotonAddArt = '<button class="w3-button w3-lime w3-padding-small w3-hover-lime w3-ripple tablink js-articulito dup__list--addedarts" data-target="NewArt-' + vIndex + '" data-licencia="' + vlicencia + '" data-ean="'+ vean + '" data-isbn="' + visbn + '" data-bookcode="' + vbookcode + '" data-titulocursowebbb="' + vtitulocursowebbb + '" data-preciosindtobb="' + vpreciosindtobb + '" data-dtobb="' + vdtobb + '" data-alumnosbb="' + valumnosbb + '" data-obsbb="' + vobsBb + '">NewArt-' + vIndex +'</button>';

        $(vBlockListArts).append(vBotonAddArt);

        vContenidoCent = '<div class="w3-row-padding city" id="NewArt-' + vIndex + '" data-art="" style="display:none"><fieldset><div class="w3-col"><input type="text" class="w3-input w3-hover-grey js-in__editable se__licenciabb js-se__licenciabb" value="' + vlicenciatxt + '"></div><div class="w3-col l12"><input class="w3-input w3-hover-grey" type="text" placeholder="Título Curso" value="' + vsearch + '"  data-info="' + vbookcode + '" readonly></div><div class="w3-half"><input class="w3-input w3-hover-grey js-in__editable in__ean js-in__ean js-val__num--only" type="text" maxlength="13" placeholder="EAN"  value="' + vean + '" readonly></div><div class="w3-half"><input class="w3-input w3-hover-grey js-in__editable in__isbn js-in__isbn js-val__numyletras--guion" type="text" maxlength="13" placeholder="ISBN"  value="' + visbn + '" readonly></div><div class="w3-col l12"><input class="w3-input w3-hover-grey in__nombreweb js-in__nombreweb js-in__editable" type="text" placeholder="Nombre del Curso para la Eshop"  value="' + vtitulocursowebbb + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__precio js-in__precio" type="text" maxlength="6" max="150" placeholder="Precio Actual Sin Dto IVA inc." title="Precio Actual Sin Dto IVA inc." value="' + vpreciosindtobb + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__dto js-in__dto js-val__num js-val__num--max js-in__editable" type="text" placeholder="Descuento" title="Descuento" maxlength="5" max="100" value="' + fnFormatNumToESP(fnIfNullOrZeroReturnVoid(vdtobb)) + '" readonly></div><div class="w3-quarter"><input class="w3-input w3-hover-grey in__pvp--condto js-in__pvp--condto js-val__num js-val__num--max" type="text" maxlength="6" max="' + vpreciosindtobb + '" placeholder="Precio Final Con Dto" title="Precio Final Con Dto" value="' + vpreciocondtobb + '" readonly></div><div class="w3-quarter"><input type="text" class="w3-input w3-hover-grey js-val__num--only js-val__num--max in__alums--bb" maxlength="4" max="1000" placeholder="Nº de Alumnos" title="Nº de Alumnos" value="' + valumnosbb + '" readonly></div></fieldset>  </div>';
        $('#diModalDuplicated .modal__duplicated--center').append(vContenidoCent);

        fnEliminarAndFade(vModalArt);
      }
      else{
        fnShowMsgBox(1);
      }
    }
    else{

        if ( fnValidarSumatorioRequiredPlus(1) ) {  // <<== Validar Lista #taCursosBe y requireds
          vIndex++;
          var vtitulocursobe = fnAddCombinacionCursosToString();
          var vtitulocursowebbe = $('#inTituloCursoWebBe').val();
          var vtipolicenciabe = $('#seLicenciaBe').val();
          var vlicenciabetxt = $('#seLicenciaBe option:selected').text();
          var valumnosbe = $('#inAlumnosBe').val();
          var vmicrofonobe = $('#inMicroBe').val();
          var vmicrofonobetxt = $('#inMicroBe option:selected').text();
          var venviocentrobe = $('#inEnvioBe').val();
          var venviocentrobetxt = $('#inEnvioBe option:selected').text();
          var vfechainiciobe = $('#inFechaInicioBe').val();
          var vfechafinbe = $('#inFechaFinBe').val();
          var vobsBe = $('#inObsBe').val();
          var vtablacursos = $('#taCursosBe').closest('.w3-col').prop("outerHTML");

          vBotonAddArt = '<button class="w3-button w3-lime w3-padding-small w3-hover-lime w3-ripple tablink js-articulito dup__list--addedarts" data-target="NewArt-' + vIndex + '" data-titulocursobe="' + vtitulocursobe + '" data-titulocursowebbe="'+ vtitulocursowebbe + '" data-tipolicenciabe="' + vtipolicenciabe + '" data-alumnosbe="' + valumnosbe + '" data-microfonobe="' + vmicrofonobe + '" data-enviocentrobe="' + venviocentrobe + '" data-fechainiciobe="' + vfechainiciobe + '" data-fechafinbe="' + vfechafinbe + '" data-obsBe="' + vobsBe + '">NewArt-' + vIndex +'</button>';

          $(vBlockListArts).append(vBotonAddArt);

          vContenidoCent += '<div class="w3-row-padding city" id="NewArt-' + vIndex + '" data-art="" style="display:none"><div class="w3-col s12 m12 l12"><input type="text"  class="w3-input w3-hover-grey js-in__editable se__licenciabe"  value="' + vlicenciabetxt + '"></div>' + vtablacursos /*+ fnComponentesCursoBe(item.id_art)*/ + '<div class="w3-col l12"><input class="w3-input w3-hover-grey js-in__editable in__titulocursoweb js-in__titulocursoweb " type="text" maxlength="75" placeholder="Nombre del Curso para la Eshop" data-required value="' + vtitulocursowebbe + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey in__alumnosbe js-in__alumnosbe in__alums--be js-in__editable js-val__num js-val__num--max" type="text" maxlength="3" max="1000" placeholder="Nº de Alumnos" title="Nº de Alumnos" data-required value="' + valumnosbe + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey " type="text" maxlength="20" placeholder="Micrófono" title="Micrófono" data-required value="' + vmicrofonobetxt + '" readonly></div><div class="w3-third"><input class="w3-input w3-hover-grey " type="text" title="¿Envío al Centro?" value="' + venviocentrobetxt + '" readonly></div>  </div>';
          $('#diModalDuplicated .modal__duplicated--center').append(vContenidoCent);

          fnEliminarAndFade(vModalArt)

          $('#taCursosBe').attr('id',"");//Como copio la tabla  para mostrarla, en cuanto añado más de 2 cursos duplicaria el id.
        }
        else{
          fnShowMsgBox(1);
        }
    }
  });
}

function fnAddCombinacionCursosToString(){ // Guardamos en un array los cursos que hemos añadido en BE

  var vListCodes = "";
  var vEmptyTdList = $('#taCursosBe td');

  $(vEmptyTdList).each(function (e){

    if ( $(this).html() ) {

      vListCodes += ($(this).attr("data-info")) + ",";
    }
  });

    return vListCodes.slice(0,-1);//Quitamos la coma final para que no cree un lugar más en el array que uso para pasar este dato.

}

function fnEliminarAndFade(pElement){

  $( pElement ).fadeOut(300);

  setTimeout(() => {$(pElement ).remove();},400);

}


function fnLanzarDuplicarOn(){
  var vIndex = 0;
  $(document ).one('click','.js-bt__save--duplicated', function(){

    fnEliminarDialogConfirmDuplicado(); //BUG: En ocasiones salen más de un dialog

    vIndex++;
    var vNombreDialog = "dialog-confirm" + vIndex;
    var vElement = this;
    var vMsgBox ='<div id="' + vNombreDialog + '" class="dialog__confirm--duplication" title="Cuadro de Duplicación" style="display:none;"><p>Confirme la duplicación</p></div>';
    $('body').append(vMsgBox);
    $('#' + vNombreDialog).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "Duplicar": function() {
          $( this ).dialog( "close" );
          $( this ).remove();

          fnLanzarDuplicar(vElement);

        },
        "Anular": function() {
          $( this ).dialog( "close" );
          $( this ).remove();
        }
      }
    });

  });
}

function fnEliminarDialogConfirmDuplicado(){ //BUG: En ocasiones salen más de un dialog
  var vListDialogConfirmInner = $(document).find('.dialog__confirm--duplication');
  var vListDialogConfirmWrap = $(document).find('.ui-dialog');

    $(vListDialogConfirmInner).each(function(e){
      $( this ).remove();
      });
    $(vListDialogConfirmWrap).each(function(e){
      $( this ).remove();
      });
}

function fnLanzarDuplicar(pElement){

    var vListArts = $(pElement).parent().siblings('.modal__duplicated--main').find('.tabs__art');
    var vListArtsNuevos = $(pElement).parent().siblings('.modal__duplicated--main').find('.dup__list--addedarts');
    var vIdSolicitud = $(pElement).attr('data-info-solicitud');
    var vIdNegocio = $(pElement).attr('data-info-negocio');
    var aDatos = [];
    var aDatosArtsAdded = [];

    if ( +vIdNegocio === 1 ){

      aDatos = fnRecogerDatosDuplicarBb(vIdSolicitud, vListArts);
      aDatosArtsAdded = fnRecogerDatosDuplicarArtAddedBb( vListArtsNuevos );
    } else {

      aDatos = fnRecogerDatosDuplicarBe(vIdSolicitud, vListArts);
      aDatosArtsAdded = fnRecogerDatosDuplicarArtAddedBe( vListArtsNuevos );
    }

    if ( aDatos.length == 0 ){

      fnShowMsgBox(11);

    }
    else{

      fnEnviarPeticionDuplicar(vIdSolicitud, vIdNegocio, JSON.stringify(aDatos), JSON.stringify(aDatosArtsAdded));

    }

}


function fnRecogerDatosDuplicarBb(pIdSolicitud, pListArts){

  var aDatos = [];
  var oArt = {};

  $(pListArts).each(function(){

    oArt.idSolicitud = pIdSolicitud;
    oArt.idArt = $(this).attr('data-art');
    oArt.nombreArtWeb = $(this).find('.in__nombreweb').val();
    oArt.dto = $(this).find('.in__dto').val();
    oArt.alums = $(this).find('.in__alums--bb').val();
    oArt.obs = $(this).find('.in__obs--bb').val();
    oArt.borrar = $(this).find('.dup__hidden--nodup').val();

    aDatos.push(JSON.parse(JSON.stringify(oArt)));

  });

  return JSON.parse(JSON.stringify(aDatos));

}

function fnRecogerDatosDuplicarBe(pIdSolicitud, pListArts){

  var aDatos = [];
  var oArt = {};

  $(pListArts).each(function(){

    oArt.idSolicitud = pIdSolicitud;
    oArt.idArt = $(this).attr('data-art');
    oArt.nombreArtWeb = $(this).find('.in__titulocursoweb').val();
    oArt.alums = $(this).find('.in__alums--be').val();
    oArt.borrar = $(this).find('.dup__hidden--nodup').val();

    aDatos.push(JSON.parse(JSON.stringify(oArt)));

  });

  return JSON.parse(JSON.stringify(aDatos));

}

function fnRecogerDatosDuplicarArtAddedBb(pListArts){

  var aDatos = [];
  var oArt = {}

  $(pListArts).each(function(){


    oArt.licencia = $(this).attr('data-licencia');
    oArt.ean = $(this).attr('data-ean');
    oArt.isbn = $(this).attr('data-isbn');
    oArt.bookcode = $(this).attr('data-bookcode');
    oArt.titulocursowebbb = $(this).attr('data-titulocursowebbb');
    oArt.preciosindtobb = $(this).attr('data-preciosindtobb');
    oArt.dtobb = $(this).attr('data-dtobb');
    oArt.alumnosbb = $(this).attr('data-alumnosbb');
    oArt.obsBb = $(this).attr('data-obsBb');

    aDatos.push(JSON.parse(JSON.stringify(oArt)));

  });

  return JSON.parse(JSON.stringify(aDatos));

}

function fnRecogerDatosDuplicarArtAddedBe(pListArts){

  var aDatos = [];
  var oArt = {}

  $(pListArts).each(function(){

    oArt.titulocursobe = $(this).attr('data-titulocursobe').split(",");
    oArt.titulocursowebbe = $(this).attr('data-titulocursowebbe');
    oArt.tipolicenciabe = $(this).attr('data-tipolicenciabe');
    oArt.alumnosbe = $(this).attr('data-alumnosbe');
    oArt.microfonobe = $(this).attr('data-microfonobe');
    oArt.enviocentrobe = $(this).attr('data-enviocentrobe');
    oArt.fechainiciobe = $(this).attr('data-fechainiciobe');
    oArt.fechafinbe = $(this).attr('data-fechafinbe');
    oArt.obsBe = $(this).attr('data-obsBe');

    aDatos.push(JSON.parse(JSON.stringify(oArt)));

  });

  return JSON.parse(JSON.stringify(aDatos));

}

function fnEnviarPeticionDuplicar(pIdSolicitud, pIdNegocio, pDatos, pDatosArtsAdded){

  $.ajax({
    type:'post',
    url:'../controller/controller.php',
    dataType:'json',
    data:{'act':'fnDuplicarPeticion', 'pIdSolicitud':pIdSolicitud, 'pIdNegocio':pIdNegocio,'pDatos':pDatos, 'pDatosArtsAdded':pDatosArtsAdded},
    beforeSend:function(){fnLoadingGifToggle();},

    error:function(e){
        fnShowMsgBox(6);
    },
    success:function(d){

      fnComprobarResultado(d);

    },

    complete:function(){fnLoadingGifToggle();


  }
});

}

function fnComprobarResultado(pResultado){

  if (pResultado.resultado == 1){
    fnShowMsgBox(14);
  }
  else {
    fnShowMsgBox(6);
  }

  fnEliminarModalDuplicacion();

}

function fnEliminarModalDuplicacion(){

  $( '#diModalDuplicated').fadeOut(300);
  setTimeout(() => {$( '#diModalDuplicated' ).remove();},400);

}



function fnActivarToolTips(){ // Fn de jQuery UI para activar su formato de tooltips (attr tittle en html5)
  $(document).tooltip({
    track: true
  });
}

function fnTextAreaCompatibility(){
  $("textarea").resizable();
}

function fnIfNullOrZeroReturnVoid(p01){ // Si es 0 o null devuelvo vacio
  var vResult = p01;
  if (vResult == null || vResult == 0){
    vResult = "";
   }
  return vResult;
}
function fnFormatDateYear(p01){
  let vDate = new Date(p01), vYear = vDate.getFullYear(), vMes = vDate.getMonth() + 1, vDia = ("0" + vDate.getDate()).slice(-2);
  return (vDia + " - " + (vMes < 10 ? '0' + vMes : '' + vMes) + " - " + vYear);//Este es el formato pero no carga cuado lo pongo en value tipo date
}
function fnFormatDateYearHour(p01){
  let vDate = new Date(p01), vYear = vDate.getFullYear(), vMes = vDate.getMonth() + 1, vDia = ("0" + vDate.getDate()).slice(-2), vTime = vDate.getHours() + ":" + vDate.getMinutes();
  return (vDia + " - " + (vMes < 10 ? '0' + vMes : '' + vMes) + " - " + vYear + "  " + vTime);//Este es el formato pero no carga cuado lo pongo en value tipo date
}
function fnFormatDateForInputTypeDate(p01){ //Formateo fechas a vacio si cumple el patrón
  var vResult;
  if (p01 == null || p01 == 0 || p01 == "0000-00-00 00:00:00"){
    vResult = "";
   }
  else{
    var vDate = new Date(p01), vYear = vDate.getFullYear(), vMes = vDate.getMonth() + 1, vDia = ("0" + vDate.getDate()).slice(-2);
    vResult = (vDia + " - " + (vMes < 10 ? '0' + vMes : '' + vMes) + " - " + vYear);
   }
  return vResult;
}
function fnFormatNumToESP(p01){ // Formato de DECIMALES a modo ESP
  var oIntNumerFormat = new Intl.NumberFormat("es-ES");
  var vResult = p01;
  if (vResult !== null || vResult !== "") {
    vResult = oIntNumerFormat.format(vResult);
  }
  return vResult;
}





$(function(){
  fnActivateTabsFormPeticion();
  fnBurguerMenu();
  fnFichaDetallesPeticion();
  fnCargarOficinas();
  fnCargarSolicitantes();
  fnCargarEstadosAlInicio();
  fnAddDiaFecha();
  fnInputSoloNumero();
  fnInputSoloNumeroComa();
  fnInputSoloNumeroGuiones();
  fnInputSoloNumeroLetrasGuion();
  fnInputNumMaxDependiendoAttr();
  fnAñadirLibroBb();
  fnEnviarLibroBe();
  fnActivarToolTips();
  fnConsultaBasica();
  fnBorrarTablaFormConsultaOnBorrar();
  fnCerrarFichaDetallesTienda();
  fnMostrarFichaArticulos();
  fnMarcarCamposEditablesFichaArticulosBB();
  fnSalvarCamposEditablesFichaArticulosBB();
  fnMarcarCamposEditablesFichaArticulosBE();
  fnSalvarCamposEditablesFichaArticulosBE();
  fnMarcarCamposEditablesFichaDetallesPeticion();
  fnSalvarCamposEditablesFichaDetallesPeticion();
  fnCuadroAddArt();
  fnSalvarNuevoArt();
  fnModalForEliminarArticulo();
  fnCargarEstados();
  fnCargarLicenciasAlInicio();
  fnCargarMicrofonoAlInicio();
  fnCargarTipoEnvioBeAlInicio();
  fnCargarNegocioAlInicio();
  fnCargarLicenciasBe();
  fnBusquedaAuto();
  fnAutoCompleteEanIsbn();
  fnLoadingGif();
  fnCargarCursosBeAlInicioEsp();
  fnCargarCursosBeAlInicioGen();
  fnCargarCursosBeAlInicioWordlist();
  fnAddCursoEspBe();
  fnAddCursoGenBe();
  fnAddCursoWordlistBe();
  fnEnviarUrl();
  fnCargarLicenciasBeFormGestion();
  fnCalcularPvpSegunDto();
  fnCalcularPvpSegunDtoRel();
  fnCalcularDtoSegunPvp();
  fnSincroTablaLibros();
  fnSincroBdTablaColegio();
  fnShowModalInfoInSearch();
  fnBorrarCursoDeListaEspBe();
  fnBuscarPorSpain();
  fnMarcarUrgente();
  fnRegistroCambios();
  fnTextAreaCompatibility();
  fnGuardarDatosRegistroCambiosFormGestion();
  fnConsultaBasicaFormConsulta();
  fnPedirVentanaDuplicacion();
  fnCalcularDtoSegunPvpRel();
  fnActivarEliminarArtListaDuplicar();

});
