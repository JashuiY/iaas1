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
    line511 = '29 de octubre de 2024'

    line61 = 'Nombre de quien notifica: ';
    line611 = data.nombre;
    line71 = 'Matrícula: ';
    line711 = data.matricula;
    line72 = 'Categoría: ';
    line721 = data.cargo;
    line73 = 'Firma: ';

    // Adding content to the PDF
    doc.text(line0, middleWidth, 10, {maxWidth:180, align:"center"});
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    marginleft = 25;
    space = 0;
    heighs = [40, 50, 60, 70, 80, 100, 110];
    x = [];
    line_spaces = [marginleft+40, marginleft+105, marginleft+50, marginleft+125] // Donde comenzarán las letras

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

    //doc.addImage('https://1000marcas.net/wp-content/uploads/2022/01/IMSS-Logo.png', 'JPEG',200,150)

    console.log(line231, 'longitud', doc.getTextWidth(line231).toString());
    console.log(line111, 'comienza en: ', getX(doc,line11)+marginleft+space);
    //console.log('inicio de ',line11, getX(doc, line11, marginleft+space));
    // Save the PDF
    doc.save("sample.pdf");
}

function getX(doc, texto){
    value = doc.getTextWidth(texto);
    return value;
}
