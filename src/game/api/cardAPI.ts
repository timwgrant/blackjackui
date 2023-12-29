import {Card} from '../model/Card'
const baseUrl = 'http://192.168.6.251:8080';
const url = `${baseUrl}/api/dealCard`

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

  function convertToCardModels(data: any[]): Card[] {
    console.log(data);
    let cards: Card[] = data.map(convertToCardModel);
    return cards;
  }
  

  function convertToCardModel(item: any): Card {
    console.log(item);
    let aCard = new Card(item);
    console.log(aCard);
    return aCard;
  }

  const cardAPI = {
    get(playerid : number) {
      return fetch(`${url}/${playerid}`)
        //.then(delay(600))
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToCardModel)
        .catch((error: TypeError) => {
          console.log('log client error ' + error);
          throw new Error(
            'There was an error retrieving the projects. Please try again.'
          );
        });
    },
  };

  export { cardAPI };