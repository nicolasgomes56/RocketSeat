import { useCart } from "@/hooks/useCart"
import { CurrencyDollar, MapPin, Timer } from "phosphor-react"
import { useParams } from "react-router-dom"
import { useTheme } from "styled-components"
import { Heading, InfoContent, Order, SuccessContainer, SuccessInfo } from "./style"

export function Success() {
  const { orders } = useCart()
  const { orderId } = useParams()
  const orderInfo = orders.find((order) => order.id === Number(orderId))
  const paymentMethod = {
    credit: 'Cartão de crédito',
    debit: 'Cartão de débito',
    money: 'Dinheiro',
  }
  const theme = useTheme()

  console.log(orderInfo);
  

  if (!orderInfo?.id) {
    return null
  }

  return (
    <SuccessContainer>
      <Order>
        <Heading>
          <h2>Uhu! Pedido confirmado</h2>
          <span>Agora é só aguardar que logo o café chegará até você</span>
        </Heading>

        <SuccessInfo>
          <InfoContent>
            <div>
              <MapPin
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors.purple }}
                size={32}
              />

              <div>
                <span>
                  Entrega em {''}
                  <strong>
                    {orderInfo.rua}, {orderInfo.numero}
                  </strong>
                </span>

                <span>
                  {orderInfo.bairro} - {orderInfo.city},{orderInfo.uf}
                </span>
              </div>
            </div>

            <div>
              <Timer
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors.yellow }}
                size={32}
              />

              <div>
                <span>Previsão de entrega</span>

                <strong>20 min - 30 min</strong>
              </div>
            </div>

            <div>
              <CurrencyDollar
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors['yellow-dark'] }}
                size={32}
              />

              <div>
                <span>Pagamento na entrega</span>

                <strong>{paymentMethod[orderInfo.paymentMethod]}</strong>
              </div>
            </div>
          </InfoContent>
        </SuccessInfo>
      </Order>

      <img src="/delivery.svg" alt="Pedido concluído" />
    </SuccessContainer>
  )
}