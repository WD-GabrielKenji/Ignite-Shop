import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  minHeight: 656,
  marginLeft: 'auto',
  gap: '3rem',
})

export const Product = styled('a', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  padding: '0.25rem',
  borderRadius: 8,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  cursor: 'pointer',
  overflow: 'hidden',

  img: {
    objectFit: 'cover',
  },

  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    left: '0.25rem',
    right: '0.25rem',
    bottom: '0.25rem',
    padding: '2rem',
    borderRadius: 6,
    opacity: 0,
    transform: 'translateY(110%)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
    },

    span: {
      color: '$green300',
      fontSize: '$xl',
      fontWeight: 'bold',
    },
  },

  '&:hover': {
    footer: {
      opacity: 1,
      transform: 'translateY(0%)',
    },
  },
})
