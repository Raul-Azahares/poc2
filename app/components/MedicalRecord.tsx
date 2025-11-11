'use client';

import { useState, useEffect } from 'react';
import { MedicalRecordData } from '../types/medical';
import { generateMedicalPDF } from '../lib/pdf-generator';

interface MedicalRecordProps {
  data: MedicalRecordData | null;
}

export default function MedicalRecord({ data }: MedicalRecordProps) {
  const [editableData, setEditableData] = useState<MedicalRecordData | null>(null);

  useEffect(() => {
    // Actualizar editableData cuando data cambia (incluyendo cuando se vuelve null)
    setEditableData(data);
  }, [data]);

  if (!editableData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Medical Record
      </h2>
      <div className="text-center py-20 text-gray-400 flex-1 flex flex-col justify-center">
        <p className="text-xl">Medical record will appear here</p>
        <p className="text-base mt-3">
          Record and process the consultation to generate the structured report
        </p>
      </div>
      </div>
    );
  }

  const updateField = (section: string, field: string, value: string) => {
    setEditableData((prev) => {
      if (!prev) return null;
      
      if (section === 'paciente') {
        return {
          ...prev,
          paciente: {
            ...prev.paciente,
            [field]: value,
          },
        };
      }
      
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const updateSintomas = (index: number, value: string) => {
    setEditableData((prev) => {
      if (!prev) return null;
      const newSintomas = [...prev.sintomas];
      newSintomas[index] = value;
      return {
        ...prev,
        sintomas: newSintomas,
      };
    });
  };

  const addSintoma = () => {
    setEditableData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        sintomas: [...prev.sintomas, ''],
      };
    });
  };

  const removeSintoma = (index: number) => {
    setEditableData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        sintomas: prev.sintomas.filter((_, i) => i !== index),
      };
    });
  };

  const exportToPDF = () => {
    if (!editableData) return;
    generateMedicalPDF(editableData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Medical Record
        </h2>
        <button
          onClick={exportToPDF}
          className="px-5 py-2.5 gradient-button text-white rounded-lg font-semibold transition-all hover:opacity-90 text-sm"
        >
          Export PDF
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">

      {/* Datos del Paciente */}
      <section className="mb-6 border-b pb-4">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">
          Patient Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={editableData.paciente.nombre}
              onChange={(e) => updateField('paciente', 'nombre', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="text"
              value={editableData.paciente.edad}
              onChange={(e) => updateField('paciente', 'edad', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sex
            </label>
            <input
              type="text"
              value={editableData.paciente.sexo}
              onChange={(e) => updateField('paciente', 'sexo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Motivo de Consulta */}
      <section className="mb-6 border-b pb-4">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">
          Reason for Consultation
        </h3>
        <textarea
          value={editableData.motivoConsulta}
          onChange={(e) => updateField('', 'motivoConsulta', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </section>

      {/* Antecedentes */}
      <section className="mb-6 border-b pb-4">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">
          Medical History
        </h3>
        <textarea
          value={editableData.antecedentes}
          onChange={(e) => updateField('', 'antecedentes', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </section>

      {/* Síntomas */}
      <section className="mb-6 border-b pb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-blue-800">Symptoms</h3>
          <button
            onClick={addSintoma}
            className="px-3 py-1 gradient-button text-white rounded text-sm font-semibold hover:opacity-90 transition-all"
          >
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {editableData.sintomas.map((sintoma, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={sintoma}
                onChange={(e) => updateSintomas(index, e.target.value)}
                placeholder={`Symptom ${index + 1}`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => removeSintoma(index)}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Exploración Física */}
      <section className="mb-6 border-b pb-4">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">
          Physical Examination
        </h3>
        <textarea
          value={editableData.exploracionFisica}
          onChange={(e) => updateField('', 'exploracionFisica', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </section>

      {/* Diagnóstico */}
      <section className="mb-6 border-b pb-4">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">
          Diagnosis
        </h3>
        <textarea
          value={editableData.diagnostico}
          onChange={(e) => updateField('', 'diagnostico', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </section>

      {/* Tratamiento */}
      <section className="mb-6 border-b pb-4">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">
          Treatment
        </h3>
        <textarea
          value={editableData.tratamiento}
          onChange={(e) => updateField('', 'tratamiento', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </section>

      {/* Observaciones */}
      <section className="mb-4">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">
          Additional Notes
        </h3>
        <textarea
          value={editableData.observaciones}
          onChange={(e) => updateField('', 'observaciones', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Additional notes, follow-up, etc."
        />
      </section>
      </div>
    </div>
  );
}

