// Tipos para la historia clínica
export interface MedicalRecordData {
  paciente: {
    nombre: string;
    edad: string;
    sexo: string;
  };
  motivoConsulta: string;
  antecedentes: string;
  sintomas: string[];
  exploracionFisica: string;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
}

