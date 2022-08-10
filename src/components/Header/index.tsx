import * as Dialog from '@radix-ui/react-dialog'
import * as H from './styles'
import logo from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <H.HeaderContainer>
      <H.HeaderContent>
        <img src={logo} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <H.NewTransactionButton>Nova transação</H.NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </H.HeaderContent>
    </H.HeaderContainer>
  )
}
