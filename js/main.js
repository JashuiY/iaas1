document.getElementById('categoria').addEventListener('change', function(event){
    var value = document.getElementById('categoria').value;
    if (value == 'Médico'){
        document.getElementById('especialidad').hidden = false;
        document.getElementById('espL').hidden = false;
        document.getElementById('especialidad').required = true;
    } else{
        document.getElementById('especialidad').hidden = true;
        document.getElementById('espL').hidden = true;
        document.getElementById('especialidad').required = false;
    }
});
document.getElementById('pb').addEventListener('change', function(event){ 
    var value = document.getElementById('pb').value;
    var elemento = document.getElementById('pboption');
    elemento.innerHTML = ('<option style="display:none"></option>');
    if (value == 'Infección de Sitio Quirúrgico'){
        elemento.innerHTML += ('<option value="Infección Incisional superficial">Infección Incisional superficial</option>');
        elemento.innerHTML += ('<option value="Infección Incisional profunda">Infección Incisional profunda</option>');
        elemento.innerHTML += ('<option value="Infección de órganos y espacios">Infección de órganos y espacios</option>');
        document.getElementById('pboption').hidden = false;
        document.getElementById('pblabel').hidden = false;
        document.getElementById('pboption').required = true;
        document.getElementById('pbtag').hidden = true;
        document.getElementById('pbtxt').hidden = true;
        document.getElementById('pbtxt').required = false;
    } else if (value == 'Neumonías Asociadas a la Atención de la Salud'){
        elemento.innerHTML += ('<option value="NAV">Neumonía Asociada a Ventilador</option>');
        elemento.innerHTML += ('<option value="NAAS-RP">NAAS Relacionada a Procedimiento</option>');
        elemento.innerHTML += ('<option value="NAAS-NRP">NAAS No Relacionada a Procedimiento</option>');
        document.getElementById('pboption').hidden = false;
        document.getElementById('pblabel').hidden = false;
        document.getElementById('pboption').required = true;
        document.getElementById('pbtag').hidden = true;
        document.getElementById('pbtxt').hidden = true;
        document.getElementById('pbtxt').required = false;
    } else if (value == 'Infección del Torrente Sanguíneo'){
        elemento.innerHTML += ('<option value="CC">ITS relacionada a catéter central </option>');
        elemento.innerHTML += ('<option value="RP">ITS relacionada a procedimiento</option>');
        elemento.innerHTML += ('<option value="IV">ITS relacionada a posible contaminación de soluciones, infusiones o medicamentos intravenosos </option>');
        elemento.innerHTML += ('<option value="DBM">ITS secundario a daño de la barrera mucosa</option>');
        document.getElementById('pboption').hidden = false;
        document.getElementById('pblabel').hidden = false;
        document.getElementById('pboption').required = true;
        document.getElementById('pbtag').hidden = true;
        document.getElementById('pbtxt').hidden = true;
        document.getElementById('pbtxt').required = false;
    } else if (value=='Otro'){
        document.getElementById('pbtxt').value = '';
        document.getElementById('pbtag').hidden = false;
        document.getElementById('pbtxt').hidden = false;
        document.getElementById('pbtxt').required = true;
        document.getElementById('pboption').hidden = true;
        document.getElementById('pblabel').hidden = true;
        document.getElementById('pboption').required = false;
    } else{
        document.getElementById('pboption').hidden = true;
        document.getElementById('pblabel').hidden = true;
        document.getElementById('pboption').required = false;
        document.getElementById('pbtag').hidden = true;
        document.getElementById('pbtxt').hidden = true;
        document.getElementById('pbtxt').required = false;
    }
});
document.getElementById('servicio').addEventListener('change', function(event){
    if (document.getElementById('servicio').value=="Otro"){
        document.getElementById('serviciotxt').value = '';
        document.getElementById('serviciotag').hidden = false;
        document.getElementById('serviciotxt').hidden = false;
        document.getElementById('serviciotxt').required = true;
    }else{
        document.getElementById('serviciotag').hidden = true;
        document.getElementById('serviciotxt').hidden = true;
        document.getElementById('serviciotxt').required = false;
    }
});

async function submitForm() {
    var loader = document.getElementById('loader');
    loader.hidden = false;
    document.getElementById('submit').disabled = true;
    
    /*if (!(document.getElementById('nombreP').value).includes(" ")) {
        alert('Ingrese un Nombre Completo.');
        document.getElementById('submit').disabled = false;
        return;
    }*/

    if (document.getElementById('nss').value.length != 10){
        alert('Ingrese un NSS correcto: 10 dígitos.');
        document.getElementById('submit').disabled = false;
        loader.hidden = true;
        return;
    }

    if (document.getElementById('am').value.length != 8) {
        alert('Verifique el agregado médico. (8 caracteres)\nEjemplo: 1F2000OR')
        document.getElementById('submit').disabled = false;
        loader.hidden = true;
        return;
    }

    if (!(document.getElementById('nombre').value).includes(" ")) {
        alert('Ingrese el Nombre Completo de quien notifica.');
        document.getElementById('submit').disabled = false;
        loader.hidden = true;
        return;
    }

    if (document.getElementById('matricula').value.length != 8){
        alert('Ingrese una matricula correcta: 8 dígitos.');
        document.getElementById('submit').disabled = false;
        loader.hidden = true;
        return;
    }

    if (document.getElementById('servicio').value=="Otro"){
        serviciovalue = document.getElementById('serviciotxt').value;
        if (serviciovalue == ''){
            document.getElementById('submit').disabled = false;
            loader.hidden = true;
            alert('Escriba el otro servicio. \nEn caso de no aparecer la casilla, seleccione un valor diferente y seleccione nuevamente Otro. \nO recargue.');
            return;
        }
    }else{
        serviciovalue = document.getElementById('servicio').value;
    }

    if (document.getElementById('pb').value=="Otro"){
        pbvalue = document.getElementById('pbtxt').value;
        if (pbvalue == ''){
            document.getElementById('submit').disabled = false;
            loader.hidden = true;
            alert('Escriba el valor de Otro IAAS. \nEn caso de no aparecer la casilla, seleccione un valor diferente y seleccione nuevamente Otro. \nO recargue.');
            return;
        }
    }else{
        pbvalue = document.getElementById('pb').value;
    }

    if (document.getElementById('categoria').value == 'Médico') {
        categoriavalue = document.getElementById('especialidad').value.toUpperCase();
    } else{
        categoriavalue = document.getElementById('categoria').value.toUpperCase();
    }

    if (document.getElementById('pboption').value == '') {
        tipovalue = pbvalue
    } else{
        tipovalue = document.getElementById('pboption').value
    }

    var nombreCompleto = document.getElementById('nombreP').value.toUpperCase() + ' ' + document.getElementById('apellidoP').value.toUpperCase();
    const formData = {
        nombreP: nombreCompleto,
        nss: document.getElementById('nss').value.toString().padStart(10,'0'),
        am: document.getElementById('am').value.toUpperCase(),
        servicio: serviciovalue.toUpperCase(),
        cama: document.getElementById('cama').value,
        pb: pbvalue.toUpperCase(),
        tipo: tipovalue.toUpperCase(),
        nombre: document.getElementById('nombre').value.toUpperCase(),
        matricula: document.getElementById('matricula').value,
        cargo: categoriavalue.toUpperCase()
    };
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxUY9Bhq6SdNhYmJxjxf9KzE48RD-z3q2czN_djHDVY8SgqX2mVnTjd30222RmcgZQm/exec', { // Replace with your Google Apps Script URL
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === 'success') {
            loader.hidden = true;
            console.log('Data saved and received:', formData); //result.data[0]["oportunidad"]
            var not = new Date();
            alert('Información registrada correctamente.\nFecha notificación: ' + not.toLocaleString('es-mx'));
            
            document.getElementById('submit').disabled = false;
            document.getElementById('nombreP').value = "";
            document.getElementById('apellidoP').value = "";
            document.getElementById('nss').value = "";
            document.getElementById('am').value = "";
            document.getElementById('servicio').value = "";
            document.getElementById('cama').value = "";
            document.getElementById('pb').value = "";
            document.getElementById('pboption').value = "";
            document.getElementById('pboption').hidden = true;
            document.getElementById('pblabel').hidden = true;
            document.getElementById('pbtag').hidden = true;
            document.getElementById('pbtxt').hidden = true;
            document.getElementById('serviciotag').hidden = true;
            document.getElementById('serviciotxt').hidden = true;
        } else {
            console.error('Error:', result.message);
            document.getElementById('result').textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        console.error('Error submitting data:', error);
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
}
