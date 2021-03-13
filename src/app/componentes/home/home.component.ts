import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/servicios/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  banLoading: boolean = true;
  banAlert: boolean = false;
  messageAlert: string = '';

  constructor(
    private _spotify: SpotifyService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getReleases();
  }

  getReleases(){
    this.banAlert = false;
    this._spotify.getNewReleases().subscribe((data: any) => {
      console.log('*_* servicio exito: ', data);
      this.nuevasCanciones = data;
      this.banLoading = false;
    }, error => {
      if(error.status == 401){
        this._spotify.getToken().then(data => {
          console.log('*_* then: ', data);
          this.getReleases()
        })
        console.log('*_* status 401: ');

          //this.getReleases();
      }
      this.banLoading = false;
      this.banAlert = true;
      this.messageAlert = error.error.error.message;
      console.log('Ocurrio un error al obtener new Releses.', error);

    });
  }

  verArtista(cancion){
    console.log(cancion);
    this._router.navigate(['/artist', cancion.artists[0].id]);
  }

}
