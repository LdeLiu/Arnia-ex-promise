const timestamp = (new Date()).getTime()
const publicKey = 'c7166cd7fb5a9b9db8da09282cfa7cc3'
const privateKey = '81611f6e95916b995d81c2ede7931cf84e6e951e'
const hash = timestamp + privateKey + publicKey
const hashMd5 = MD5.generate(hash)


class personagens {
    nome = ''
    img = ''
    revistas = [] 
    series = []
}
//vetor com 4 objetos de personagens
let arrayDePersonagens = []


const body = document.querySelector('body')



const promise = fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=4&apikey=${publicKey}&ts=${timestamp}&hash=${hashMd5}`)
//  Usamos o then para lidar com tarefas assincronas
promise.then(respostaDoServidor => {
   
        respostaDoServidor.json().then(respostaTratada => {

            const resultado = respostaTratada.data.results
            resultado.forEach((element) => {
                //criando novo personagem
                let hero = new personagens
                //atribuindo nome
                hero.nome = element.name
                //atribuindo imagem
                hero.img = element.thumbnail.path

                //salvando as revistas e series (2 primeiras), usando o indice para alterar qual indice estou pegando.
                for(let i = 0 ; i < 2 ; i++){
                    hero.revistas.push(element.comics.items[i].name)
                    hero.series.push(element.series.items[i].name)
                }

                arrayDePersonagens.push(hero)
            });


            //preenchendo os dados no HTML
            //for para cada personagem no array
            for(let i = 0 ; i < arrayDePersonagens.length ; i++){
            
                //essas variaveis servem apenas para auxiliar na seleção de qual tag estou chamando
                let className = ".nome-"
                let imgName = ".img-"
                let rev = [".r1-",".r2-"]
                let ser = [".s1-",".s2-"]

                //chamando as tags (temporeriamente, apenas dentro do loop)
                const nome = body.querySelector(className+i) //nome/h2
                const img = body.querySelector(imgName+i)   //imagem
                const r1 = body.querySelector(rev[0]+i)     //revista1
                const r2 = body.querySelector(rev[1]+i)     //revista2
                const s1 = body.querySelector(ser[0]+i)     //serie1
                const s2 = body.querySelector(ser[1]+i)     //serie2

                //atribuindo o nome ao h2
                nome.innerText = arrayDePersonagens[i].nome
                //atribuindo link ao src da imagem
                img.setAttribute('src', `${arrayDePersonagens[i].img}.jpg`)
                //atribuinr texto para as revistas
                r1.innerText = arrayDePersonagens[i].revistas[0]
                r2.innerText = arrayDePersonagens[i].revistas[1]
                //atribuindo texto para as series
                s1.innerText = arrayDePersonagens[i].series[0]
                s2.innerText = arrayDePersonagens[i].series[1]
                

                
            }
            


            console.log(body)
            
           

        })

}, error => {
    console.log('Erro: ' + error)
});
