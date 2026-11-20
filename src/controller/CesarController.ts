import { Request, Response } from 'express';
import { CesarService, ValidationError } from '../service/CesarService';
import { CesarView } from '../view/CesarView';

export class CesarController {
  private cesarService: CesarService;
  private cesarView: CesarView;

  constructor() {
    this.cesarService = new CesarService();
    this.cesarView = new CesarView();
  }

  public cifrar = (req: Request, res: Response): void => {
    try {
      const { textoClaro, deslocamento } = req.body ?? {};
      const resultado = this.cesarService.cifrar(textoClaro, deslocamento);
      this.cesarView.renderCifrado(res, resultado);
    } catch (error) {
      this.tratarErro(res, error);
    }
  };

  public decifrar = (req: Request, res: Response): void => {
    try {
      const { textoCifrado, deslocamento } = req.body ?? {};
      const resultado = this.cesarService.decifrar(textoCifrado, deslocamento);
      this.cesarView.renderDecifrado(res, resultado);
    } catch (error) {
      this.tratarErro(res, error);
    }
  };

  public decifrarForcaBruta = (req: Request, res: Response): void => {
    try {
      const { textoCifrado } = req.body ?? {};
      const resultado = this.cesarService.decifrarForcaBruta(textoCifrado);
      this.cesarView.renderDecifrado(res, resultado);
    } catch (error) {
      this.tratarErro(res, error);
    }
  };

  private tratarErro(res: Response, error: unknown): void {
    if (error instanceof ValidationError) {
      this.cesarView.renderErro(res, error.message, 400);
      return;
    }
    this.cesarView.renderErro(res, 'Requisição inválida.', 400);
  }
}