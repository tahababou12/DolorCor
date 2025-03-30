import React, { useEffect, useRef } from 'react';
import { SymptomData, DiseaseMatch } from '../types';
import { categoryColors } from '../data/symptoms';

interface VisualizationGraphProps {
  symptoms: SymptomData[];
  diseases: DiseaseMatch[];
}

const VisualizationGraph: React.FC<VisualizationGraphProps> = ({ symptoms, diseases }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || symptoms.length === 0 || diseases.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate positions
    const leftMargin = 200;
    const rightMargin = 200;
    const topMargin = 50;
    const bottomMargin = 50;
    
    const leftX = leftMargin;
    const rightX = width - rightMargin;
    
    const symptomSpacing = (height - topMargin - bottomMargin) / (symptoms.length + 1);
    const diseaseSpacing = (height - topMargin - bottomMargin) / (diseases.length + 1);
    
    // Draw connections first (so they're behind the nodes)
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    
    for (let i = 0; i < symptoms.length; i++) {
      const symptom = symptoms[i];
      const symptomY = topMargin + (i + 1) * symptomSpacing;
      
      for (let j = 0; j < diseases.length; j++) {
        const disease = diseases[j];
        const diseaseY = topMargin + (j + 1) * diseaseSpacing;
        
        // Check if this symptom contributes to this disease
        // In a real implementation, you'd use your prime factorization logic here
        if (disease.sqf % symptom.prime === 0) {
          ctx.beginPath();
          ctx.moveTo(leftX, symptomY);
          ctx.lineTo(rightX, diseaseY);
          ctx.strokeStyle = '#888';
          ctx.stroke();
        }
      }
    }
    
    ctx.globalAlpha = 1.0;
    
    // Draw symptom nodes
    for (let i = 0; i < symptoms.length; i++) {
      const symptom = symptoms[i];
      const y = topMargin + (i + 1) * symptomSpacing;
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(leftX, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = categoryColors[symptom.category] || '#ccc';
      ctx.fill();
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw label
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`${symptom.name} (${symptom.prime})`, leftX - 15, y + 4);
    }
    
    // Draw disease nodes
    for (let i = 0; i < diseases.length; i++) {
      const disease = diseases[i];
      const y = topMargin + (i + 1) * diseaseSpacing;
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(rightX, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = categoryColors[disease.category] || categoryColors.Default;
      ctx.fill();
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw label
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${disease.name} (${disease.matchCount})`, rightX + 15, y + 4);
    }
    
    // Draw legend
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Symptoms', leftX, 25);
    ctx.fillText('Potential Conditions', rightX, 25);
    
  }, [symptoms, diseases]);
  
  if (symptoms.length === 0 || diseases.length === 0) {
    return (
      <div className="text-center p-6 text-gray-500">
        No data available for visualization.
      </div>
    );
  }
  
  return (
    <div className="visualization-container">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={400} 
        className="w-full h-auto border border-gray-200 rounded"
      />
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>This visualization shows connections between symptoms (left) and potential conditions (right).</p>
        <p>Lines indicate which symptoms contribute to each condition's SQF (Symptom Quotient Factorization).</p>
      </div>
    </div>
  );
};

export default VisualizationGraph;
