export interface CifrarRequest {
  textoClaro: string;
  deslocamento: number;
}

export interface CifrarResponse {
  textoCifrado: string;
}

export interface DecifrarRequest {
  textoCifrado: string;
  deslocamento: number;
}

export interface DecifrarResponse {
  textoClaro: string;
}

export interface DecifrarForcaBrutaRequest {
  textoCifrado: string;
}

export interface DecifrarForcaBrutaResponse {
  textoClaro: string;
}

export interface ErrorResponse {
  erro: string;
}