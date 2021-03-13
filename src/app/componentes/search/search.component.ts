import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/servicios/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  artistas: any[] = [];
  banLoading: boolean = false;

  constructor(
    private _spotify: SpotifyService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  buscar(cadena: string){
    this.banLoading = true;
    console.log(' buscar: ', cadena);
    this._spotify.getArtistas(cadena).subscribe((data: any) => {
      console.log(' busqueda artistas: ', data);
      this.artistas = data.artists.items;
      this.banLoading = false;
    }, error => {
      console.log('Ocurrio un error al buscar el artista');
      if(error.status == 401){
        this._spotify.getToken().then(data => {
          console.log('*_* then: ', data);
          this.buscar(cadena)
        })
        console.log('*_* status 401: ');

          //this.getReleases();
      }
    })
  }

  verArtista(artista: any){
    console.log('*_* artista: ', artista);
    this._router.navigate(['/artist', artista.id])
  }

}
