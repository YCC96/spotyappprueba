import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string = '';

  constructor(private _http: HttpClient) {
    console.log('*_* localS: ', localStorage.getItem('tokenSpotify'));
    var tokenLS = localStorage.getItem('tokenSpotify');
    if (tokenLS == null || tokenLS == '') {
      localStorage.setItem('tokenSpotify','kjsdjsdhjsdhjsdh')
    }
  }

  getPetition(query: string){
    var headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('tokenSpotify')
    });
    var url = `https://api.spotify.com/v1/${query}`
    return this._http.get(url, { headers })
  }

  getNewReleases(){
    return this.getPetition('browse/new-releases')
                .pipe( map( (data: any) => data.albums.items));
  }

  getArtistas(cadena: string){
    var headers = new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('tokenSpotify')
    });
    return this._http.get(`https://api.spotify.com/v1/search?q=${cadena}&type=artist&limit=20`, { headers });
  }

  getArtista(id: string){
    return this.getPetition(`artists/${id}`);
  }

  getTopTracks(id: string){
    return this.getPetition(`artists/${id}/top-tracks?market=es`)
                .pipe( map( (data: any) => data.tracks));
  }

  getToken(){
    return new Promise((resolve) => {
      const url = 'https://accounts.spotify.com/api/token';
      var headers = new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded'
      });
      var body = new HttpParams()
                      .set('grant_type', 'client_credentials')
                      .set('client_id', 'xxxx')
                      .set('client_secret', 'xxxxxx');

      this._http.post(url, body, { headers }).subscribe((data: any) => {
        console.log('*_* get token: ', data);

        localStorage.setItem('tokenSpotify', data.access_token);
        resolve('ok');
      });
    })
  }

  /**
   * getNewReleases(){
    var headers = new HttpHeaders({
      'Authorization':'Bearer ' + this.token
    });
    return this._http.get('https://api.spotify.com/v1/browse/new-releases', { headers })
      .pipe( map( (data: any) => data.albums.items));
  }

  getArtistas(cadena: string){
    var headers = new HttpHeaders({
      'Authorization':'Bearer ' + this.token
    });
    return this._http.get(`https://api.spotify.com/v1/search?q=${cadena}&type=artist&limit=20`, { headers });
  }
   */

}
