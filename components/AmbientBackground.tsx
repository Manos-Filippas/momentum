import { useId } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import type { ViewStyle } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from 'react-native-svg';
import { useTheme } from '../theme/ThemeProvider';
import type { ColorScheme } from '../theme/ThemeProvider';

const LIGHT_BASE = '#F4F5F4';
const DARK_BASE = '#0B0C0A';

const SPLASHES = [
  { color: '#C9FB45', opacity: 0.46, rx: 1.15, ry: 0.62, cx: 0.04,  cy: -0.08, stop: 0.62 },
  { color: '#E2FF8F', opacity: 0.40, rx: 1.05, ry: 0.56, cx: 1.06,  cy:  0.06, stop: 0.60 },
  { color: '#B2EA1E', opacity: 0.30, rx: 1.20, ry: 0.50, cx: 0.90,  cy:  1.05, stop: 0.58 },
  { color: '#EEFFBE', opacity: 0.36, rx: 1.18, ry: 0.50, cx: 0.00,  cy:  0.99, stop: 0.58 },
] as const;

type Props = {
  children?: React.ReactNode;
  style?: ViewStyle;
  colorScheme?: ColorScheme;
};

export default function AmbientBackground({ children, style, colorScheme: colorSchemeProp }: Props) {
  const { colorScheme: themeScheme } = useTheme();
  const { width, height } = useWindowDimensions();
  const uid = useId();

  const colorScheme = colorSchemeProp ?? themeScheme;
  const base = colorScheme === 'dark' ? DARK_BASE : LIGHT_BASE;

  return (
    <View style={[styles.container, { backgroundColor: base }, style]}>
      <Svg style={StyleSheet.absoluteFill} width={width} height={height}>
        <Defs>
          {SPLASHES.map((s, i) => (
            <RadialGradient
              key={i}
              id={`${uid}-g${i}`}
              cx="0.5"
              cy="0.5"
              r="0.5"
              gradientUnits="objectBoundingBox"
            >
              <Stop offset="0" stopColor={s.color} stopOpacity={s.opacity} />
              <Stop offset={s.stop} stopColor={s.color} stopOpacity={0} />
            </RadialGradient>
          ))}
        </Defs>

        {SPLASHES.map((s, i) => (
          <Ellipse
            key={i}
            cx={width * s.cx}
            cy={height * s.cy}
            rx={width * s.rx}
            ry={height * s.ry}
            fill={`url(#${uid}-g${i})`}
          />
        ))}
      </Svg>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});
