import { useEffect, useRef } from 'react';

const CircleGraph = ({ data, colors, width, height, value }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const total = data.reduce((sum, value) => sum + value, 0);

    // Draw the outer circle
    let startAngle = 0;
    data.forEach((value, i) => {
      const sliceAngle = 2 * Math.PI * value / total;
      const gradientColors = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradientColors.addColorStop(0, colors[i]);
      gradientColors.addColorStop(1, '#999999');
      ctx.fillStyle = gradientColors;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();
      startAngle += sliceAngle;
    });

    // Draw the inner circle
    const innerRadius = radius / 2;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    // Draw the value text
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(value, centerX, centerY);
  }, [data, colors, value]);

  return (
      <canvas ref={canvasRef} width={width} height={height} />
  );
};

export default CircleGraph;
