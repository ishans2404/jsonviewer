// declare module 'react-json-tree' {
//     import { ComponentType } from 'react';
  
//     interface JSONTreeProps {
//       data: any;
//       theme?: object;
//       invertTheme?: boolean;
//       keyPath?: (string | number)[];
//       postprocessValue?: (value: any) => any;
//       sortObjectKeys?: ((a: any, b: any) => number) | boolean;
//       shouldExpandNode?: (keyPath: (string | number)[], data: any, level: number) => boolean;
//       hideRoot?: boolean;
//       getItemString?: (type: string, data: any, itemType: React.ReactNode, itemString: string) => React.ReactNode;
//       labelRenderer?: (raw: (string | number)[], parsed: (string | number)[]) => React.ReactNode;
//       valueRenderer?: (raw: any, parsed: any, ...keyPath: (string | number)[]) => React.ReactNode;
//     }
  
//     const JSONTree: ComponentType<JSONTreeProps>;
//     export { JSONTree };
//   }