let list = document.querySelector('#to-do-list');
let addInput = document.querySelector('#add-to-do input');
let searchInput = document.querySelector('#search-form input');
let addBtn = document.querySelector('#add-form button');


list.addEventListener('click', (e) => {
  if(e.target.nodeName === 'BUTTON' && e.target.className === 'delete-btn') {
    e.target.parentNode.remove();
    if(list.children.length === 0){
      let listEmpyMsg = document.createElement('div');
      listEmpyMsg.style.textAlign = "center"
      listEmpyMsg.style.color = "#333"
      listEmpyMsg.innerText = "your list is empty"
      listEmpyMsg.id = "emptyMsg"
      list.appendChild(listEmpyMsg)
    }
  }
})





addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(!addInput.value){
    return
  }
  if(document.querySelector("#emptyMsg")){
    document.querySelector("#emptyMsg").remove()
  }
  list.append(createListItem(addInput.value))
  addInput.value = "";

})

function createListItem(itemValue){
  let item = document.createElement('li');
  let title = document.createElement('span');
  let btn = document.createElement('button');

  item.className = 'to-do-item';
   title.className = 'title';
   title.innerText = itemValue;

   btn.className = 'delete-btn';
   btn.innerHTML ='delete';

  item.appendChild(title);
  item.appendChild(btn);


  return item;
}


searchInput.addEventListener('input', e => {
  Array.from(list.children).forEach((element) => {
    if(document.querySelector("#emptyMsg")){
      return;
    }
    if(element.querySelector('.title').innerText.toLowerCase().includes(e.target.value.toLowerCase())){
      element.style.display = "flex"
    }else{
      element.style.display = "none";
    }
  })
})









