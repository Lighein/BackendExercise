let lastExecutionTop = [];
let currExecutionAll = [];
let lastExecutionAll = [];
let posts = {};

async function getAll(){
  let url = 'https://www.reddit.com/r/javascript.json';
  try{
    let response = await fetch(url);
    let resp = await response.json();
    return resp
  } catch (error){
    console.log(error)
  }
}

function getAllPosts() {
  let response = getAll();
  lastExecutionAll = response["data"]["children"];
    if (!lastExecutionAll.length){
      for (let i = 0; i < lastExecutionAll.length; i++){
        let id = lastExecutionAll[i]["data"]["id"]
        posts[id] = lastExecutionAll[i]
      }
      return lastExecutionAll;
    } else {
      let arr = [];
      for (let i = 0; i <lastExecutionAll.length; i++){
        let id = lastExecutionAll[i]["data"]["id"]
        if (!posts[id]){
          arr.push(lastExecutionAll[i]);
        }
      }
      return arr
    }
}
    

async function getTop(){
  let url = 'https://www.reddit.com/r/javascript/top.json';
  try{
    let response = await fetch(url);
    let resp = await response.json();
    lastExecutionTop = resp["data"]["children"];
    if (lastExecutionTop.length<=75) return [];
    return lastExecutionTop.slice(75)
  } catch (error){
    console.log(error)
  }
}


async function postsVoteChange(){
  let url = 'https://www.reddit.com/r/javascript.json';
  try{
    let response = await fetch(url);
    let resp = await response.json();
    currExecutionAll = resp["data"]["children"];
    let arr = [];
    for (let i = 0; i < currExecutionAll.length; i++){
      let id = currExecutionAll[i]["data"]["id"]
      if (lastExecutionAll[id]){
        arr.push([id, currExecutionAll[i]["data"]["score"]-lastExecutionAll[id]["score"]]);
      }
    }
  } catch (error){
    console.log(error)
  }
}

console.log(getAllPosts())
// console.log(getTop())
// console.log(postsVoteChange())