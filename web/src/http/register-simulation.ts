interface CreateGoalRequest {
  name: string
  email: string
  telefone: string
  bills: File[]
}

export async function registerSimulation({
  name,
  telefone,
  email,
  bills,
}: CreateGoalRequest): Promise<void> {
  try {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('telefone', telefone)
    formData.append('email', email)

    bills.forEach((bill, index) => {
      formData.append('bills', bill)
    })

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/simulation`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erro ao criar o registro')
    }
  } catch (error) {
    console.error('Erro ao tentar registrar a simulação:', error)
    throw error
  }
}
