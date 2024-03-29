import Stripe from 'stripe'
import { GetStaticProps } from 'next'
import { MouseEvent, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

import { stripe } from '@/lib/stripe'
import { IProduct } from '@/contexts/CartContext'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import Image from 'next/image'
import { ProductSkeleton } from '@/Components/ProductSkeleton'
import { CartButton } from '@/Components/CartButton'

import { HomeContainer, Product, SliderContainer } from '@/styles/pages/home'

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // fake loading to use the skeleton loading from figma
    const timeOut = setTimeout(() => setIsLoading(false), 2000)

    return () => clearTimeout(timeOut)
  }, [])

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  })

  const { addToCart, checkIfItemAlreadyExists } = useCart()

  function handleAddToCart(
    e: MouseEvent<HTMLButtonElement>,
    product: IProduct,
  ) {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <HomeContainer>
        <div className="embla" ref={emblaRef}>
          <SliderContainer className="embla__container container">
            {isLoading ? (
              <>
                <ProductSkeleton className="embla__slide" />
                <ProductSkeleton className="embla__slide" />
                <ProductSkeleton className="embla__slide" />
              </>
            ) : (
              <>
                {products.map((product) => {
                  return (
                    <Link
                      href={`/product/${product.id}`}
                      key={product.id}
                      prefetch={false}
                    >
                      <Product className="embla__slide">
                        <Image
                          src={product.imageUrl}
                          width={520}
                          height={480}
                          alt=""
                        />

                        <footer>
                          <div>
                            <strong>{product.name}</strong>
                            <span>{product.price}</span>
                          </div>
                          <CartButton
                            color="green"
                            size="large"
                            disabled={checkIfItemAlreadyExists(product.id)}
                            onClick={(e) => handleAddToCart(e, product)}
                          />
                        </footer>
                      </Product>
                    </Link>
                  )
                })}
              </>
            )}
          </SliderContainer>
        </div>
      </HomeContainer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((price.unit_amount as number) / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
