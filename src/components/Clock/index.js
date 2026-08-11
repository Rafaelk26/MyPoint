import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import { useTheme } from 'styled-components';

// Theme
import theme from '../../global/styles/theme';

export function AnalogClock() {
  
  const theme = useTheme();
  const [time, setTime] = useState(new Date());

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  // Cálculo dos ângulos dos ponteiros
  const secondAngle = (seconds / 60) * 360;
  const minuteAngle = ((minutes + seconds / 60) / 60) * 360;
  const hourAngle = ((hours + minutes / 60) / 12) * 360;

  const size = 150;
  const center = size / 2;
  const radius = 70;

  // Função auxiliar para calcular coordenadas baseadas no ângulo
  const getCoordinates = (angle, length) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x2: center + length * Math.cos(rad),
      y2: center + length * Math.sin(rad),
    };
  };

  const secCoords = getCoordinates(secondAngle, 50);
  const minCoords = getCoordinates(minuteAngle, 35);
  const hourCoords = getCoordinates(hourAngle, 24);


// Função para acrescentar os ponteiros dos segundos
  const marks = Array.from({ length: 60 }, (_, i) => {
    const angle = ((i * 6) - 90) * Math.PI / 180;

    const isHour = i % 5 === 0;

    const outer = radius - 4;
    const inner = isHour ? radius - 16 : radius - 10;

    return {
        x1: center + inner * Math.cos(angle),
        y1: center + inner * Math.sin(angle),
        x2: center + outer * Math.cos(angle),
        y2: center + outer * Math.sin(angle),
        width: isHour ? 1.5 : .5,
    };
    });

  return (
    <View style={styles.container}>
      <Svg height={size} width={size}>
        {/* Fundo do Relógio */}
        <Circle cx={center} cy={center} r={radius} stroke={theme.colors.blue} strokeWidth="3" fill={theme.colors.background} />

        {/* Marcações de Horas (12, 3, 6, 9) */}
        <SvgText x={center} y="40" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#333">12</SvgText>
        <SvgText x={size - 30} y={center + 6} fontSize="16" fontWeight="bold" textAnchor="middle" fill="#333">3</SvgText>
        <SvgText x={center} y={size - 30} fontSize="16" fontWeight="bold" textAnchor="middle" fill="#333">6</SvgText>
        <SvgText x={center - 45} y={center + 6} fontSize="16" fontWeight="bold" textAnchor="middle" fill="#333">9</SvgText>
        
        {/* Marcações dos Segundos */}
        {marks.map((mark, index) => (
            <Line
                key={index}
                x1={mark.x1}
                y1={mark.y1}
                x2={mark.x2}
                y2={mark.y2}
                stroke="#383838"
                strokeWidth={mark.width}
                strokeLinecap="round"
            />
        ))}

        {/* Ponteiro das Horas */}
        <Line x1={center} y1={center} x2={hourCoords.x2} y2={hourCoords.y2} stroke="#333" strokeWidth="4" strokeLinecap="round" />

        {/* Ponteiro dos Minutos */}
        <Line x1={center} y1={center} x2={minCoords.x2} y2={minCoords.y2} stroke="#333" strokeWidth="3" strokeLinecap="round" />

        {/* Ponteiro dos Segundos */}
        <Line x1={center} y1={center} x2={secCoords.x2} y2={secCoords.y2} stroke={theme.colors.blue} strokeWidth="1" strokeLinecap="round" />

        {/* Ponto Central */}
        <Circle cx={center} cy={center} r="4" fill={theme.colors.blue} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 'auto',
    backgroundColor: 'transparent',
  }
});
