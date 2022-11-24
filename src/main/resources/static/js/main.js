$(document).ready(function(){
    tablaProductos = $("#tablaProductos").DataTable({
       "columnDefs":[{
        "targets": -1,
        "data":null,
        "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditar'>Editar</button><button class='btn btn-danger btnBorrar'>Borrar</button></div></div>"  
       }],
        
        //Para cambiar el lenguaje a español
    "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de MAX registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
    });
    
$("#btnNuevo").click(function(){
    $("#formProductos").trigger("reset");
    $(".modal-header").css("background-color", "#28a745");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nueva Producto");            
    $("#modalCRUD").modal("show");        
    id=null;
    opcion = 1; //alta
});    
    
var fila; //capturar la fila para editar o borrar el registro
    
//botón EDITAR    
$(document).on("click", ".btnEditar", function(){
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());
    nombre = fila.find('td:eq(1)').text();
    marca = fila.find('td:eq(2)').text();
    modelo = fila.find('td:eq(3)').text();
    precio = parseInt(fila.find('td:eq(4)').text());
    
    $("#nombre").val(nombre);
    $("#marca").val(marca);
    $("#modelo").val(modelo);
    $("#precio").val(precio);
    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Producto");            
    $("#modalCRUD").modal("show");  
    
});

//botón BORRAR
$(document).on("click", ".btnBorrar", function(){    
    fila = $(this);
    id = parseInt($(this).closest("tr").find('td:eq(0)').text());
    opcion = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id+"?");
    if(respuesta){
        $.ajax({
            url: "/eliminarProducto",
            type: "GET",
            dataType: "json",
            data: 'id='+id,
            success: function(){
                tablaProductos.row(fila.parents('tr')).remove().draw();
            }
        });
    }   
});
    
$("#formProductos").submit(function(e){
    e.preventDefault();    
    nombre = $.trim($("#nombre").val());
    marca = $.trim($("#marca").val());
    modelo = $.trim($("#modelo").val());
    precio = $.trim($("#precio").val()); 
    
    var objProducto = {
	id:id,
    nombre: nombre,
    marca: marca,
    modelo: modelo,
    precio: precio
	}
       
    $.ajax({
        url: "/guardarProducto",
        type: "POST",
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(objProducto),
        success: function(data){  
            console.log(data);
            id = data[0].id;            
            nombre = data[0].nombre;
            marca = data[0].marca;
            modelo = data[0].modelo;
            precio = data[0].precio;
            if(opcion == 1){tablaProductos.row.add([id,nombre,marca,modelo,precio]).draw();}
            else{tablaProductos.row(fila).data([id,nombre,marca,modelo,precio]).draw();}            
        }        
    });
    $("#modalCRUD").modal("hide");    
    
});    
    
});