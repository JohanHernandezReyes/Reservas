//VALIDAR CAMPOS VACIOS
function validarvacio(campo, msj_vacio) {
    if (campo == "") {
        alert(msj_vacio);
        throw 'exit';
    }
}

//GOOGLE OAUTH
function Username(googleUser) {
    var Name = googleUser.getBasicProfile().getName();
    var Email = googleUser.getBasicProfile().getEmail();
    $("#user").text(Name);
    $("#useremail").html(Email);
    $(".unauthenticated").hide();
    $(".authenticated").show();
    U=document.getElementById("Uemail");
    U.value = Email;
    console.log(U.value);
}    

function Verificarlogin(){
    console.log($("#useremail").html());
    if($("#useremail").html()==""){
        $(".aut").hide();
        $(".unaut").show();
        console.log("Usuario no autenticado");
    }
}

//1.FUNCIONES PARA LA TABLA CABIN
function ConsultarCabin() {
    $.ajax({
        url: "http://129.151.117.220:9000/api/Cabin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#detalle").empty();
            console.log(respuesta);
            rta_cabin = respuesta;
            globalThis;
            mostrarCabin(respuesta.items);
            Verificarlogin();
            OcultarForm();
        }
    });
}

function mostrarCabin() {
if(rta_cabin.length==0){
    var nodata=document.createTextNode("No existen datos en la tabla seleccionada");
    $("#resultado").append(nodata);
}
else{      
    let myTable = "<table border='2'>";
    let thead = "<thead>";
    thead += "<tr>";
    thead += "<th>" + "ID" + "</th>"
    thead += "<th>" + "NOMBRE CABAÑA" + "</th>"
    thead += "<th>" + "ACCIONES" + "</th>"
    thead += "</tr>";
    thead += "<thead>";
    myTable += thead;
    for (i = 0; i < rta_cabin.length; i++) {
        myTable += "<tr>";
        myTable += "<td align=center>" + rta_cabin[i].id + "</td>";
        myTable += "<td align=center>" + rta_cabin[i].name + "</td>";
        myTable += "<td> <button class='bacc' onclick='Consultar1Cabin(" + rta_cabin[i].id + ")'>Ver Detalles</button>" +
            "<button class='bacc' onclick='ConsultarMsgCabin(" + rta_cabin[i].id + ")'>Mensajes</button>" +
            "<button class='bacc container aut' onclick='borrarCabin("+rta_cabin[i].id+")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    myTable += "</div id='detalle'></div>";
    $("#resultado").append(myTable);
}
}

function Consultar1Cabin(idElemento) {
    let myData = idElemento;
    console.log(idElemento);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Cabin/" + myData,
        type: "GET",
        data: myData,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaid) {
            $("#detalle").empty();
            Cabin1 = respuestaid;
            globalThis;
            let data = {
                id: Cabin1.id,
                name: Cabin1.name,
                brand: Cabin1.brand,
                rooms: Cabin1.rooms,
                category: Cabin1.category.name,
                description: Cabin1.description,
            }
            $("#resultado").empty();
            $("#detalle").empty();
            DetalleCabin(data)
            Verificarlogin();
            OcultarForm();
        }
    });
}

function DetalleCabin(data) {
    console.log(data);
    let myTableD = "<table border='2'>";
    let thead = "<thead>";
        thead += "<tr>";
        thead += "<th>" + "NOMBRE" + "</th>"
        thead += "<th>" + "BRAND" + "</th>"
        thead += "<th>" + "N° HABITACIONES" + "</th>"
        thead += "<th>" + "CATEGORIA" + "</th>"
        thead += "<th>" + "DESCRIPCION" + "</th>"
        thead += "<th class='container aut'>" + "EDITAR INFO" + "</th>"
        thead += "</tr>";
    thead += "<thead>";
    myTableD += thead;
    myTableD += "<tr>";
        myTableD += "<td align=center>" + data.name + "</td>";
        myTableD += "<td align=center>" + data.brand + "</td>";
        myTableD += "<td align=center>" + data.rooms + "</td>";
        myTableD += "<td align=center>" + data.category + "</td>";
        myTableD += "<td align=center>" + data.description + "</td>";
        myTableD += "<td> <button class='bacc container aut' onclick='ModifCabin()'>Editar</button>"; 
    myTableD += "</tr>";
    myTableD += "</table>";
    $("#detalle").append(myTableD);
}

function mostrarlabels() {
    document.getElementById("labid").removeAttribute("hidden");
    document.getElementById("labbrand").removeAttribute("hidden");
    document.getElementById("labrooms").removeAttribute("hidden");
    document.getElementById("labcatid").removeAttribute("hidden");
    document.getElementById("labname").removeAttribute("hidden");
    document.getElementById("labdesc").removeAttribute("hidden");
}

function AgregarCabin() {
    $("#category_id").load(location.href + " #category_id>*", "");
    $("#resultado").empty();
    $("#detalle").empty();
    mostrarlabels();
    document.getElementById("id").setAttribute("hidden", "true");
    document.getElementById("brand").removeAttribute("hidden"); $("#brand").val("");
    document.getElementById("rooms").removeAttribute("hidden"); $("#rooms").val("");
    ListaCategorias();
    document.getElementById("BMCat").removeAttribute("hidden");
    document.getElementById("category_id").removeAttribute("hidden"); $("#category_id").val("");
    document.getElementById("name").removeAttribute("hidden"); $("#name").val("");
    document.getElementById("desc").removeAttribute("hidden"); $("#desc").val("");
    document.getElementById("BGCab").removeAttribute("hidden");
    document.getElementById("BECab").setAttribute("hidden", "true");
}

function ModifCabin(){
    $("#resultado").empty();
    $("#detalle").empty();
    mostrarlabels();
    document.getElementById("id").removeAttribute("hidden");
    $("#id").val(Cabin1.id);
    document.getElementById("id").setAttribute("disabled", "disabled");
    document.getElementById("brand").removeAttribute("hidden");
    $("#brand").val(Cabin1.brand);
    document.getElementById("rooms").removeAttribute("hidden");
    $("#rooms").val(Cabin1.rooms);
    ListaCategorias();
    document.getElementById("labcatid").setAttribute("hidden", "true");
    $("#category_id").val(Cabin1.category.id);
    document.getElementById("name").removeAttribute("hidden");
    $("#name").val(Cabin1.name);
    document.getElementById("desc").removeAttribute("hidden");
    $("#desc").val(Cabin1.description);
    document.getElementById("BECab").removeAttribute("hidden");
    document.getElementById("BGCab").setAttribute("hidden", "true");
}

function OcultarForm() {
    document.getElementById("labid").setAttribute("hidden", "true");
    document.getElementById("labbrand").setAttribute("hidden", "true");
    document.getElementById("labrooms").setAttribute("hidden", "true");
    document.getElementById("labcatid").setAttribute("hidden", "true");
    document.getElementById("labname").setAttribute("hidden", "true");
    document.getElementById("labdesc").setAttribute("hidden", "true");
    document.getElementById("id").setAttribute("hidden", "true");
    document.getElementById("brand").setAttribute("hidden", "true");
    document.getElementById("rooms").setAttribute("hidden", "true");
    document.getElementById("category_id").setAttribute("hidden", "true");
    document.getElementById("name").setAttribute("hidden", "true");
    document.getElementById("desc").setAttribute("hidden", "true");
    document.getElementById("BGCab").setAttribute("hidden", "true");
    document.getElementById("BECab").setAttribute("hidden", "true");
    document.getElementById("categoria").setAttribute("hidden", "true");
}

function guardarCabin() {
    validarvacio($("#brand").val(), "Debe ingresar un brand");
    validarvacio($("#rooms").val(), "Debe ingresar un N° de cuartos");
    validarvacio($("#category_id").val(), "Debe seleccionar una categoria");
    validarvacio($("#name").val(), "Debe ingresar un nombre para la cabaña");
    let myData = {
        brand: $("#brand").val(),
        rooms: $("#rooms").val(),
        category: { id: $("#category_id").val() },
        name: $("#name").val(),
        description: $("#desc").val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Cabin/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#brand").val("");
            $("#rooms").val("");
            $("#category_id").val("");
            $("#name").val("");
            $("#desc").val("");
            console.log(respuesta);
            alert("se ha guardado el dato");
            ConsultarCabin();
            OcultarForm();
        }
    });
}

function editarCabin(){
    validarvacio($("#brand").val(), "Debe ingresar un brand");
    validarvacio($("#rooms").val(), "Debe ingresar un N° de cuartos");
    validarvacio($("#name").val(), "Debe ingresar un nombre para la cabaña");

    let myData={
        id:$("#id").val(),
        brand:$("#brand").val(),
        rooms:$("#rooms").val(),
        category: { id: $("#category_id").val() },
        name:$("#name").val(),
        description: $("#desc").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.117.220:9000/api/Cabin/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#roooms").val("");
            $("#category_id").val("");
            $("#name").val("");
            $("#desc").val("");
            ConsultarCabin();
            alert("se ha Actualizado");
            OcultarForm();
        }
    });
}

function borrarCabin(idElemento){
    let myData = idElemento;
    $.ajax({
        url:"http://129.151.117.220:9000/api/Cabin/"+myData,
        type:"DELETE",
        data:myData,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#detalle").empty();
            ConsultarCabin();
            alert("Se ha Eliminado.")
        }
    });
}

function ListaCabañas() {
    $.ajax({
        url: "http://129.151.117.220:9000/api/Cabin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#detalle").empty();
            respuesta;
            console.log(respuesta);
            const $listcab = $("#cabin_msg");
            for (i = 0; i < respuesta.length; i++) {
                $listcab.append($("<option>", { value: respuesta[i].id, text: respuesta[i].name }))
            }
        }
    });
}

//2.FUNCIONES PARA LA TABLA CLIENTE
function ConsultarClient() {
    $.ajax({
        url: "http://129.151.117.220:9000/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultClient").empty();
            $("#detalleClient").empty();
            rta_client = respuesta;
            globalThis;
            console.log(respuesta);
            mostrarClient(respuesta.items);
            Verificarlogin();
            OcultarFormClient();
        }
    });
}

function mostrarClient() {
if(rta_client.length==0){
    var nodata=document.createTextNode("No existen datos en la tabla seleccionada");
    $("#resultClient").append(nodata);
}
else{     
    let myTable = "<table border= '2'>";
    let thead = "<thead>";
    thead += "<tr>";
    thead += "<th>" + "ID" + "</th>"
    thead += "<th>" + "NOMBRE" + "</th>"
    thead += "<th>" + "ACCIONES" + "</th>"
    thead += "</tr>";
    thead += "<thead>";
    myTable += thead;
    for (i = 0; i < rta_client.length; i++) {
        myTable += "<tr>";
        myTable += "<td align=center>" + rta_client[i].idClient + "</td>";
        myTable += "<td align=center>" + rta_client[i].name + "</td>";
        myTable += "<td> <button class='bacc' onclick='Consultar1Client(" + rta_client[i].idClient + ")'>Ver Detalles</button>"+
                    "<button class='bacc container aut' onclick='borrarClient("+rta_client[i].idClient+")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultClient").append(myTable);
}
}

function Consultar1Client(idElemento) {
    let myData = idElemento;
    console.log(idElemento);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Client/" + myData,
        type: "GET",
        data: myData,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaid) {
            $("#detalle").empty();
            Client1 = respuestaid;
            globalThis;
            let dataClient = {
                idClient: Client1.idClient,
                name: Client1.name,
                email: Client1.email,
                age: Client1.age,
                password: Client1.password,
            }
            $("#resultClient").empty();
            $("#detalleClient").empty();
            DetalleClient(dataClient)
            globalThis;
            Verificarlogin();
            OcultarFormClient();
        }
    });
}

function DetalleClient(dataClient) {
    console.log(dataClient);
    let myTableD = "<table border= '2'>";
    let thead = "<thead>";
        thead += "<tr>";
        thead += "<th>" + "ID" + "</th>"
        thead += "<th>" + "NOMBRE" + "</th>"
        thead += "<th>" + "EMAIL" + "</th>"
        thead += "<th>" + "EDAD" + "</th>"
        thead += "<th class='container aut'>" + "CONTRASEÑA" + "</th>"
        thead += "<th class='container aut'>" + "EDITAR" + "</th>"
    thead += "</tr>";
    thead += "<thead>";
    myTableD += thead;
    myTableD += "<tr>";
        myTableD += "<td align=center>" + dataClient.idClient + "</td>";
        myTableD += "<td align=center>" + dataClient.name + "</td>";
        myTableD += "<td align=center>" + dataClient.email + "</td>";
        myTableD += "<td align=center>" + dataClient.age + "</td>";
        myTableD += "<td class='container aut' align=center><font color= 'red'>" + dataClient.password + "</font></td>";
        myTableD += "<td> <button class='bacc container aut' onclick='ModifClient()'>Editar</button>"; 
    myTableD += "</tr>";
    myTableD += "</table>";
    $("#detalleClient").append(myTableD);

}

function mostrarlabelsC() {
    document.getElementById("labidC").removeAttribute("hidden");
    document.getElementById("labnameC").removeAttribute("hidden");
    document.getElementById("labemail").removeAttribute("hidden");
    document.getElementById("labage").removeAttribute("hidden");
    document.getElementById("labclave").removeAttribute("hidden");
}

function AgregarClient() {
    $("#resultClient").empty();
    $("#detalleClient").empty();
    mostrarlabelsC();
    document.getElementById("nameC").removeAttribute("hidden"); $("#nameC").val("");
    document.getElementById("email").removeAttribute("hidden"); $("#email").val("");
    document.getElementById("age").removeAttribute("hidden"); $("#age").val("");
    document.getElementById("passwordC").removeAttribute("hidden"); $("#passwordC").val("");
    document.getElementById("BGCl").removeAttribute("hidden");
    document.getElementById("BECl").setAttribute("hidden", "true");
}

function ModifClient(){
    $("#resultClient").empty();
    $("#detalleClient").empty();
    mostrarlabelsC();
    document.getElementById("idC").removeAttribute("hidden");
    $("#idC").val(Client1.idClient);
    document.getElementById("idC").setAttribute("disabled", "true");
    document.getElementById("nameC").removeAttribute("hidden");
    $("#nameC").val(Client1.name);
    document.getElementById("email").removeAttribute("hidden");
    $("#email").val(Client1.email);
    document.getElementById("email").setAttribute("disabled", "true");
    document.getElementById("age").removeAttribute("hidden");
    $("#age").val(Client1.age);
    document.getElementById("passwordC").removeAttribute("hidden");
    $("apasswordC").val(Client1.password);
    document.getElementById("BECl").removeAttribute("hidden");
}

function OcultarFormClient() {
    document.getElementById("labidC").setAttribute("hidden", "true");
    document.getElementById("labnameC").setAttribute("hidden", "true");
    document.getElementById("labemail").setAttribute("hidden", "true");
    document.getElementById("labage").setAttribute("hidden", "true");
    document.getElementById("labclave").setAttribute("hidden", "true");
    document.getElementById("idC").setAttribute("hidden", "true");
    document.getElementById("nameC").setAttribute("hidden", "true");
    document.getElementById("email").setAttribute("hidden", "true");
    document.getElementById("age").setAttribute("hidden", "true");
    document.getElementById("passwordC").setAttribute("hidden", "true");
    document.getElementById("BGCl").setAttribute("hidden", "true");
    document.getElementById("BECl").setAttribute("hidden", "true");
}

function guardarClient() {
    validarvacio($("#nameC").val(), "Debe ingresar un nombre");
    validarvacio($("#email").val(), "Debe ingresar un e-mail");
    validarvacio($("#age").val(), "Debe ingresar la edad del cliente");
    validarvacio($("#passwordC").val(), "Debe ingresar una contraseña");
    let myData = {
        name: $("#nameC").val(),
        email: $("#email").val(),
        age: $("#age").val(),
        password: $("#passwordC").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Client/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultClient").empty();
            $("#detalleClient").empty();
            $("#nameC").val("");
            $("#email").val("");
            $("#age").val("");
            $("#password").val("");
            Verificarlogin();
            ConsultarClient();
            alert("se ha guardado el dato");
            OcultarFormClient();
        }
    });
}

function editarClient(){
    validarvacio($("#nameC").val(), "Debe ingresar un nombre");
    validarvacio($("#email").val(), "Debe ingresar un e-mail");
    validarvacio($("#age").val(), "Debe ingresar la edad del cliente");
    validarvacio($("#passwordC").val(), "Debe ingresar una contraseña");

    let myData={
        idClient:$("#idC").val(),
        name:$("#nameC").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#passwordC").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.117.220:9000/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultClient").empty();
            $("#idC").val("");
            $("#nameC").val("");
            $("#email").val("");
            $("#age").val("");
            $("#passwordC").val("");
            ConsultarClient();
            alert("se ha Actualizado");
            OcultarFormClient();
        }
    });
}

function borrarClient(idElemento){
    let myData = idElemento;
    $.ajax({
        url:"http://129.151.117.220:9000/api/Client/"+myData,
        type:"DELETE",
        data:myData,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultClient").empty();
            $("#detalleClient").empty();
            ConsultarClient();
            alert("Se ha Eliminado.")
        }
    });
}

function ListaClientes() {
    $.ajax({
        url: "http://129.151.117.220:9000/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#detalle").empty();
            respuesta;
            console.log(respuesta);
            const $listcli = $("#client_msg");
            for (i = 0; i < respuesta.length; i++) {
                $listcli.append($("<option>", { value: respuesta[i].idClient, text: respuesta[i].name }))
            }
        }
    });
}

//3.FUNCIONES PARA LA TABLA MESSAGE
function ConsultarMsg() {
    $.ajax({
        url: "http://129.151.117.220:9000/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function r(respuesta) {
            $("#resultMsg").empty();
            console.log(respuesta);
            rta_message = respuesta;
            globalThis;
            mostrarMsg(respuesta.items);
            Verificarlogin();
            document.getElementById("labcabinmsg").setAttribute("hidden", "true");
            document.getElementById("labclientmsg").setAttribute("hidden", "true");
            document.getElementById("cabin_msg").setAttribute("hidden", "true");
            document.getElementById("client_msg").setAttribute("hidden", "true");
            document.getElementById("msg").setAttribute("hidden", "true");
            document.getElementById("BGM").setAttribute("hidden", "true");
        }
    });
}

function mostrarMsg() {
if(rta_message.length==0){
    var nodata=document.createTextNode("No existen datos en la tabla seleccionada");
    $("#resultMsg").append(nodata);
}
else{ 
    let myTable = "<table border= '2'>";
    let thead = "<thead>";
    thead += "<tr>";
    thead += "<th>" + "MENSAJE" + "</th>"
    thead += "<th>" + "CLIENTE" + "</th>"
    thead += "<th>" + "CABAÑA" + "</th>"
    thead += "<th class='container aut'>" + "BORRAR" + "</th>"
    thead += "</tr>";
    thead += "<thead>";
    myTable += thead;
    for (i = 0; i < rta_message.length; i++) {
        myTable += "<tr>";
        myTable += "<td align=center>" + rta_message[i].messageText + "</td>";
        myTable += "<td align=center>" + rta_message[i].client.name + "</td>";
        myTable += "<td align=center>" + rta_message[i].cabin.name + "</td>";
        myTable+="<td class='container aut'> <button class='bacc' onclick='borrarMsg("+rta_message[i].idMessage+")'>Borrar</button>"
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultMsg").append(myTable);
}
}

function guardarMsg() {
    validarvacio($("#msg").val(), "No ha ingresado ningún mensaje");
    validarvacio($("#cabin_msg").val(), "Debe seleccionar una cabaña");
    validarvacio($("#client_msg").val(), "Debe seleccionar un cliente");
    ConsultarMsg();
    let myData = {
        messageText: $("#msg").val(),
        cabin: { id: $("#cabin_msg").val() },
        client: { idClient: $("#client_msg").val() },
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Message/save",
        type: "POST",
        contentType: "application/JSON",
        data: dataToSend,
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultMsg").empty();
            $("#msg").val("");
            console.log(respuesta);
            ConsultarMsg();
            document.getElementById("labcabinmsg").setAttribute("hidden", "true");
            document.getElementById("labclientmsg").setAttribute("hidden", "true");
            document.getElementById("cabin_msg").setAttribute("hidden", "true");
            document.getElementById("client_msg").setAttribute("hidden", "true");
            document.getElementById("msg").setAttribute("hidden", "true");
            document.getElementById("BGM").setAttribute("hidden", "true");
            alert("se ha guardado el dato")
        }
    });
}

function AgregarMsg() {
    $("#cabin_msg").load(location.href + " #cabin_msg>*", "");
    $("#client_msg").load(location.href + " #client_msg>*", "");
    $("#resultMsg").empty();
    document.getElementById("labcabinmsg").removeAttribute("hidden");
    document.getElementById("labclientmsg").removeAttribute("hidden");
    ListaCabañas();
    document.getElementById("cabin_msg").removeAttribute("hidden"); $("#cabin_msg").val("");
    document.getElementById("NewCabin").removeAttribute("hidden");
    ListaClientes();
    document.getElementById("client_msg").removeAttribute("hidden"); $("#client_msg").val("");
    document.getElementById("NewClient").removeAttribute("hidden");
    document.getElementById("msg").removeAttribute("hidden"); $("#msg").val("");
    document.getElementById("BGM").removeAttribute("hidden");
}

function ConsultarMsgCabin(idElemento) {
    let myData = idElemento;
    console.log(idElemento);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Cabin/" + myData,
        type: "GET",
        data: myData,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaid) {
            $("#detalle").empty();
            MsgCabin1 = respuestaid;
            globalThis;
            const listamsgs = MsgCabin1.messages;
            idsM = [];
            listamsgs.forEach(function (id) {
                idsM.push(id.idMessage);
            });
            console.log(idsM);
            $("#resultado").empty();
            $("#detalle").empty();
            DetalleMsgCabin(idsM.items);
            globalThis;
            OcultarForm();
        }
    });
}

function DetalleMsgCabin() {
if(MsgCabin1.messages.length==0){
    var nodata=document.createTextNode("No existen datos en la tabla seleccionada");
    $("#detalle").append(nodata);
}
else{
    let myTableDM = "<table id='tablaDM' border='2'>";
    let thead = "<thead>";
    thead += "<tr>";
    thead += "<th>" + "MENSAJE" + "</th>"
    thead += "<th>" + "CLIENTE" + "</th>"
    thead += "</tr>";
    thead += "<thead>";
    myTableDM += thead;
    for (i = 0; i < MsgCabin1.messages.length; i++) {
        ConsultarClientMsg(MsgCabin1.messages[i].idMessage, i);
        myTableDM += "<tr  id='fila'>";
        myTableDM += "<td align=center>" + MsgCabin1.messages[i].messageText + "</td>";
        myTableDM += "</tr>";
    }
    myTableDM += "</table>";
    myTableDM += "</div id='detalle'></div>";
    $("#detalle").append(myTableDM);
}
}

function ConsultarClientMsg(idElemento, i) {
    let myData = idElemento;
    $.ajax({
        url: "http://129.151.117.220:9000/api/Message/" + myData,
        type: "GET",
        data: myData,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaidC) {
            nomcliente = respuestaidC.client.name;
            if (i == 0) {
                var celda = document.createElement("td");
                var a = document.createTextNode(nomcliente);
                celda.appendChild(a);
                celda.style.textAlign = "center";
                x = document.getElementById("fila");
                x.appendChild(celda);
            } else {
                var a = document.createTextNode(nomcliente);
                const tabla = document.getElementById("tablaDM");
                var numfila = tabla.rows[i + 1];
                console.log(numfila);
                var newcell = numfila.insertCell(1);
                newcell.appendChild(a);
                newcell.style.textAlign = "center";
            }
        }
    });
}

function borrarMsg(idElemento){
    let myData = idElemento;
    $.ajax({
        url:"http://129.151.117.220:9000/api/Message/"+myData,
        type:"DELETE",
        data:myData,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultMsg").empty();
            ConsultarMsg();
            alert("Se ha Eliminado.")
        }
    });
}

//4.FUNCIONES PARA LA TABLA CATEGORY
function ListaCategorias() {
    $.ajax({
        url: "http://129.151.117.220:9000/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado").empty();
            $("#detalle").empty();
            respuesta;
            console.log(respuesta);
            const $listcat = $("#category_id");
            for (i = 0; i < respuesta.length; i++) {
                $listcat.append($("<option>", { value: respuesta[i].id, text: respuesta[i].name }))
            }
        }
    });
}

function ConsultarCategoria() {
    $.ajax({
        url: "http://129.151.117.220:9000/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultCategory").empty();
            $("#detalleCategory").empty();
            console.log(respuesta);
            rta_category = respuesta;
            globalThis;
            tablaCategoria(respuesta.items);
            OcultarFormCategoria();
        }
    });
}

function tablaCategoria() {
if(rta_category.length==0){
    var nodata=document.createTextNode("No existen datos en la tabla seleccionada");
    $("#resultCategory").append(nodata);
}
else{
    let myTable = "<table border='2'>";
    let thead = "<thead>";
    thead += "<tr>";
    thead += "<th>" + "ID" + "</th>"
    thead += "<th>" + "NOMBRE CATEGORIA" + "</th>"
    thead += "<th>" + "DESCRIPCION" + "</th>"
    thead += "<th>" + "ACCIONES" + "</th>"
    thead += "</tr>";
    thead += "<thead>";
    myTable += thead;
    for (i = 0; i < rta_category.length; i++) {
        myTable += "<tr>";
        myTable += "<td align=center>" + rta_category[i].id + "</td>";
        myTable += "<td align=center>" + rta_category[i].name + "</td>";
        myTable += "<td align=center>" + rta_category[i].description + "</td>";
        myTable += "<td> <button class='bacc' onclick='ConsultarCabinsCat(" + rta_category[i].id + ")'>Ver Cabañas</button>" +
            "<button class='bacc' onclick='ModificarCategoria("+rta_category[i].id+")'>Editar</button>" +
            "<button class='bacc' onclick='borrarCategoria("+rta_category[i].id+")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    myTable += "</div id='detalle'></div>";
    $("#resultCategory").append(myTable);
}
}
function MostrarCategoria() {
    document.getElementById("categoria").removeAttribute("hidden");
    document.getElementById("labnameCat").removeAttribute("hidden");
    document.getElementById("labdescCat").removeAttribute("hidden");
    document.getElementById("nameCat").removeAttribute("hidden");
    document.getElementById("descCat").removeAttribute("hidden");
    document.getElementById("BGCat").removeAttribute("hidden");
}

function CrearCategoria() {
    validarvacio($("#nameCat").val(), "Por favor ingrese el nombre de la categoria");
    validarvacio($("#descCat").val(), "Por favor ingrese la descripcion de la categoria");
    let myData = {
        name: $("#nameCat").val(),
        description: $("#descCat").val(),
    }
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Category/save",
        type: "POST",
        contentType: "application/JSON",
        data: dataToSend,
        datatype: "JSON",
        success: function (respuesta) {
            $("#nameCat").val("");
            $("#descCat").val("");
            console.log(respuesta);
            alert("Categoría creada exitosamente")
            $("#category_id").load(location.href + " #category_id>*", "");
            ListaCategorias();
            document.getElementById("labnameCat").setAttribute("hidden", "true");
            document.getElementById("labdescCat").setAttribute("hidden", "true");
            document.getElementById("nameCat").setAttribute("hidden", "true");
            document.getElementById("descCat").setAttribute("hidden", "true");
            document.getElementById("BGCat").setAttribute("hidden", "true");
            document.getElementById("categoria").setAttribute("hidden", "true");

        }
    });
}

function AgregarCategoria() {
    $("#resultCategory").empty();
    $("#detalleCategory").empty();
    document.getElementById("labidCateg").setAttribute("hidden", "true");
    document.getElementById("labnameCateg").removeAttribute("hidden")
    document.getElementById("labdescCateg").removeAttribute("hidden")
    document.getElementById("nameCateg").removeAttribute("hidden"); $("#nameCateg").val("");
    document.getElementById("descCateg").removeAttribute("hidden"); $("#descCateg").val("");
    document.getElementById("BGCateg").removeAttribute("hidden");
    document.getElementById("BECateg").setAttribute("hidden", "true");
}

function ModificarCategoria(idElemento){
    $("#resultCategory").empty();
    $("#detalleCategory").empty();
    document.getElementById("labidCateg").removeAttribute("hidden")
    document.getElementById("labnameCateg").removeAttribute("hidden")
    document.getElementById("labdescCateg").removeAttribute("hidden")
    document.getElementById("idCateg").removeAttribute("hidden");
    document.getElementById("nameCateg").removeAttribute("hidden");
    document.getElementById("descCateg").removeAttribute("hidden");
    document.getElementById("BECateg").removeAttribute("hidden");
    
    let myData = idElemento;
    console.log(idElemento);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Category/" + myData,
        type: "GET",
        data: myData,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaid) {
            $("#detalle").empty();
            Category1 = respuestaid;
            $("#idCateg").val(Category1.id);
            document.getElementById("idCateg").setAttribute("disabled", "disabled");
            $("#nameCateg").val(Category1.name);
            $("#descCateg").val(Category1.description);
        }
    });  
}

function OcultarFormCategoria() {
    document.getElementById("labidCateg").setAttribute("hidden", "true");
    document.getElementById("labnameCateg").setAttribute("hidden", "true");
    document.getElementById("labdescCateg").setAttribute("hidden", "true");
    document.getElementById("idCateg").setAttribute("hidden", "true");
    document.getElementById("nameCateg").setAttribute("hidden", "true");
    document.getElementById("descCateg").setAttribute("hidden", "true");
    document.getElementById("BGCateg").setAttribute("hidden", "true");
    document.getElementById("BECateg").setAttribute("hidden", "true");   
}

function guardarCategoria() {
    validarvacio($("#nameCateg").val(), "Debe ingresar un nombre para la categoria");
    validarvacio($("#descCateg").val(), "Debe ingresar una descripcion de la categoria");
    let myData = {
        name: $("#nameCateg").val(),
        description: $("#descCateg").val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Category/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultCategory").empty();
            $("#nameCateg").val("");
            $("#descCateg").val("");
            console.log(respuesta);
            alert("se ha guardado el dato");
            ConsultarCategoria();
            OcultarFormCategoria();
        }
    });
}

function editarCategoria(){
    validarvacio($("#nameCateg").val(), "Debe ingresar un nombre para la categoria");
    validarvacio($("#descCateg").val(), "Debe ingresar una descripcion de la categoria");

    let myData={
        id:$("#idCateg").val(),
        name:$("#nameCateg").val(),
        description: $("#descCateg").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.117.220:9000/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultCategory").empty();
            $("#idCateg").val("");
            $("#nameCateg").val("");
            $("#descCateg").val("");
            ConsultarCategoria();
            alert("se ha Actualizado");
            OcultarFormCategoria();
        }
    });
}

function borrarCategoria(idElemento){
    let myData = idElemento;
    $.ajax({
        url:"http://129.151.117.220:9000/api/Category/"+myData,
        type:"DELETE",
        data:myData,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultCategory").empty();
            $("#detalleCategory").empty();
            ConsultarCategoria();
            alert("Se ha Eliminado.")
        }
    });
}

function ConsultarCabinsCat(idElemento) {
    let myData = idElemento;
    console.log(idElemento);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Category/" + myData,
        type: "GET",
        data: myData,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaid) {
            $("#resultCategory").empty();
            $("#detalleCategory").empty();
            console.log(respuestaid);
            rta_categoryCabs = respuestaid;
            globalThis;
            tablaCabinsCategoria(respuestaid.items);
            OcultarFormCategoria();
        }    
    });
}

function tablaCabinsCategoria() {
if(rta_categoryCabs.cabins.length==0){
    var nodata=document.createTextNode("No existen datos en la tabla seleccionada");
    $("#detalleCategory").append(nodata);
}
else{    
    let myTable = "<table border='2'>";
    let thead = "<thead>";
    thead += "<tr>";
    thead += "<th>" + "ID" + "</th>"
    thead += "<th>" + "NOMBRE CABAÑA" + "</th>"
    thead += "<th>" + "DESCRIPCION" + "</th>"
    thead += "<th>" + "ROOMS" + "</th>"
    thead += "<th>" + "BRAND" + "</th>"
    thead += "</tr>";
    thead += "<thead>";
    myTable += thead;
    for (i = 0; i < rta_categoryCabs.cabins.length; i++) {
        myTable += "<tr>";
        myTable += "<td align=center>" + rta_categoryCabs.cabins[i].id + "</td>";
        myTable += "<td align=center>" + rta_categoryCabs.cabins[i].name + "</td>";
        myTable += "<td align=center>" + rta_categoryCabs.cabins[i].description + "</td>";
        myTable += "<td align=center>" + rta_categoryCabs.cabins[i].rooms + "</td>";
        myTable += "<td align=center>" + rta_categoryCabs.cabins[i].brand + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    myTable += "</div id='detalle'></div>";
    $("#detalleCategory").append(myTable);
}
}

//5.FUNCIONES PARA LA TABLA RESERVATION
function ConsultarReserva() {
    $.ajax({
        url: "http://129.151.117.220:9000/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function r(respuesta) {
            $("#resultReserv").empty();
            console.log(respuesta);
            rta_reservation = respuesta;
            globalThis;
            mostrarReserva(respuesta.items);
            Verificarlogin();
            OcultarFormReserva();
        }
    });
}

function mostrarReserva() {
if(rta_reservation.length==0){
    var nodata=document.createTextNode("No existen datos en la tabla seleccionada");
    $("#resultReserv").append(nodata);
}
else{
    let myTable = "<table id='tabla_reserva' border= '2'>";
    let thead = "<thead>";
    thead += "<tr id='tablareservas'>";
    thead += "<th>" + "FECHA INICIAL" + "</th>"
    thead += "<th>" + "FECHA ENTREGA" + "</th>"
    thead += "<th>" + "CLIENTE" + "</th>"
    thead += "<th>" + "EMAIL-CLIENTE" + "</th>"
    thead += "<th>" + "CABAÑA" + "</th>"
    thead += "<th>" + "ACCIONES" + "</th>"
    thead += "</tr>";
    thead += "<thead>";
    myTable += thead;
    for (i = 0; i < rta_reservation.length; i++) {
        myTable += "<tr id='filareserva'>";
        var FI = new Date(rta_reservation[i].startDate).toISOString().slice(0, 10);
        var FF = new Date(rta_reservation[i].devolutionDate).toISOString().slice(0, 10);
        myTable += "<td align=center>" + FI + "</td>";
        myTable += "<td align=center>" + FF + "</td>";
        myTable += "<td align=center>" + rta_reservation[i].client.name + "</td>";
        myTable += "<td align=center>" + rta_reservation[i].client.email + "</td>";
        myTable += "<td align=center>" + rta_reservation[i].cabin.name + "</td>";
        if (rta_reservation[i].score == null) {
            myTable += "<td align=center> <button class='bacc2' onclick='CalificarReserva(" + rta_reservation[i].idReservation + ")'>Calificar Reserva</button>"+
            "<button class='bacc2 container aut' onclick='BorrarReserva(" + rta_reservation[i].idReservation + ")'>Eliminar Reserva</button>"+
            "<button class='bacc2 container aut' onclick='ModificarReserva(" + rta_reservation[i].idReservation + ")'>Modificar Reserva</button>";
        } else {
            myTable += "<td align=center> <button class='bacc' onclick='MostrarScore(" + rta_reservation[i].score.id + ")'>Ver Calificación</button>"+
            "<button class='bacc2 container aut' onclick='BorrarReserva(" + rta_reservation[i].idReservation + ")'>Eliminar Reserva</button>"+
            "<button class='bacc2 container aut' onclick='ModificarReserva(" + rta_reservation[i].idReservation + ")'>Modificar Reserva</button>";
        }
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultReserv").append(myTable);
}
}

function AgregarReserva() {
    $("#cabin_msg").load(location.href + " #cabin_msg>*", "");
    $("#client_msg").load(location.href + " #client_msg>*", "");
    $("#resultReserv").empty();
    document.getElementById("labcabinreserv").removeAttribute("hidden");
    document.getElementById("labclientreserv").removeAttribute("hidden");
    ListaCabañas();
    document.getElementById("cabin_msg").removeAttribute("hidden"); $("#cabin_msg").val("");
    document.getElementById("NewCabinR").removeAttribute("hidden");
    ListaClientes();
    document.getElementById("client_msg").removeAttribute("hidden"); $("#client_msg").val("");
    document.getElementById("NewClientR").removeAttribute("hidden");
    document.getElementById("labFI").removeAttribute("hidden");
    document.getElementById("labFF").removeAttribute("hidden");
    document.getElementById("FI").removeAttribute("hidden");
    document.getElementById("FF").removeAttribute("hidden");
    document.getElementById("BGR").removeAttribute("hidden");
    document.getElementById("BER").setAttribute("hidden", "true");
}

function ModificarReserva(idElemento){
    $("#resultReserv").empty();
    document.getElementById("labFI").removeAttribute("hidden");
    document.getElementById("labFF").removeAttribute("hidden");
    document.getElementById("FI").removeAttribute("hidden");
    document.getElementById("FF").removeAttribute("hidden");
    document.getElementById("BER").removeAttribute("hidden");
    document.getElementById("BGR").setAttribute("hidden", "true");
    
    let myData = idElemento;
    console.log(idElemento);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Reservation/" + myData,
        type: "GET",
        data: myData,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaid) {
            Reserva1 = respuestaid;
            $("#FI").val(Reserva1.startDate);
            $("#FF").val(Reserva1.devolutionDate);
            $("#status").val(Reserva1.status).selected;
        }
    });  
}

function guardarReserva() {
    validarvacio($("#cabin_msg").val(), "Debe seleccionar una cabaña");
    validarvacio($("#client_msg").val(), "Debe seleccionar un cliente");
    validarvacio($("#FI").val(), "Por favor seleccione una fecha inicial para su reserva");
    validarvacio($("#FF").val(), "Por favor seleccione una fecha final para su reserva");
    let myData = {
        startDate: $("#FI").val(),
        devolutionDate: $("#FF").val(),
        cabin: { id: $("#cabin_msg").val() },
        client: { idClient: $("#client_msg").val() },
        status: "Programada",
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Reservation/save",
        type: "POST",
        contentType: "application/JSON",
        data: dataToSend,
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultReserv").empty();
            $("#FI").val("");
            $("#FF").val(""),
                console.log(respuesta);
            ConsultarReserva();
            OcultarFormReserva();
            alert("se ha creado su reservación")
        }
    });
}

function EditarReserva() {
    validarvacio($("#FI").val(), "Por favor seleccione una fecha inicial para su reserva");
    validarvacio($("#FF").val(), "Por favor seleccione una fecha final para su reserva");
    validarvacio($("#status").val(), "Indique el status de la reserva");
    let myData = {
        startDate: $("#FI").val(),
        devolutionDate: $("#FF").val(),
        cabin: { id: $("#cabin_msg").val() },
        client: { idClient: $("#client_msg").val() },
        status: $("#status").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Reservation/update",
        type: "PUT",
        contentType: "application/JSON",
        data: dataToSend,
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultReserv").empty();
            $("#FI").val("");
            $("#FF").val(""),
            console.log(respuesta);
            ConsultarReserva();
            OcultarFormReserva();
            alert("se ha actualizado la reservación")
        }
    });
}

function OcultarFormReserva() {
    document.getElementById("labcabinreserv").setAttribute("hidden", "true");
    document.getElementById("labclientreserv").setAttribute("hidden", "true");
    document.getElementById("labFI").setAttribute("hidden", "true");
    document.getElementById("labFF").setAttribute("hidden", "true");
    document.getElementById("cabin_msg").setAttribute("hidden", "true");
    document.getElementById("client_msg").setAttribute("hidden", "true");
    document.getElementById("FI").setAttribute("hidden", "true");
    document.getElementById("FF").setAttribute("hidden", "true");
    document.getElementById("BGR").setAttribute("hidden", "true");
    document.getElementById("BER").setAttribute("hidden", "true");
    document.getElementById("labscore").setAttribute("hidden", "true");
    document.getElementById("scores").setAttribute("hidden", "true");
    document.getElementById("msgscore").setAttribute("hidden", "true");
    document.getElementById("BGScore").setAttribute("hidden", "true");
}

function BorrarReserva(idElemento){
    let myData = idElemento;
    $.ajax({
        url:"http://129.151.117.220:9000/api/Reservation/"+myData,
        type:"DELETE",
        data:myData,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultReserv").empty();
            ConsultarReserva();
            alert("Se ha Eliminado la reserva")
        }
    });
}

function CalificarReserva(idReservation) {
    $("#idreserva").val(idReservation);
    $("#resultReserv").empty();
    document.getElementById("score").removeAttribute("hidden");
    document.getElementById("labscore").removeAttribute("hidden");
    document.getElementById("scores").removeAttribute("hidden");
    document.getElementById("msgscore").removeAttribute("hidden"); $("#msgscore").val("");
    document.getElementById("BGScore").removeAttribute("hidden");
    document.getElementById("BEScore").setAttribute("hidden", "true");
}

//6.FUNCIONES PARA LA TABLA SCORE
function GuardarScore() {
    validarvacio($("#scores").val(), "Elija una calificación para esta reserva");
    validarvacio($("#msgscore").val(), "Por favor incluya un comentario sobre la calificación");
    let myData = {
        score: parseInt($("#scores").val()),
        mensajecalif: $("#msgscore").val(),
        reservation: { idReservation: parseInt($("#idreserva").val()) },
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Score/save",
        type: "POST",
        contentType: "application/JSON",
        data: dataToSend,
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultReserv").empty();
            $("#scores").val("");
            $("#msgcore").val(""),
                console.log(respuesta);
            OcultarFormReserva();
            alert("La calificación para la reserva #" + parseInt($("#idreserva").val()) + " ha sido guardada");
        }
    });
}

function MostrarScore(idScore) {
    let myData = idScore
    $.ajax({
        url: "http://129.151.117.220:9000/api/Score/" + myData,
        type: "GET",
        data: myData,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaid) {
            Score1 = respuestaid;
            globalThis;

            const tabla = document.getElementById("tabla_reserva");
            var Score = document.createTextNode(Score1.score);
            var msgSc = document.createTextNode(Score1.mensajecalif);
            var registro = parseInt(Score1.reservation.idReservation);

            if (tabla.rows[0].cells.length == 6) {
                const tablahead = document.getElementById("tablareservas");
                var columna1 = document.createElement("th");
                var title1 = document.createTextNode("Puntuación");
                columna1.appendChild(title1);
                var columna2 = document.createElement("th");
                var title2 = document.createTextNode("Comentarios");
                columna2.appendChild(title2);
                var columna3 = document.createElement("th");
                var title3 = document.createTextNode("Modificar");
                columna3.appendChild(title3);
                tablahead.append(columna1);
                tablahead.append(columna2);
                tablahead.append(columna3);
                columna3.className = "container aut";
                var celda1 = document.createElement("td");
                celda1.appendChild(Score);
                celda1.style.textAlign = "center";
                var celda2 = document.createElement("td");
                celda2.appendChild(msgSc);
                celda2.style.textAlign = "center";
                var celda3 = document.createElement("td");
                const botoneditar = document.createElement("button");
                botoneditar.onclick="ModifScore(Score1.reservation.idReservation)";
                celda3.appendChild(botoneditar);
                celda3.className = "container aut";
                x = document.getElementById("filareserva");
                x.appendChild(celda1); x.appendChild(celda2); x.appendChild(celda3);
                Verificarlogin();
            }
            else if (tabla.rows[registro].cells.length >= 8) {
                Verificarlogin();
                throw 'exit';
            }
            else {
                var numfila = tabla.rows[registro];
                var newcell1 = numfila.insertCell(6);
                newcell1.appendChild(Score);
                newcell1.style.textAlign = "center";
                var newcell2 = numfila.insertCell(7);
                newcell2.appendChild(msgSc);
                newcell2.style.textAlign = "center";
                var newcell3 = numfila.insertCell(8);
                const botoneditar = document.createElement("button");
                botoneditar.onclick="ModifScore(Score1.reservation.idReservation)";
                newcell3.appendChild(botoneditar);
                newcell3.className = "container aut";
                Verificarlogin();
            }
            OcultarFormReserva();
        }
    });
}

function ModifScore(idReservation){
    $("#idreserva").val(idReservation);
    $("#resultReserv").empty();
    document.getElementById("score").removeAttribute("hidden");
    document.getElementById("labscore").removeAttribute("hidden");
    document.getElementById("scores").removeAttribute("hidden");
    document.getElementById("msgscore").removeAttribute("hidden"); $("#msgscore").val("");
    document.getElementById("BEScore").removeAttribute("hidden");
    document.getElementById("BGScore").setAttribute("hidden", "true"); 
    
    let myData = idElemento;
    console.log(idElemento);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Score/" + myData,
        type: "GET",
        data: myData,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaid) {
            Score1 = respuestaid;
            $("#idscore").val(Score1.id);
            $("#msgscore").val(Score1.mensajecalif);
            $("#scores").val(Score1.score).selected;
        }
    });  
}

function EditarScore() {
    validarvacio($("#scores").val(), "Elija una calificación para esta reserva");
    validarvacio($("#msgscore").val(), "Por favor incluya un comentario sobre la calificación");
    let myData = {
        id: $("#idscore").val(),
        score: parseInt($("#scores").val()),
        mensajecalif: $("#msgscore").val(),
        reservation: { idReservation: parseInt($("#idreserva").val()) },
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Score/update",
        type: "PUT",
        contentType: "application/JSON",
        data: dataToSend,
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultReserv").empty();
            console.log(respuesta);
            alert("se ha actualizado la calificación de la reserva N° "+$("#idreserva").val());
        }
    });
}
//7.FUNCIONES PARA LA TABLA ADMIN (USERS)
function guardarUsuarioSignIn(user) {
    $.ajax({
        url: "http://129.151.117.220:9000/api/Admin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            listaU = respuesta;
            console.log(listaU);
            u = user.getBasicProfile().getEmail();
            listusers = [];
            ID=0;
            for (i = 0; i < listaU.length; i++) {
                listusers.push(listaU[i].email);
                if(listaU[i].email==u){
                    ID=listaU[i].id;
                    globalThis;
                }
            }
            if (!listusers.includes(u)) {
                let myData = {
                    nameuser: user.getBasicProfile().getName(),
                    email: user.getBasicProfile().getEmail(),
                    password: user.getBasicProfile().getId(),
                    authenticated: "SI",
                };
                let dataToSend = JSON.stringify(myData);
                $.ajax({
                    url: "http://129.151.117.220:9000/api/Admin/save",
                    type: "POST",
                    data: dataToSend,
                    contentType: "application/JSON",
                    datatype: "JSON",
                    success: function (respuesta) {
                        console.log(respuesta);
                    }
                });
            } else {
                console.log(ID);
                let myData2 = {
                    id: ID,
                    nameuser: user.getBasicProfile().getName(),
                    email: user.getBasicProfile().getEmail(),
                    password: user.getBasicProfile().getId(),
                    authenticated: "SI",
                };
                let dataToSend2 = JSON.stringify(myData2);
                console.log(dataToSend2);
                $.ajax({
                    url: "http://129.151.117.220:9000/api/Admin/update",
                    type: "PUT",
                    data: dataToSend2,
                    contentType: "application/JSON",
                    datatype: "JSON",
                    success: function (respuestaid) {
                        console.log(respuestaid);
                    }
                });
            }
        }
    });
}

function LogOut(useremail) {
    let emailx = useremail;
    $.ajax({
        url: "http://129.151.117.220:9000/api/Admin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            listaU = respuesta;
            for (i = 0; i < listaU.length; i++) {
                if(listaU[i].email==emailx){
                    let myData = {
                        id:listaU[i].id,
                        nameuser: listaU[i].nameuser,
                        email: listaU[i].email,
                        password: listaU[i].password,
                        authenticated: "NO",
                    };
                    let dataToSend = JSON.stringify(myData);
                    $.ajax({
                        url: "http://129.151.117.220:9000/api/Admin/update",
                        type: "PUT",
                        data: dataToSend,
                        contentType: "application/JSON",
                        datatype: "JSON",
                        success: function (respuestaid) {
                            console.log(respuestaid);
                        }
                    });
                }
            }    
        }    
    });
        
    var U=document.getElementById("Uemail");
    U.value = "";
    console.log(U.value);
}


function ValidarUsuario(user, callbackFunction) {
    $.ajax({
        url: "http://129.151.117.220:9000/api/Admin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            callbackFunction(user, respuesta);
        }
    });   
}    

function ListaUsuarios(user, respuesta){
    listusers=[];       
    for (i = 0; i < respuesta.length; i++) {
        listusers.push(respuesta[i].email);
    }
    console.log(listusers);
    u = user.getBasicProfile().getEmail();
    console.log(u);
    if (listusers.includes(u) && u!=null) {
        $("#useremail").text(u);
        $(".unauthenticated").hide();
        $(".aut").show();
    }
}

function ConsultarUsuarios() {
    $.ajax({
        url: "http://129.151.117.220:9000/api/Admin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultClient").empty();
            $("#detalleClient").empty();
            rta_user = respuesta;
            globalThis;
            console.log(respuesta);
            mostrarUsuarios(respuesta.items);
            Verificarlogin();
            OcultarFormUsuario();
        }
    });
}

function mostrarUsuarios() {
if(rta_user.length==0){
    var nodata=document.createTextNode("No existen datos en la tabla seleccionada");
    $("#resultUsuario").append(nodata);
}
else{     
    let myTable = "<table border= '2'>";
    let thead = "<thead>";
    thead += "<tr>";
    thead += "<th>" + "ID" + "</th>"
    thead += "<th>" + "NOMBRE" + "</th>"
    thead += "<th>" + "EMAIL" + "</th>"
    thead += "<th>" + "PASSWORD" + "</th>"
    thead += "<th>" + "AUTENTICADO" + "</th>"
    thead += "<th>" + "ACCIONES" + "</th>"
    thead += "</tr>";
    thead += "<thead>";
    myTable += thead;
    for (i = 0; i < rta_user.length; i++) {
        myTable += "<tr>";
        myTable += "<td align=center>" + rta_user[i].id + "</td>";
        myTable += "<td align=center>" + rta_user[i].nameuser + "</td>";
        myTable += "<td align=center>" + rta_user[i].email + "</td>";
        myTable += "<td align=center>" + rta_user[i].password + "</td>";
        myTable += "<td align=center>" + rta_user[i].authenticated + "</td>";
        myTable += "<td> <button class='bacc' onclick='ModifUsuario(" + rta_user[i].id + ")'>Editar</button>"+
                    "<button class='bacc container aut' onclick='borrarUsuario("+rta_user[i].id+")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultUsuario").append(myTable);
}
}

function mostrarlabelsU() {
    document.getElementById("labidU").removeAttribute("hidden");
    document.getElementById("labnameU").removeAttribute("hidden");
    document.getElementById("labemailU").removeAttribute("hidden");
    document.getElementById("labpasswordU").removeAttribute("hidden");
}

function AgregarUsuario() {
    $("resultUsuario").empty();
    $("#detalleUsuario").empty();
    mostrarlabelsU();
    document.getElementById("nameU").removeAttribute("hidden"); $("#nameU").val("");
    document.getElementById("emailU").removeAttribute("hidden"); $("#emailU").val("");
    document.getElementById("passwordU").removeAttribute("hidden"); $("#passwordU").val("");
    document.getElementById("BGUser").removeAttribute("hidden");
    document.getElementById("BEUser").setAttribute("hidden", "true");
}

function ModifUsuario(idElemento){
    $("resultUsuario").empty();
    $("#detalleUsuario").empty();
    mostrarlabelsU();
    document.getElementById("idU").removeAttribute("hidden");
    document.getElementById("nameU").removeAttribute("hidden");
    document.getElementById("emailU").removeAttribute("hidden");
    document.getElementById("passwordU").removeAttribute("hidden");
    document.getElementById("BEUser").removeAttribute("hidden");

    let myData = idElemento;
    console.log(idElemento);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Admin/" + myData,
        type: "GET",
        data: myData,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaid) {
            $("#detalle").empty();
            User1 = respuestaid;
            $("#idU").val(User1.id);
            document.getElementById("idU").setAttribute("disabled", "disabled");
            $("#nameU").val(User1.name);
            $("#emailU").val(User1.email);
            $("#passwordU").val(User1.password);
        }
    });

}

function OcultarFormUsuario() {
    document.getElementById("labidU").setAttribute("hidden", "true");
    document.getElementById("labnameU").setAttribute("hidden", "true");
    document.getElementById("labemailU").setAttribute("hidden", "true");
    document.getElementById("labpasswordU").setAttribute("hidden", "true");
    document.getElementById("idU").setAttribute("hidden", "true");
    document.getElementById("nameU").setAttribute("hidden", "true");
    document.getElementById("emailU").setAttribute("hidden", "true");
    document.getElementById("passwordU").setAttribute("hidden", "true");
    document.getElementById("BGUser").setAttribute("hidden", "true");
    document.getElementById("BEUser").setAttribute("hidden", "true");
}

function guardarUsuario() {
    validarvacio($("#nameU").val(), "Debe ingresar un nombre");
    validarvacio($("#emailU").val(), "Debe ingresar un e-mail");
    validarvacio($("#passwordU").val(), "Debe ingresar una contraseña");
    let myData = {
        nameuser: $("#nameU").val(),
        email: $("#emailU").val(),
        password: $("#passwordU").val(),
        authenticated: "NO",
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.117.220:9000/api/Admin/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultUsuario").empty();
            $("#detalleUsuario").empty();
            $("#nameU").val("");
            $("#emailU").val("");
            $("#passwordU").val("");
            Verificarlogin();
            ConsultarUsuarios();
            alert("se ha guardado el dato");
            OcultarFormUsuario();
        }
    });
}

function editarUsuario(){
    validarvacio($("#nameU").val(), "Debe ingresar un nombre");
    validarvacio($("#emailU").val(), "Debe ingresar un e-mail");
    validarvacio($("#passwordU").val(), "Debe ingresar una contraseña");

    let myData={
        id:$("#idU").val(),
        nameuser:$("#nameU").val(),
        email:$("#emailU").val(),
        password:$("#passwordU").val(),
        authenticated: "NO",
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.117.220:9000/api/Admin/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultUsuario").empty();
            $("#idU").val("");
            $("#nameU").val("");
            $("#emailU").val("");
            $("#passwordU").val("");
            ConsultarUsuarios();
            alert("se ha Actualizado");
            OcultarFormUsuario();
        }
    });
}


function borrarUsuario(idElemento){
    let myData = idElemento;
    $.ajax({
        url:"http://129.151.117.220:9000/api/Admin/"+myData,
        type:"DELETE",
        data:myData,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultUsuario").empty();
            $("#detalleUsuario").empty();
            ConsultarCabin();
            alert("Se ha Eliminado.")
        }
    });
}
