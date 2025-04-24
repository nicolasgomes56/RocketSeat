import { useSummary } from '@/hooks/useSummary'
import { priceFormatter } from '@/utils/formatter'
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollarSimple,
} from 'phosphor-react'
import { SummaryCard, SummaryContainer } from './style'

export function Summary() {
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <p>Saídas</p>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard className="highlight-background" variant="green">
        <header>
          <p>Total</p>
          <CurrencyDollarSimple size={32} color="#fff" />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
