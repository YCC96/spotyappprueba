import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/servicios/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.scss']
})
export class ArtistaComponent implements OnInit {

  banLanding: boolean = true;
  artista: any = {};
  topTracks: any[] = [];

  constructor(
    private _actRoute: ActivatedRoute,
    private _location: Location,
    private _spotify: SpotifyService
  ) {
    this._actRoute.params.subscribe(params => {
      this.getArtista(params.id);
      this.getTopTracks(params.id);
    });
  }

  ngOnInit(): void {
  }

  getArtista(id: string){
    this._spotify.getArtista(id).subscribe(data => {
      console.log('*_* respuesta servicio artista: ', data);
      this.artista = data;
      this.banLanding = false;
    }, error => {
      console.log('Ocurrio un error al consultar artista.');

    })
  }

  getTopTracks(id: string){
    this._spotify.getTopTracks(id).subscribe(data => {
      console.log('*_* servicio top tracks: ', data);
      this.topTracks = data;
    }, error => {
      console.log('Ocurrio un error al obtener el top');
      if(error.status == 401){
        this._spotify.getToken().then(data => {
          console.log('*_* then: ', data);
          this.getTopTracks(id)
        })
        console.log('*_* status 401: ');

          //this.getReleases();
      }
    })
  }

  goBack(){
    this._location.back();
  }

}
