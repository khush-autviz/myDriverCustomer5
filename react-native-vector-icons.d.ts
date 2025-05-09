// react-native-vector-icons.d.ts
declare module 'react-native-vector-icons/*' {
    import * as React from 'react';
    import { TextProps } from 'react-native';
  
    export interface IconProps extends TextProps {
      name: string;
      size?: number;
      color?: string;
    }
  
    export default class Icon extends React.Component<IconProps> {}
  }
  