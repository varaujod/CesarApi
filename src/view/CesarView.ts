import { Response } from 'express';
import { CifrarResponse, DecifrarForcaBrutaResponse, DecifrarResponse, ErrorResponse} from '../model/CesarModel';

export class CesarView {
  public renderCifrado(res: Response, data: CifrarResponse): void {
    res.status(200).json({
      textoCifrado: data.textoCifrado
    });
  }

  public renderDecifrado(res: Response, data: DecifrarResponse | DecifrarForcaBrutaResponse): void {
    res.status(200).json({
      textoClaro: data.textoClaro
    });
  }

  public renderErro(res: Response, mensagem: string, statusCode = 400): void {
    const payload: ErrorResponse = { erro: mensagem };
    res.status(statusCode).json(payload);
  }
}