import { InputField } from '@/components/InputField'
import { QuantityInput } from '@/components/QuantityInput'
import { Radio } from '@/components/Radio'
import { useCart } from '@/hooks/useCart'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bank, CreditCard, CurrencyDollar, MapPin, Money, Trash } from 'phosphor-react'
import { Fragment } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { coffees } from '../../../data.json'
import {
  AddressForm,
  CartAddressHeading,
  CartCoffeeInfo,
  CartContainer,
  CartFormAddress,
  CartInfoContainer,
  CartPaymentContainer,
  CartPaymentHeading,
  CartPaymentOptions,
  CartTotal,
  CartTotalInfo,
  CheckoutButton,
  Coffee,
} from './style'

interface CartFormInput {
  cep: number
  rua: string
  numero: string
  complemento: string
  bairro: string
  city: string
  uf: string
  paymentMethod: 'credit' | 'debit' | 'money'
}

const newOrder = z.object({
  cep: z.number({ invalid_type_error: 'Informe o Cep' }),
  rua: z.string().min(1, 'Informe a Rua'),
  numero: z.string().min(1, 'Informe o número'),
  complemento: z.string(),
  bairro: z.string().min(1, 'Informe o Bairro'),
  city: z.string().min(1, 'Informe a Cidade'),
  uf: z.string().min(1, 'Informe o Estado'),
  paymentMethod: z.enum(['credit', 'debit', 'money'], {
    invalid_type_error: 'Informe o método de pagamento',
  }),
})

export type OrderInfo = z.infer<typeof newOrder>

const shippingPrice = 3.5

export function Cart() {
  const { cart, checkout, incrementQuantityItem, decrementQuantityItem, removeItem } = useCart()

  const coffeesInCart = cart.map(item => {
    const coffeeInfo = coffees.find(coffee => coffee.id === item.id)

    if (!coffeeInfo) {
      throw new Error(`Invalid coffee with id ${item.id}.`)
    }

    return {
      ...coffeeInfo,
      quantity: item.quantity,
    }
  })

  const totalItemsPrice = coffeesInCart.reduce((previousValue, currentItem) => {
    return (previousValue += currentItem.price * currentItem.quantity)
  }, 0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CartFormInput>({
    resolver: zodResolver(newOrder),
  })

  const selectedPaymentMethod = watch('paymentMethod')

  function handleItemIncrement(itemId: string) {
    incrementQuantityItem(itemId)
  }

  function handleItemDecrement(itemId: string) {
    decrementQuantityItem(itemId)
  }

  function handleItemRemove(itemId: string) {
    removeItem(itemId)
  }

  const handleOrderCheckout: SubmitHandler<CartFormInput> = data => {
    const order = {
      ...data,
      items: cart,
      total: totalItemsPrice + shippingPrice,
    }

    checkout(order)
  }

  return (
    <CartContainer>
      <CartInfoContainer>
        <h2>Complete seu pedido</h2>

        <form id="order" onSubmit={handleSubmit(handleOrderCheckout)}>
          <CartFormAddress>
            <CartAddressHeading>
              <MapPin size={22} />

              <div>
                <span>Endereço de Entrega</span>

                <p>Informe o endereço onde deseja receber o seu pedido</p>
              </div>
            </CartAddressHeading>

            <AddressForm>
              <InputField
                placeholder="CEP"
                type="number"
                containerProps={{ style: { gridArea: 'cep' } }}
                error={errors.cep}
                {...register('cep', { valueAsNumber: true })}
              />

              <InputField
                placeholder="Rua"
                containerProps={{ style: { gridArea: 'rua' } }}
                error={errors.rua}
                {...register('rua')}
              />

              <InputField
                placeholder="Número"
                containerProps={{ style: { gridArea: 'numero' } }}
                error={errors.numero}
                {...register('numero')}
              />

              <InputField
                placeholder="Complemento"
                optional
                containerProps={{ style: { gridArea: 'complemento' } }}
                error={errors.complemento}
                {...register('complemento')}
              />

              <InputField
                placeholder="Bairro"
                containerProps={{ style: { gridArea: 'bairro' } }}
                error={errors.bairro}
                {...register('bairro')}
              />

              <InputField
                placeholder="Cidade"
                containerProps={{ style: { gridArea: 'city' } }}
                error={errors.city}
                {...register('city')}
              />

              <InputField
                placeholder="UF"
                maxLength={2}
                containerProps={{ style: { gridArea: 'uf' } }}
                error={errors.uf}
                {...register('uf')}
              />
            </AddressForm>
          </CartFormAddress>

          <CartPaymentContainer>
            <CartPaymentHeading>
              <CurrencyDollar size={22} />

              <div>
                <span>Pagamento</span>

                <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
              </div>
            </CartPaymentHeading>

            <CartPaymentOptions>
              <div>
                <Radio
                  isSelected={selectedPaymentMethod === 'credit'}
                  {...register('paymentMethod')}
                  value="credit"
                >
                  <CreditCard size={16} />
                  <span>Cartão de crédito</span>
                </Radio>

                <Radio
                  isSelected={selectedPaymentMethod === 'debit'}
                  {...register('paymentMethod')}
                  value="debit"
                >
                  <Bank size={16} />
                  <span>Cartão de débito</span>
                </Radio>

                <Radio
                  isSelected={selectedPaymentMethod === 'money'}
                  {...register('paymentMethod')}
                  value="cash"
                >
                  <Money size={16} />
                  <span>Dinheiro</span>
                </Radio>
              </div>
            </CartPaymentOptions>
          </CartPaymentContainer>
        </form>
      </CartInfoContainer>

      <CartInfoContainer>
        <h2>Cafés selecionados</h2>

        <CartTotal>
          {coffeesInCart.map(coffee => (
            <Fragment key={coffee.id}>
              <Coffee>
                <div>
                  <img src={coffee.image} alt={coffee.title} />

                  <div>
                    <span>{coffee.title}</span>

                    <CartCoffeeInfo>
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() => {
                          handleItemIncrement(coffee.id)
                        }}
                        decrementQuantity={() => {
                          handleItemDecrement(coffee.id)
                        }}
                      />

                      <button
                        onClick={() => {
                          handleItemRemove(coffee.id)
                        }}
                      >
                        <Trash />
                        <span>Remover</span>
                      </button>
                    </CartCoffeeInfo>
                  </div>
                </div>

                <aside>R$ {coffee.price?.toFixed(2)}</aside>
              </Coffee>

              <span />
            </Fragment>
          ))}

          <CartTotalInfo>
            <div>
              <span>Total de itens</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice)}
              </span>
            </div>

            <div>
              <span>Entrega</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(shippingPrice)}
              </span>
            </div>

            <div>
              <span>Total</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPrice + shippingPrice)}
              </span>
            </div>
          </CartTotalInfo>

          <CheckoutButton type="submit" form="order">
            Confirmar pedido
          </CheckoutButton>
        </CartTotal>
      </CartInfoContainer>
    </CartContainer>
  )
}
