<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="css/w3.css">
        <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
        <link rel="stylesheet" type="text/css" href="css/mycss.css">
        <link rel="shortcut icon" href="css/images/tienda.png"/>
        <script src="js/jquery-3.4.1.min.js" type="text/javascript"></script>
        <script src="js/jquery-ui.min.js" type="text/javascript"></script>
        <script src="js/js.js" type="text/javascript"></script>
        <title>Petición Personalizadas</title>
    </head>
    <body>
        <header class="header--abs">
            <nav>
                <div class="w3-sidebar w3-bar-block w3-animate-left" style="display:none;z-index:5" id="mySidebar">
                    <button class="w3-bar-item w3-button w3-large w3-amber js-my-burguer01--close" onclick="">Cerrar Menú</button>
                    <a href="./index.php" class="w3-bar-item w3-button">Petición</a>
                    <a href="./consulta.php" class="w3-bar-item w3-button">Consulta</a>
                    <a href="./gestion.php" class="w3-bar-item w3-button">Gestión</a>
                </div>

                <div class="w3-overlay w3-animate-opacity js-my-burguer01--close" onclick="" style="cursor:pointer" id="myOverlay"></div>

                <div class="my-burguer__dad--separations">
                    <button class="w3-button w3-xlarge my-burguer--01 js-my-burguer01--open" onclick="" style="z-index:4" >&#9776;</button>
                </div>
            </nav>
        </header>
        <div class="w3-content my-padding__top--soli">
            <div class="w3-card-4">
                <div class="w3-container w3-teal w3-center">
                    <h2>Petición Personalizada</h2>
                </div>
                <form action="../controller/controller.php" method="post" class="" id="fPeticion" name="fPeticion" enctype="multipart/form-data">
                    <input type=hidden name="act" value="fnInsertarPeticion">
                    <div id="diDatosGenerales" class="w3-container">
                        <div class="w3-row-padding">
                            <div class="w3-third">
                                <select id="seOficina" name="seOficina" class="w3-select" data-required></select>
                            </div>
                            <div class="w3-third">
                                <select id="seSolicitante" name="seSolicitante" class="w3-select" data-required>
                                    <option value="" disabled selected>Solicitante</option>
                                </select>
                            </div>
                            <div class="w3-third">
                                <input id="inFechaSolicitud" name="inFechaSolicitud" class="w3-input w3-hover-grey" type="text" title="Fecha de hoy, no editable" readonly>
                            </div>
                            <div class="w3-col m3">
                                <input id="inSpain" name="inSpain" class="w3-input w3-hover-grey in__spain js-in__spain js-val__num" type="text" maxlength="6" placeholder="Nº Ficha Spain" data-required>
                            </div>
                            <div class="w3-col m1 w3-container">
                                <div class="w3-button w3-block w3-amber w3-ripple bt__buscar--spain js-bt__buscar--spain" title="Buscar Nº Spain">Buscar</div>
                            </div>
                            <div class="w3-col m8">
                                <input id="inNombreCentro" name="inNombreCentro" class="w3-input w3-hover-grey" type="text" maxlength="50" placeholder="Nombre del Centro" data-required>
                            </div>
                            <div class="w3-col l12">
                                <input id="inObsSol" name="inObsSol" class="w3-input w3-hover-grey" type="text" maxlength="512" title="Opcional: Observaciones" placeholder="Observaciones">
                            </div>
                        </div>
                    </div>
                    <div id="diTabsPeticion">
                        <ul>
                            <li><a href="#diTab-BB">BB</a></li>
                            <li><a href="#diTab-BE">BE</a></li>
                        </ul>
                        <div class="w3-container" id="diTab-BB">
                            <input type=hidden name="inTab" value="BB">
                            <div class="w3-row-padding di__bb">
                                <div class="">
                                    <input id="inNumeroCentro" name="inNumeroCentro" class="w3-input w3-hover-grey js-val__num" type="text" maxlength="9" placeholder="Nº Oficial del Centro: Obligatorio para E-Books" title="Nº Oficial del Centro: Obligatorio para E-Books">
                                </div>
                                <fieldset>

                                    <div class="w3-col w3-container  m1 l3 w3-center"></div>
                                    <div class="w3-col w3-container m10 l6 w3-center">
                                        <select id="inLicencia" name="inLicencia" class="w3-select my-se__clear--ext" title="Obligatorio:Tipo de Licencia" data-required></select>
                                    </div>
                                    <div class="w3-col w3-container m1 l3 w3-center"></div>

                                    <div class="w3-col m11">
                                        <div class="ui-widget">
                                            <input class="w3-input w3-border w3-padding my-se__clear" type="text" id="inSearch" name="inSearch" placeholder="Escribe AQUI al menos 5 caracteres para la busqueda automática por NOMBRE, despues elige." data-required>
                                        </div>
                                    </div>
                                    <div class="w3-col m1">

                                        <div class="w3-button w3-circle w3-amber w3-margin-left w3-ripple js-bt__info--inSearch w3-animate-zoom" title=""><span class="ui-icon ui-icon-help"></span></div>

                                    </div>

                                    <div class="w3-half">
                                        <input id="inEan" name="inEan" class="w3-input w3-hover-grey js-val__num--only" type="text" maxlength="13" placeholder="EAN" data-required readonly>
                                    </div>
                                    <div class="w3-half">
                                        <input id="inIsbn" name="inIsbn" class="w3-input w3-hover-grey js-val__numyletras--guion" type="text" maxlength="13" placeholder="ISBN" data-required readonly>
                                    </div>
                                    <div class="w3-col l4">
                                        <input id="inPrecioSinDtoBb" name="inPrecioSinDtoBb" class="w3-input w3-hover-grey in__precio--sdto js-val__num js-val__num--max" type="text" maxlength="6" max="150" placeholder="Precio Sin Dto IVA inc." title="Precio Sin Dto IVA inc." data-required readonly>
                                    </div>
                                    <div class="w3-col l1 w3-container"></div>
                                    <div class="w3-col l2">
                                        <input id="inDtoBb" name="inDtoBb" class="w3-input w3-hover-grey in__dto js-val__num js-val__num--max" type="text" maxlength="5" max="100" placeholder="Descuento" title="Dto. en tanto por ciento sin el símbolo">
                                    </div>
                                     <div class="w3-col l1 w3-container">
                                    </div>
                                    <div class="w3-col l4">
                                        <input id="inPrecioConDtoBb" name="inPrecioConDtoBb" class="w3-input w3-hover-grey in__precio--cdto js-val__num js-val__num--max" type="text" maxlength="6" max="150" placeholder="Precio Final Con Dto" title="Precio Final Con Dto">
                                    </div>
                                    <div class="w3-col l2">
                                        <input id="inAlumnosBb" name="inAlumnosBb" class="w3-input w3-hover-grey js-val__num--only js-val__num--max" type="text" maxlength="4" max="1000" placeholder="Nº de Alumnos" data-required>
                                    </div>
                                    <div class="w3-col l10">
                                        <input id="inTituloCursoWebBb" name="inTituloCursoWebBb" class="w3-input w3-hover-grey" type="text" maxlength="75" placeholder="Nombre del Curso para la Eshop" data-required>
                                    </div>
                                    <div class="w3-col l12">
                                        <input id="inObsBb" name="inObsBb" class="w3-input w3-hover-grey" type="text" maxlength="144" placeholder="Observaciones referentes a este título/curso. Por ejemplo para indicar si el libro no lleva IVA o si forma parte de un pack con el siguiente artículo.">
                                    </div>
                                    <div class="w3-col w3-center">
                                        <div id="btAddBookBb" class="w3-button w3-amber w3-margin-top w3-ripple" title="Añadir Curso a la lista">Añadir</div>
                                    </div>
                                </fieldset>
                                <div id="btAddPeticionBb" class="w3-button w3-block w3-teal w3-ripple w3-large w3-margin-top w3-animate-zoom" title="Añadir al menos un libro para que se active el botón de envio. Solo se enviará lo que aparezca en la lista inferior.">Enviar Petición BB</div>
                            </div>
                        </div>
                        <div class="w3-container" id="diTab-BE">
                            <input type=hidden name="inTab" value="BE">
                            <div class="w3-row di__be">
                                <div class="w3-col w3-container  m1 l3 w3-center"></div>
                                <div class="w3-col w3-container m10 l6 w3-center">
                                    <select id="seLicenciaBe" name="seLicenciaBe" class="w3-select my-se__clear" data-required></select>
                                </div>
                                <div class="w3-col w3-container m1 l3 w3-center"></div>
                                <div class="w3-col l4">
                                    <select id="seCursosEspecialidades" name="seCursosEspecialidades" class="w3-select" title="Elige Especialidad y pulsa en + para añadir"></select>
                                </div>
                                <div class="w3-col l1">
                                    <div id="btAddCursoEspBe" class=" w3-button w3-teal w3-ripple">+</div>
                                </div>
                                <div class="w3-col l2">
                                    <select id="seCursosGenerales" name="seCursosGenerales" class="w3-select" title="Elige Curso General y pulsa en + para añadir"></select>
                                </div>
                                <div class="w3-col l1">
                                    <div id="btAddCursoGenBe" class="w3-button w3-teal w3-ripple">+</div>
                                </div>
                                <div class="w3-col l3">
                                    <select id="seWordlist" name="seWordlist" class="w3-select" title="Elige WordList y pulsa en + para añadir"></select>
                                </div>
                                <div class="w3-col l1">
                                    <div id="btAddWordlist" class="w3-button w3-teal w3-ripple">+</div>
                                </div>
                              <div class="w3-col l12 w3-center w3-margin-top">
                                    <div class="w3-responsive">
                                        <table class="w3-table-all w3-hoverable w3-centered w3-card-2 w3-margin-bottom ta__cursos--be" id="taCursosBe">
                                            <tr class="w3-amber">
                                                <th>Conjunto de Cursos que componen esta licencia.</th>
                                            </tr>
                                            <tr>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

                                <div class="w3-col w3-center">
                                        <div id="btBorrarCursoDeListaEspBe" class="w3-button w3-amber w3-ripple" title="Vaciar Cursos de la lista superior">Vaciar</div>
                                    </div>

                                <div class="w3-col l12">
                                    <input id="inTituloCursoWebBe" name="inTituloCursoWebBe" class="w3-input w3-hover-grey w3-col" type="text" maxlength="75" placeholder="Nombre del Curso para la Eshop" data-required>
                                </div>
                                <div class="w3-third">
                                    <input id="inAlumnosBe" name="inAlumnosBe" class="w3-input w3-hover-grey js-val__num js-val__num--max" type="text" maxlength="3" max="1000" placeholder="Nº de Alumnos" data-required>
                                </div>
                                <div class="w3-third">
                                    <select id="inMicroBe" name="inMicroBe" class="w3-select" data-required></select>
                                </div>
                                <div class="w3-third">
                                    <select id="inEnvioBe" name="inEnvioBe" class="w3-select" data-required></select>
                                </div>
                                <div class="w3-col l12">
                                    <input id="inFechaInicioBe" name="inFechaInicioBe" class="w3-input w3-hover-grey" type="date" title="Opcional: Fecha Inicio">
                                </div>
                                <div class="w3-col l12">
                                    <input id="inFechaFinBe" name="inFechaFinBe" class="w3-input w3-hover-grey" type="date" title="Opcional: Fecha Fin">
                                </div>
                                <div class="w3-col l12">
                                    <input id="inObsBe" name="inObsBe" class="w3-input w3-hover-grey" type="text" maxlength="144" placeholder="Observaciones: Observaciones referentes a este título/curso" title="Opcional: Observaciones referentes a este título/curso">
                                </div>
                                <div class="w3-col w3-center">
                                    <div id="btAddBookBe" class="w3-button w3-amber w3-margin w3-ripple" title="Añadir Curso a la lista">Añadir</div>
                                </div>
                                <div id="btAddPeticionBe" class="w3-button w3-block w3-teal w3-ripple w3-large w3-margin-top w3-animate-zoom">Enviar Petición BE</div>
                            </div>
                        </div>
                    </div>
                    <div class="w3-responsive">
                        <table class="w3-table-all w3-hoverable w3-centered w3-card-2" id="taCursos">

                        </table>
                    </div>
                </form>
            </div>
        </div>
        <footer></footer>
    </body>
</html>
