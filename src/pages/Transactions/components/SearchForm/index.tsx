import { useForm } from 'react-hook-form'
import { useTransactions } from '../../../../contexts/Transactions/TransactionContext'
import { MagnifyingGlass } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import * as S from './styles'

const searchFormSchema = zod.object({
  query: zod.string().min(3),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export function SearchForm() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const { getTransactions } = useTransactions()

  async function handleSearchTransaction(data: SearchFormInputs) {
    await getTransactions(data.query)
  }

  return (
    <S.SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input
        type="text"
        placeholder="Busque uma trasação"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        {!isSubmitting && <MagnifyingGlass size={20} />}
        {isSubmitting ? 'Buscando...' : 'Buscar'}
      </button>
    </S.SearchFormContainer>
  )
}
