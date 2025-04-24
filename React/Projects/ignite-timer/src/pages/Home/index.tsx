// React
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'

// Styles
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './style'

// Validation
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import * as zod from 'zod'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo deve ser no minimo 5 minutos')
    .max(60, 'O ciclo deve ser no maximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { reset, watch, handleSubmit } = newCycleForm

  // Funções chamadas a partir de um evento é uma boa prática utilizar o prefixo handle no nome da função (ex: handleCreateNewCycle)
  // Essa função tem como objetivo criar um novo ciclo e resetar o formulário e evitar que o metodo (reset) sejá utilizando dentro do contexto assim evitando o acoplamento do pacote (react-hook-form) ao contexto
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
