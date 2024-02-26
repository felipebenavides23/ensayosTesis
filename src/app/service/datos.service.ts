import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  constructor(private httpCliente: HttpClient) {}

  public listarEnsayos() {
    let url =
      'https://73g6i1sclj.execute-api.us-east-2.amazonaws.com/listar-ensayos';
    return this.httpCliente
      .get(url)
      .toPromise()
      .then((respuesta) => {
        return respuesta;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public guaradaRespuestas(data) {
    let url =
      'https://73g6i1sclj.execute-api.us-east-2.amazonaws.com/guardar-registro';

    const pdata = JSON.stringify(data);
    return this.httpCliente
      .post(url, pdata)
      .toPromise()
      .then((respuesta) => {
        return respuesta;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
