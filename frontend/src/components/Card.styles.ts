import styled from "styled-components";

export const CardFrame = styled.div`
    display: flex;
    width: 240px;
    height: 320px;
    padding: 16px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    border-radius: 16px;
    background: ${({ theme }) => theme.colors.white};
    border: 4px solid ${({ theme }) => theme.colors.gray[200]};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    boxing-sizing: border-box;
    cursor: pointer;
`;

export const TopFrame = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`;

export const ImageFrame = styled.div<{ gender?: string }>`
    display: flex;
    flex-shrink: 0;
    width: 40px;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    color: ${({ theme, gender }) => (gender === "여성" ? theme.colors.red[600] : theme.colors.blue[600])};
    font-size: 32px;
    border-radius: 8px;
    border: 1px solid ${({ theme, gender }) => (gender === "여성" ? theme.colors.red[300] : theme.colors.blue[300])};
    aspect-ratio: 1 / 1;
`;

export const TopContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
`;

export const TopContentAbove = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
    width: 100%;
`;

export const TopName = styled.div`
    font-size: ${({ theme }) => theme.typography.T4.fontSize};
    font-weight: ${({ theme }) => theme.typography.T4.fontWeight};
    color: ${({ theme }) => theme.colors.black};
`;

export const TopFlagLocFrame = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 6px;
`;

export const TopFlag = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.black};
`;

export const TopLoc = styled.div`
    text-align: right;
    font-size: ${({ theme }) => theme.typography.T7.fontSize};
    font-weight: ${({ theme }) => theme.typography.T7.fontWeight};
    color: ${({ theme }) => theme.colors.black};
    margin: auto 0;
`;

export const TopContentBelow = styled.div`
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.T7.fontSize};
    font-weight: ${({ theme }) => theme.typography.T7.fontWeight};
`;

export const CenterFrame = styled.div<{ gender?: string }>`
    display: flex;
    width: 100%;
    padding: 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: ${({ theme, gender }) => (gender === "여성" ? theme.colors.red[100] : theme.colors.blue[100])};
    color: ${({ theme }) => theme.colors.black};
    font-family: "Handletter";
    font-size: 24px;
    font-weight: 500;
    text-align: left;
    box-sizing: border-box;
`;

export const BottomFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`;

export const BottomName = styled.div`
    align-self: flex-start;
    font-size: ${({ theme }) => theme.typography.T5.fontSize};
    font-weight: ${({ theme }) => theme.typography.T5.fontWeight};
    color: ${({ theme }) => theme.colors.black};
`;

export const BottomContentAbove = styled.div`
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 4px;
    align-self: stretch;
    flex-wrap: wrap;
`;

export const BottomContentBelow = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.T7.fontSize};
    font-weight: ${({ theme }) => theme.typography.T7.fontWeight};
    flex-wrap: wrap;
`;

export const SubjectAddressWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    align-self: stretch;
    gap: 16px;
`;

export const SubjectWrapper = styled.div`
    display: flex;
    width: 100px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
`;