

 var db = JSON.parse(localStorage.getItem("database"));
if(db == null) {
   loadFiles();
   db = JSON.parse(localStorage.getItem("database"));
} 


function loadFiles() {
    let db = [
        {
            title : "Travel",
            tasks :[
                {taskName: "Buy sunglasses",
                taskId: 0,
                compFlag:true}  
            ]
        },
        {
            title : "Food",
            tasks :[
               {taskName: "Floor",
            taskId: 0,
            compFlag:false} ,
            {taskName: "Egg",
            taskId: 1,
            compFlag:true} ,
            {taskName: "Sugar",
            taskId: 2,
            compFlag:false} ,
            {taskName: "Milk",
            taskId: 3,
            compFlag:false} 
            ]
            
        },
        {
            title : "Enjoy",
            tasks :[
                {taskName: "Call Grandma",
            taskId: 0,
            compFlag:false} ,
            {taskName: "Visit Lisa",
            taskId: 1,
            compFlag:true} ,
            ]
        }
    ]
    
    
    
    localStorage.setItem("database", JSON.stringify(db));
    return db;
}






$(function() {


    $("#txtFocused").focus();
    $("#project").on("click", function(e){
        
        $("#projectmembers").removeClass("hidden").addClass("display");
        $("#txtFocused").focus();
        $("#todolist-main").removeClass("display").addClass("hidden");
     })

     $("#listItems").on("click", function(e){
        
        $("#txtFocused").focus();
        $("#projectmembers").removeClass("display").addClass("hidden");
        $("#todolist-main").removeClass("hidden").addClass("display");

     })

    let todolistIndex = 1;

    function renderLeftSide() {
        $("#listItems").html("");
        let i = 0;
        for (item of db) {
            $("#listItems").append(`
                <div class="listitem">
                    <ul>
                        <li>
                            <div>&#8987</div>
                            <div id="list-item-title">${item.title}</div>
                            <div class="icon hidden"><i class="fa-solid fa-trash"></i></div>
                            <div class="count">${getCount(i)}</div>
                        </li> 
                    </ul>
                </div>
            `);
            i++;
        }
    } 

    function renderTodolist() {
        $(".to-do").html("");

        $(".listtitle h1").text(db[todolistIndex].title);

        for(item of db[todolistIndex].tasks) {
            $(".to-do").append(`
                <div class="item" value="${item.taskId}">
                    <input type="checkbox" class="chkbox" id="" ${item.compFlag ? `checked` : ``}>
                    <label class="${item.compFlag ? "completed" : ""}" for="">${item.taskName}</label>
                </div>
            `);
        }

    }
    

    renderLeftSide();

    renderTodolist();

    $("body").on("click", "#listItems .listitem", function() {
        todolistIndex = $(this).index();

        renderTodolist();

        $(".selected").removeClass("selected");
        $(this).find("li").addClass("selected");

        localStorage.setItem("database", JSON.stringify(db));

    });

    $(".addTaskText").on("keydown", function(e) {    
        if(e.key == "Enter") {
            let itemName = $(".addTaskText").val();    
            let itemId = 0;
            if(!$.isEmptyObject(db[todolistIndex].tasks)) {
                itemId = (db[todolistIndex].tasks[db[todolistIndex].tasks.length -1].taskId)  + 1;

            }
    
            db[todolistIndex].tasks.push({
                taskName: itemName,
                taskId: itemId,
                compFlag:false
            });
            $(".addTaskText").val("");
            renderTodolist();
            renderLeftSide();
            localStorage.setItem("database", JSON.stringify(db));


            // SET LOCAL STORAGE *********************************************************
        }
    });

    $("body").on("click", ".to-do .item", function(e) {
        let itemId = $(this).attr("value");

        db[todolistIndex].tasks[itemId].compFlag = !db[todolistIndex].tasks[itemId].compFlag;
        //$(this).find("input").val();

        $(this).find("input").prop("checked", db[todolistIndex].tasks[itemId].compFlag);


        if(db[todolistIndex].tasks[itemId].compFlag) {
            $(this).find("label").addClass("completed");
        }
        else {
            $(this).find("label").removeClass("completed");
        }

        renderLeftSide();
        

        localStorage.setItem("database", JSON.stringify(db));

    });


    $("body").on("mouseenter", ".listitem", function(e) {
        $(this).find(".icon").removeClass("hidden");
        //console.log($(this).find(".icon").classList());
        //$(this).find(".icon").toggleClass("display");

    })
    .on("mouseleave", ".listitem", function(e) {
        $(this).find(".icon").addClass("hidden");
    });

    $("body").on("click", ".icon ", function(e) {
        e.stopPropagation();        // ***************************************** propagate problem
        

        let theIndex = $(this).parent().parent().parent().index();
        db.splice(theIndex, 1);
        //splice(db[todolistIndex], theIndex);
        //console.log(db);
        renderLeftSide();
        todolistIndex = 0;
        renderTodolist();

        localStorage.setItem("database", JSON.stringify(db));

    })


    $("#newList").on("click", function(){
        $("#newtaskgeneral").css({"display" : "block"});
        $("#txtNewTask").focus();
    })

    $("#create").on("click", function(){
        let listname = $("#txtNewTask").val();
        $("#txtNewTask").val("");
        db.push({
            title : listname,
            tasks :[]
        })
        $("#newtaskgeneral").css({"display" : "none"});
        renderLeftSide();
        localStorage.setItem("database", JSON.stringify(db));

    })

    $("#newTask").on("keydown", function(e){
        if(e.key == "Enter") {
            let listname = $("#txtNewTask").val();
            $("#txtNewTask").val("");
            db.push({
                title : listname,
                tasks :[]
            })
            $("#newtaskgeneral").css({"display" : "none"});
            renderLeftSide();
            localStorage.setItem("database", JSON.stringify(db));
        }
    })
        

    $("#cancel").on("click",function(){
        $("#newtaskgeneral").css({"display" : "none"});
    })



    function getCount(theIndex) {
        let i = 0;
        for(item of db[theIndex].tasks) {
            if(!item.compFlag) {
                i++;
            }
        }

        return i;
    }
});



