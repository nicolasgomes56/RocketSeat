import { Card } from '@/components/Card'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
import { useTheme } from 'styled-components'

import { coffees } from '../../../data.json'
import { CoffeeList, HeroContainer, HeroContent, HeroHeading, HeroInfo } from './style'

export function Home() {
  const theme = useTheme()

  return (
    <div>
      <HeroContainer>
        <HeroContent>
          <div>
            <HeroHeading>
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>

              <span>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</span>
            </HeroHeading>

            <HeroInfo>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['yellow-dark'] }}
                />
                <span>Compra simples e segura</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['base-text'] }}
                />
                <span>Embalagem mantém o café intacto</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.yellow }}
                />
                <span>Entrega rápida e rastreada</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.purple }}
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </HeroInfo>
          </div>

          <img src="./hero.svg" alt="Café do Coffee Delivery" />
        </HeroContent>

        <img src="./hero-bg.svg" id="hero-bg" alt="" />
      </HeroContainer>

      <CoffeeList>
        <h2>Nossos cafés</h2>

        <div>
          {coffees.map(coffee => (
            <Card key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </CoffeeList>
    </div>
  )
}
