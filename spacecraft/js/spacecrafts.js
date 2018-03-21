$(function() 
{
	/*
	 * Hacemos DataTable a la tabla para que se añadan funcionalidades automáticas de filtro, ordenación y agrupación.
	 */
	$('.table').DataTable(
	{
	    language:{
			"sProcessing":     "Procesando...",
			"sLengthMenu":     "Mostrar _MENU_ naves",
			"sZeroRecords":    "No se encontraron resultados",
			"sEmptyTable":     "No hay naves espaciales registradas.",
			"sInfo":           "Mostrando del _START_ al _END_ de un total de _TOTAL_ naves espaciales",
			"sInfoEmpty":      "Mostrando registos del 0 al 0 de un total de 0 naves espaciales",
			"sInfoFiltered":   "(filtrado de un total de _MAX_ Naves espaciales)",
			"sInfoPostFix":    "",
			"sSearch":         "Filtrar:",
			"sUrl":            "",
			"sInfoThousands":  ",",
			"sLoadingRecords": "Cargando...",
			"oPaginate": {
				"sFirst":    "Primero",
				"sLast":     "Último",
				"sNext":     "Siguiente",
				"sPrevious": "Anterior"
			},
			"oAria": {
				"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
				"sSortDescending": ": Activar para ordenar la columna de manera descendente"
			}
		},
	});
	

	
	/*
	 * Solo permite que se introduzcan número y/o el signo negativo en las coordenadas
	 */
	$('input[name=x],input[name=y],input[name=z]').keydown(function(e){
		if (e.keyCode!=46&&e.keyCode!=8&&e.keyCode!=37&&e.keyCode!=39&&e.keyCode!=9&&e.keyCode!=109)
		{
			// Si el valor no es numérico, lo borramos
			let value = parseInt(e.key);
			if (!$.isNumeric(value)) return false;
		}
	});
	
	/*
	 * Resetea los valores del formulario
	 */
	$('#btnNew').click(function(){
		var form = $('#spaceshipForm');
		form.find("input[name=nameShip]").val('');
		form.find("input[name=x]").val('');
		form.find("input[name=y]").val('');
		form.find("input[name=z]").val('');
	});
	
	/*
	 * Para salir del sistema
	 */
	$('#btnExit').click(function(){
		bootbox.confirm("Desea salir del sistema?", 
			function(result){
				if (result)
					location.href="spaceships_manager.php?accion=exit"; 
			}
		);
	});
});