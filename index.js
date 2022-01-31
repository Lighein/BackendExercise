let myStorage = window.localStorage;

function getAll(){
  return async()=>{
    let url = 'https://www.reddit.com/r/javascript.json';
    try{
      let response = await fetch(url);
      let resp = await response.json();
      localStorage.setItem('getAll', JSON.stringify(resp["data"]["children"]));
    } catch (error){
      console.log(error)
    }
  }
}

function getAllPosts() {
  getAll();
  let currExecutionAll = JSON.parse(localStorage.getItem('getAll'));
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
    if (!posts.length){
      for (let i = 0; i < currExecutionAll.length; i++){
        let id = currExecutionAll[i]["data"]["id"]
        posts[id] = currExecutionAll[i]
      }
      localStorage.setItem('posts', JSON.stringify(posts));
      return currExecutionAll;
    } else {
      let arr = [];
      for (let i = 0; i <currExecutionAll.length; i++){
        let id = currExecutionAll[i]["data"]["id"]
        if (!posts[id]){
          arr.push(currExecutionAll[i]);
        }
      }
      localStorage.setItem('posts', JSON.stringify(posts));
      return arr
    }
}
    

function getTop(){
  return async() =>{
    let url = 'https://www.reddit.com/r/javascript/top.json';
    try{
      let response = await fetch(url)
      let resp = await response.json();
      let currExec = resp["data"]["children"];
      return currExec.slice(5);
    } catch (error){
      console.log(error)
    }
  }
}

const printGTP = async () => {
  const ans = await getTop()();
  console.log("Out of top 5", ans);
}; 

function postsVoteChange(){
  try{
    getAll(); 
    let currExecutionAll = JSON.parse(localStorage.getItem('getAll'));
    let arr = [];
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    for (let i = 0; i < currExecutionAll.length; i++){
      let id = currExecutionAll[i]["data"]["id"]
      if (posts[id]){
        arr.push([id, currExecutionAll[i]["data"]["score"]-(posts[id]["score"] || currExecutionAll[i]["data"]["score"])]);
      }
    }
    return arr
  } catch (error){
    console.log(error)
  }
}

console.log("All", getAllPosts());
printGTP();
console.log("Vote changes", postsVoteChange())