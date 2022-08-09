import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";

import * as T from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <T.TransactionContainer>
        <T.TransactionTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento App Magalu</td>
              <td>
                <T.PriceHighlight variant="income">
                  R$ 50.000,00
                </T.PriceHighlight>
              </td>
              <td>venda</td>
              <td>18/12/2022</td>
            </tr>

            <tr>
              <td width="50%">Alomoço</td>
              <td>
                <T.PriceHighlight variant="outcome">
                  - R$ 12,00
                </T.PriceHighlight>
              </td>
              <td>alimentação</td>
              <td>09/07/2022</td>
            </tr>
          </tbody>
        </T.TransactionTable>
      </T.TransactionContainer>
    </div>
  );
}
