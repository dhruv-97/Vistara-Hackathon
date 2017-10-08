import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/*
  Generated class for the Chat provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Chat {
  private url = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/577db1c0-f30c-415f-ac06-0cc3754fa515/generateAnswer'
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(public http: Http) {
    console.log('Hello Chat Provider');
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    this.headers.delete('Ocp-Apim-Subscription-Key');
    return Promise.reject(error.message || error);
  }
  getResponse(q):Promise<any>{
    this.headers.append('Ocp-Apim-Subscription-Key','17c937085cc349059882fe5cc9b4f53c');
    console.log(this.headers);
    return this.http.post(this.url,q,{headers: this.headers})
      .toPromise()
      .then(response => {
      this.headers.delete('Ocp-Apim-Subscription-Key');
    return response.json();})
      .catch(this.handleError);
  }

}
