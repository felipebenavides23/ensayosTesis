export type Iensayos = {
  id: string;
  tipo: string;
  prueba: string;
  data: IdataEnsayos[];
  createdAT: string;
};

export type IdataEnsayos = {
  prueba: number;
  titulo: string;
  tipoApuesta: string;
  valor: string;
  tipoRiesgo: string;
};

export type Trespuesta = {
  ensayos: Iensayos[];
};

export enum ETipoEnsayos {
  VERIFICACION = 'verificacion',
  ENTRENAMIENTO = 'entrenamiento',
  EXPERIMENTAL = 'experimentales',
}
export enum ETipoRiesgos {
  BAJO = 'Bajo',
  MEDIO = 'Medio',
  ALTA = 'Alto',
}
