 
var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

var tBody= document.getElementById('tBody');
var user= document.getElementById('user');
var textarea= document.getElementById('textarea');
var address= document.getElementById('address');
var city= document.getElementById('city');
var state= document.getElementById('state');
var zip= document.getElementById('zip');

function getData(data){
    
    var tableRow= document.createElement('tr');
    tableRow.classList.add('data-row');
    var tableCol1= document.createElement('td');
    tableCol1.classList.add('column1');
    tableCol1.innerText= data.id;
    tableRow.appendChild(tableCol1);

    var tableCol2= document.createElement('td');
    tableCol2.classList.add('column2');
    tableCol2.innerText= data.firstName;
    tableRow.appendChild(tableCol2);

    var tableCol3= document.createElement('td');
    tableCol3.classList.add('column3');
    tableCol3.innerText= data.lastName;
    tableRow.appendChild(tableCol3);

    var tableCol4= document.createElement('td');
    tableCol4.classList.add('column4');
    tableCol4.innerText= data.email;
    tableRow.appendChild(tableCol4);

    var tableCol5= document.createElement('td');
    tableCol5.classList.add('column5');
    tableCol5.innerText= data.phone;
    tableRow.appendChild(tableCol5);

    tBody.appendChild(tableRow);
    
    tableRow.addEventListener('click',function(){
        var cells = tBody.getElementsByTagName('td');
        for (var i = 0; i < cells.length; i++) {
            // Take each cell
            var cell = cells[i];
            // do something on onclick event for cell
            cell.onclick = function () {
                // Get the row id where the cell exists
                var rowId = this.parentNode.rowIndex;
    
                var rowsNotSelected = tBody.getElementsByTagName('tr');
                for (var row = 0; row < rowsNotSelected.length; row++) {
                    rowsNotSelected[row].style.backgroundColor = "";
                    rowsNotSelected[row].classList.remove('active');
                }
                var rowSelected = tBody.getElementsByTagName('tr')[rowId];
                rowSelected.className += " active";
                
                //var http= new XMLHttpRequest();
                //http.open('GET','https://5ee248c68b27f30016094891.mockapi.io/table',true);
                //http.send();

                //http.onreadystatechange= function(){
                  //  if(http.readyState===4){
                    //    var details= JSON.parse(http.responseText)
                      //  console.log(details);
                    }
                user.innerHTML= '<b>User selected:</b>'+ data.firstName +" "+ data.lastName;
                textarea.innerHTML= data.description;
                address.innerHTML= '<b>Address:</b>'+ data.address.streetAddress;
                city.innerHTML= '<b>City:</b>'+data.address.city;
                state.innerHTML= '<b>State:</b>'+ data.address.state;
                zip.innerHTML= '<b>Zip:</b>'+ data.address.zip 
        }

    })
    return tBody;
}


var xhttp = new XMLHttpRequest();
xhttp.open('GET','https://5ee248c68b27f30016094891.mockapi.io/table',true);
xhttp.send();

//response handler
xhttp.onreadystatechange= function(){
    if(xhttp.readyState === 4){
        var response= JSON.parse(xhttp.responseText)
            console.log(response);
        for(var i=0; i<response.length; i++){
               getData(response[i]);                
        }
    }
}

var search= document.getElementById('search-box');
search.addEventListener('keyup',function(){
  // Declare variables
  var filter, tr, td, i, txtValue;
  filter = search.value.toUpperCase();
  tr = tBody.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
})