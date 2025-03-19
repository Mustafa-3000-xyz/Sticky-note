let section = document.querySelector("section");
let btnAddStickyNote = document.querySelector(".btn-add-sticky-note");
let stickyNote_ID = JSON.parse(localStorage.getItem("stickyNote_ID")) || 0;
let stickyNote_List = JSON.parse(localStorage.getItem("stickyNote_List")) || [];
// =================== Functions ===================  //
btnAddStickyNote.addEventListener("click" , Create_sticky_note);
function Create_sticky_note(){
    let stickyNote_Obj = {
        id: ++stickyNote_ID,
        bg: "#3a5a40",
        color: "white",
        content: "",
    }
    // ====== //
    stickyNote_List.push(stickyNote_Obj);
    localStorage.setItem("stickyNote_List" , JSON.stringify(stickyNote_List));
    localStorage.setItem("stickyNote_ID" , JSON.stringify(stickyNote_ID));
    let box = `
        <div class="sticky-note" data-id ="${stickyNote_Obj.id}">
            <div class="hedaer-colors">
                <div class="color-000000"></div>
                <div class="color-3a5a40"></div>
                <div class="color-1d3557"></div>
                <div class="color-ef233c"></div>
            </div>
            <textarea spellcheck="false" style="background-color: ${stickyNote_Obj.bg};color: ${stickyNote_Obj.color};">${stickyNote_Obj.content}</textarea>
        </div>
    `;
    btnAddStickyNote.insertAdjacentHTML("beforebegin", box);
    Turn_functions();
}

function Show_sticky_note(){
    let box = ``;
    for (let i = 0; i < stickyNote_List.length; i++) {
        box += `
            <div class="sticky-note" data-id ="${stickyNote_List[i].id}">
                <div class="hedaer-colors">
                    <div class="color-000000"></div>
                    <div class="color-3a5a40"></div>
                    <div class="color-1d3557"></div>
                    <div class="color-ef233c"></div>
                </div>
                <textarea spellcheck="false" style="color:${stickyNote_List[i].color};background-color: ${stickyNote_List[i].bg};">${stickyNote_List[i].content}</textarea>
            </div>
        `
    }
    btnAddStickyNote.insertAdjacentHTML("beforebegin", box);
}
Show_sticky_note();

function Turn_functions(){
    Write_in_sticky_note();
    Change_sticky_note_bg();
    Delete_sticky_note();
}
Turn_functions();
// ====================================== //
function Get_sticky_note_obj(id){
    return stickyNote_List.find(element => element.id == id);
}

function Write_in_sticky_note(){
    let textarea = document.querySelectorAll("textarea");
    // ===== //
    for (let i = 0; i < textarea.length; i++) {
        textarea[i].oninput = function(){
            let stickyNote = textarea[i].closest(".sticky-note");
            let getDataID = stickyNote.getAttribute("data-id");
            let obj = Get_sticky_note_obj(getDataID);
            obj.content = textarea[i].value;
            localStorage.setItem("stickyNote_List" , JSON.stringify(stickyNote_List));
        }
    }
}

function Change_sticky_note_bg(){
    let hedaerColorsDivs = document.querySelectorAll(".hedaer-colors div");
    for (let i = 0; i < hedaerColorsDivs.length; i++) {
        hedaerColorsDivs[i].onclick = function(){
            let getClass = "#" + hedaerColorsDivs[i].getAttribute("class").slice(6);
            let stickyNote = hedaerColorsDivs[i].closest(".sticky-note");
            let textarea = stickyNote.querySelector("textarea");
            let getDataID = stickyNote.getAttribute("data-id");
            let obj = Get_sticky_note_obj(getDataID);
            // ====== //
            if (getClass == "#ef233c") {
                obj.color = "black";
                textarea.style.color = "black";
            }else{
                obj.color = "white";
                textarea.style.color = "white";
            }
            textarea.style.backgroundColor = getClass;
            obj.bg = getClass;
            localStorage.setItem("stickyNote_List" , JSON.stringify(stickyNote_List));
        }
    }
}

function Delete_sticky_note(){
    let stickyNotes = document.querySelectorAll(".sticky-note");

    stickyNotes.forEach(note => {
        note.ondblclick = function () {
            let noteID = note.getAttribute("data-id");
            note.remove();
            
            let index = stickyNote_List.findIndex(ele => ele.id == noteID);
            if (index != -1) {
                stickyNote_List.splice(index, 1);
                localStorage.setItem("stickyNote_List", JSON.stringify(stickyNote_List));
            }

            if (stickyNote_List.length === 0) {
                stickyNote_ID = 0;
                localStorage.setItem("stickyNote_ID", JSON.stringify(stickyNote_ID));
            }
        };
    });
}