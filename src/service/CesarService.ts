import { CifrarResponse, DecifrarForcaBrutaResponse, DecifrarResponse } from '../model/CesarModel';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

const ALFABETO = 'abcdefghijklmnopqrstuvwxyz';
const TAMANHO_ALFABETO = ALFABETO.length;

const FREQUENCIA_PT: Record<string, number> = {
  a: 14.63, b: 1.04, c: 3.88, d: 4.99, e: 12.57,
  f: 1.02, g: 1.30, h: 1.28, i: 6.18, j: 0.40,
  k: 0.02, l: 2.78, m: 4.74, n: 5.05, o: 10.73,
  p: 2.52, q: 1.20, r: 6.53, s: 7.81, t: 4.34,
  u: 4.63, v: 1.67, w: 0.01, x: 0.21, y: 0.01,
  z: 0.47
};

const BIGRAMAS_PT = new Set([
  'de', 'os', 'as', 'es', 'ra', 'ar', 'en', 'nt', 'do', 'da',
  'em', 'er', 're', 'co', 'te', 'se', 'al', 'an', 'or', 'in',
  'ao', 'ou', 'qu', 'nh', 'lh', 'ch', 'nd', 'st', 'ta', 'me'
]);

const PALAVRAS_PT = new Set([
  'a', 'o', 'e', 'as', 'os', 'um', 'uma', 'uns', 'umas',
  'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas',
  'por', 'pelo', 'pela', 'pelos', 'pelas', 'para', 'com', 'sem', 'sob', 'sobre',
  'entre', 'ate', 'apos', 'desde', 'contra', 'que', 'quem', 'qual', 'quais',
  'onde', 'quando', 'como', 'porque', 'se', 'mas', 'ou', 'nem', 'tambem',
  'nao', 'sim', 'ja', 'ainda', 'sempre', 'nunca', 'agora', 'hoje', 'ontem', 'amanha',
  'aqui', 'ali', 'la', 'muito', 'pouco', 'mais', 'menos', 'bem', 'mal',
  'eu', 'tu', 'ele', 'ela', 'nos', 'vos', 'eles', 'elas', 'voce', 'voces',
  'meu', 'minha', 'meus', 'minhas', 'seu', 'sua', 'seus', 'suas', 'nosso', 'nossa',
  'este', 'esta', 'estes', 'estas', 'esse', 'essa', 'esses', 'essas', 'aquele', 'aquela',
  'isto', 'isso', 'aquilo', 'tudo', 'nada', 'algo', 'alguem', 'ninguem', 'cada', 'outro',
  'ser', 'estar', 'ter', 'haver', 'fazer', 'ir', 'vir', 'ver', 'dar', 'saber',
  'querer', 'poder', 'dizer', 'falar', 'ficar', 'passar', 'dever', 'chegar', 'levar', 'deixar',
  'foi', 'era', 'sao', 'esta', 'estao', 'tem', 'tinha', 'pode', 'vai', 'vamos',
  'ola', 'oi', 'mundo', 'bom', 'boa', 'dia', 'tarde', 'noite',
  'seguranca', 'informacao', 'cifra', 'cesar', 'mensagem', 'secreta', 'texto',
  'claro', 'cifrado', 'chave', 'deslocamento', 'criptografia', 'ataque', 'forca', 'bruta',
  'teste', 'exemplo', 'aula', 'trabalho', 'professor', 'aluno', 'sistema', 'dados',
  'senha', 'codigo', 'api', 'servidor', 'rede', 'computador', 'arquivo', 'casa',
  'tempo', 'ano', 'vez', 'parte', 'vida', 'forma', 'caso', 'pais', 'lugar', 'pessoa', 'hora'
]);

export class CesarService {
  public cifrar(textoClaro: unknown, deslocamento: unknown): CifrarResponse {
    const textoValido = this.validarTexto(textoClaro, 'textoClaro');
    const shiftValido = this.validarDeslocamento(deslocamento);

    const textoCifrado = this.aplicarDeslocamento(textoValido, shiftValido);
    return { textoCifrado };
  }

  public decifrar(textoCifrado: unknown, deslocamento: unknown): DecifrarResponse {
    const textoValido = this.validarTexto(textoCifrado, 'textoCifrado');
    const shiftValido = this.validarDeslocamento(deslocamento);

    const textoClaro = this.aplicarDeslocamento(textoValido, -shiftValido);
    return { textoClaro };
  }

  public decifrarForcaBruta(textoCifrado: unknown): DecifrarForcaBrutaResponse {
    const textoValido = this.validarTexto(textoCifrado, 'textoCifrado');

    let melhorCandidato = textoValido;
    let maiorPontuacao = -Infinity;

    for (let deslocamento = 0; deslocamento < TAMANHO_ALFABETO; deslocamento++) {
      const candidato = this.aplicarDeslocamento(textoValido, -deslocamento);
      const pontuacao = this.pontuarPortugues(candidato);

      if (pontuacao > maiorPontuacao) {
        maiorPontuacao = pontuacao;
        melhorCandidato = candidato;
      }
    }

    return { textoClaro: melhorCandidato };
  }

  private validarTexto(texto: unknown, nomeCampo: string): string {
    if (typeof texto !== 'string') {
      throw new ValidationError(`O campo '${nomeCampo}' é obrigatório e deve ser uma string.`);
    }

    if (texto.length === 0 || texto.length > 255) {
      throw new ValidationError(`O campo '${nomeCampo}' deve ter entre 1 e 255 caracteres.`);
    }

    if (!/^[a-zA-Z ]+$/.test(texto)) {
      throw new ValidationError(
        `O campo '${nomeCampo}' deve conter apenas letras de 'a' a 'z' (sem acentos) e espaços.`
      );
    }

    return texto;
  }

  private validarDeslocamento(deslocamento: unknown): number {
    if (typeof deslocamento !== 'number' || !Number.isInteger(deslocamento)) {
      throw new ValidationError("O campo 'deslocamento' é obrigatório e deve ser um número inteiro.");
    }

    return deslocamento;
  }

  private aplicarDeslocamento(texto: string, deslocamento: number): string {
    const shift = ((deslocamento % TAMANHO_ALFABETO) + TAMANHO_ALFABETO) % TAMANHO_ALFABETO;
    let resultado = '';

    for (const char of texto) {
      if (char === ' ') {
        resultado += ' ';
      } else {
        const isUpper = char >= 'A' && char <= 'Z';
        const indiceAtual = ALFABETO.indexOf(char.toLowerCase());
        const novoIndice = (indiceAtual + shift) % TAMANHO_ALFABETO;
        const novaLetra = ALFABETO[novoIndice];
        resultado += isUpper ? novaLetra.toUpperCase() : novaLetra;
      }
    }

    return resultado;
  }

  private pontuarPortugues(texto: string): number {
    const textoMinusculo = texto.toLowerCase();
    let score = 0;

    const palavras = textoMinusculo.split(' ').filter((p) => p.length > 0);
    for (const palavra of palavras) {
      if (PALAVRAS_PT.has(palavra)) {
        score += 20 * palavra.length;
      }
    }

    const apenasLetras = textoMinusculo.replace(/ /g, '');
    for (let i = 0; i < apenasLetras.length - 1; i++) {
      const bigrama = apenasLetras.slice(i, i + 2);
      if (BIGRAMAS_PT.has(bigrama)) {
        score += 3;
      }
    }

    for (const char of apenasLetras) {
      score += FREQUENCIA_PT[char] ?? 0;
      if (char === 'k' || char === 'w' || char === 'y') {
        score -= 8;
      }
    }

    return score;
  }
}