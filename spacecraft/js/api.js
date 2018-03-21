var api = "http://localhost/datmean/api/public/api/v1/";

$(function() 
{
	$('#submit').click(function(){
		$.ajax({
		    url: api + "platform",
		    type: 'POST',
		    dataType: 'JSON',
		    data: {name: jQuery('input[name=name]').val(),pass:jQuery('input[name=pass]').val()},
		    success: function(result) {
		        console.log(result);
		        if (result.error==0){
		        	location.href="spaceships_manager.php?accion=enter";
		        }
		        else
		        	bootbox.alert("Acceso denegado");
		        
		    },
		    error: function(result) {
		        // Control de errores
		        console.log('Error');
		        console.log(result);
		        bootbox.alert("Acceso denegado");
		    }
		});
	});
	
	/*
	 * Hace una llamada a la API para registrar una nave espacial.
	 * Realiza las comprobaciones si no tenemos todos los campos rellenados.
	 * 
	 */
	$('#btnRegister').click(function(){
		var form = $('#spaceshipForm');
		var name = form.find("input[name=nameShip]").val();
		var type = form.find("select[name=typeShip]").val();
		var x = form.find("input[name=x]").val();
		var y = form.find("input[name=y]").val();
		var z = form.find("input[name=z]").val();
		if (name ==''|| type==''|| x=='' || y== '' || z == '')
		{
			bootbox.alert("Debe rellenar todos los campos");
		}
		else{
			$.ajax({
			    url: api + "add",
			    type: 'POST',
			    dataType: 'JSON',
			    data: {name: name, type:type, x:x, y:y, z:z},
			    success: function(result) {
			        if (result.error==0){
			        	bootbox.alert("Nave registrada", function(){ location.href="spaceships_manager.php?accion=enter"; });
			        }
			        else
			        	bootbox.alert("No se ha podido registrar");
			        
			    },
			    error: function(result) {
			        // Control de errores
			        console.log('Error');
			        bootbox.alert("Se ha producido un error en el sistema");
			    }
			});
		}
	});
	
	/*
	 * Hace una llamada a la API para buscar las coordenadas de una nave espacial concreta, o varias si coincide en el patrón de búsqueda
	 */
	$('#btnSearch').click(function(){
		var form = $('#spaceshipForm');
		var search = $('input[name=search]').val();
		if (search=='')
		{
			bootbox.alert("Debe introducir el nombre para buscar");
		}
		else{
			$.ajax({
			    url: api + "ship/"+$('input[name=search]').val(),
			    type: 'GET',
			    dataType: 'JSON',
			    success: function(result) {
			        if (result.length>0){
			        	let modal = $('#modalCoordenadas');
			        	let naves = result.length;
			        	let texto;
			        	let body = modal.find(".modal-body");
			        	body.empty();
			        	for (i=0;i<naves;i++){
			        		texto = '';
			        		texto+="<h4>Nave espacial: " + result[i].name + "</h4>";
			        		texto+="<p>Coordenada x: " + result[i].x + "<p>";
			        		texto+="<p>Coordenada y: " + result[i].y + "<p>";
			        		texto+="<p>Coordenada z: " + result[i].z + "<p>";
			        		body.append(texto);
			        	}
			        	$('#modalCoordenadas').modal();
			        }
			        else{
			        	bootbox.alert("No se encuentra en la flota rebelde");
			        }
			        
			    },
			    error: function(result) {
			        // Control de errores
			        console.log('Error');
			        bootbox.alert("Se ha producido un error en el sistema");
			    }
			});
		}
	});
});