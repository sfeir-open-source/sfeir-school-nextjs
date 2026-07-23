/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module '*.css' {
  const styles: { readonly [className: string]: string };
  export default styles;
}
