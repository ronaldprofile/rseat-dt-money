import * as H from "./styles";
import logo from "../../assets/logo.svg";

export function Header() {
  return (
    <H.HeaderContainer>
      <H.HeaderContent>
        <img src={logo} alt="" />

        <H.NewTransactionButton>Nova transação</H.NewTransactionButton>
      </H.HeaderContent>
    </H.HeaderContainer>
  );
}
