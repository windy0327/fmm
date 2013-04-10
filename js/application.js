//显示人名
function create_user_name_list(){
    var user_name_list="";
    for(var i=0;i<users.length;i++)
    {
        user_name_list+= "<li><a href='#' onclick='get_user_name("+'"'+users[i].name+'"'+")'></a>"+users[i].name+"</li>";
    }

    show_list("users",user_name_list);
}
function show_list(id,list){
    $("#"+id).html(list);

}

//得到人名
function  get_user_name(user){
    window.localStorage.user=user;
    window.location.href="#ordermeal";
    readUser();
}

//显示就餐人名单
function readUser(){
    var user = (window.localStorage.user == null)?null:window.localStorage.user;
    var userEle = document.getElementById('user');
    userEle.value = user;
}

//显示餐厅名
function loadRes(){
    var str="";
    for(var i=0;i<restaurants.length;i++){
        var x="<li><a href='#' onclick='getRes(";
        var y=restaurants[i].name;
        var z=")'>";
        var m="</a></li>"
        var n='"';
        str+=x+n+y+n+z+y+m;
    }
    $("#restaurants").html(str);
}

//得到餐厅名单
function getRes(res){

    window.localStorage.res = res;
    window.location.href="#ordermeal";
    readRes();
}

//显示所选餐厅
function readRes(){
    var res = (window.localStorage.res == null)? null:window.localStorage.res;
    var resEle = document.getElementById('res');
    resEle.value = res;
}

//显示套餐
function loadFood(){
    var str="";
    var res = window.localStorage.res;
    if(res == null)
    {
        alert("请选择餐厅");
        window.history.go(-1);
    }
    for(a in foods)
    {
        if(a == res)
        {
            for(b in foods[a])
            {
                var x="<li><a href='#' onclick='getFood(";
                var y=foods[a][b].name;
                var z=")'>";
                var m="</a></li>"
                var n='"';
                var p=foods[a][b].price;
                var q=','
                str+=x+n+y+n+q+n+p+n+z+y+p+m;
            }
        }
    }
    $("#foods").html(str);
}

//传递套餐和价格参数
function getFood(food,price){
    window.localStorage.food = food;
    window.localStorage.price = price;
    window.history.go(-1);
    readFood();
}

//显示所选套餐
function readFood(){
    var food = (window.localStorage.food == null)? null:window.localStorage.food;
    var foodEle = document.getElementById('food');
    foodEle.value = food;
}

//提交订单
function submit(){

    if(document.getElementById('user').value == "")
    {
        alert("请选择订餐者");
        return;
    }
    if(document.getElementById('food').value == "")
    {
        alert("请选择套餐");
        return;
    }

    window.localStorage.customer += window.localStorage.user + "*";
    window.localStorage.noshery += window.localStorage.res + "*";
    window.localStorage.snack += window.localStorage.food + "*";
    window.localStorage.money += window.localStorage.price + "*";
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('food');
    window.localStorage.removeItem('res');
    window.location.href="#ordermeal";
    getOrder();
}


//显示订单
function getOrder(){
    //将传递的值变为数组
    var user = new Array();
    var res = new Array();
    var food = new Array();
    var price = new Array();

    user = window.localStorage.customer.split("*");
    res = window.localStorage.noshery.split("*");
    food = window.localStorage.snack.split("*");
    price = window.localStorage.money.split("*");

    //输出未订的人名单，得到已订人数
    var count=0;
    var str="";
    for(i=0;i<users.length;i++)
    {
        var same=0;
        for(m=0;m<user.length-1;m++)
        {
            if(user[m] == users[i].name)
            {count++;same=1;break;}
        }
        if(same == 0)
        {str+="<li>" + users[i].name + "</li>";}
        //alert(str);
    }

    var str1="";
    str1 += "<li data-theme='b'>" + (users.length-count) + "人未订</li>" + str;
    $("#unorder").html(str1);

    //输出已订的人名单
    var str2 = "<li data-theme='b'>" + count + "人已订</li>";
    for(var i=0;i<user.length-1;i++)
    {
        str2 += "<li><h4 class='ui-li-heading'>" + user[i] + "</h4><p class='ui-li-aside'>";
        if(price[i]>12)
        {
            str2+="<p class='ui-li-aside ui-li-desc' style='color:red'>￥" + price[i] + "(超出" + (price[i]-12) + "元)</p>" ;
        }else{
            str2+= "<p class='ui-li-aside ui-li-desc'>" + price[i] + "元</p>";
        }
        str2+="<p class='ui-li-desc'>" + res[i] + " " + food[i] + "</p></li>";
    }
    $("#order").html(str2);
    //显示总计
    var sum = 0;
    for(i=0;i<price.length-1;i++)
    {
        sum+=parseFloat(price[i]);
    }
    var footer="<font>" + count + "人已订" + (users.length) + "人未订 " + "总计:" + sum + "元</font>";
    $("#footer").html(footer);
}





$(function(){
    if(!window.localStorage.customer)
    {
        window.localStorage.customer="";
    }
    if(!window.localStorage.noshery)
    {
        window.localStorage.noshery="";
    }
    if(!window.localStorage.snack)
    {
        window.localStorage.snack="";
    }
    if(!window.localStorage.money)
    {
        window.localStorage.money="";
    }
})

