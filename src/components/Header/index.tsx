import * as H from "./styles";
import logo from "../../assets/logo.svg";

interface HeaderProps {
  onNewTransaction: () => void;
}

export function Header({ onNewTransaction }: HeaderProps) {
  return (
    <H.HeaderContainer>
      <H.HeaderContent>
        <img src={logo} alt="" />

        <H.NewTransactionButton onClick={onNewTransaction}>
          Nova transação
        </H.NewTransactionButton>
      </H.HeaderContent>
    </H.HeaderContainer>
  );
}
