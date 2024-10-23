document.getElementById('fecha').addEventListener('change', function(event){
    getData();
});

async function getData() {
    var loader = document.getElementById('loader');
    var tabla = document.getElementById('tabla');
    loader.hidden = false;
    tabla.innerHTML = ('<tr><th style="width: 13.33%;">Nombre del paciente</th><th style="width: 6.66%;">NSS</th><th style="width: 10.0%;">Servicio</th><th style="width: 6.66%;">Cama</th><th style="width: 10.0%;">Pb. IAAS</th><th style="width: 12.0%;">Tipo</th><th style="width: 12.0%;">Fecha</th><th style="width: 13.33%;">Nombre</th><th style="width: 10.0%;">Cargo</th><th style="width: 6.66%;">Matrícula</th></tr>');
    var fecha = document.getElementById('fecha').value; 
    fecha = fecha.split('-').reverse().join('/');
    const formData = {
        fecha: fecha
    }
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycby6igLP1lR2kBrwRYQ-ARMQX0z3O-s214ubYpjivZBuTsc-kKR3BNn8zpO5aQ5SUCol/exec', { // Replace with your Google Apps Script URL
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
            console.log('Date to see', fecha, typeof fecha); //result.data[0]["oportunidad"]
            
            //console.log(result.data[0]);
            for (var i = 0; i < result.data.length; i++) {
                var elemento = document.createElement('tr');
                elemento.innerHTML += ("<td>" + result.data[i]['nombreP'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['nss'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['servicio'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['cama'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['pb'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['tipo'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['fecha'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['nombre'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['cargo'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['matricula'] + "</td>");
                tabla.appendChild(elemento);
            }
            loader.hidden = true;
        } else {
            console.error('Error:', result.message);
            document.getElementById('result').textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        console.error('Error submitting data:', error);
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
}
