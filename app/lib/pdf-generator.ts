import jsPDF from 'jspdf'
import { MedicalRecordData } from '../types/medical'

export function generateMedicalPDF(data: MedicalRecordData) {
  const doc = new jsPDF()
  
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const maxWidth = pageWidth - (margin * 2)
  let yPosition = 20

  // Title
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('Medical Consultation Report', margin, yPosition)
  yPosition += 15

  // Subtitle
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text('MediConsult AI - Intelligent Medical Consultation', margin, yPosition)
  yPosition += 15

  // Patient Information
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text('Patient Information', margin, yPosition)
  yPosition += 8

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(`Name: ${data.paciente.nombre}`, margin, yPosition)
  yPosition += 6
  doc.text(`Age: ${data.paciente.edad}`, margin, yPosition)
  yPosition += 6
  doc.text(`Sex: ${data.paciente.sexo}`, margin, yPosition)
  yPosition += 6
  doc.text(`Date: ${new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`, margin, yPosition)
  yPosition += 12

  // Reason for Consultation
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Reason for Consultation', margin, yPosition)
  yPosition += 8

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  const motivoLines = doc.splitTextToSize(data.motivoConsulta, maxWidth)
  doc.text(motivoLines, margin, yPosition)
  yPosition += (motivoLines.length * 6) + 8

  // Medical History
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Medical History', margin, yPosition)
  yPosition += 8

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  const antecedentesLines = doc.splitTextToSize(data.antecedentes, maxWidth)
  doc.text(antecedentesLines, margin, yPosition)
  yPosition += (antecedentesLines.length * 6) + 8

  // Symptoms
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Symptoms', margin, yPosition)
  yPosition += 8

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  data.sintomas.forEach((sintoma, index) => {
    if (yPosition > 260) {
      doc.addPage()
      yPosition = 20
    }
    const sintomaText = `${index + 1}. ${sintoma}`
    const sintomaLines = doc.splitTextToSize(sintomaText, maxWidth)
    doc.text(sintomaLines, margin, yPosition)
    yPosition += (sintomaLines.length * 6) + 4
  })
  yPosition += 4

  // Physical Examination
  if (yPosition > 240) {
    doc.addPage()
    yPosition = 20
  }

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Physical Examination', margin, yPosition)
  yPosition += 8

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  const exploracionLines = doc.splitTextToSize(data.exploracionFisica, maxWidth)
  doc.text(exploracionLines, margin, yPosition)
  yPosition += (exploracionLines.length * 6) + 8

  // Diagnosis
  if (yPosition > 240) {
    doc.addPage()
    yPosition = 20
  }

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Diagnosis', margin, yPosition)
  yPosition += 8

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  const diagnosticoLines = doc.splitTextToSize(data.diagnostico, maxWidth)
  doc.text(diagnosticoLines, margin, yPosition)
  yPosition += (diagnosticoLines.length * 6) + 8

  // Treatment
  if (yPosition > 240) {
    doc.addPage()
    yPosition = 20
  }

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Treatment', margin, yPosition)
  yPosition += 8

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  const tratamientoLines = doc.splitTextToSize(data.tratamiento, maxWidth)
  doc.text(tratamientoLines, margin, yPosition)
  yPosition += (tratamientoLines.length * 6) + 8

  // Observations
  if (data.observaciones && data.observaciones.trim()) {
    if (yPosition > 240) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Additional Notes', margin, yPosition)
    yPosition += 8

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    const observacionesLines = doc.splitTextToSize(data.observaciones, maxWidth)
    doc.text(observacionesLines, margin, yPosition)
    yPosition += (observacionesLines.length * 6) + 8
  }

  // Disclaimer
  if (yPosition > 220) {
    doc.addPage()
    yPosition = 20
  }

  doc.setFillColor(255, 243, 224)
  doc.rect(margin - 5, yPosition - 5, maxWidth + 10, 35, 'F')
  
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(180, 83, 9)
  doc.text('Important Disclaimer', margin, yPosition + 2)
  yPosition += 8

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(120, 53, 15)
  const disclaimer = 'This document is generated by an AI assistant and should be reviewed by a licensed healthcare professional. It is not a substitute for professional medical advice, diagnosis, or treatment.'
  const disclaimerLines = doc.splitTextToSize(disclaimer, maxWidth)
  doc.text(disclaimerLines, margin, yPosition)

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.setFont('helvetica', 'normal')
    doc.text(
      `Page ${i} of ${pageCount} - Generated by MediConsult AI`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  // Save the PDF
  const fileName = `medical-report-${data.paciente.nombre.replace(/\s+/g, '_')}-${new Date().getTime()}.pdf`
  doc.save(fileName)
}

