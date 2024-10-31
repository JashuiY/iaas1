document.getElementById('incama').addEventListener('change', function(event){
    document.getElementById('cama').disabled = false;
    document.getElementById('cama').required = true;
});
document.getElementById('inconsultaexterna').addEventListener('change', function(event){
    document.getElementById('cama').disabled = true;
    document.getElementById('cama').required = false;
});
document.getElementById('am').addEventListener('change', function(event){
    const re = /[1-7](F|M)(1|2)[0-9]{3}(OR|ES|SF|SA|PE|ND)/;
    if (re.test(document.getElementById('am').value.toUpperCase()) == false){
        alert('Verifique el agregado médico. (8 caracteres)\nEjemplo: 1F2000OR')
    }
});
/*document.getElementById('unidad').addEventListener('change', function(event){
    if (document.getElementById('unidad').value != ''){
        document.getElementById('unidad').style.backgroundColor = "#b48e5d";
        document.getElementById('unidad').style.color = "white";
        document.getElementById('unidad').style.fontSize = "medium";
    }
});*/

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
    } else if (value == 'Neumonías'){
        elemento.innerHTML += ('<option value="Neumonía Asociada a Ventilador">Neumonía Asociada a Ventilador</option>');
        elemento.innerHTML += ('<option value="Relacionada a Procedimiento">NAAS Relacionada a Procedimiento</option>');
        elemento.innerHTML += ('<option value="No Relacionada a Procedimiento">NAAS No Relacionada a Procedimiento</option>');
        document.getElementById('pboption').hidden = false;
        document.getElementById('pblabel').hidden = false;
        document.getElementById('pboption').required = true;
        document.getElementById('pbtag').hidden = true;
        document.getElementById('pbtxt').hidden = true;
        document.getElementById('pbtxt').required = false;
    } else if (value == 'Infección del Torrente Sanguíneo'){
        elemento.innerHTML += ('<option value="Relacionada a Catéter Central">ITS relacionada a catéter central </option>');
        elemento.innerHTML += ('<option value="Relacionada a Procedimiento">ITS relacionada a procedimiento</option>');
        elemento.innerHTML += ('<option value="relacionada a posible contaminación de soluciones, infusiones o medicamentos intravenosos">ITS relacionada a posible contaminación de soluciones, infusiones o medicamentos intravenosos </option>');
        elemento.innerHTML += ('<option value="Daño de la Barrera Mucosa">ITS secundario a daño de la barrera mucosa</option>');
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

    var loc = document.querySelector("input[name=localizacion]:checked").value;
    if (loc == 'Cama'){
        localizacionvalue = document.getElementById('cama').value;
    } else if (loc == 'Consulta Externa'){
        localizacionvalue = 'Consulta Externa';
    }
    
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
        cama: localizacionvalue.toUpperCase(),//document.getElementById('cama').value,
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
            generatePDF(formData);
            
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
            document.querySelector("input[name=localizacion]:checked").checked = false;
        } else {
            console.error('Error:', result.message);
            document.getElementById('result').textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        console.error('Error submitting data:', error);
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
}

async function generatePDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    var timestamp = new Date();
    timestamp = timestamp.toLocaleString("es-mx");

    const base64image = "data:image/jpeg;base64,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"

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);

    // Page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const middleWidth = pageWidth/2;

    // Format line by line
    line0 = 'NOTIFICACIÓN DE CASO SOSPECHOSO DE INFECCIÓN ASOCIADA A LA ATENCIÓN DE LA SALUD';
    line0_long = doc.getTextWidth(line0);
    line0_x = (pageWidth - line0_long) / 2;
    line11 = 'Nombre del Paciente: ';
    line111 = data.nombreP;
    line21 = 'NSS: ';
    line211 = data.nss;
    line22 = 'Agregado Médico: ';
    line221 = data.am;
    line23 = 'Servicio: ';
    line231 = data.servicio;
    line31 = 'Ubicación: ';
    line311 = data.cama;
    line41 = 'Pb. IAAS: ';
    line411 = data.pb;
    line42 = 'Tipo: ';
    line421 = data.tipo;
    line51 = 'Fecha de notificación: ';
    line511 = not.toLocaleString('es-mx');

    line61 = 'Nombre de quien notifica: ';
    line611 = data.nombre;
    line71 = 'Matrícula: ';
    line711 = data.matricula;
    line72 = 'Categoría: ';
    line721 = data.cargo;
    line73 = 'Firma: ';

    // Adding content to the PDF
    marginleft = 25;
    margintop = 45;
    space = 0;
    heighs = [70, 80, 90, 100, 110, 130, 140];
    x = [];
    line_spaces = [marginleft+40, marginleft+105, marginleft+50, marginleft+125] // Donde comenzarán las letras

    doc.addImage(base64image, 'JPEG', 125, 10, 60, 25)
    doc.text(line0, middleWidth, margintop, {maxWidth:180, align:"center"});
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);

    doc.text(line11, marginleft, heighs[0]);
    x.push(getX(doc, line11)); //x0
    doc.text(line21, marginleft, heighs[1]);
    x.push(getX(doc, line21)); //x1
    doc.text(line22, line_spaces[0], heighs[1]);
    x.push(getX(doc, line22)+line_spaces[0]); //x2
    doc.text(line23, line_spaces[1], heighs[1]);
    x.push(getX(doc, line23)+line_spaces[1]); //x3

    doc.text(line31, marginleft, heighs[2]);
    x.push(getX(doc, line31)); //x4

    doc.text(line41, marginleft, heighs[3]);
    x.push(getX(doc, line41)); //x5
    doc.text(line42, middleWidth, heighs[3]);
    x.push(getX(doc, line42)+middleWidth); //x6

    doc.text(line51, marginleft, heighs[4]);
    x.push(getX(doc, line51)); //x7

    doc.text(line61, marginleft, heighs[5]);
    x.push(getX(doc, line61)); //x8

    doc.text(line71, marginleft, heighs[6]);
    x.push(getX(doc, line71)); //x9
    doc.text(line72, line_spaces[2], heighs[6]);
    x.push(getX(doc, line72)+line_spaces[2]); //x10
    doc.text(line73, line_spaces[3], heighs[6]);
    x.push(getX(doc, line73)+line_spaces[3]); //x11

    doc.line(x[0]+marginleft,heighs[0]+1,180,heighs[0]+1)
    doc.line(x[1]+marginleft,heighs[1]+1,line_spaces[0]-5,heighs[1]+1)
    doc.line(x[2],heighs[1]+1,line_spaces[1]-5,heighs[1]+1)
    doc.line(x[3],heighs[1]+1,180,heighs[1]+1)
    doc.line(x[4]+marginleft,heighs[2]+1,180,heighs[2]+1)
    doc.line(x[5]+marginleft,heighs[3]+1,middleWidth-5,heighs[3]+1)
    doc.line(x[6],heighs[3]+1,180,heighs[3]+1)
    doc.line(x[7]+marginleft,heighs[4]+1,180,heighs[4]+1)
    doc.line(x[8]+marginleft,heighs[5]+1,180,heighs[5]+1)
    doc.line(x[9]+marginleft,heighs[6]+1,line_spaces[2]-5,heighs[6]+1)
    doc.line(x[10],heighs[6]+1,line_spaces[3]-5,heighs[6]+1)
    doc.line(x[11],heighs[6]+1,180,heighs[6]+1)


    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(line111, x[0]+marginleft+space, heighs[0]);

    doc.text(line211, x[1]+marginleft+space, heighs[1]);
    doc.text(line221, x[2]+space, heighs[1]);
    doc.text(line231, x[3]+space, heighs[1], {maxWidth:30});
    doc.text(line311, x[4]+marginleft+space, heighs[2]);
    doc.text(line411, x[5]+marginleft+space, heighs[3], {maxWidth:middleWidth-x[5]-marginleft-space});
    doc.text(line421, x[6]+space, heighs[3]);
    doc.text(line511, x[7]+marginleft+space, heighs[4]);
    doc.text(line611, x[8]+marginleft+space, heighs[5]);
    doc.text(line711, x[9]+marginleft+space, heighs[6]);
    doc.text(line721, x[10]+space, heighs[6]);
    
    // Save the PDF
    pdfname = not.getFullYear() + not.getMonth() + not.getDate() + '_NSS' + data.nss + '.pdf'
    doc.save(pdfname);
}

function getX(doc, texto){
    value = doc.getTextWidth(texto);
    return value;
}
