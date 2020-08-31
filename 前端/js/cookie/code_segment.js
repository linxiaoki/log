//index.js
// countDiv => localStorage; count_sDiv => sessionStorage;
var count,count_s;
window.onload = function(){
    countDiv=document.getElementById('count');
    count_sDiv=document.getElementById('count_s');
    count = localStorage.count || 0;
    countDiv.innerHTML=count;
    setInterval(startCount,1000);

    count_s = sessionStorage.count || 0;
    count_sDiv.innerHTML=count_s;
    setInterval(startCount_s,1000);
    
    document.cookie = encodeURIComponent('名字')+ '=' + encodeURIComponent('值');
    document.cookie = 'name2=kass;';
    document.cookie = 'name3=kawwww';
    removeCookie('name2')
};

function startCount(){
    count ++;
    localStorage.count = count;
    countDiv.innerHTML = count;
    // localStorage.removeItem('count');
}


function startCount_s(){
    count_s ++;
    sessionStorage.count = count_s;
    count_sDiv.innerHTML = count_s;
    // sessionStorage.removeItem('count');
}

function removeCookie(name, domain, path){
    expire = (new Date(0)).toUTCString();  //给定一个过期时间
    document.cookie = name+'=; domain='+(domain||'localhost')+
                            '; path='+(path||'/')+
                            '; max-age=0';
}
