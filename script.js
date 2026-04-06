let students = [];


function removeVietnameseTones(str){

str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
str = str.replace(/đ/g,"d");

str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g,"A");
str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g,"E");
str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g,"I");
str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g,"O");
str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g,"U");
str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g,"Y");
str = str.replace(/Đ/g,"D");

return str;

}


class Student{

constructor(fullName,studentId){

this.fullName = fullName.trim();
this.studentId = studentId.toString().trim();

this.course = this.getCourse();
this.faculty = this.getFaculty();
this.email = this.createEmail();

}


getCourse(){
return this.studentId.substring(0,2);
}


getFaculty(){

let code = this.studentId.substring(3,6);

if(code=="404") return "CNTT & KTS";
if(code=="402") return "Kế toán - Kiểm toán";
if(code=="403") return "Quản trị kinh doanh";
if(code=="401") return "Tài chính";
if(code=="405") return "Kinh doanh quốc tế";
if(code=="406") return "Luật";
if(code=="407") return "Kinh tế";
if(code=="408") return "Khoa học dữ liệu";

return "Khác";

}


createEmail(){

let cleanName = removeVietnameseTones(this.fullName).toLowerCase();

let parts = cleanName.split(" ");

let ho = parts[0];
let ten = parts[parts.length-1];

let tenDem="";

for(let i=1;i<parts.length-1;i++){

tenDem += parts[i][0];

}

return ten + ho[0] + tenDem + "." + this.studentId.toLowerCase() + "@hvnh.edu.vn";

}

}



document.getElementById("fileInput").addEventListener("change",readExcel);



function readExcel(e){

let file = e.target.files[0];

let reader = new FileReader();

reader.onload = function(event){

let data = new Uint8Array(event.target.result);

let workbook = XLSX.read(data,{type:'array'});

let sheet = workbook.Sheets[workbook.SheetNames[0]];

let rows = XLSX.utils.sheet_to_json(sheet,{header:1});

students=[];

for(let i=1;i<rows.length;i++){

let id = rows[i][1];
let name = rows[i][2];

if(id && name){

let sv = new Student(name,id);

students.push(sv);

}

}

displayStudents();

}

reader.readAsArrayBuffer(file);

}



function displayStudents(){

let table = document.querySelector("#studentTable tbody");

table.innerHTML="";

students.forEach(sv=>{

let row = table.insertRow();

if(sv.faculty=="CNTT & KTS") row.className="cntt";
else if(sv.faculty=="Kế toán - Kiểm toán") row.className="ktkt";
else if(sv.faculty=="Quản trị kinh doanh") row.className="qtkd";
else if(sv.faculty=="Tài chính") row.className="tc";

row.innerHTML=`
<td>${sv.studentId}</td>
<td>${sv.fullName}</td>
<td>K${sv.course}</td>
<td>${sv.faculty}</td>
<td>${sv.email}</td>
`;

});

document.getElementById("total").innerText =
"Tổng số sinh viên: " + students.length;

}