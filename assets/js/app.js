let creditData=[]

sum=document.getElementById('sum')
procent=document.getElementById('percent')
term=document.getElementById('term')
button=document.getElementById('btn')
table=document.getElementById('tableBody')
tableO=document.getElementById('table')

button.addEventListener("click", function() {
    if(+sum.value>0 && +procent.value>0 && +term.value>0){
        tableO.classList.remove('d-none');
        creditData=[]
        let dolg=+sum.value;
        let telo=+(sum.value/term.value)
        let proc=+(dolg*((procent.value/12)/100));
        let plat=+(telo+proc);
        creditData[0]={
            'dolg':Math.round(dolg*100)/100,
            'telo':Math.round(telo*100)/100,
            'proc':Math.round(proc*100)/100,
            'plat':Math.round(plat*100)/100
        }   
        for(let i=1; i<term.value; i++){     
           dolg=dolg-telo;      
           proc=+(dolg*((procent.value/12)/100));
           plat=+(telo+proc);
           if(telo>dolg){
                telo=dolg
           }
           creditData[i]={
            'dolg':Math.round(dolg*100)/100,
            'telo':Math.round(telo*100)/100,
            'proc':Math.round(proc*100)/100,
            'plat':Math.round(plat*100)/100
        }   
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
                <td></td>
                <td>${Math.round(creditData.reduce((a, cv) => a + cv['telo'], 0))}</td>
                <td>Переплата: ${Math.round(creditData.reduce((a, cv) => a + cv['proc'], 0)*100)/100}</td>
                <td></td>
            </tr>`
        table.insertAdjacentHTML('beforeend', html);

    }
});
