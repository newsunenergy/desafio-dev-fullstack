interface GetSimulationsResponse {
  lead: {
    id: string
    nomeCompleto: string
    email: string
    telefone: string
  }
  codigoDaUnidadeConsumidora: string
}

export async function getSimulations(
  filterField: string,
  filterValue: string
): Promise<GetSimulationsResponse[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/listagem`)
  if (filterValue) {
    url.searchParams.append(filterField, filterValue)
  }

  try {
    const response = await fetch(url.toString())
    const data = await response.json()

    return data.simulations || []
  } catch (error) {
    console.error('Erro ao buscar simulações:', error)
    return []
  }
}
