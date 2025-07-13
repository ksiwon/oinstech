import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: string;
            black: string;
            white: string;
            gray: {
                700: string;
                400: string;
                200: string;
                100: string;
            };
            green: {
                600: string;
                300: string;
            };
            red: {
                600: string;
                300: string;
                100: string;
            };
            blue: {
                800: string;
                600: string;
                300: string;
                100: string;
            };
            yellow: {
                600: string;
            };
            turkey: {
                600: string;
            };
            purple: {
                700: string;
                600: string; 
                400: string;
                300: string;
                100: string;
            },
            indigo: {
                900: string;
                800: string;
                700: string;
                600: string;
            },
            slate: {
                900: string;
                800: string;
                700: string;
                600: string;
                500: string;
            },
            orange: {
                300: string;
            };
        };
        typography: {
            T1: TypographyStyle;
            T2: TypographyStyle;
            T3: TypographyStyle;
            T4: TypographyStyle;
            T5: TypographyStyle;
            T6: TypographyStyle;
            T7: TypographyStyle;
        };
    }

    export interface TypographyStyle {
        fontFamily: string;
        fontWeight: number;
        fontSize: string;
        lineHeight: string;
    }
}