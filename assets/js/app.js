let creditData=[]

sum=document.getElementById('sum')
procent=document.getElementById('percent')
term=document.getElementById('term')
button=document.getElementById('btn')
table=document.getElementById('tableBody')
tableO=document.getElementById('table')
warn=document.getElementById('warn')

button.addEventListener("click", function() {
    if(term.value.includes('.') || term.value.includes(',') || +sum.value>9999999999 ){
        warn.textContent = "Введите корректные данные :)";
        tableO.classList.add('d-none');
    }
    else if(+sum.value>0 && +procent.value>0 && +term.value>0 && +procent.value<1000 &&  +term.value<1000.01){
        warn.textContent = "";
        t=Math.round(term.value);
        tableO.classList.remove('d-none');
        creditData=[]
        let dolg=+sum.value;
        let telo=Math.round((sum.value/t)*100)/100
        let proc=Math.round((dolg*((procent.value/12)/100))*100)/100;
        let plat=Math.round((telo+proc)*100)/100
        creditData[0]={
            'dolg':dolg,
            'telo':telo,
            'proc':proc,
            'plat':plat
        }   
        for(let i=1; i<t; i++){    
           telo=Math.round(telo*100)/100 
           dolg=Math.round((dolg-telo) *100)/100;      
           proc=Math.round((dolg*((procent.value/12)/100))*100)/100;
           plat=Math.round((telo+proc)*100)/100
           if(telo>dolg || i === t - 1){
                telo=dolg
                plat=Math.round((telo+proc)*100)/100;
           }
           creditData[i]={
            'dolg':dolg,
            'telo':telo,
            'proc':proc,
            'plat':plat
            }   
            console.log(dolg,telo,proc,plat)

        }
        table.innerHTML=''
        for (let i = 0; i < creditData.length; i++) {
            let html=`
            <tr>
                <th scope="row">${i+1}</th>
                <td>${creditData[i]['dolg']}</td>
                <td>${creditData[i]['telo']}</td>
                <td>${creditData[i]['proc']}</td>
                <td>${creditData[i]['plat']}</td>
              </tr>
            `
            table.insertAdjacentHTML('beforeend', html);
        }   
        let html=`
            <tr>
                <th scope="row">Итого</th>
                <td>0</td>
                <td>${Math.round(creditData.reduce((a, cv) => a + cv['telo'], 0)*100)/100}</td>
                <td>Переплата: ${Math.round(creditData.reduce((a, cv) => a + cv['proc'], 0)*100)/100}</td>
                <td></td>
            </tr>`
        table.insertAdjacentHTML('beforeend', html);

    }
});
