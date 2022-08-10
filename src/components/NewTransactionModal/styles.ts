import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import styled, { keyframes } from "styled-components";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const overlayHide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const contentShow = keyframes({
  "0%": {
    opacity: 0,
    transform: "translate3d(-50%, calc(-50% + 20px), 0) scale(.96))",
  },

  "100%": {
    opacity: 1,
    transform: "translate3d(-50%, -50%, 0) scale(1))",
  },
});

const contentHide = keyframes({
  "0%": {
    opacity: 1,
    transform: "translate3d(-50%, -50% , 0) scale(1))",
  },

  "100%": {
    opacity: 0,
    transform: "translate3d(-50%, calc(-50% + 20px), 0) scale(.96))",
  },
});

export const Overlay = styled(Dialog.Overlay)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.75);

  &[data-state="open"] {
    animation: ${overlayShow} 0.2s ease-in;
  }

  &[data-state="closed"] {
    animation: ${overlayHide} 0.3s ease-in;
  }
`;

export const Content = styled(Dialog.Content)`
  width: 100%;
  max-width: 32rem;
  padding: 2.5rem 3rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: ${({ theme }) => theme["gray-800"]};
  border-radius: 6px;

  &[data-state="open"] {
    animation: ${contentShow} 0.3s ease-out forwards;
  }

  &[data-state="closed"] {
    animation: ${contentHide} 0.2s ease-out;
  }

  form {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      padding: 1rem;
      border: 0;
      border-radius: 6px;
      background: ${({ theme }) => theme["gray-900"]};
      color: ${({ theme }) => theme["gray-300"]};

      &::placeholder {
        color: ${({ theme }) => theme["gray-500"]};
      }
    }

    button[type="submit"] {
      height: 58px;
      padding: 0 1.25rem;
      margin-top: 1.5rem;
      border: 0;
      border-radius: 6px;
      background: ${({ theme }) => theme["green-500"]};
      color: ${({ theme }) => theme.white};
      font-weight: bold;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
      }

      &:not(:disabled):hover {
        background: ${({ theme }) => theme["green-700"]};
        transition: background 0.2s;
      }
    }
  }

  @media (max-width: 425px) {
    top: 334px;
    right: 0;
    left: 0;
    bottom: 0;
    transform: translate(0, 0);

    padding: 1.5rem;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    h2 {
      font-size: 1.25rem;
    }
  }
`;

export const CloseModalButton = styled(Dialog.Close)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme["gray-500"]};
`;

export const TransactionType = styled(RadioGroup.Root)`
  margin-top: 0.5rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

interface TransactionTypeButtonProps {
  variant?: "income" | "outcome";
}

export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme["gray-700"]};
  color: ${({ theme }) => theme["gray-300"]};
  border: 0;
  border-radius: 6px;

  svg {
    color: ${({ variant, theme }) =>
      variant === "income" ? theme["green-300"] : theme["red-300"]};
  }

  &[data-state="unchecked"]:hover {
    background: ${({ theme }) => theme["gray-600"]};
    transition: background 0.2s;
  }

  &[data-state="checked"] {
    color: ${({ theme }) => theme.white};
    background: ${({ variant, theme }) =>
      variant === "income" ? theme["green-500"] : theme["red-500"]};

    svg {
      color: ${({ theme }) => theme.white};
    }
  }
`;
