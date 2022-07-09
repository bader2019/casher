// استدعاء المعرفات من صفحة الويب
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxas = document.getElementById('taxas')
let discount = document.getElementById('discount')
let count = document.getElementById('count')
let total = document.getElementById('total')
let Category = document.getElementById('Category')
let submit = document.getElementById('submit')
let mood ="اضافة";
let tmp;

// get total الفنكشن المسؤلة عن المجموع

function getTotla()
{
    if(price.value != '' && taxas.value != ''){
        let result = (+price.value + +taxas.value)  
          - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }
}

// creat pruodct انشاء منتج جديد
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxas:taxas.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        Category:Category.value.toLowerCase(),
    }
    if(title.value !=''
    && price.value != ''
    && Category.value != ''
    && newPro.count < 101){
        if(mood === 'اضافة'){
            if (newPro.count > 1){
                for(let i = 0; i < newPro.count;i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'اضافة';
            count.style.display = 'block';
        }
        clearData()
    }
  
    
    
    // save localstorge حفظ الداتا 
    localStorage.setItem('product',    JSON.stringify(dataPro)    )

    showData()
};

//clear inputs حذف البيانات من المدخلات

function clearData(){
        title.value = '';
        price.value = '';
        taxas.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        Category.value = '';
}

// read قراءة المدخلات وعرضها

function showData(){
    getTotla()
    let table = ''; 
    for (let i = 0; i < dataPro.length;i++){
        table +=`
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxas}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].Category}</td>
                <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
                <td><button onclick="deleteData(${i})" id="Delete">حذف</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length > 0 ){
        btnDelete.innerHTML = `
        <button onclick = "deleteAll()"> حذف الكل(${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML =''
    }
}
showData()

//delete عملية حذف المنتج
function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

// delete All عملية حذف جميع المنتجات
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

//update عملية التعديل على المنتج

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxas.value = dataPro[i].taxas;
    discount.value = dataPro[i].discount;
    getTotla()
    count.style.display = "none"
    Category.value = dataPro[i].Category;
    submit.innerHTML = "تحديث المنتج";
    mood = "تحديث المنتج"
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

//search عملية البحث عن منتج

let searchMood = 'title'

function getsearchMood(id)
{
    let search = document.getElementById('search')
    if(id === 'searchTitle'){
        searchMood = 'title'
        
    }else{
        searchMood = 'category'
        
    }
    search.placeholder ='Search by'+ searchMood;
    search.focus()
    search.value = ''
    showData()
}

function searchData(value)
{
    let table = '';
    if(searchMood == 'title'){
        for(let i = 0; i <dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxas}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].Category}</td>
                <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
                <td><button onclick="deleteData(${i})" id="Delete">حذف</button></td>
                </tr>
                         `;
            }
        }
    }else{
        for(let i = 0; i <dataPro.length; i++){
            if(dataPro[i].Category.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxas}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].Category}</td>
                <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
                <td><button onclick="deleteData(${i})" id="Delete">حذف</button></td>
                </tr>
                         `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
// count وهيا عملية لجمع مدخلات كثيرة
// clean data عملية للتاكد من ان المدخلات بيانات صحيحة

