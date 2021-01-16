//redirect if not valid login
let currentUser=JSON.parse(window.localStorage.getItem('user'));
if(!currentUser){
    window.location='index.html';

}


// code for log out
$('#logOut').on('click',(e)=>{
    e.preventDefault();
    window.localStorage.removeItem('user');
    window.location="index.html";
})

//api call
const getList=async ()=>{
    try{
        const res=await axios.get('https://jsonplaceholder.typicode.com/todos');
        const lists=res.data;
        console.log(lists);
        let listcontent='';
        lists.forEach((el,index)=>{
            listcontent+=`<li class="list-group-item ${el.completed?'disabledList':''} ${index%2?'list-group-item-info':'list-group-item-success'}"> <input type="checkbox" class="checkbox" ${el.completed?' checked':''}/> <label for=""> ${el.title}</label></li>`
        });
        $('#todoList').html(listcontent);
        if(checkedCount){
            checkedCount=0;
        }

    }
    catch(e){
        console.log('fetch failed',e);
    }
}

$('#getList').on('click',(e)=>{
    e.preventDefault();
    getList();
});

let checkedCount=0;

const alertPromise= ()=>{
     return new Promise((resolve,reject)=>{

         
        if(checkedCount===5){
            resolve(checkedCount)
        }
        else{
            reject('count not equal to 5');
        }
    });
}

const promiseCall=()=>{
    alertPromise().then((data)=>{
        alert(`Total ${data} taks completed`);
    })
    .catch((err)=>{
        console.log('reject, not succeed ');
    })
}


getList();

$('#todoList').on('change','.checkbox',function(e){
    if($(this).prop('checked')===true){
        
        checkedCount++; 
        $(this).parent().addClass('active');
    }
    else{
        checkedCount--;
        ;
        $(this).parent().removeClass('active');
    }
    
    promiseCall();
});




