import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import * as S from "./styles";

const searchFormSchema = zod.object({
  query: zod.string().min(3),
});

type SearchFormInputs = zod.infer<typeof searchFormSchema>;

export function SearchForm() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    resetField,
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransaction(data: SearchFormInputs) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(data);
    
    resetField("query")
  }

  return (
    <S.SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input
        type="text"
        placeholder="Busque uma trasação"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        {!isSubmitting && <MagnifyingGlass size={20} />}
        {isSubmitting ? "Buscando..." : "Buscar"}
      </button>
    </S.SearchFormContainer>
  );
}
