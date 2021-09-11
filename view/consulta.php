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
        <title>Consulta Personalizadas</title>
    </head>
    <body>

        <script src="js/js.js" type="text/javascript"></script>
        <header class="header--abs">
            <nav>
                <div class="w3-sidebar w3-bar-block w3-animate-left" style="display:none;z-index:5" id="mySidebar">
                    <button class="w3-bar-item w3-button w3-large w3-amber js-my-burguer01--close">Cerrar Menú</button>
                    <a href="./index.php" class="w3-bar-item w3-button">Petición</a>
                    <a href="./consulta.php" class="w3-bar-item w3-button">Consulta</a>
                    <a href="./gestion.php" class="w3-bar-item w3-button">Gestión</a>
                </div>

                <div class="w3-overlay w3-animate-opacity js-my-burguer01--close" style="cursor:pointer" id="myOverlay"></div>

                <div class="my-burguer__dad--separations">
                    <button class="w3-button w3-xlarge my-burguer--02 js-my-burguer01--open" style="z-index:4" >&#9776;</button>
                </div>
            </nav>
        </header>
        <div class="w3-content my-padding__top--soli">
            <div class="w3-card-4">
                <div class="w3-container w3-amber w3-center w3-topbar w3-bottombar w3-border-teal">
                    <h2>Consulta Personalizadas</h2>
                 </div>
                <form action="../controller/controller.php" method="post" class="" enctype="multipart/form-data" id="fConsulta" name="fConsulta">
                <input type=hidden name="act" value="fnConsultarPeticion">
                <div class="w3-container">
                        <div class="w3-row-padding">
                            <div class="w3-third">
                                <select id="seNegocio"  name="seNegocio" class="w3-select"></select>
                            </div>
                            <div class="w3-third">
                                <select id="seOficina" name="seOficina" class="w3-select"></select>
                            </div>
                            <div class="w3-third">
                                <input id="inSpain" name="inSpain" class="w3-input w3-hover-grey js-val__num" type="text" placeholder="Nº Ficha Spain" maxlength="6">
                            </div>
                            <div class="w3-half">
                                <div class="w3-half">
                                    <input type="date" id="inFechaInicio" name="inFechaInicio" class="w3-input" placeholder="Fecha Inicio" title="Fecha Inicio">
                                </div>
                                <div class="w3-half">
                                    <input type="date" id="inFechaFin" name="inFechaFin" class="w3-input" placeholder="Fecha Fin" title="Fecha Fin">
                                </div>
                            </div>
                            <div class="w3-half">
                                <select id="inEstado" name="inEstado" class="w3-select">
                                </select>
                            </div>
                        </div>
                            <div class="w3-center">
                                <div class="w3-bar">
                                    <div id="inSubmitFormConsulta" class="w3-button w3-teal w3-hover-lime w3-margin w3-ripple">Buscar</div>
                                    <div id="inVaciarTablaQuery" class="w3-button w3-teal w3-hover-lime w3-margin w3-ripple">Vaciar</div>
                                </div>
                            </div>
                    </div>
                </form>
                <div class="w3-responsive">
                    <table class="w3-table-all w3-hoverable w3-centered js-ta--query" id="taFormConsulta">
                            <tr class="w3-amber">
                                <th>ID</th>
                                <th>Spain</th>
                                <th>Nombre del Centro</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Resumen</th>
                                <th>+</th>
                            </tr>
                    </table>
                </div>
            </div>
            </div>
        </div>

    <footer></footer>
    </body>
</html>
