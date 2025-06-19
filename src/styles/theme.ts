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
            800: "#003A95",
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
        purple: {
            700: "#7c3aed",
            600: "#8b5cf6", 
            400: "#a78bfa",
            300: "#c4b5fd",
            100: "#f3f4f6"
        },
        indigo: {
            900: "#1e1b4b",
            800: "#312e81", 
            700: "#3730a3",
            600: "#4f46e5"
        },
        slate: {
            900: "#0f172a",
            800: "#1e293b",
            700: "#334155",
            600: "#475569",
            500: "#64748b"
        },
        orange: {
            300: "#FFD1C4",
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