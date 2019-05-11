// var Algorithmia = require("algorithmia");

// var input = ["C:\Users\Tom lochi\Desktop\Semi\semi\Data.txt", ["nike"]];
// const alg = Algorithmia.client("sima+pOytbnhUbZKJjM/gpan1wV1")
//     .algo("ecommerce/ProductRecommender/0.1.1?timeout=300") // timeout is optional
//     .pipe(input).then(res => {
//         console.log(res)
//     })


const match = {
    id: `5gg210dfc13ae60c40000ea`,
    name: `Lau`,
    ebu: 0.24,
    alc: 43,
    color: `Red`,
    cdex: 0.0421,
    bitterheid: 0.2,
  };


  const init = ({data}) => {

    const wma = new WMA({
      source: beers,
      source: data,
      showOriginal: true,
      keys: [
        {key: `alcohol`, m: 4},
        {key: `bitterheid`, m: 6},
        {key: `ebu`, m: 20},
        {key: `alc`, m: 50},
        {key: `cdex`, m: 80},
        {key: `bitterheid`, m: 100}
      ]
    });

    wma.match(match);
  
    console.log(wma.match(match));
  
  };

  const fetchData = () => {
    fetch(`./demo/data/dataset.json`)
    fetch(`./demo/data/full.json`)
      .then(r => r.json())
      .then(data => init(data));
  };