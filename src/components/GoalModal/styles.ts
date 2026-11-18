import styled from "styled-components";

export {
  Overlay,
  Content,
  CloseModalButton,
} from "../NewTransactionModal/styles";

export const Month = styled.span`
  display: block;
  margin-top: 0.25rem;
  color: ${({ theme }) => theme["gray-400"]};
`;

export const RemoveGoalButton = styled.button`
  height: 48px;
  border: 1px solid ${({ theme }) => theme["red-500"]};
  border-radius: 6px;
  background: transparent;
  color: ${({ theme }) => theme["red-300"]};
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme["red-700"]};
    color: ${({ theme }) => theme.white};
    transition: background 0.2s;
  }
`;
