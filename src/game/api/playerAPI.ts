import { Player } from '../model/Player'
//const baseUrl = '/api';
const baseUrl = '/api';
const url = `${baseUrl}/player`

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the project(s).';
    default:
      return 'There was an error retrieving the project(s). Please try again.';
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

// eslint-disable-next-line
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToCardModels(data: any[]): Player[] {
  console.log(data);
  let cards: Player[] = data.map(convertToPlayerModel);
  return cards;
}


function convertToPlayerModel(item: any): Player {
  console.log(item);
  let aPlayer = new Player(item);
  console.log(aPlayer);
  return aPlayer;
}

const playerApi = {
  get() {
    console.log("player")
    return fetch(`${url}`)
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToPlayerModel)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the projects. Please try again.'
        );
      });
  },

  put(player: Player): Promise<Player> {
    console.log(JSON.stringify(player));
    return new Promise((resolve, reject) => {
       fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to post player data');
          }
          return response.json();
        })
        .then(updatedPlayer => {
          // Assuming the server returns the updated player object
          resolve(new Player(updatedPlayer));
        })
        .catch(error => {
          reject(error);
        });
    });
  },


};

export { playerApi };