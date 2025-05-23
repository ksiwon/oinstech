import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
    colors: {
        primary: "#5797FD",
        black: "#111111",
        white: "#FFFFFF",
        gray: {
            400: "#AFAFAF",
            200: "#D0D0D0",
            100: "#F8F8F8",
        },
        green: {
            600: "#107F4F",
            300: "#8DD097",
        },
        red: {
            600: "#FA5858",
            300: "#F0ACAC",
            100: "#FFF0F0",
        },
        blue: {
            600: "#1668CA",
            300: "#AABDF0",
            100: "#EEF5FD",
        },
        yellow: {
            600: "#DFC100",
        },
        turkey: {
            600: "#20B6B6",
        },
    },
    typography: {
        T1: {
            fontFamily: "Pretendard",
            fontWeight: 800, // ExtraBold
            fontSize: "36px",
            lineHeight: "auto",
        },
        T2: {
            fontFamily: "Pretendard",
            fontWeight: 700, // Bold
            fontSize: "24px",
            lineHeight: "auto",
        },
        T3: {
            fontFamily: "Pretendard",
            fontWeight: 600, // SemiBold
            fontSize: "20px",
            lineHeight: "auto",
        },
        T4: {
            fontFamily: "Pretendard",
            fontWeight: 600, // SemiBold
            fontSize: "18px",
            lineHeight: "auto",
        },
        T5: {
            fontFamily: "Pretendard",
            fontWeight: 500, // Medium
            fontSize: "16px",
            lineHeight: "auto",
        },
        T6: {
            fontFamily: "Pretendard",
            fontWeight: 500, // Medium
            fontSize: "14px",
            lineHeight: "20px",
        },
        T7: {
            fontFamily: "Pretendard",
            fontWeight: 400, // Regular
            fontSize: "12px",
            lineHeight: "auto",
        },
    },    
};

export type ThemeType = typeof theme;