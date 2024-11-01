// WHEN LOADING THE FORM ITS DISPLAY THE CURRENTLY MONTHS
document.addEventListener("DOMContentLoaded", function() {
    var meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    var elemento = document.getElementById('periodoOpt');
    var n = setPeriods();   // ACCORDING TO THE NUMBER OF MONTHS IT WILL DISPLAY ONLY N NUMBER OF MONTHS
    for (var i = 0; i <= n; i++) {                    
        elemento.innerHTML += ("<option value=\"" + i + "\">" + meses[i] + "</option>");    // MONTHS BEGINS COUNT IN ZERO(0)
    }
});
// WHEN VALUE CHANGES IN SWITCH FROM PERIODOS TO FECHAS
document.getElementById('switch').addEventListener('change', function(event){
    var opt = (document.getElementById('switch').checked);  // WHICH OPTION IS SELECTED
    var elePeriodo = document.getElementById('periodoDiv'); // SELECTION OF THE DIV PERIODO (LABEL AND SELECT)
    var eleFechas = document.getElementById('fechasDiv');   // SELECTION OF THE DIV FECHAS (LABEL AND INPUT DATE)
    var meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    var elemento = document.getElementById('periodoOpt');   // SELECTION OF THE SELECT ELEMENT
    elemento.innerHTML = ("<option style=\"display:none\"></option>");  // ADDING THE DISPLAY NONE  FOR RESETING
    if (opt == false){          // PERIODOS
        elePeriodo.hidden = false;
        eleFechas.hidden = true;
        var n = setPeriods();
        for (var i = 0; i <= n; i++) {                    
            elemento.innerHTML += ("<option value=\"" + i + "\">" + meses[i] + "</option>");
        }
    } else{                     // FECHAS
        elePeriodo.hidden = true;
        eleFechas.hidden = false;
    }
    console.log(elemento.value);
});
// WHEN VALUE CHANGES FROM PERIODO -> MES IS SELECTED
document.getElementById('periodoOpt').addEventListener('change', function(event){
    var mes = document.getElementById('periodoOpt').value;
    var año = 2024; // CURRENT YEAR (FOR FUTURE WORK: MAKING USER TO ENTER YEAR)
    var date2 = new Date(año,mes,25); // 25 mes 2024
    if (mes==0){mes=11;año=2023;} else{mes=mes-1;}  // WHEN THE MONTH IS JANUARY -> 0 TO START IN DECEMBER AND PAST YEAR (FOR FUTURE WORK: RESTING 1 TO THE YEAR ENTERED BY USER)
    var date1 = new Date(año,mes,26); // 26 mes 202te
    var day1 = date1.toISOString().substring(0,10); //2023-12-26 <- FORMAT NEEDED
    var day2 = date2.toISOString().substring(0,10); //2024-01-25 <- FORMAT NEEDED
    console.log(day1, day2);
    var dates = getArrayDates(day1,day2);
    getData(dates);
});
document.getElementById('fechaInit').addEventListener('change', function(event){
    var day = document.getElementById('fechaInit').value;
    document.getElementById('fechaEnd').setAttribute('min',day);
});
document.getElementById('fechaEnd').addEventListener('change', function(event){
    var day1 = document.getElementById('fechaInit').value; //2024-10-01 
    var day2 = document.getElementById('fechaEnd').value; //2024-10-02
    console.log(day1, day2)
    var dates = getArrayDates(day1, day2);
    getData(dates);
});
// GETTING NUMBER OF MONTHS TO BE DISPLAYED
function setPeriods(){
    var date = new Date();
    var mes = date.getMonth();
    var dia = date.getDate();
    if (dia > 25){  // WHEN THE DAY IS AFTER 25TH, IS ANOTHER MONTH
        mes = mes + 1;
    }
    return mes;
}

function getArrayDates(day1, day2){
    // 2024-10-14 2024-10-31 <- FORMAT OF HOW THE ATTRIBUTES HAVE TO BE 
    var i1 = parseInt(day1.substring(day1.length-2, day1.length));
    var i2 = parseInt(day2.substring(day2.length-2, day2.length));
    var days = i2 - i1 + 1;
    var d1 = parseInt(day1.substring(day1.length-2, day1.length));
    var m1 = parseInt(day1.substring(5,7));
    var y1 = parseInt(day1.substring(0,4));
    var d2 = parseInt(day2.substring(day2.length-2, day2.length));
    var m2 = parseInt(day2.substring(5,7));
    var y2 = parseInt(day2.substring(0,4));
    var date1 = new Date(y1,m1-1,d1);   // CREATING OBJECT DATE 
    var date2 = new Date(y2,m2-1,d2);
    days = ((date2.getTime()-date1.getTime()) / 1000 / 60 / 60 / 24) + 1;   // SUBSTRACTING TIMES TO GET THE DAYS
    var arrayDates = [];

    for (var i = 0; i < days; i++) {
        var date = new Date((date1.getTime() + (86400000*i)));  // ADDING THE NUMBER OF DAYS ACCORDING TO MILLISECONDS
        arrayDates.push(date.toLocaleDateString('es-mx'));
    }
    return arrayDates;            
}

async function getData(dates) {
    var loader = document.getElementById('loader');
    var tabla = document.getElementById('tabla');
    loader.hidden = false;
    // RESETING TABLE
    tabla.innerHTML = ('<tr><th style="width: 3.33%;">N</th><th style="width: 13.33%;">Nombre del paciente</th><th style="width: 6.66%;">NSS</th><th style="width: 10.0%;">Servicio</th><th style="width: 6.66%;">Cama</th><th style="width: 10.0%;">Pb. IAAS</th><th style="width: 12.0%;">Tipo</th><th style="width: 12.0%;">Fecha</th><th style="width: 13.33%;">Nombre</th><th style="width: 10.0%;">Cargo</th></tr>');//<th style="width: 6.66%;">Matrícula</th></tr>');
    console.log(dates);
    const formData = {
        fechas: dates
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
            for (var i = 0; i < result.data.length; i++) {
                var elemento = document.createElement('tr');
                elemento.innerHTML += ("<td>" + (i+1) + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['nombreP'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['nss'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['servicio'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['cama'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['pb'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['tipo'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['fecha'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['nombre'] + "</td>");
                elemento.innerHTML += ("<td>" + result.data[i]['cargo'] + "</td>");
                //elemento.innerHTML += ("<td>" + result.data[i]['matricula'] + "</td>");
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
