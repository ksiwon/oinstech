import React, { useState } from "react";
import styled from "styled-components";

interface EditModalProps {
    group: any;
    onSave: (updatedGroup: any) => void;
    onClose: () => void;
    onClick?: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ group, onSave, onClose, onClick }) => {
    const [personnel, setPersonnel] = useState<number>(group.personnel);
    const [currentPersonnel, setCurrentPersonnel] = useState<number>(group.currentPersonnel);

    const handleSave = () => {
        const updatedGroup = { ...group, personnel, currentPersonnel };
        onSave(updatedGroup);
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <h2>그룹 수정</h2>
                <label>
                    모집 인원:
                    <input style={{ marginLeft: "4px" }}
                        type="number"
                        value={personnel}
                        onChange={(e) => setPersonnel(Number(e.target.value))}
                    />
                </label>
                <label>
                    현재 인원:
                    <input style={{ marginLeft: "4px" }}
                        type="number"
                        value={currentPersonnel}
                        onChange={(e) => setCurrentPersonnel(Number(e.target.value))}
                    />
                </label>
                <ButtonContainer>
                    <button onClick={onClose}>취소</button>
                    <button onClick={onClick}>삭제</button>
                    <button onClick={handleSave}>저장</button>
                </ButtonContainer>
            </ModalContent>
        </ModalOverlay>
    );
};

export default EditModal;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    gap: 20px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    justify-content: space-evenly;
`;
