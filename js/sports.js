const searchAllData = async() => {
    const inputElement = document.getElementById('input-field').value;
    if(inputElement === ''){
        return alert('Please Please Search Valid Info');
    }
    document.getElementById('single-player-info').innerHTML = '';
    const URL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputElement}`;
    document.getElementById('male').classList.add('d-none');
    document.getElementById('female').classList.add('d-none');
    // console.log(URL);
    try {
        const res = await fetch(URL);
        const data = await res.json();
        playerSearchInfo(data.player);
    } catch (error) {
        console.log(error);
    }
};

const playerSearchInfo = (players) => {
    document.getElementById('input-field').value = '';
    const row = document.getElementById('row');
    row.innerHTML = '';
    players.forEach(player => {
        // console.log(player);
        const {strPlayer , strThumb , strNationality , idPlayer} = player;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
          <img src="${strThumb ? strThumb : 'https://shorturl.at/gBHQZ'}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Name : ${strPlayer}</h5>
            <h6 class="card-title">Nationality : ${strNationality}</h6>
          </div>
          <div class="pb-3 px-3 d-flex justify-content-between">
            <button onclick="singlePlayer(${idPlayer})" type="button" class="btn btn-primary">Details</button>
            <button id="dlt-btn" type="button" class="btn btn-danger">Delete</button>
          </div>
        </div>
        `;
        row.appendChild(div);
    })
};



const singlePlayer = async(id) => {
    // console.log(id);
    const URL = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
    try {
        const res = await fetch(URL);
        const data = await res.json();
        showSinglePlayer(data.players[0]);
    } catch (error) {
        console.log(error);
    }
};

const showSinglePlayer = (element) => {
    // console.log(element);
    const {strPlayer , strThumb , strDescriptionEN , strGender} = element;
    const container = document.getElementById('single-player-info');
    if(strGender === "Male"){
        document.getElementById('male').classList.remove('d-none');
    }
    else{
        document.getElementById('female').classList.remove('d-none');
    }
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card mb-3" w-100 h-100">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${strThumb ? strThumb : 'https://shorturl.at/gBHQZ'}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Name : ${strPlayer}</h5>
          <p class="card-text">Description : ${strDescriptionEN.slice(0 , 100) + '...'}</p>
          <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
    `;
    container.appendChild(div);
};
